"use client"

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Target, DollarSign, Globe } from "lucide-react";

// Define the Stat interface
interface Stat {
  number: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Individual stat card component
interface StatCardProps {
  stat: Stat;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState<Array<{left: number; top: number}>>([]);
  const targetNumber = parseInt(stat.number.replace(/[+%]/g, ''));
  
  useEffect(() => {
    // Generate particles on client side only
    setParticles(
      Array.from({ length: 6 }, () => ({
        left: 20 + Math.random() * 60,
        top: 20 + Math.random() * 60,
      }))
    );
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= targetNumber) {
            clearInterval(interval);
            return targetNumber;
          }
          return prev + Math.ceil(targetNumber / 50);
        });
      }, 30);
      return () => clearInterval(interval);
    }, 500 + index * 200);
    
    return () => clearTimeout(timer);
  }, [targetNumber, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative"
    >
      <div className="group relative overflow-hidden rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 p-8 hover:bg-card/80 transition-all duration-500">
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {/* Icon with glow effect */}
          <motion.div
            className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <stat.icon className="w-8 h-8 text-primary" />
            <div 
              className="absolute inset-0 rounded-full opacity-20 blur-xl" 
              style={{ backgroundColor: stat.color }}
            />
          </motion.div>

          {/* Enhanced number with animated counter */}
          <motion.div
            className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {count}{stat.number.includes('+') ? '+' : ''}{stat.number.includes('%') ? '%' : ''}
          </motion.div>

          <motion.h3
            className="text-xl font-semibold text-foreground mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {stat.label}
          </motion.h3>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            {stat.description}
          </motion.p>
        </motion.div>

        {/* Particle effects - only render if particles are loaded */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100"
            style={{
              backgroundColor: stat.color,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Enhanced hover glow */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${stat.color}, transparent 70%)`,
          }}
        />
        
        {/* Border glow */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, ${stat.color}20, transparent)`,
            padding: '1px',
          }}
        />
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const stats = [
    { 
      number: "100+", 
      label: "Countries", 
      description: "Global reach across continents", 
      icon: Globe,
      color: "#3b82f6"
    },
    { 
      number: "542000", 
      label: "Active Users", 
      description: "Traders trust our platform", 
      icon: Users,
      color: "#10b981"
    },
    { 
      number: "78%", 
      label: "Success Rate", 
      description: "Proven signal accuracy", 
      icon: Target,
      color: "#f59e0b"
    },
    { 
      number: "2M", 
      label: "Profits Generated", 
      description: "Total user earnings", 
      icon: DollarSign,
      color: "#ef4444"
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-primary/10 rounded-lg"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-primary/30 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trusted by Millions
          </motion.h2>
          
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join the ranks of forward-thinking traders already leveraging our AI technology
          </motion.p>
        </motion.div>

        {/* Enhanced stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Enhanced company logos section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-12">
            Used by leading exchanges and institutions worldwide
          </p>
          
          <motion.div
            className="flex flex-wrap justify-center items-center gap-12 opacity-60"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {['Binance', 'Coinbase', 'Kraken', 'KuCoin', 'Huobi', 'OKX'].map((exchange, i) => (
              <motion.div
                key={exchange}
                className="text-2xl font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              >
                {exchange}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
