"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      icon: Sparkles,
      price: "0",
      period: "forever",
      description: "Perfect for trying out ClawLaunch",
      features: [
        "1 social account",
        "10 posts per month",
        "Basic analytics",
        "Community support",
        "Standard templates",
      ],
      cta: "Start Free",
      popular: false,
      gradient: "from-white/10 to-white/5",
    },
    {
      name: "Pro",
      icon: Zap,
      price: "29",
      period: "per month",
      description: "For serious content creators",
      features: [
        "5 social accounts",
        "Unlimited posts",
        "Advanced analytics",
        "Priority support",
        "Custom templates",
        "AI content suggestions",
        "Schedule optimization",
      ],
      cta: "Start Pro Trial",
      popular: true,
      gradient: "from-electric/20 to-cyber/20",
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: "99",
      period: "per month",
      description: "For teams and agencies",
      features: [
        "Unlimited accounts",
        "Unlimited posts",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Custom integrations",
        "White-label options",
        "Team collaboration",
        "API access",
        "Custom AI training",
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-cyber/20 to-electric/20",
    },
  ];
  
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
              <Zap className="w-4 h-4 text-electric" />
              <span className="text-sm text-white/70">Simple, Transparent Pricing</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Choose Your <span className="text-gradient">Growth Plan</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Start free, upgrade when you&apos;re ready. No hidden fees, cancel anytime.
            </p>
          </div>
        </ScrollReveal>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <ScrollReveal key={plan.name} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ scale: 1.02, y: -10 }}
                  className={`relative glass rounded-3xl p-8 border-2 ${
                    plan.popular ? "border-electric" : "border-white/10"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${plan.gradient})`,
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-electric to-cyber px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    plan.popular ? "from-electric to-cyber" : "from-white/20 to-white/10"
                  } flex items-center justify-center mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-white/50">/{plan.period}</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-xl font-semibold mb-8 ${
                      plan.popular
                        ? "bg-gradient-to-r from-electric to-cyber glow-green"
                        : "glass glass-hover"
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.popular ? "text-electric" : "text-white/50"
                        }`} />
                        <span className="text-sm text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
        
        {/* FAQ Section */}
        <ScrollReveal delay={0.4}>
          <div className="glass rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  q: "Can I change plans later?",
                  a: "Absolutely! Upgrade or downgrade anytime. Changes take effect immediately.",
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes! Pro and Enterprise plans come with a 14-day free trial. No credit card required.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and cryptocurrency payments.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes, cancel with one click. No questions asked, no hidden fees.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <h3 className="font-semibold text-lg">{faq.q}</h3>
                  <p className="text-white/60 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
