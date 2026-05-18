const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Initialize environment configuration layer
dotenv.config();

const app = express();

// ============ PRODUCTION MIDDLEWARE ============
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

// ============ HIGH-AVAILABILITY DATABASE CONNECTION ============
const cloudURI = process.env.MONGO_URI;
const localURI = "mongodb://127.0.0.1:27017/blogdb";

// Attempts Cloud Atlas first. If blocked by local ISP, gracefully falls back to local DB.
mongoose
  .connect(cloudURI, { serverSelectionTimeoutMS: 3000 })
  .then(() =>
    console.log(
      "✅ Core Cluster Network Interconnect: Connected to Cloud Atlas Successfully",
    ),
  )
  .catch((err) => {
    console.log("⚠️ Cloud connection blocked by local network firewall.");
    console.log(
      "📡 Rerouting transaction pipeline to local fallback database...",
    );

    mongoose
      .connect(localURI)
      .then(() =>
        console.log(
          "🚀 Local Database Engine Active: Connected Successfully via 127.0.0.1",
        ),
      )
      .catch((localErr) =>
        console.error(
          "❌ Critical: Both Cloud and Local Database routing failed:",
          localErr.message,
        ),
      );
  });

// ============ SCHEMAS & DATA MODELS ============
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: { type: String, default: "Tech" },
  tags: [{ type: String }],
  coverImage: { type: String, default: "" },
  author: { type: String, default: "Admin" },
  readTime: { type: Number, default: 5 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

// ============ SECURITY & AUTHENTICATION MIDDLEWARE ============
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "No security token provided in request header." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message:
        "Security Validation Anomaly: Session token has expired or is invalid.",
    });
  }
};

// ============ AUTHENTICATION API ENDPOINTS ============

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Profile record already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Developer Override: Hardcoded to 'admin' so you can test your dashboard!
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: { id: user._id, username, email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Invalid credential parameters." });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res
        .status(401)
        .json({ message: "Invalid credential parameters." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ POSTS ARTICLES CRUD ROUTING ============

app.get("/api/posts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    let query = {};
    if (category && category !== "All") query.category = category;

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Post.countDocuments(query);

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Article not found." });

    post.views += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/posts", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin clearance required." });

  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/posts/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin clearance required." });

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true },
    );
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/posts/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin clearance required." });

  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Post.distinct("category");
    res.json(["All", ...categories.sort()]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ WEB PORT SERVER INITIALIZATION ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Distributed API Engine listening intently on deployment port: ${PORT}`,
  );
});
