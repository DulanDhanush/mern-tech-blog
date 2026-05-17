import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
