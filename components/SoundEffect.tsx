"use client";

import { useEffect, useRef } from "react";

// Pleasant click sound using Web Audio API (no external files needed!)
export function useClickSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playClick = () => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Pleasant "click" sound - soft and premium
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, context.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  const playSuccess = () => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    
    // Two-tone success sound
    [523.25, 659.25].forEach((freq, i) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.setValueAtTime(freq, context.currentTime + i * 0.1);
      gainNode.gain.setValueAtTime(0.08, context.currentTime + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + i * 0.1 + 0.15);

      oscillator.start(context.currentTime + i * 0.1);
      oscillator.stop(context.currentTime + i * 0.1 + 0.15);
    });
  };

  return { playClick, playSuccess };
}

export default function SoundEffect() {
  return null;
}
