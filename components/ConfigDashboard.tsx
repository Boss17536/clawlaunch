"use client";

import { motion } from "framer-motion";
import { Bot, Linkedin, Twitter, Clock, Key, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useClickSound } from "./SoundEffect";
import MinimalisticClock from "./MinimalisticClock";

export default function ConfigDashboard() {
  const [botName, setBotName] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [interval, setInterval] = useState(24);
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const { playClick, playSuccess } = useClickSound();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };
  
  const togglePlatform = (platform: string) => {
    playClick();
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Configure Your Bot</h2>
        <p className="text-white/60">Set up your automation in seconds</p>
      </motion.div>
      
      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Card 1: Identity */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="glass glass-hover rounded-2xl p-6 transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-electric" />
            </div>
            <h3 className="text-lg font-semibold">Bot Identity</h3>
          </div>
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter your bot name..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/20 transition-all duration-200"
          />
        </motion.div>
        
        {/* Card 2: Platforms */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="glass glass-hover rounded-2xl p-6 transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-cyber/20 flex items-center justify-center">
              <Twitter className="w-5 h-5 text-cyber" />
            </div>
            <h3 className="text-lg font-semibold">Platforms</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePlatform("linkedin")}
              className={`relative overflow-hidden rounded-lg p-4 border-2 transition-all duration-200 ${
                selectedPlatforms.includes("linkedin")
                  ? "border-[#0077b5] bg-[#0077b5]/10 shadow-[0_0_20px_-5px_rgba(0,119,181,0.5)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <Linkedin className={`w-6 h-6 mx-auto ${selectedPlatforms.includes("linkedin") ? "text-[#0077b5]" : "text-white/50"}`} />
              <p className="text-sm mt-2 font-medium">LinkedIn</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePlatform("x")}
              className={`relative overflow-hidden rounded-lg p-4 border-2 transition-all duration-200 ${
                selectedPlatforms.includes("x")
                  ? "border-white bg-white/10 shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <Twitter className={`w-6 h-6 mx-auto ${selectedPlatforms.includes("x") ? "text-white" : "text-white/50"}`} />
              <p className="text-sm mt-2 font-medium">𝕏</p>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Card 3: Schedule - MINIMALISTIC CLOCK */}
        <motion.div
          variants={cardVariants}
          className="glass glass-hover rounded-2xl p-6 transition-all duration-200 md:col-span-2"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-electric" />
            </div>
            <h3 className="text-lg font-semibold">Post Interval</h3>
          </div>
          <MinimalisticClock value={interval} onChange={setInterval} />
        </motion.div>
        
        {/* Card 4: API Key */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="glass glass-hover rounded-2xl p-6 transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-cyber/20 flex items-center justify-center">
              <Key className="w-5 h-5 text-cyber" />
            </div>
            <h3 className="text-lg font-semibold">API Key</h3>
          </div>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 outline-none focus:border-cyber/50 focus:ring-2 focus:ring-cyber/20 transition-all duration-200 font-mono text-sm"
            />
            <button
              onClick={() => {
                playClick();
                setShowApiKey(!showApiKey);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Launch Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playSuccess}
          className="px-8 py-4 bg-gradient-to-r from-electric to-cyber rounded-xl font-semibold text-lg glow-green hover:glow-purple transition-all duration-300"
        >
          Launch Configuration
        </motion.button>
      </motion.div>
    </div>
  );
}
