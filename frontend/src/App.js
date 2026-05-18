import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import SystemStatus from "./pages/SystemStatus";
import Legal from "./pages/Legal";

// Cinematic Route Transitions Component
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// Scroll Restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// The Animated Router
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PageWrapper>
              <BlogPost />
            </PageWrapper>
          }
        />
        <Route
          path="/admin"
          element={
            <PageWrapper>
              <Admin />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/feedback"
          element={
            <PageWrapper>
              <Feedback />
            </PageWrapper>
          }
        />
        <Route
          path="/status"
          element={
            <PageWrapper>
              <SystemStatus />
            </PageWrapper>
          }
        />
        <Route
          path="/legal"
          element={
            <PageWrapper>
              <Legal />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// The Main App Container
function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* THE AMBIENT ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0F1A]">
        {/* Breathing Primary Orb */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#A259FF] rounded-full mix-blend-screen filter blur-[140px] opacity-20"
        />

        {/* Breathing Secondary Orb */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] bg-[#20C997] rounded-full mix-blend-screen filter blur-[140px] opacity-15"
        />

        {/* Premium Matte Noise Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen selection:bg-primary/30 selection:text-white">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl flex flex-col">
          <AnimatedRoutes />
        </main>

        {/* Minimalist Global Footer */}
        <footer className="border-t border-white/5 py-8 mt-auto backdrop-blur-md bg-dark/30">
          <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm font-medium">
              © {new Date().getFullYear()} DulanBlog. Engineered for the future.
            </p>
            <div className="flex items-center gap-6 text-sm font-semibold text-slate-400">
              <Link
                to="/legal"
                className="hover:text-[#A259FF] transition-colors cursor-pointer"
              >
                Privacy
              </Link>
              <Link
                to="/legal"
                className="hover:text-[#A259FF] transition-colors cursor-pointer"
              >
                Terms
              </Link>
              <Link
                to="/status"
                className="hover:text-[#20C997] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Status
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
