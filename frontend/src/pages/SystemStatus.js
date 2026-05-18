import React from "react";
import { motion } from "framer-motion";
import { Activity, Server, ShieldCheck, Database } from "lucide-react";

const SystemStatus = () => {
  return (
    <div className="min-h-screen text-white pt-10 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#A259FF] to-[#20C997]">
            System Status
          </h1>
          <p className="text-slate-400">
            Real-time overview of DulanBlogs infrastructure.
          </p>
        </div>

        {/* Main Status Card */}
        <div className="bg-[#0F172A]/80 border border-emerald-500/30 backdrop-blur-xl rounded-2xl p-8 mb-6 shadow-[0_0_30px_rgba(32,201,151,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Activity className="w-8 h-8 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold">All Systems Operational</h2>
              <p className="text-sm text-slate-400">Last updated: Just now</p>
            </div>
          </div>
          {/* Pulsing Green Dot */}
          <span className="relative flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500"></span>
          </span>
        </div>

        {/* Micro-Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0A0F1A]/50 border border-white/5 rounded-xl p-5 flex flex-col items-center text-center">
            <Server className="w-6 h-6 text-[#A259FF] mb-3" />
            <h3 className="font-semibold mb-1">Frontend (Vercel)</h3>
            <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1 rounded-full mt-2">
              100% Uptime
            </span>
          </div>
          <div className="bg-[#0A0F1A]/50 border border-white/5 rounded-xl p-5 flex flex-col items-center text-center">
            <Database className="w-6 h-6 text-orange-400 mb-3" />
            <h3 className="font-semibold mb-1">API Backend (Render)</h3>
            <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1 rounded-full mt-2">
              100% Uptime
            </span>
          </div>
          <div className="bg-[#0A0F1A]/50 border border-white/5 rounded-xl p-5 flex flex-col items-center text-center">
            <ShieldCheck className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-semibold mb-1">Database (Atlas)</h3>
            <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1 rounded-full mt-2">
              Secure
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemStatus;
