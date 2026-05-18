import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: null, text: "" });
  const [isSending, setIsSending] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: null, text: "" });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("access_key", "9358241a-4e5e-46a0-8f83-6fe65930a420");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          text: "Transmission encrypted & dispatched successfully!",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({
          type: "error",
          text: data.message || "Endpoint connection failed.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        text: "Network anomaly detected. Please re-verify interface link.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto py-12 px-2 relative z-10">
      {/* LEFT COLUMN: INTERACTIVE PROFESSIONAL NODE (5 Cols) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="lg:col-span-5 flex"
      >
        <div className="card w-full flex flex-col justify-between p-8 relative overflow-hidden group border-white/5 bg-card/40 backdrop-blur-2xl">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-secondary/20 transition-colors duration-700" />

          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 text-primary">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                Developer Profile
              </span>
            </div>

            <div>
              <h2 className="text-4xl font-black tracking-tight text-white mb-2">
                Dulan Dhanush
              </h2>
              <p className="text-textSecondary font-light leading-relaxed">
                Full-stack software architect specializing in highly reactive
                digital interfaces and clean distributed storage patterns.
              </p>
            </div>
          </div>

          {/* Fully Functional Digital Interconnect Anchors */}
          <div className="space-y-4 mt-12 relative z-10">
            <motion.a
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              href="https://dulandhanush.github.io/portfolio-website/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-dark/40 border border-white/5 hover:border-secondary/40 hover:bg-dark/80 transition-all group/link"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-secondary group-hover/link:rotate-12 transition-transform" />
                <span className="text-sm font-semibold text-textPrimary">
                  Digital Portfolio
                </span>
              </div>
              <span className="text-xs text-textSecondary group-hover/link:text-secondary font-mono">
                dulandhanush.github.io →
              </span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              href="https://lk.linkedin.com/in/dulan-dhanush-b76a44300"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-dark/40 border border-white/5 hover:border-primary/40 hover:bg-dark/80 transition-all group/link"
            >
              <div className="flex items-center gap-3">
                {/* 100% Fail-Safe Raw SVG Custom LinkedIn Icon to bypass library mismatches */}
                <svg
                  className="w-5 h-5 text-primary group-hover/link:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="text-sm font-semibold text-textPrimary">
                  LinkedIn Gateway
                </span>
              </div>
              <span className="text-xs text-textSecondary group-hover/link:text-primary font-mono">
                Connect Context →
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* RIGHT COLUMN: DIRECT TRANSMISSION PORTAL (7 Cols) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="lg:col-span-7"
      >
        <div className="card shadow-2xl border-white/10 p-8 sm:p-10 relative overflow-hidden bg-card/60 backdrop-blur-2xl">
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-primary via-secondary to-primary" />

          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-white">
              Direct Feed Communications
            </h1>
            <p className="text-textSecondary text-sm mt-1">
              Submit your data logs below to deliver an instant system alert
              transmission directly to my endpoint.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-[18px] w-5 h-5 text-textSecondary" />
              <input
                type="text"
                placeholder="Identification Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-12"
                required
                disabled={isSending}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-[18px] w-5 h-5 text-textSecondary" />
              <input
                type="email"
                placeholder="Return Mail Route Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-12"
                required
                disabled={isSending}
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-textSecondary" />
              <textarea
                placeholder="Type your core transmission message here..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field pl-12 pt-4 resize-none min-h-[140px]"
                required
                disabled={isSending}
              />
            </div>

            {/* Dynamic Real-Time Async Notification Banners */}
            <AnimatePresence mode="wait">
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className={`flex items-start gap-3 p-4 rounded-xl text-sm font-medium border ${
                    status.type === "success"
                      ? "bg-secondary/10 border-secondary/20 text-secondary"
                      : "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{status.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: isSending ? 1 : 1.01 }}
              whileTap={{ scale: isSending ? 1 : 0.99 }}
              type="submit"
              disabled={isSending}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 group relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>
                {isSending ? "Processing Packet..." : "Dispatch Secure Message"}
              </span>
              {!isSending && (
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Feedback;
