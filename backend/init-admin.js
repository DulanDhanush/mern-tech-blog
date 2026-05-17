const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
});
const User = mongoose.model("User", userSchema);

async function createAdmin() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected.");

    const existing = await User.findOne({ email: "admin@blog.com" });
    if (!existing) {
      console.log("Creating admin user...");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        username: "admin",
        email: "admin@blog.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created");
    } else {
      console.log("✅ Admin user already exists");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
