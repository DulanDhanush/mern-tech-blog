import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Eye, Tag } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
      navigate("/");
    }
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0); // Always start at the top of the post
  }, [fetchPost]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-l-2 border-secondary animate-spin-reverse"></div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto pb-24"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-textSecondary hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold">Back to Feed</span>
      </Link>

      {/* Hero Section */}
      <header className="mb-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <div className="flex items-center gap-4 text-xs text-textSecondary font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-8"
        >
          {post.title}
        </motion.h1>

        {/* Cinematic Cover Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative shadow-2xl shadow-black/50 border border-white/10"
        >
          {post.coverImage ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10"></div>
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center">
              <Tag className="w-16 h-16 text-white/30 mb-4" />
              <span className="text-white/50 font-mono text-sm">
                No cover artwork provided
              </span>
            </div>
          )}

          {/* Author Badge floating on image */}
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 bg-dark/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-textSecondary">Written by</p>
              <p className="text-sm font-bold text-white">{post.author}</p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Markdown Content rendered with Typography plugin equivalents */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-card prose-pre:border prose-pre:border-white/10"
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </motion.div>
    </motion.article>
  );
};

export default BlogPost;
