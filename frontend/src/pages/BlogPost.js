import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

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
  }, [fetchPost]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A259FF]"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        {/* Cover image section */}
        <div className="h-64 rounded-xl mb-6 overflow-hidden">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-[#A259FF]/20 to-[#20C997]/20 flex items-center justify-center">
                    <span class="text-6xl">📖</span>
                  </div>
                `;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#A259FF]/20 to-[#20C997]/20 flex items-center justify-center">
              <span className="text-6xl">📖</span>
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold text-[#F5F7FA] mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-[#94A3B8]">
          <span>👤 {post.author}</span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
          <span>⏱️ {post.readTime} min read</span>
          <span>👁️ {post.views} views</span>
          <span className="px-2 py-1 bg-[#A259FF]/20 rounded-full text-[#A259FF]">
            {post.category}
          </span>
        </div>
      </div>
      <div className="prose prose-invert prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;
