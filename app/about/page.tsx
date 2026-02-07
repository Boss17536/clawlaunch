"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Users, Zap, Heart, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  const values = [
    {
      icon: Rocket,
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI automation.",
      color: "electric",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Every feature is designed with your growth in mind.",
      color: "cyber",
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your data stays yours. We never sell or share your information.",
      color: "electric",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for performance with cutting-edge technology.",
      color: "cyber",
    },
  ];
  
  const team = [
    { name: "Alex Chen", role: "Founder & CEO", avatar: "AC" },
    { name: "Sarah Kim", role: "Head of AI", avatar: "SK" },
    { name: "Marcus Rodriguez", role: "Lead Engineer", avatar: "MR" },
    { name: "Emma Thompson", role: "Design Lead", avatar: "ET" },
  ];
  
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <Target className="w-4 h-4 text-electric" />
              <span className="text-sm text-white/70">Our Mission</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              Built for Growth.<br />Designed for Humans.
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              ClawLaunch was born from a simple idea: social media automation shouldn&apos;t feel robotic. 
              We&apos;re building the future of authentic, AI-powered growth.
            </p>
          </div>
        </ScrollReveal>
        
        {/* Stats */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { value: "50K+", label: "Active Users" },
              { value: "2M+", label: "Posts Automated" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="glass glass-hover rounded-2xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
        
        {/* Values */}
        <ScrollReveal delay={0.3}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our <span className="text-gradient">Values</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <ScrollReveal key={value.title} delay={index * 0.1} direction="up">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass glass-hover rounded-2xl p-8 group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-${value.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 text-${value.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-white/60 leading-relaxed">{value.description}</p>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
        
        {/* Team */}
        <ScrollReveal delay={0.4}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Meet the <span className="text-gradient">Team</span>
            </h2>
            <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
              A passionate group of builders, designers, and dreamers working to revolutionize social media automation.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <ScrollReveal key={member.name} delay={index * 0.1} direction="up">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="glass glass-hover rounded-2xl p-6 text-center group"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-electric to-cyber flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {member.avatar}
                    </div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-white/50">{member.role}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
        
        {/* CTA */}
        <ScrollReveal delay={0.5}>
          <div className="glass rounded-3xl p-12 text-center">
            <Users className="w-12 h-12 text-electric mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Revolution
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Be part of a community that&apos;s redefining social media automation. 
              Start your journey today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-electric to-cyber rounded-xl font-semibold text-lg glow-green hover:glow-purple transition-all duration-300"
            >
              Get Started Free
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
