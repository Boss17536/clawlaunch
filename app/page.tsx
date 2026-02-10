"use client";

import { ArrowRight, LayoutGrid, Star, Terminal, Check, Copy, Zap, Crown, Users, MessageCircle, Mail, Sparkles, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showCommand, setShowCommand] = useState(false);
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState("");
  const fullText = "The only Automation that works";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  const handleSaveConfiguration = () => {
    if (selectedPlatform) {
      setShowCommand(true);
    }
  };

  const copyCommand = () => {
    const command = `npx -y github:Boss17536/clawlaunch init --platform=${selectedPlatform}`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <main className="flex min-h-screen flex-col items-center justify-start pt-32 pb-20 px-4 bg-void text-white selection:bg-electric selection:text-void overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-electric/20 rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyber/10 rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-5xl w-full text-center mb-20 relative"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
          </span>
          <p className="text-xs font-medium text-electric/90 tracking-wide uppercase">
            v2.0 Now Available
          </p>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 mb-8 drop-shadow-lg">
          ClawLaunch
        </h1>
        
        <div className="h-20 mb-6">
          <p className="text-3xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-electric via-white to-cyber">
            {text}<span className="animate-blink">|</span>
          </p>
        </div>

        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate CLI tool for automating your social presence. 
          Post to LinkedIn and X with a single command.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-white/40">
           <span className="flex items-center gap-2">
             <Check className="w-4 h-4 text-electric" /> No API Keys Needed
           </span>
           <span className="flex items-center gap-2">
             <Check className="w-4 h-4 text-electric" /> Open Source
           </span>
           <span className="flex items-center gap-2">
             <Check className="w-4 h-4 text-electric" /> AI Powered
           </span>
        </div>
      </motion.div>

      {/* Platform Selection */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl mb-24 z-10"
      >
        <div className="glass-card p-1 bg-gradient-to-b from-white/10 to-white/5 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="bg-void/80 rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            {/* Overlay blocked clicks - fixed with pointer-events-none */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl font-bold mb-3">Configure Your Setup</h2>
              <p className="text-white/50">Select your target platform to generate your config</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10 relative z-10">
              <button
                onClick={() => setSelectedPlatform("linkedin")}
                className={`relative z-20 group p-6 rounded-2xl border transition-all duration-300 text-left hover:-translate-y-1 ${
                  selectedPlatform === "linkedin" 
                    ? "border-electric bg-electric/10 shadow-[0_0_30px_-5px_rgba(74,222,128,0.2)]" 
                    : "border-white/10 bg-white/5 hover:border-electric/50 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white transition-colors duration-300 ${
                    selectedPlatform === "linkedin" ? "bg-[#0077b5]" : "bg-white/10 group-hover:bg-[#0077b5]"
                  }`}>
                    in
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    selectedPlatform === "linkedin" ? "border-electric bg-electric" : "border-white/20"
                  }`}>
                    {selectedPlatform === "linkedin" && <Check className="w-3 h-3 text-void stroke-[4]" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">LinkedIn</h3>
                <p className="text-sm text-white/50">Automate posts, optimize engagement, and grow your network.</p>
              </button>

              <button
                onClick={() => setSelectedPlatform("x")}
                className={`relative z-20 group p-6 rounded-2xl border transition-all duration-300 text-left hover:-translate-y-1 ${
                  selectedPlatform === "x" 
                    ? "border-electric bg-electric/10 shadow-[0_0_30px_-5px_rgba(74,222,128,0.2)]" 
                    : "border-white/10 bg-white/5 hover:border-electric/50 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white transition-colors duration-300 ${
                    selectedPlatform === "x" ? "bg-black border border-white/20" : "bg-white/10 group-hover:bg-black"
                  }`}>
                    X
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    selectedPlatform === "x" ? "border-electric bg-electric" : "border-white/20"
                  }`}>
                    {selectedPlatform === "x" && <Check className="w-3 h-3 text-void stroke-[4]" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">X.com</h3>
                <p className="text-sm text-white/50">Schedule threads, auto-reply, and manage your presence.</p>
              </button>
            </div>

            <div className="flex justify-center relative z-20">
              <button 
                onClick={handleSaveConfiguration}
                disabled={!selectedPlatform}
                className="group relative px-8 py-4 bg-white text-void font-bold rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Generate Command <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-electric to-cyber opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
              </button>
            </div>
          
            {/* Command Line Output */}
            <AnimatePresence>
              {showCommand && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden relative z-10"
                >
                  <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="text-xs text-white/30 font-mono">bash</div>
                    </div>
                    <div className="p-6 relative group/terminal">
                      <code className="text-electric font-mono text-sm block">
                        <span className="text-cyber">~</span> $ npx -y github:Boss17536/clawlaunch init --platform={selectedPlatform}
                      </code>
                      <button 
                        onClick={copyCommand}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white/50 hover:bg-white/20 hover:text-white transition-all opacity-0 group-hover/terminal:opacity-100"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-electric" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-white/30">
                    Paste this into your terminal to analyze your repo and set up the CLI
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <div className="w-full max-w-7xl mt-24 z-10 px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-electric/20 to-cyber/20 border border-electric/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-electric" />
            <span className="text-sm font-semibold text-electric">Simple Pricing, Maximum Value</span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-electric to-cyber bg-clip-text text-transparent">
            Choose Your Growth Plan
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready to dominate social media 🚀
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Free Plan</h3>
                  <p className="text-white/40 text-sm">Perfect to get started</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-white/40">/forever</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">20 Posts per Month</p>
                    <p className="text-sm text-white/40">Enough to build consistency</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">1 Social Account</p>
                    <p className="text-sm text-white/40">LinkedIn or Twitter/X</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">AI-Generated Content</p>
                    <p className="text-sm text-white/40">Smart, engaging posts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Schedule Posts</p>
                    <p className="text-sm text-white/40">Set it and (almost) forget it</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold transition-all hover:scale-[1.02]">
                Get Started Free
              </button>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border-2 border-electric/50 hover:border-electric transition-all relative overflow-hidden group shadow-[0_0_50px_-10px_rgba(0,255,136,0.3)]"
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-electric to-cyber rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-electric to-cyber text-xs font-bold text-void">
              🔥 MOST POPULAR
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric to-cyber flex items-center justify-center">
                  <Crown className="w-6 h-6 text-void" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Pro Plan</h3>
                  <p className="text-white/40 text-sm">For serious growth hackers</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent">Custom</span>
                </div>
                <p className="text-white/40 text-sm mt-2">Let&apos;s discuss your needs</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Rocket className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Unlimited Posts</p>
                    <p className="text-sm text-white/40">Post as much as you want</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Unlimited Accounts</p>
                    <p className="text-sm text-white/40">Manage multiple brands</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">AI Image Generation</p>
                    <p className="text-sm text-white/40">Beautiful visuals included</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Priority Support</p>
                    <p className="text-sm text-white/40">We&apos;ve got your back</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Custom Features</p>
                    <p className="text-sm text-white/40">Built for your workflow</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href="https://wa.me/qr/S7LSJDGF4NFTC1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-electric to-cyber hover:shadow-[0_0_40px_-10px_rgba(0,255,136,0.5)] font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group/btn text-void"
                >
                  <MessageCircle className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                  Contact on WhatsApp
                </a>
                
                <a 
                  href="mailto:boss.927262@gmail.com"
                  className="w-full py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  boss.927262@gmail.com
                </a>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-electric/10 to-cyber/10 border border-electric/20">
                <p className="text-center text-sm">
                  <span className="font-bold text-electric">🎯 Limited slots available!</span>
                  <br />
                  <span className="text-white/60">Join the elite who automate their success</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-8 flex-wrap text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-electric" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-electric" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-electric" />
              <span>Setup in 2 Minutes</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <div className="w-full max-w-7xl mt-24 z-10">
        <div className="flex items-end justify-between mb-12 px-4">
          <div>
            <h2 className="text-4xl font-bold mb-2">Community Love</h2>
            <p className="text-white/50">Join 10,000+ developers automating their growth</p>
          </div>
          <div className="flex gap-1">
             {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-electric text-electric" />)}
             <span className="ml-2 text-sm font-bold">5.0/5</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-4">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-default group relative overflow-hidden"
            >
              {/* Added pointer-events-none here too */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-bold text-xs">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{review.name}</h4>
                  <p className="text-xs text-white/40">{review.role}</p>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors relative z-10">
                &quot;{review.content}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
