import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/admin");
      } else {
        await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
        setSuccess("Registration successful! Please login.");
        setIsLogin(true);
        setPassword("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="card shadow-2xl shadow-black/50 border-white/10 p-8 sm:p-10">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ rotate: -10 }} animate={{ rotate: 0 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 mb-6"
            >
              <ShieldCheck className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-textSecondary">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-textSecondary text-sm mt-2">
              {isLogin ? "Authenticate to access the dashboard" : "Join the engineering network"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  className="relative"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field pl-12"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-12"
                required
              />
            </div>

            {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#EF4444] text-sm text-center bg-[#EF4444]/10 p-3 rounded-lg border border-[#EF4444]/20">{error}</motion.div>}
            {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-secondary text-sm text-center bg-secondary/10 p-3 rounded-lg border border-secondary/20">{success}</motion.div>}

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 group mt-2">
              <span>{isLogin ? "Secure Login" : "Register Now"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-textSecondary text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
                className="text-secondary font-semibold hover:text-primary transition-colors"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;