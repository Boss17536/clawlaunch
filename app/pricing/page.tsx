"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Sparkles, Crown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";


export default function PricingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-electric" />
              <span className="text-sm text-white/70">Want Premium Features?</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Let&apos;s Talk <span className="text-gradient">Growth</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Get in touch for premium features, support, or any questions you have!
            </p>
          </div>
        </ScrollReveal>
        
        {/* Contact Card */}
        <ScrollReveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto glass rounded-3xl p-10 border-2 border-electric/50 hover:border-electric transition-all relative overflow-hidden group shadow-[0_0_50px_-10px_rgba(0,255,136,0.3)]"
          >
            {/* Glow Effect */}
            <div className="absolute -top-4 -right-4 w-40 h-40 bg-gradient-to-br from-electric to-cyber rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-electric to-cyber flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-void" />
                </div>
                <h3 className="text-4xl font-bold mb-4">Contact Us</h3>
                <p className="text-white/60 text-lg">
                  Get in touch for premium features, support, or any questions!
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <a 
                  href="https://wa.me/qr/S7LSJDGF4NFTC1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 px-8 rounded-xl bg-gradient-to-r from-electric to-cyber hover:shadow-[0_0_50px_-10px_rgba(0,255,136,0.6)] font-bold text-lg transition-all hover:scale-[1.03] flex items-center justify-center gap-3 group/btn text-void"
                >
                  <MessageCircle className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
                  Message on WhatsApp
                </a>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-void text-white/40">or email me</span>
                  </div>
                </div>

                <a 
                  href="mailto:boss.927262@gmail.com"
                  className="w-full py-4 px-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold transition-all hover:scale-[1.03] flex items-center justify-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  boss.927262@gmail.com
                </a>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-r from-electric/10 to-cyber/10 border border-electric/20">
                <p className="text-center">
                  <span className="block font-bold text-electric text-lg mb-1">🎯 Limited Spots Available!</span>
                  <span className="text-white/70 text-sm">Join the elite who are automating their social media success</span>
                </p>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  );
}
