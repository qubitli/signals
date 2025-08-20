"use client"

import { Check, Zap, Shield, Crown, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Define the Plan interface
interface Plan {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

// Individual pricing card component
interface PricingCardProps {
  plan: Plan;
  index: number;
}

function PricingCard({ plan, index }: PricingCardProps) {
  const [particles, setParticles] = useState<Array<{left: number; top: number}>>([]);

  useEffect(() => {
    // Generate particles on client side only for popular plan
    if (plan.popular) {
      setParticles(
        Array.from({ length: 8 }, () => ({
          left: 20 + Math.random() * 60,
          top: 20 + Math.random() * 60,
        }))
      );
    }
  }, [plan.popular]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group ${plan.popular ? 'lg:-mt-8' : ''}`}
    >
      {/* Card container */}
      <motion.div
        className={`relative bg-card/80 backdrop-blur-xl border rounded-3xl p-8 h-full transition-all duration-500 ${
          plan.popular 
            ? 'border-primary shadow-2xl shadow-primary/25 scale-105' 
            : 'border-border/50 hover:border-primary/30 hover:shadow-2xl'
        }`}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: plan.popular 
              ? 'linear-gradient(45deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--primary) / 0.1))'
              : 'linear-gradient(45deg, transparent, hsl(var(--primary) / 0.05), transparent)',
            filter: 'blur(20px)',
          }}
        />

        {/* Popular badge */}
        {plan.popular && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
          >
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <Crown className="w-4 h-4" />
              <span>{plan.subtitle}</span>
              <Star className="w-4 h-4 fill-current" />
            </div>
          </motion.div>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h3 
              className="text-2xl font-bold text-card-foreground mb-2"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {plan.name}
            </motion.h3>
            {!plan.popular && (
              <p className="text-sm text-muted-foreground mb-4">{plan.subtitle}</p>
            )}
            
            {/* Price with animation */}
            <div className="mb-4">
              <motion.span 
                className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {plan.price}
              </motion.span>
              <span className="text-muted-foreground ml-2">{plan.period}</span>
            </div>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>

          {/* Features list */}
          <motion.ul className="space-y-4 mb-8">
            {plan.features.map((feature: string, featureIndex: number) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                className="flex items-center space-x-3"
              >
                <motion.div 
                  className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="w-3 h-3 text-primary" />
                </motion.div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.button 
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group ${
              plan.popular
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'border border-border bg-background hover:bg-accent'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative flex items-center justify-center space-x-2">
              <span>{plan.buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </div>

        {/* Floating particles for popular plan */}
        {plan.popular && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function PricingSection() {
  const plans = [
    {
      name: "Basic",
      subtitle: "Try For Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with crypto signals",
      features: [
        "5 signals per day",
        "Basic AI analysis",
        "Email notifications",
        "Community access",
        "Mobile app access"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      subtitle: "Most Popular",
      price: "$49",
      period: "per month",
      description: "For serious traders who want unlimited access",
      features: [
        "Unlimited signals",
        "Advanced AI analysis",
        "Real-time push notifications",
        "Performance tracking",
        "Priority support",
        "API access",
        "Custom alerts"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      subtitle: "For Teams",
      price: "$199",
      period: "per month",
      description: "Custom solutions for institutions and teams",
      features: [
        "Everything in Pro",
        "Team management",
        "White-label options",
        "Dedicated support",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />
        
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-primary/5 rounded-2xl"
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8"
          >
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Choose Your Plan</span>
          </motion.div>
          
          <motion.h2
            className="text-4xl sm:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Start free,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              upgrade when ready
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Flexible pricing designed to grow with your trading success
          </motion.p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>

        {/* Enhanced guarantee section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center space-x-3 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-full px-8 py-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="font-medium text-foreground">
              30-day money back guarantee
            </span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
