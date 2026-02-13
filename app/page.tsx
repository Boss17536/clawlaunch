"use client";

import { ArrowRight, LayoutGrid, Star, Terminal, Check, Copy, Zap, Crown, Users, MessageCircle, Mail, Sparkles, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logButtonClick, logConversion } from "@/lib/firebase";

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
      // Track configuration save event
      logButtonClick('save_configuration', 'hero_section');
      logConversion('configuration_created', 1);
    }
  };

  const copyCommand = () => {
    const command = `npm install -g clawlaunch-cli && clawlaunch init --platform=${selectedPlatform}`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Track command copy event
    logButtonClick('copy_install_command', 'hero_section');
    logConversion('install_command_copied', 1);
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
            
            {/* CLI Commands Help Guide */}
            <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-electric/5 to-cyber/5 border border-electric/20 relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-electric" />
                Available Commands
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-3">
                  <code className="px-2 py-1 rounded bg-white/10 text-electric font-mono text-xs">clawlaunch init</code>
                  <span className="text-white/60">Setup wizard</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="px-2 py-1 rounded bg-white/10 text-electric font-mono text-xs">clawlaunch start</code>
                  <span className="text-white/60">Start scheduler</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="px-2 py-1 rounded bg-white/10 text-electric font-mono text-xs">clawlaunch test</code>
                  <span className="text-white/60">Test a post now</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="px-2 py-1 rounded bg-white/10 text-electric font-mono text-xs">clawlaunch status</code>
                  <span className="text-white/60">View config & limits</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="px-2 py-1 rounded bg-white/10 text-electric font-mono text-xs">clawlaunch help</code>
                  <span className="text-white/60">Show all commands</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="px-2 py-1 rounded bg-white/10 text-electric font-mono text-xs">clawlaunch daemon</code>
                  <span className="text-white/60">Run in background</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10 relative z-10">
              <button
                onClick={() => {
                  setSelectedPlatform("linkedin");
                  logButtonClick('select_platform_linkedin', 'platform_selection');
                }}
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
                onClick={() => {
                  setSelectedPlatform("x");
                  logButtonClick('select_platform_x', 'platform_selection');
                }}
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
                        <span className="text-cyber">~</span> $ npm install -g clawlaunch-cli
                      </code>
                      <code className="text-electric font-mono text-sm block mt-2">
                        <span className="text-cyber">~</span> $ clawlaunch init --platform={selectedPlatform}
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
                    Install once, use everywhere. Simple & fast setup!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Free vs Paid Comparison */}
      <div className="w-full max-w-7xl mt-32 z-10 px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-electric/20 to-cyber/20 border border-electric/30 mb-6"
          >
            <Zap className="w-4 h-4 text-electric" />
            <span className="text-sm font-semibold text-electric">Choose What Works For You</span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-electric to-cyber bg-clip-text text-transparent">
            Free vs Premium
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Start for free, upgrade when you&apos;re ready to dominate 🚀
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
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Free</h3>
                  <p className="text-white/40 text-sm">Get started today</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">1 Post per Day</p>
                    <p className="text-sm text-white/40">10 posts per month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">1 Social Account</p>
                    <p className="text-sm text-white/40">LinkedIn OR Twitter/X</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">AI-Generated Posts</p>
                    <p className="text-sm text-white/40">Smart content that engages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">Scheduling System</p>
                    <p className="text-sm text-white/40">Automate your posting time</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-3xl font-bold mb-1">$0</p>
                <p className="text-white/40 text-sm">Forever Free</p>
              </div>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border-2 border-electric/50 hover:border-electric transition-all relative overflow-hidden group shadow-[0_0_50px_-10px_rgba(0,255,136,0.3)]"
          >
            {/* Premium Badge */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-electric to-cyber rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-electric to-cyber text-xs font-bold text-void">
              ⚡ PREMIUM
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric to-cyber flex items-center justify-center">
                  <Crown className="w-7 h-7 text-void" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent">Premium</h3>
                  <p className="text-white/40 text-sm">Unlock full power</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Rocket className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">Unlimited Posts</p>
                    <p className="text-sm text-white/40">Post as much as you want!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">Unlimited Accounts</p>
                    <p className="text-sm text-white/40">LinkedIn AND Twitter/X + more</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">AI Image Generation</p>
                    <p className="text-sm text-white/40">Eye-catching visuals included</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">Priority Support</p>
                    <p className="text-sm text-white/40">Get help when you need it</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">Advanced Analytics</p>
                    <p className="text-sm text-white/40">Track your growth in real-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">Custom Features</p>
                    <p className="text-sm text-white/40">Built for your workflow</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-electric/20 to-cyber/20 border border-electric/30 text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent mb-1">Contact for Pricing</p>
                <p className="text-white/60 text-sm">Negotiate the best deal for your needs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-7xl mt-24 z-10 px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-electric/20 to-cyber/20 border border-electric/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-electric" />
            <span className="text-sm font-semibold text-electric">Want Premium Features?</span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-electric to-cyber bg-clip-text text-transparent">
            Ready to Upgrade?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Contact us to unlock unlimited posts, multiple accounts, and premium features 🚀
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-card p-10 rounded-3xl border-2 border-electric/50 hover:border-electric transition-all relative overflow-hidden group shadow-[0_0_50px_-10px_rgba(0,255,136,0.3)]"
        >
          {/* Glow Effect */}
          <div className="absolute -top-4 -right-4 w-40 h-40 bg-gradient-to-br from-electric to-cyber rounded-full blur-3xl opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-electric to-cyber flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-void" />
              </div>
              <h3 className="text-4xl font-bold mb-4">Get Your Pro License</h3>
              <p className="text-white/60 text-lg">
                Contact us to discuss pricing and get your premium license today!
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <a 
                href="https://wa.me/917982664789?text=Hi%2C%20I%27m%20interested%20in%20ClawLaunch%20Pro!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 px-8 rounded-xl bg-gradient-to-r from-electric to-cyber hover:shadow-[0_0_50px_-10px_rgba(0,255,136,0.6)] font-bold text-lg transition-all hover:scale-[1.03] flex items-center justify-center gap-3 group/btn text-void"
              >
                <MessageCircle className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
                Contact on WhatsApp
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
                <span className="block font-bold text-electric text-lg mb-1">💬 Fast Response Guaranteed</span>
                <span className="text-white/70 text-sm">We&apos;ll get back to you within 24 hours with a custom quote</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-8 flex-wrap text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-electric" />
              <span>Fast Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-electric" />
              <span>Flexible Payment Options</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-electric" />
              <span>Setup in Minutes</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* OpenClaw Integration Section */}
      <div className="w-full max-w-7xl mt-32 z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl border-2 border-cyber/50 hover:border-cyber transition-all relative overflow-hidden group shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)]"
        >
          {/* Glow Effects */}
          <div className="absolute -top-4 -left-4 w-40 h-40 bg-gradient-to-br from-cyber to-electric rounded-full blur-3xl opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyber/5 to-electric/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyber/20 to-electric/20 border border-cyber/30 mb-6">
                <Sparkles className="w-4 h-4 text-cyber" />
                <span className="text-sm font-semibold text-cyber">AI-Powered Automation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyber via-white to-electric bg-clip-text text-transparent">
                Powered by OpenClaw
              </h2>
              <p className="text-white/60 text-lg max-w-3xl mx-auto">
                Let our AI bot manage your social media automation intelligently. 
                No coding required - just chat with OpenClaw and watch the magic happen! 🤖
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyber/10 to-transparent border border-cyber/20 hover:border-cyber/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber to-electric flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-void" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Scheduling</h3>
                <p className="text-white/60 text-sm">
                  Tell OpenClaw when to post and it handles the rest. Timezone-aware and intelligent.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyber/10 to-transparent border border-cyber/20 hover:border-cyber/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber to-electric flex items-center justify-center mb-4">
                  <Terminal className="w-6 h-6 text-void" />
                </div>
                <h3 className="text-xl font-bold mb-2">Natural Commands</h3>
                <p className="text-white/60 text-sm">
                  &quot;Post about AI trends every Monday at 9 AM&quot; - OpenClaw understands and executes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyber/10 to-transparent border border-cyber/20 hover:border-cyber/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber to-electric flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-void" />
                </div>
                <h3 className="text-xl font-bold mb-2">Auto-Optimization</h3>
                <p className="text-white/60 text-sm">
                  OpenClaw learns from engagement and optimizes posting times for maximum reach.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-void/80 to-void/60 border border-cyber/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyber to-electric flex items-center justify-center">
                  <span className="text-void font-bold">🤖</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">How to Integrate with OpenClaw</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Simply tell OpenClaw bot what you want to do - it handles everything for you:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-black/40 p-4 rounded-lg border border-cyber/20">
                      <p className="text-cyber font-semibold mb-2">Step 1: Install ClawLaunch</p>
                      <p className="text-white/70 text-sm font-mono">
                        &quot;Hey OpenClaw, install and configure ClawLaunch for me&quot;
                      </p>
                    </div>
                    <div className="bg-black/40 p-4 rounded-lg border border-electric/20">
                      <p className="text-electric font-semibold mb-2">Step 2: Give Details</p>
                      <p className="text-white/70 text-sm">
                        OpenClaw will ask you:
                      </p>
                      <ul className="text-white/60 text-sm mt-2 space-y-1 ml-4">
                        <li>• Platform (LinkedIn or Twitter/X)</li>
                        <li>• Topic (AI, Tech, Marketing, etc.)</li>
                        <li>• Posting time (e.g., 9 AM daily)</li>
                        <li>• How often (e.g., 3 posts per week)</li>
                      </ul>
                    </div>
                    <div className="bg-black/40 p-4 rounded-lg border border-cyber/20">
                      <p className="text-cyber font-semibold mb-2">Step 3: Let it Run</p>
                      <p className="text-white/70 text-sm font-mono">
                        &quot;Start the scheduler&quot; - Done! OpenClaw manages everything automatically.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-electric/10 to-cyber/10 border border-electric/20">
                    <p className="text-white/80 text-sm">
                      💡 <span className="font-semibold">Pro Tip:</span> You can modify settings anytime by chatting with OpenClaw - 
                      no need to touch the terminal!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-7xl mt-24 z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          <div className="glass-card p-8 rounded-2xl border border-electric/20 text-center hover:border-electric/40 transition-all">
            <div className="text-5xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent mb-2">
              500+
            </div>
            <div className="text-white/60">Downloads</div>
          </div>
          <div className="glass-card p-8 rounded-2xl border border-electric/20 text-center hover:border-electric/40 transition-all">
            <div className="text-5xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent mb-2">
              50+
            </div>
            <div className="text-white/60">Happy Users</div>
          </div>
          <div className="glass-card p-8 rounded-2xl border border-electric/20 text-center hover:border-electric/40 transition-all">
            <div className="text-5xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent mb-2">
              1000+
            </div>
            <div className="text-white/60">Posts Scheduled</div>
          </div>
          <div className="glass-card p-8 rounded-2xl border border-electric/20 text-center hover:border-electric/40 transition-all">
            <div className="text-5xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent mb-2">
              0%
            </div>
            <div className="text-white/60">Ban Risk</div>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl mt-32 z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-electric to-cyber bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-white/50">Everything you need to know</p>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-6 rounded-xl border border-electric/20 hover:border-electric/40 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-electric">Q:</span> Will this get me banned?
              </h3>
              <p className="text-white/70 pl-7">
                <span className="text-cyber font-semibold">A:</span> No! You click &quot;Post&quot; manually. The platform sees it as you posting normally, so there&apos;s zero risk of bans.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-electric/20 hover:border-electric/40 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-electric">Q:</span> Do I need API keys?
              </h3>
              <p className="text-white/70 pl-7">
                <span className="text-cyber font-semibold">A:</span> Nope! ClawLaunch works without any API access. No tokens, no OAuth, no complicated setup.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-electric/20 hover:border-electric/40 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-electric">Q:</span> How is this different from Buffer or Hootsuite?
              </h3>
              <p className="text-white/70 pl-7">
                <span className="text-cyber font-semibold">A:</span> Buffer and Hootsuite use APIs which can be risky and get restricted. ClawLaunch opens your browser and YOU click post - completely safe and compliant.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-electric/20 hover:border-electric/40 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-electric">Q:</span> Can I try for free?
              </h3>
              <p className="text-white/70 pl-7">
                <span className="text-cyber font-semibold">A:</span> Yes! The free tier gives you 1 post per day (10 posts/month) forever. No credit card required. Try it risk-free!
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-electric/20 hover:border-electric/40 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-electric">Q:</span> What platforms are supported?
              </h3>
              <p className="text-white/70 pl-7">
                <span className="text-cyber font-semibold">A:</span> Currently LinkedIn and Twitter/X. More platforms coming soon based on user feedback!
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-electric/20 hover:border-electric/40 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-electric">Q:</span> How does the Pro upgrade work?
              </h3>
              <p className="text-white/70 pl-7">
                <span className="text-cyber font-semibold">A:</span> Contact us via WhatsApp or email when you&apos;re ready. We&apos;ll send you a license key that unlocks unlimited features instantly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="w-full max-w-5xl mt-24 z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-2xl border border-electric/20"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold text-electric">Open Source</div>
              <div className="text-white/60 text-sm">Transparent code</div>
            </div>
            <div>
              <div className="text-3xl mb-2">💳</div>
              <div className="font-semibold text-electric">No Credit Card</div>
              <div className="text-white/60 text-sm">Free tier forever</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🚫</div>
              <div className="font-semibold text-electric">Zero Ban Risk</div>
              <div className="text-white/60 text-sm">100% compliant</div>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold text-electric">30 Sec Setup</div>
              <div className="text-white/60 text-sm">Instant install</div>
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
