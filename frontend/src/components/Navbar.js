import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Shield,
  LogOut,
  LogIn,
  Sparkles,
  MessageSquare,
} from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pt-6 px-4 mb-4 sticky top-0 z-50 pointer-events-none"
    >
      <nav className="container mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#0F172A]/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] pointer-events-auto transition-all duration-300">
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Logo Section with Dynamic Interactive Icon */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="p-1.5 rounded-lg bg-primary/10 border border-primary/20"
            >
              <Sparkles className="text-[#A259FF] w-5 h-5" />
            </motion.div>
            <span className="text-2xl font-black bg-gradient-to-r from-[#A259FF] to-[#20C997] bg-clip-text text-transparent tracking-tight group-hover:opacity-80 transition-opacity">
              TechBlog
            </span>
          </Link>

          {/* Action Links Capsule */}
          <div className="flex items-center space-x-1 md:space-x-2 bg-[#0A0F1A]/40 px-3 py-1.5 rounded-xl border border-white/5">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              <Home className="w-4 h-4 text-[#20C997]" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* Next-Gen Feedback Link Added Here */}
            <Link
              to="/feedback"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">Feedback</span>
            </Link>

            {isLoggedIn && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                <Shield className="w-4 h-4 text-[#A259FF]" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block" />

            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-white transition-all text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#A259FF] to-[#20C997] text-white px-5 py-2 rounded-xl font-bold text-sm hover:shadow-[0_4px_20px_rgba(162,89,255,0.3)] transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
