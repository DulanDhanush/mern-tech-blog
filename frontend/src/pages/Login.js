import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        const res = await axios.post(`${API_URL}/api/auth/login`, {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/admin");
      } else {
        await axios.post(`${API_URL}/api/auth/register`, {
          username,
          email,
          password,
        });
        setSuccess("Registration successful! Please login.");
        setIsLogin(true);
        setPassword("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="card">
        <h1 className="text-3xl font-bold text-center text-[#A259FF] mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          {error && (
            <div className="text-[#EF4444] text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-[#10B981] text-sm text-center">{success}</div>
          )}
          <button type="submit" className="btn-primary w-full">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-center text-[#94A3B8] mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
            }}
            className="text-[#20C997] hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
