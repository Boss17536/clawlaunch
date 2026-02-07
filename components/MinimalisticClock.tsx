"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useClickSound } from "./SoundEffect";

interface ClockProps {
  value: number;
  onChange: (value: number) => void;
}

export default function MinimalisticClock({ value, onChange }: ClockProps) {
  const { playClick } = useClickSound();
  const [isHovering, setIsHovering] = useState(false);
  
  // Clock options: 12h, 24h, 48h
  const options = [
    { hours: 12, label: "12h", angle: 0 },
    { hours: 24, label: "24h", angle: 120 },
    { hours: 48, label: "48h", angle: 240 },
  ];
  
  const currentIndex = options.findIndex(opt => opt.hours === value);
  const currentAngle = options[currentIndex]?.angle || 0;
  
  const handleSelect = (hours: number) => {
    playClick();
    onChange(hours);
  };
  
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Clock Circle */}
      <motion.div
        className="relative w-48 h-48"
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovering
              ? "0 0 40px -10px rgba(74,222,128,0.4)"
              : "0 0 20px -10px rgba(74,222,128,0.2)",
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-electric rounded-full z-10" />
        
        {/* Clock hand */}
        <motion.div
          className="absolute top-1/2 left-1/2 origin-left"
          style={{ width: "70px", height: "2px" }}
          animate={{ rotate: currentAngle - 90 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <div className="h-full bg-gradient-to-r from-electric to-transparent rounded-full" />
          <motion.div
            className="absolute right-0 top-1/2 w-4 h-4 -translate-y-1/2 bg-electric rounded-full"
            animate={{
              scale: isHovering ? 1.2 : 1,
            }}
          />
        </motion.div>
        
        {/* Hour markers */}
        {options.map((option, index) => {
          const angle = option.angle;
          const radian = (angle - 90) * (Math.PI / 180);
          const x = Math.cos(radian) * 80;
          const y = Math.sin(radian) * 80;
          const isActive = value === option.hours;
          
          return (
            <motion.button
              key={option.hours}
              onClick={() => handleSelect(option.hours)}
              className="absolute top-1/2 left-1/2 group cursor-pointer"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  isActive
                    ? "bg-electric text-void scale-110"
                    : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
              >
                {option.label}
              </motion.div>
              
              {/* Active indicator pulse */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-electric/30"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
      
      {/* Current selection display */}
      <motion.div
        className="text-center"
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-sm text-white/50 mb-1">Post every</div>
        <div className="text-3xl font-bold text-gradient">{value} hours</div>
      </motion.div>
    </div>
  );
}
