"use client";

import { motion } from "framer-motion";
import { Book, Code, Terminal, Zap, Copy, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

export default function DocsPage() {
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
              <Book className="w-4 h-4 text-electric" />
              <span className="text-sm text-white/70">Documentation</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Get Started in <span className="text-gradient">Minutes</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Everything you need to know to automate your social media growth with ClawLaunch.
            </p>
          </div>
        </ScrollReveal>
        
        {/* Quick Start */}
        <ScrollReveal delay={0.2}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">
              <Zap className="w-8 h-8 text-electric inline mr-3" />
              Quick Start
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Install", desc: "Get ClawLaunch CLI installed" },
                { step: "02", title: "Configure", desc: "Set up your automation" },
                { step: "03", title: "Launch", desc: "Start growing automatically" },
              ].map((item, index) => (
                <ScrollReveal key={item.step} delay={index * 0.1} direction="up">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass glass-hover rounded-2xl p-6"
                  >
                    <div className="text-5xl font-bold text-gradient mb-3">{item.step}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
        
        {/* Installation */}
        <ScrollReveal delay={0.3}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">
              <Terminal className="w-8 h-8 text-cyber inline mr-3" />
              Installation
            </h2>
            
            <CodeBlock
              language="bash"
              code={`# Install via npm
npm install -g clawlaunch

# Or using yarn
yarn global add clawlaunch

# Verify installation
clawlaunch --version`}
            />
          </div>
        </ScrollReveal>
        
        {/* Configuration */}
        <ScrollReveal delay={0.4}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">
              <Code className="w-8 h-8 text-electric inline mr-3" />
              Configuration
            </h2>
            
            <CodeBlock
              language="javascript"
              code={`// clawlaunch.config.js
export default {
  botName: "MyGrowthBot",
  platforms: ["linkedin", "x"],
  schedule: {
    interval: "24h",
    timezone: "America/New_York"
  },
  apiKey: process.env.CLAWLAUNCH_API_KEY
}`}
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-white/50 font-mono">{language}</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 rounded-lg glass glass-hover text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-electric" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </motion.button>
      </div>
      <pre className="p-6 overflow-x-auto">
        <code className="font-mono text-sm text-white/80">{code}</code>
      </pre>
    </div>
  );
}
