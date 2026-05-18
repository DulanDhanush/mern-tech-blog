import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Sparkles, Flame, Zap } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/posts`, {
        params: {
          page: currentPage,
          category: selectedCategory === "All" ? "" : selectedCategory,
        },
      });
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  }, [currentPage, selectedCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    window.scrollTo(0, 0);
  }, [fetchPosts, fetchCategories]);

  // Framer Motion Variants for Staggered Grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // Separate the latest post for a "Featured" Hero layout (only on page 1)
  const featuredPost = currentPage === 1 && posts.length > 0 ? posts[0] : null;
  const gridPosts =
    currentPage === 1 && posts.length > 0 ? posts.slice(1) : posts;

  return (
    <div className="space-y-16 max-w-6xl mx-auto pb-24">
      {/* 1. Next-Gen Animated Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-20 pb-12 overflow-hidden flex flex-col items-center text-center"
      >
        {/* Ambient Animated Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10"
        />

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-textSecondary mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Architecting the digital frontier</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
          Read. Build. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
            Innovate.
          </span>
        </h1>
        <p className="text-lg text-textSecondary max-w-2xl mx-auto font-light leading-relaxed">
          Dive into deep-dive engineering articles, software architecture
          breakdowns, and next-level UI/UX patterns.
        </p>
      </motion.div>

      {/* 2. Fluid Category Filter (Shared Layout Animation) */}
      <div className="flex flex-wrap gap-3 justify-center relative z-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
              selectedCategory === cat
                ? "text-white"
                : "text-textSecondary hover:text-white"
            }`}
          >
            {selectedCategory === cat && (
              <motion.div
                layoutId="activeCategoryBg"
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10 shadow-lg shadow-primary/25 border border-white/10"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full"
          />
        </div>
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-textSecondary py-32"
        >
          <Zap className="w-12 h-12 mx-auto text-textSecondary/50 mb-4" />
          <p className="text-xl">No transmissions found on this frequency.</p>
        </motion.div>
      ) : (
        <div className="space-y-12">
          {/* 3. Featured Hero Post (Bento Box Style) */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={`/post/${featuredPost._id}`}
                className="group block relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-primary/50 hover:to-secondary/50 transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 z-20">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-dark/80 backdrop-blur-md rounded-full text-xs font-bold text-secondary border border-secondary/20">
                    <Flame className="w-3.5 h-3.5" /> Featured
                  </span>
                </div>

                <div className="bg-card rounded-[23px] grid md:grid-cols-2 overflow-hidden border border-white/5">
                  <div className="h-64 md:h-[400px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    {featuredPost.coverImage ? (
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center">
                        <Zap className="w-16 h-16 text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-primary text-sm font-bold tracking-wider uppercase mb-4">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-textSecondary transition-all duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="text-textSecondary text-lg leading-relaxed mb-8 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                      <div className="flex items-center gap-4 text-sm text-textSecondary font-medium">
                        <span className="flex items-center gap-1.5">
                          <User size={16} className="text-white" />{" "}
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={16} className="text-secondary" />{" "}
                          {featuredPost.readTime} min
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary text-white transition-colors duration-300">
                        <ArrowRight
                          size={18}
                          className="group-hover:-rotate-45 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* 4. Scroll-Triggered Grid Layout */}
          {gridPosts.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {gridPosts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <Link
                    to={`/post/${post._id}`}
                    className="block h-full group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-primary/40 transition-colors duration-500 overflow-hidden"
                  >
                    <div className="h-full bg-card rounded-[15px] overflow-hidden flex flex-col relative z-10">
                      <div className="h-48 relative overflow-hidden">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-dark flex items-center justify-center">
                            <Zap className="w-8 h-8 text-white/10" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-dark/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-white border border-white/10 uppercase tracking-wider">
                          {post.category}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-textSecondary text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-textSecondary font-medium">
                          <span>{post.author}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-secondary" />{" "}
                            {post.readTime}m
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-2 mt-16 pt-8 border-t border-white/5"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 bg-card rounded-xl border border-white/10 disabled:opacity-30 hover:border-primary hover:text-white text-textSecondary text-sm font-semibold transition-all"
              >
                Previous
              </button>
              <div className="px-4 py-2 text-textSecondary font-mono text-sm">
                <span className="text-white">{currentPage}</span> / {totalPages}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 bg-card rounded-xl border border-white/10 disabled:opacity-30 hover:border-secondary hover:text-white text-textSecondary text-sm font-semibold transition-all"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
