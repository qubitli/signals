"use client"

import { SignalCard } from "@/components/home/signal-card";
import { Signal } from "@/types";
import { Sparkles, TrendingUp, Zap, Activity, BarChart3, Timer, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const demoSignals: Signal[] = [
  {
    id: "signal-1",
    pair: "BTC/USDT",
    action: "BUY",
    confidence: 87,
    entry_price: 43250,
    target_price: 46800,
    stop_loss: 41500,
    timeframe: "4h",
    analysis: "Strong bullish momentum with RSI showing oversold conditions. Volume surge indicates institutional accumulation after recent consolidation phase.",
    ai_reasoning: "Technical indicators align with positive sentiment from recent ETF approvals",
    created_at: new Date("2025-08-20T10:00:00Z"),
    status: "ACTIVE"
  },
  {
    id: "signal-2",
    pair: "ETH/USDT",
    action: "BUY",
    confidence: 92,
    entry_price: 2680,
    target_price: 2850,
    stop_loss: 2580,
    timeframe: "1h",
    analysis: "Ethereum showing strong momentum after breaking key resistance. Smart money flow indicates institutional buying pressure.",
    ai_reasoning: "Layer 2 adoption metrics surge correlates with price breakout pattern",
    created_at: new Date("2025-08-20T09:55:00Z"),
    status: "ACTIVE"
  },
  {
    id: "signal-3",
    pair: "SOL/USDT",
    action: "SELL",
    confidence: 78,
    entry_price: 108.50,
    target_price: 95.20,
    stop_loss: 115.00,
    timeframe: "1d",
    analysis: "Bearish divergence detected on daily timeframe. Ecosystem concerns and reduced network activity suggest downward pressure.",
    ai_reasoning: "On-chain metrics show decreased DeFi activity and validator concerns",
    created_at: new Date("2025-08-20T09:50:00Z"),
    status: "ACTIVE"
  }
];

export function SignalsSection() {
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(15);
  const [liveMetrics, setLiveMetrics] = useState({
    activeSignals: 847,
    successRate: 78,
    avgDelivery: 23,
    processing: 1247
  });
  const [dataFlow, setDataFlow] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);

  // Cycle through signals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSignalIndex((prev) => (prev + 1) % demoSignals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update live metrics and last update time
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeSignals: prev.activeSignals + Math.floor(Math.random() * 3) - 1,
        successRate: 75 + Math.floor(Math.random() * 8),
        avgDelivery: 18 + Math.floor(Math.random() * 12),
        processing: prev.processing + Math.floor(Math.random() * 20) - 10
      }));
      setLastUpdate(Math.floor(Math.random() * 30) + 1);
    }, 2000);
    return () => clearInterval(metricsInterval);
  }, []);

  // Generate data flow particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 5 }, () => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: 0.8
      }));
      setDataFlow(newParticles);
    };

    generateParticles();
    const particleInterval = setInterval(generateParticles, 3000);
    return () => clearInterval(particleInterval);
  }, []);
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/5 to-background" />
        
        {/* Animated mesh overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 30% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--primary)) 0%, transparent 50%)'
          }}
          animate={{
            background: [
              'radial-gradient(circle at 30% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--primary)) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 20% 70%, hsl(var(--primary)) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 90% 10%, hsl(var(--primary)) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating data particles */}
        {dataFlow.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary/60 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              boxShadow: `0 0 8px hsl(var(--primary))`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, particle.opacity, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">See Our AI in Action</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Real-Time Signal Preview
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience our AI-powered trading signals in action. Each signal delivers precise analysis, 
            intelligent risk management, and crystal-clear entry/exit strategies.
          </p>
        </motion.div>

        {/* SPECTACULAR Signal Trading Floor */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          
          {/* Left: Live Signals Feed */}
          <motion.div 
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Live Signal Feed</h3>
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Updated {lastUpdate}s ago
              </div>
            </div>

            <AnimatePresence mode="wait">
              {demoSignals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ 
                    opacity: index === currentSignalIndex ? 1 : 0.6,
                    y: 0,
                    scale: index === currentSignalIndex ? 1 : 0.95,
                    filter: index === currentSignalIndex ? "blur(0px)" : "blur(1px)"
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Enhanced glow effect for active signal */}
                  {index === currentSignalIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl blur-xl" />
                  )}
                  
                  <div className="relative">
                    <SignalCard 
                      signal={signal} 
                      className={`transform transition-all duration-500 ${
                        index === currentSignalIndex 
                          ? "shadow-2xl border-primary/40 ring-2 ring-primary/20" 
                          : "shadow-lg border-border/50"
                      }`} 
                    />
                    
                    {/* Live indicators */}
                    {index === currentSignalIndex && (
                      <>
                        <motion.div
                          className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🔴 LIVE
                        </motion.div>
                        <motion.div
                          className="absolute -bottom-3 -left-3 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                          {signal.confidence}% Confidence
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Right: Real-time Analytics Dashboard */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Live Analytics</h3>
              </div>
              
              <div className="space-y-6">
                {/* Active Signals */}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Signals</span>
                  <motion.span 
                    className="text-2xl font-bold text-primary"
                    key={liveMetrics.activeSignals}
                    initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                    animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                    transition={{ duration: 0.3 }}
                  >
                    {liveMetrics.activeSignals}
                  </motion.span>
                </div>
                
                {/* Success Rate */}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Success Rate</span>
                  <div className="flex items-center space-x-2">
                    <motion.span 
                      className="text-2xl font-bold text-green-400"
                      key={liveMetrics.successRate}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {liveMetrics.successRate}%
                    </motion.span>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                </div>

                {/* Avg Delivery */}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg Delivery</span>
                  <div className="flex items-center space-x-2">
                    <motion.span 
                      className="text-2xl font-bold text-blue-400"
                      key={liveMetrics.avgDelivery}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {liveMetrics.avgDelivery}s
                    </motion.span>
                    <Timer className="w-5 h-5 text-blue-400" />
                  </div>
                </div>

                {/* Processing */}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Processing</span>
                  <div className="flex items-center space-x-2">
                    <motion.span 
                      className="text-2xl font-bold text-purple-400"
                      key={liveMetrics.processing}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {liveMetrics.processing}
                    </motion.span>
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Status Panel */}
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">AI Status</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Market Analysis</span>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-green-400">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Management</span>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <span className="text-sm font-medium text-blue-400">Monitoring</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Signal Generation</span>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    />
                    <span className="text-sm font-medium text-purple-400">Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats - Enhanced */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { 
              value: "24/7", 
              label: "AI Monitoring", 
              icon: Activity, 
              color: "text-green-400",
              description: "Continuous market surveillance"
            },
            { 
              value: `<${liveMetrics.avgDelivery}s`, 
              label: "Signal Delivery", 
              icon: Timer, 
              color: "text-blue-400",
              description: "Lightning-fast execution"
            },
            { 
              value: `${liveMetrics.successRate}%`, 
              label: "Success Rate", 
              icon: Target, 
              color: "text-purple-400",
              description: "Proven track record"
            },
            { 
              value: "1M+", 
              label: "Signals Generated", 
              icon: BarChart3, 
              color: "text-orange-400",
              description: "Massive data processing"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center group hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-foreground font-medium mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
