import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Edit3,
  Trash2,
  LayoutDashboard,
  Image as ImageIcon,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown"; // <-- NEW IMPORT

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Admin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false); // <-- NEW STATE

  const initialFormState = {
    title: "",
    content: "",
    excerpt: "",
    category: "Tech",
    tags: [],
    author: "Admin",
    readTime: 5,
    coverImage: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/posts`);
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/api/posts/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/api/posts`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving post");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post permanently?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setEditingId(post._id);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags || [],
      author: post.author,
      readTime: post.readTime,
      coverImage: post.coverImage || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialFormState);
    setPreviewMode(false); // reset preview tab when form resets
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">
      <header className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
          <LayoutDashboard className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white">
            Admin Control Center
          </h1>
          <p className="text-textSecondary">Manage your digital publications</p>
        </div>
      </header>

      {/* Editor Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-white/10"
      >
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {isEditing ? (
              <Edit3 className="text-secondary" />
            ) : (
              <PlusCircle className="text-primary" />
            )}
            {isEditing ? "Edit Publication" : "Create New Post"}
          </h2>
          {isEditing && (
            <button
              onClick={resetForm}
              className="text-textSecondary hover:text-white flex items-center gap-1 text-sm bg-white/5 px-3 py-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input-field text-lg font-semibold"
                required
              />
              <textarea
                placeholder="Brief Excerpt (Summary)"
                rows={3}
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="input-field resize-none"
                required
              />

              <div className="space-y-2">
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    type="url"
                    placeholder="Cover Image URL"
                    value={formData.coverImage}
                    onChange={(e) =>
                      setFormData({ ...formData, coverImage: e.target.value })
                    }
                    className="input-field pl-12"
                  />
                </div>
                {formData.coverImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-32 rounded-xl overflow-hidden border border-white/10"
                  >
                    <img
                      src={formData.coverImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Tab buttons */}
              <div className="flex gap-2 border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setPreviewMode(false)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    !previewMode
                      ? "text-primary border-b-2 border-primary"
                      : "text-textSecondary hover:text-white"
                  }`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode(true)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    previewMode
                      ? "text-primary border-b-2 border-primary"
                      : "text-textSecondary hover:text-white"
                  }`}
                >
                  Preview
                </button>
              </div>

              {!previewMode ? (
                <textarea
                  placeholder="Write your content here (Markdown supported)..."
                  rows={12}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="input-field h-full font-mono text-sm leading-relaxed"
                  required
                />
              ) : (
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-card prose-pre:border prose-pre:border-white/10 bg-card/30 rounded-xl p-6 min-h-[300px] border border-white/5 overflow-auto">
                  <ReactMarkdown>
                    {formData.content || "*Nothing to preview yet*"}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <input
              type="text"
              placeholder="Category (e.g., Tech)"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="input-field"
            />
            <input
              type="number"
              placeholder="Read Time (mins)"
              value={formData.readTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  readTime: parseInt(e.target.value) || 5,
                })
              }
              className="input-field"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              {isEditing ? (
                <Edit3 className="w-4 h-4" />
              ) : (
                <PlusCircle className="w-4 h-4" />
              )}
              {isEditing ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Post List Section */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          Published Articles{" "}
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
            {posts.length}
          </span>
        </h2>
        <div className="space-y-3">
          <AnimatePresence>
            {posts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card/50 hover:bg-card border border-white/5 hover:border-white/10 p-4 rounded-xl flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark border border-white/5 flex-shrink-0">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt="cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl opacity-50">
                        📝
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-textSecondary mt-1">
                      {post.category} •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-2 bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Admin;
