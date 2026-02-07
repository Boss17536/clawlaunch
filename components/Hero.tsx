"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const headline = "Automate Your Growth.";
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };
  
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };
  
  return (
    <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20 pb-12">
      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="glass glass-hover inline-flex items-center gap-2 px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-electric" />
          <span className="text-sm text-white/70">Open Source • AI-Powered</span>
        </div>
      </motion.div>
      
      {/* Animated headline */}
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight"
      >
        {headline.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={child}
            className={char === " " ? "inline-block w-4" : "inline-block"}
            style={{
              background: index > headline.length / 2 
                ? "linear-gradient(135deg, #4ade80 0%, #c084fc 100%)"
                : "white",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
      
      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-xl md:text-2xl text-white/60 text-center max-w-2xl"
      >
        The open-source command center for <span className="text-[#0077b5] font-semibold">LinkedIn</span> & <span className="text-white font-semibold">𝕏</span>
      </motion.p>
      
      {/* Floating 3D card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
        className="mt-12"
      >
        <FloatingCard />
      </motion.div>
    </div>
  );
}

function FloatingCard() {
  return (
    <motion.div
      className="glass rounded-2xl p-8 border-2 relative overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-transparent to-cyber/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric to-cyber flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">ClawLaunch</h3>
          <p className="text-sm text-white/50">Configuration Ready</p>
        </div>
      </div>
    </motion.div>
  );
}
