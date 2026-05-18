import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Shield,
  LogOut,
  LogIn,
  Sparkles,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track route changes

  // Synchronize state with localStorage whenever the route changes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pt-6 px-4 mb-4 sticky top-0 z-50 pointer-events-none"
    >
      <nav className="container mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] pointer-events-auto transition-all duration-300 overflow-hidden">
        {/* TOP BAR */}
        <div className="px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="p-1.5 rounded-lg bg-primary/10 border border-primary/20"
            >
              <Sparkles className="text-[#A259FF] w-5 h-5" />
            </motion.div>
            <span className="text-2xl font-black bg-gradient-to-r from-[#A259FF] to-[#20C997] bg-clip-text text-transparent tracking-tight group-hover:opacity-80 transition-opacity">
              DulanBlogs.
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-2 bg-[#0A0F1A]/40 px-3 py-1.5 rounded-xl border border-white/5">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              <Home className="w-4 h-4 text-[#20C997]" />
              <span>Home</span>
            </Link>

            <Link
              to="/feedback"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Feedback</span>
            </Link>

            {isLoggedIn && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                <Shield className="w-4 h-4 text-[#A259FF]" />
                <span>Admin</span>
              </Link>
            )}

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-white transition-all text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
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

          {/* MOBILE MENU TRIGGER */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#94A3B8] hover:text-white focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#EF4444]" />
              ) : (
                <Menu className="w-6 h-6 text-[#20C997]" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN LIST */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-white/10 bg-[#0A0F1A]/50"
            >
              <div className="flex flex-col px-6 py-4 space-y-3">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-base font-medium"
                >
                  <Home className="w-5 h-5 text-[#20C997]" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/feedback"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-base font-medium"
                >
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                  <span>Feedback</span>
                </Link>

                {isLoggedIn && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all text-base font-medium"
                  >
                    <Shield className="w-5 h-5 text-[#A259FF]" />
                    <span>Admin Control Center</span>
                  </Link>
                )}

                <div className="h-[1px] w-full bg-white/10 my-2" />

                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/10 transition-all text-base font-semibold w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Secure Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#A259FF] to-[#20C997] text-white px-4 py-3.5 rounded-xl font-bold text-base hover:shadow-[0_4px_20px_rgba(162,89,255,0.3)] transition-all mt-2"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login to Account</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
};

export default Navbar;
