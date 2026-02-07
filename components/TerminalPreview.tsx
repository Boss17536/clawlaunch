"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function TerminalPreview() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="glass rounded-2xl overflow-hidden border-2"
      >
        {/* Terminal header */}
        <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Terminal className="w-4 h-4 text-white/50" />
            <span className="text-sm text-white/50 font-mono">config-preview.sh</span>
          </div>
        </div>
        
        {/* Terminal content */}
        <div className="p-6 font-mono text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-electric">$</span>
              <span className="text-white/70">clawlaunch init</span>
            </div>
            
            <div className="pl-4 space-y-1 text-white/50">
              <p>🚀 Initializing ClawLaunch...</p>
              <p>📦 Loading configuration...</p>
              <p>🔧 Setting up automation engine...</p>
            </div>
            
            <div className="flex items-start gap-2 mt-4">
              <span className="text-cyber">›</span>
              <span className="text-white/70">
                waiting for configuration
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "steps(1)",
                  }}
                  className="inline-block ml-1"
                >
                  |
                </motion.span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
