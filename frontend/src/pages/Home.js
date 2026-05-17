import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  }, [fetchPosts, fetchCategories]);

  const getReadTimeColor = (minutes) => {
    if (minutes < 5) return "text-[#10B981]";
    if (minutes < 10) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#A259FF] to-[#20C997] bg-clip-text text-transparent">
          Tech & Innovation Blog
        </h1>
        <p className="text-[#94A3B8] mt-4 text-lg">
          Explore the latest in technology, development, and digital trends
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[#A259FF] text-white"
                : "bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A259FF]"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-[#94A3B8] py-12">
          No posts yet. Check back soon!
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                className="card group"
              >
                {/* Cover image section */}
                <div className="h-48 rounded-lg mb-4 overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-[#A259FF]/20 to-[#20C997]/20 flex items-center justify-center">
                            <span class="text-5xl">📝</span>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#A259FF]/20 to-[#20C997]/20 flex items-center justify-center">
                      <span className="text-5xl">📝</span>
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-[#F5F7FA] group-hover:text-[#A259FF] transition mb-2">
                  {post.title}
                </h2>
                <p className="text-[#94A3B8] text-sm mb-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-[#64748B]">
                  <span>👤 {post.author}</span>
                  <span className={getReadTimeColor(post.readTime)}>
                    ⏱️ {post.readTime} min read
                  </span>
                  <span>
                    📅 {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#1E293B] rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-[#F5F7FA]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#1E293B] rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
