import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  FileText,
  Lock,
  Scale,
  UserCheck,
  Database,
} from "lucide-react";

const Legal = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div className="min-h-screen text-white pt-10 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center p-3 bg-primary/10 border border-primary/20 rounded-2xl mb-4"
          >
            <Scale className="w-8 h-8 text-[#A259FF]" />
          </motion.div>
          <h1 className="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#A259FF] to-[#20C997]">
            Legal & Compliance
          </h1>
          <p className="text-slate-400">
            Transparent policies for the DulanBlogs ecosystem.
          </p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex p-1 bg-[#0A0F1A]/80 border border-white/10 rounded-2xl mb-8 max-w-md mx-auto backdrop-blur-md">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === "privacy"
                ? "bg-gradient-to-r from-[#A259FF] to-[#20C997] text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Lock className="w-4 h-4" /> Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === "terms"
                ? "bg-gradient-to-r from-[#A259FF] to-[#20C997] text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4" /> Terms of Service
          </button>
        </div>

        {/* Legal Content Container */}
        <div className="bg-[#0F172A]/80 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {/* ================= PRIVACY POLICY TAB ================= */}
            {activeTab === "privacy" && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="prose prose-invert max-w-none"
              >
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <Lock className="w-6 h-6 text-[#20C997]" />
                  <h2 className="text-2xl font-bold m-0 text-white">
                    Privacy Policy
                  </h2>
                  <span className="ml-auto text-xs font-medium text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                    Last Updated: {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-8 text-slate-300 leading-relaxed">
                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Database className="w-5 h-5 text-[#A259FF]" /> 1. Data
                      Collection
                    </h3>
                    <p>
                      When you register an administrative or user account on
                      DulanBlogs, we securely collect and store your{" "}
                      <strong>Username</strong>, <strong>Email Address</strong>,
                      and a cryptographically hashed version of your{" "}
                      <strong>Password</strong> using Bcrypt infrastructure. We
                      do not store plain-text passwords.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-orange-400" /> 2.
                      Cookies & Sessions
                    </h3>
                    <p>
                      We do not use tracking cookies for advertising. Our
                      application utilizes{" "}
                      <strong>JSON Web Tokens (JWT)</strong> stored safely in
                      your browser's local storage strictly for maintaining
                      active login sessions and verifying administrative
                      clearance.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-[#20C997]" /> 3.
                      Third-Party Infrastructure
                    </h3>
                    <p>
                      To ensure global speed and security, our platform utilizes
                      trusted enterprise partners. Your data is routed and
                      stored through:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                      <li>
                        <strong>MongoDB Atlas:</strong> Secure cloud database
                        storage.
                      </li>
                      <li>
                        <strong>Render & Vercel:</strong> Encrypted web hosting
                        and API routing.
                      </li>
                    </ul>
                    <p className="mt-2">
                      We will <strong>never</strong> sell, rent, or distribute
                      your personal email or profile data to unauthorized third
                      parties.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}

            {/* ================= TERMS OF SERVICE TAB ================= */}
            {activeTab === "terms" && (
              <motion.div
                key="terms"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="prose prose-invert max-w-none"
              >
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <FileText className="w-6 h-6 text-[#A259FF]" />
                  <h2 className="text-2xl font-bold m-0 text-white">
                    Terms of Service
                  </h2>
                  <span className="ml-auto text-xs font-medium text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                    Last Updated: {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-8 text-slate-300 leading-relaxed">
                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      1. Platform Usage
                    </h3>
                    <p>
                      By accessing DulanBlogs, you agree to interact with the
                      system responsibly. Attempting to bypass the JWT
                      authentication middleware, inject malicious payloads, or
                      overload the API gateways hosted on Render is strictly
                      prohibited.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      2. Content Ownership & Rights
                    </h3>
                    <p>
                      All technology articles, structural UI designs, and
                      codebase mechanics displayed on DulanBlogs are the
                      intellectual property of the administrator. You may not
                      scrape, clone, or redistribute the proprietary content
                      without explicit permission.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      3. Account Termination
                    </h3>
                    <p>
                      We reserve the right to revoke administrative or user
                      privileges, delete accounts, and scrub database records at
                      our discretion, particularly in cases of spam, abusive
                      behavior, or network exploitation attempts.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      4. Limitation of Liability
                    </h3>
                    <p>
                      The tech tutorials and code snippets provided on this blog
                      are for educational purposes. DulanBlogs and its creator
                      are not liable for any system crashes, data loss, or
                      server anomalies that occur from implementing the code
                      demonstrated on this platform.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Legal;
