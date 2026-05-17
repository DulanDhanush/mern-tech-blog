import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Admin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Tech",
    tags: [],
    author: "Admin",
    readTime: 5,
    coverImage: "", // 👈 added coverImage field
  });
  const [editingId, setEditingId] = useState(null);

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
      console.error("Error saving post:", error);
      alert(error.response?.data?.message || "Error saving post");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
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
      coverImage: post.coverImage || "", // 👈 include existing coverImage
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "Tech",
      tags: [],
      author: "Admin",
      readTime: 5,
      coverImage: "",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#A259FF]">Admin Dashboard</h1>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Post" : "Create New Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="input-field"
            required
          />
          <textarea
            placeholder="Excerpt (short summary)"
            rows={2}
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            className="input-field"
            required
          />
          <textarea
            placeholder="Content (Markdown supported)"
            rows={10}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="input-field"
            required
          />

          {/* 👇 New Cover Image URL field */}
          <input
            type="url"
            placeholder="Cover Image URL (e.g., https://images.unsplash.com/... )"
            value={formData.coverImage}
            onChange={(e) =>
              setFormData({ ...formData, coverImage: e.target.value })
            }
            className="input-field"
          />
          {formData.coverImage && (
            <div className="mt-2">
              <img
                src={formData.coverImage}
                alt="Preview"
                className="h-32 rounded-lg object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                  e.target.alt = "Invalid image URL";
                }}
              />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="input-field"
            />
            <input
              type="number"
              placeholder="Read time (minutes)"
              value={formData.readTime}
              onChange={(e) =>
                setFormData({ ...formData, readTime: parseInt(e.target.value) })
              }
              className="input-field"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary">
              {isEditing ? "Update Post" : "Create Post"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">
          Manage Posts ({posts.length})
        </h2>
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="card flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-[#F5F7FA]">{post.title}</h3>
                <p className="text-sm text-[#94A3B8]">
                  {post.category} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-[#20C997] hover:text-[#1AA179]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-[#EF4444] hover:text-[#DC2626]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
