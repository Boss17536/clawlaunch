"use client";

import { ArrowRight, LayoutGrid, Star, Terminal } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showCommand, setShowCommand] = useState(false);

  const handleSaveConfiguration = () => {
    if (selectedPlatform) {
      setShowCommand(true);
    }
  };

  const reviews = [
    {
      name: "Sarah Mitchell",
      role: "Marketing Director",
      content: "ClawLaunch transformed our social media workflow. The automation is seamless and saves us hours every week!",
      rating: 5,
      avatar: "SM"
    },
    {
      name: "David Chen",
      role: "Startup Founder",
      content: "Best automation tool I've used. Simple, powerful, and exactly what we needed to scale our outreach.",
      rating: 5,
      avatar: "DC"
    },
    {
      name: "Emily Rodriguez",
      role: "Content Creator",
      content: "The free plan alone is incredible. Upgraded to premium and never looked back. Highly recommend!",
      rating: 5,
      avatar: "ER"
    },
    {
      name: "Michael Zhang",
      role: "Growth Hacker",
      content: "Game changer for LinkedIn automation. Clean interface, reliable performance, and affordable pricing.",
      rating: 5,
      avatar: "MZ"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-24 pb-12 px-4 bg-void text-white selection:bg-electric selection:text-void">
      {/* Hero Section */}
      <div className="z-10 max-w-5xl w-full text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 mb-6">
          ClawLaunch
        </h1>
        <p className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-electric via-white to-cyber mb-4">
          The only Automation that works
        </p>
        <p className="text-xl text-white/80 mb-3">
          Posts Automatically in a click
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-electric/10 border border-electric/30">
          <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          <p className="text-sm font-medium text-electric">
            Set it up under 1 min
          </p>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="w-full max-w-2xl mb-12">
        <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-3 mb-6">
            <LayoutGrid className="w-6 h-6 text-electric" />
            <h2 className="text-2xl font-bold">Select Platform</h2>
          </div>
          
          <div className="grid gap-4">
            <motion.button
              onClick={() => setSelectedPlatform("linkedin")}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.03, y: -2 }}
              animate={selectedPlatform === "linkedin" ? { 
                scale: [1, 1.1, 0.98, 1.02, 1],
              } : { scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 400, damping: 15 }}
              className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between group/btn cursor-pointer ${
                selectedPlatform === "linkedin" 
                  ? "border-electric bg-electric/20 shadow-2xl shadow-electric/40" 
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-electric/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={selectedPlatform === "linkedin" ? { 
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: [1, 1.2, 1]
                  } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 rounded bg-[#0077b5] flex items-center justify-center font-bold text-white"
                >
                  in
                </motion.div>
                <span className="font-medium">LinkedIn</span>
              </div>
              {selectedPlatform === "linkedin" && (
                <motion.div 
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: [0, 1.5, 1], rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-3 h-3 rounded-full bg-electric shadow-lg shadow-electric/50" 
                />
              )}
            </motion.button>

            <motion.button
              onClick={() => setSelectedPlatform("x")}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.03, y: -2 }}
              animate={selectedPlatform === "x" ? { 
                scale: [1, 1.1, 0.98, 1.02, 1],
              } : { scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 400, damping: 15 }}
              className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between group/btn cursor-pointer ${
                selectedPlatform === "x" 
                  ? "border-electric bg-electric/20 shadow-2xl shadow-electric/40" 
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-electric/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={selectedPlatform === "x" ? { 
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: [1, 1.2, 1]
                  } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 rounded bg-black flex items-center justify-center font-bold text-white border border-white/20"
                >
                  X
                </motion.div>
                <span className="font-medium">X.com</span>
              </div>
              {selectedPlatform === "x" && (
                <motion.div 
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: [0, 1.5, 1], rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-3 h-3 rounded-full bg-electric shadow-lg shadow-electric/50" 
                />
              )}
            </motion.button>
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleSaveConfiguration}
              disabled={!selectedPlatform}
              className="px-8 py-3 bg-electric hover:bg-electric/90 disabled:bg-white/10 disabled:text-white/40 disabled:cursor-not-allowed text-void font-semibold rounded-lg transition-all"
            >
              Save Configuration
            </button>
          </div>
        </div>

        {/* Command Line Output */}
        {showCommand && (
          <div className="mt-6 glass-card p-6 rounded-2xl border border-electric/30 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-electric" />
              <h3 className="text-lg font-bold">Command</h3>
            </div>
            <div className="bg-black/50 rounded-lg p-4 border border-white/10">
              <code className="text-electric text-sm font-mono">
                npm install clawlaunch-cli && clawlaunch init --platform={selectedPlatform}
              </code>
            </div>
            <p className="mt-3 text-xs text-white/40">
              Copy and run this command in your terminal to get started
            </p>
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="w-full max-w-6xl mt-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-white/60">Join thousands of satisfied users automating their workflows</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-electric/30 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric to-cyber flex items-center justify-center font-bold text-sm">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-xs text-white/60">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-electric text-electric" />
                ))}
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                &ldquo;{review.content}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
