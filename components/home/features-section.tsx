"use client"

import { Brain, TrendingUp, Shield, BarChart3, Zap, Globe, Network } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Animated Background Component
function AnimatedBackground() {
  const [orbPositions, setOrbPositions] = useState<Array<{left: number, top: number}>>([]);

  useEffect(() => {
    // Generate random positions ONLY on client side after mount
    const positions = Array.from({ length: 6 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setOrbPositions(positions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Floating orbs - only render after client mount */}
      {orbPositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            left: `${position.left}%`,
            top: `${position.top}%`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>
    </div>
  );
}

// Interactive Feature Card
function FeatureCard({ icon: Icon, title, description, index, isActive, onHover }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}) {
  const [particlePositions, setParticlePositions] = useState<Array<{left: number, top: number}>>([]);

  useEffect(() => {
    // Generate random positions for particles ONLY on client side
    const positions = Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setParticlePositions(positions);
  }, []);

  return (
    <motion.div
      className="group relative p-8 bg-card/50 backdrop-blur-sm border border-border rounded-2xl cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"
        initial={{ opacity: 0, x: -100 }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : -100
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Particles effect - only render after client mount */}
      {isActive && particlePositions.length > 0 && (
        <div className="absolute inset-0">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="relative z-10">
        <motion.div 
          className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6"
          whileHover={{ 
            rotate: 360,
            backgroundColor: "hsl(var(--primary) / 0.2)"
          }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(45deg, transparent, hsl(var(--primary) / 0.1), transparent)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
}

// Network visualization component
function NetworkVisualization() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 800 600">
        {/* Animated connections */}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${20 + i * 15}%`}
            y1={`${30 + i * 10}%`}
            x2={`${80 - i * 10}%`}
            y2={`${70 - i * 15}%`}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Animated nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            cx={`${20 + (i % 4) * 20}%`}
            cy={`${30 + Math.floor(i / 4) * 40}%`}
            r="3"
            fill="hsl(var(--primary))"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function FeaturesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [dataParticles, setDataParticles] = useState<Array<{
    id: string;
    startX: number;
    startY: number;
    path: { x: number; y: number }[];
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate data particles on client side only
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: `particle-${i}`,
      startX: 100 + Math.random() * 800,
      startY: 100 + Math.random() * 300,
      path: [
        { x: 100 + Math.random() * 800, y: 100 + Math.random() * 300 },
        { x: 100 + Math.random() * 800, y: 100 + Math.random() * 300 },
        { x: 100 + Math.random() * 800, y: 100 + Math.random() * 300 }
      ],
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5
    }));
    setDataParticles(particles);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes thousands of data points including market trends, news sentiment, and social media buzz to identify optimal trading opportunities."
    },
    {
      icon: Zap,
      title: "Lightning Fast Alerts",
      description: "Receive instant notifications for high-confidence trading opportunities as they emerge, giving you the speed advantage in volatile markets."
    },
    {
      icon: Shield,
      title: "Smart Risk Management",
      description: "Every signal includes precise entry, target, and stop-loss levels calculated by our AI for optimal risk-reward ratios."
    },
    {
      icon: Network,
      title: "Global Network Coverage",
      description: "Access signals from markets worldwide with our distributed AI network providing 24/7 coverage across all time zones."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track your performance with detailed analytics, win rates, and profit/loss reports to continuously improve your trading."
    },
    {
      icon: TrendingUp,
      title: "Proven Performance",
      description: "Our signals maintain a 78% success rate with transparent performance tracking and historical data for every recommendation."
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <NetworkVisualization />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl sm:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Features & Benefits
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Advanced AI technology meets professional trading expertise. 
            Get the edge you need in cryptocurrency markets.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              isActive={activeCard === index}
              onHover={setActiveCard}
            />
          ))}
        </div>

        {/* SPECTACULAR Global AI Network - COMPLETELY REDESIGNED */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Global AI Network</span>
          </div>
          
          <div className="relative max-w-7xl mx-auto h-[600px] bg-gradient-to-br from-background via-card/5 to-background border border-border/30 rounded-3xl overflow-hidden">
            {/* Sophisticated background with layers */}
            <div className="absolute inset-0">
              {/* Radial gradient overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
              
              {/* Animated mesh gradient */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 40% 80%, hsl(var(--primary)) 0%, transparent 50%)'
                }}
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 40% 80%, hsl(var(--primary)) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 30%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 20% 70%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 60% 20%, hsl(var(--primary)) 0%, transparent 50%)',
                    'radial-gradient(circle at 40% 70%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 30%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 30% 40%, hsl(var(--primary)) 0%, transparent 50%)'
                  ]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* World Map Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-6xl">
                
                {/* Major Data Centers with Realistic Positions */}
                {[
                  { name: "Virginia", x: "22%", y: "35%", region: "US East", status: "active", connections: ["London", "Tokyo", "Sydney"] },
                  { name: "California", x: "8%", y: "38%", region: "US West", status: "active", connections: ["Tokyo", "Singapore"] },
                  { name: "London", x: "48%", y: "28%", region: "Europe", status: "active", connections: ["Frankfurt", "Mumbai"] },
                  { name: "Frankfurt", x: "52%", y: "30%", region: "EU Central", status: "active", connections: ["Mumbai", "Tokyo"] },
                  { name: "Tokyo", x: "82%", y: "35%", region: "Asia Pacific", status: "active", connections: ["Singapore", "Sydney"] },
                  { name: "Singapore", x: "78%", y: "55%", region: "Southeast Asia", status: "active", connections: ["Mumbai", "Sydney"] },
                  { name: "Sydney", x: "85%", y: "75%", region: "Oceania", status: "active", connections: ["Tokyo"] },
                  { name: "Mumbai", x: "72%", y: "42%", region: "South Asia", status: "active", connections: ["Singapore", "Frankfurt"] },
                  { name: "São Paulo", x: "28%", y: "65%", region: "South America", status: "active", connections: ["Virginia"] },
                  { name: "Toronto", x: "18%", y: "30%", region: "Canada", status: "active", connections: ["Virginia", "London"] }
                ].map((datacenter, index) => (
                  <motion.div
                    key={datacenter.name}
                    className="absolute group"
                    style={{ left: datacenter.x, top: datacenter.y }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    {/* Outer pulse ring */}
                    <motion.div
                      className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 border-2 border-primary/30 rounded-full"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                    
                    {/* Middle ring */}
                    <motion.div
                      className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-primary/50 rounded-full"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.8, 0.2, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.15
                      }}
                    />
                    
                    {/* Core node */}
                    <motion.div
                      className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-primary/70 rounded-full shadow-lg"
                      whileHover={{ scale: 1.5 }}
                      style={{
                        boxShadow: `0 0 20px hsl(var(--primary))`
                      }}
                    />
                    
                    {/* Status indicator */}
                    <motion.div
                      className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 top-1 left-1 bg-green-400 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    {/* Datacenter label */}
                    <motion.div
                      className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
                        <div className="text-xs font-semibold text-primary">{datacenter.name}</div>
                        <div className="text-xs text-muted-foreground">{datacenter.region}</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-green-400">Online</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Animated connection lines between data centers */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </linearGradient>
                    <filter id="connection-glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Major intercontinental connections */}
                  {[
                    { from: { x: "22%", y: "35%" }, to: { x: "48%", y: "28%" }, delay: 0 }, // Virginia -> London
                    { from: { x: "48%", y: "28%" }, to: { x: "82%", y: "35%" }, delay: 0.5 }, // London -> Tokyo
                    { from: { x: "82%", y: "35%" }, to: { x: "78%", y: "55%" }, delay: 1 }, // Tokyo -> Singapore
                    { from: { x: "78%", y: "55%" }, to: { x: "85%", y: "75%" }, delay: 1.5 }, // Singapore -> Sydney
                    { from: { x: "8%", y: "38%" }, to: { x: "82%", y: "35%" }, delay: 2 }, // California -> Tokyo
                    { from: { x: "52%", y: "30%" }, to: { x: "72%", y: "42%" }, delay: 2.5 }, // Frankfurt -> Mumbai
                    { from: { x: "22%", y: "35%" }, to: { x: "28%", y: "65%" }, delay: 3 }, // Virginia -> São Paulo
                    { from: { x: "18%", y: "30%" }, to: { x: "22%", y: "35%" }, delay: 3.5 }, // Toronto -> Virginia
                  ].map((connection, i) => {
                    const fromX = parseFloat(connection.from.x) / 100 * 1000;
                    const fromY = parseFloat(connection.from.y) / 100 * 600;
                    const toX = parseFloat(connection.to.x) / 100 * 1000;
                    const toY = parseFloat(connection.to.y) / 100 * 600;
                    
                    return (
                      <motion.line
                        key={i}
                        x1={fromX}
                        y1={fromY}
                        x2={toX}
                        y2={toY}
                        stroke="url(#connection-gradient)"
                        strokeWidth="2"
                        filter="url(#connection-glow)"
                        strokeDasharray="8,4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: [0, 0.8, 0.4],
                          strokeDashoffset: [0, -12]
                        }}
                        transition={{
                          pathLength: { duration: 2, delay: connection.delay },
                          opacity: { duration: 2, delay: connection.delay },
                          strokeDashoffset: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: connection.delay
                          }
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Floating data packets */}
                {dataParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-primary rounded-full shadow-lg"
                    style={{
                      boxShadow: `0 0 8px hsl(var(--primary))`,
                    }}
                    initial={{
                      x: particle.startX,
                      y: particle.startY,
                      opacity: 0
                    }}
                    animate={{
                      x: particle.path.map(p => p.x),
                      y: particle.path.map(p => p.y),
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Infinity,
                      delay: particle.delay,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Performance metrics overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                { 
                  metric: "Network Latency", 
                  value: "< 50ms", 
                  x: "5%", 
                  y: "15%", 
                  delay: 0.5,
                  color: "text-green-400"
                },
                { 
                  metric: "Uptime", 
                  value: "99.99%", 
                  x: "85%", 
                  y: "20%", 
                  delay: 1,
                  color: "text-blue-400"
                },
                { 
                  metric: "Active Connections", 
                  value: "1.2M+", 
                  x: "10%", 
                  y: "75%", 
                  delay: 1.5,
                  color: "text-purple-400"
                },
                { 
                  metric: "Data Processing", 
                  value: "50GB/s", 
                  x: "80%", 
                  y: "80%", 
                  delay: 2,
                  color: "text-orange-400"
                }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: stat.x, top: stat.y }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: stat.delay,
                    type: "spring",
                    stiffness: 200 
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-background/95 backdrop-blur-md border border-border/50 rounded-xl px-4 py-3 shadow-xl">
                    <div className="text-xs text-muted-foreground font-medium">{stat.metric}</div>
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Real-time status bar */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-full px-8 py-4 shadow-2xl">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm font-semibold text-green-400">Global Coverage</span>
                    <span className="text-sm text-muted-foreground">10 Regions</span>
                  </div>
                  
                  <div className="w-px h-6 bg-border"></div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-blue-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <span className="text-sm font-semibold text-blue-400">Active Signals</span>
                    <span className="text-sm text-muted-foreground">847K/day</span>
                  </div>
                  
                  <div className="w-px h-6 bg-border"></div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-purple-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                    />
                    <span className="text-sm font-semibold text-purple-400">AI Processing</span>
                    <span className="text-sm text-muted-foreground">Real-time</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
