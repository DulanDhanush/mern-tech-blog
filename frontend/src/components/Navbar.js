import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#1A2A3A] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-[#A259FF] hover:text-[#20C997] transition"
        >
          TechBlog ✨
        </Link>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-[#F5F7FA] hover:text-[#A259FF] transition"
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/admin"
              className="text-[#F5F7FA] hover:text-[#A259FF] transition"
            >
              Admin
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-[#EF4444] hover:text-[#DC2626] transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
