"use client";

import Link from "next/link";
import { ArrowRight, Lock, Key, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handlePlatformClick = (platform: string) => {
    // Both platforms redirect to pricing as per request
    router.push("/pricing");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-24 pb-12 px-4 bg-void text-white selection:bg-electric selection:text-void">
      {/* Hero Section */}
      <div className="z-10 max-w-5xl w-full text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 mb-6">
          ClawLaunch
        </h1>
        <p className="text-xl text-white/60">
          The Elite Open-Source Command Center
        </p>
      </div>

      <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
        {/* Platforms Section */}
        <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-3 mb-6">
            <LayoutGrid className="w-6 h-6 text-electric" />
            <h2 className="text-2xl font-bold">Select Platform</h2>
          </div>
          
          <div className="grid gap-4">
            <button
              onClick={() => handlePlatformClick("linkedin")}
              className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-electric/30 transition-all flex items-center justify-between group/btn"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#0077b5] flex items-center justify-center font-bold text-white">in</div>
                <span className="font-medium">LinkedIn</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover/btn:text-electric transition-colors" />
            </button>

            <button
              onClick={() => handlePlatformClick("x")}
              className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-electric/30 transition-all flex items-center justify-between group/btn"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-black flex items-center justify-center font-bold text-white border border-white/20">X</div>
                <span className="font-medium">X.com</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover/btn:text-electric transition-colors" />
            </button>
          </div>
          
          <p className="mt-4 text-xs text-white/40 text-center">
            Select a platform to configure automation
          </p>
        </div>

        {/* API Keys Section */}
        <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6 text-cyber" />
            <h2 className="text-2xl font-bold">API Configuration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">ClawLaunch License Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="CL-XXXXXXXXXXXXXXXX"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyber/50 transition-colors"
                />
                <Lock className="w-4 h-4 text-white/20 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">OpenAI API Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="sk-..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyber/50 transition-colors"
                />
                <Lock className="w-4 h-4 text-white/20 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
