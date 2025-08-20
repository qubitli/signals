'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { TrendingUp, BarChart3, DollarSign, BookOpen, Mail, Menu, X, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"

// BorderBeam component
interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as React.CSSProperties & { offsetPath: string }
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  );
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll()
  const navBlur = useTransform(scrollY, [0, 100], [8, 20])

  const navigationItems = [
    { name: 'Features', href: '#features', icon: BarChart3 },
    { name: 'Pricing', href: '#pricing', icon: DollarSign },
    { name: 'About', href: '#about', icon: BookOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      
      // Detect active section
      const sections = ['features', 'pricing', 'about', 'contact']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
      
      if (window.scrollY < 100) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScrollTo = (elementId: string) => {
    const element = document.querySelector(elementId)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Background blur overlay */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-20 z-40"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 100%)',
          backdropFilter: `blur(${navBlur}px)`
        }}
      />

      {/* Spectacular Floating Navbar */}
      <motion.nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          delay: 0.1
        }}
      >
        {/* Main container with spectacular effects */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            filter: `drop-shadow(0 20px 40px hsl(var(--primary)/0.15))`
          }}
          whileHover={{ 
            scale: 1.02,
            filter: `drop-shadow(0 25px 50px hsl(var(--primary)/0.25))`
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Enhanced BorderBeam */}
          <BorderBeam
            size={80}
            duration={6}
            initialOffset={0}
            colorFrom="hsl(var(--primary))"
            colorTo="transparent"
            className="from-transparent via-primary/60 to-transparent"
          />
          
          {/* Glassmorphism background */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, 
                hsl(var(--background)/0.9) 0%, 
                hsl(var(--background)/0.7) 100%)`,
              backdropFilter: 'blur(20px) saturate(1.2)',
              border: '1px solid hsl(var(--border)/0.2)',
              boxShadow: `
                inset 0 1px 0 hsl(var(--background)/0.5),
                0 0 0 1px hsl(var(--primary)/0.05)
              `
            }}
            animate={{
              background: isScrolled 
                ? `linear-gradient(135deg, 
                    hsl(var(--background)/0.95) 0%, 
                    hsl(var(--background)/0.85) 100%)`
                : `linear-gradient(135deg, 
                    hsl(var(--background)/0.9) 0%, 
                    hsl(var(--background)/0.7) 100%)`
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
          
          {/* Rotating border glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, 
                transparent 0%, 
                hsl(var(--primary)/0.3) 25%, 
                transparent 50%, 
                hsl(var(--primary)/0.2) 75%, 
                transparent 100%)`,
              padding: '1px',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor'
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />

          {/* Content */}
          <div className="relative flex items-center justify-between w-full gap-4 px-6 py-3">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg"
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  boxShadow: "0 8px 25px hsl(var(--primary)/0.4)"
                }}
                transition={{ duration: 0.3 }}
              >
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-foreground">Signals</span>
                <motion.span 
                  className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium ml-2 border border-primary/30"
                  whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary)/0.3)" }}
                >
                  AI
                </motion.span>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    smoothScrollTo(item.href)
                  }}
                  className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-lg border border-primary/20"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <motion.button
                className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-background/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
              
              <motion.button
                className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg font-medium text-sm shadow-lg flex items-center space-x-1.5"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 25px hsl(var(--primary)/0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Started</span>
                <Sparkles className="w-4 h-4" />
              </motion.button>

              {/* Mobile toggle */}
              <motion.button
                className="md:hidden w-8 h-8 rounded-lg border border-border/30 bg-background/30 flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-20 left-4 right-4 z-40 md:hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      smoothScrollTo(item.href)
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 transition-colors"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
                <div className="border-t border-border/30 pt-4 mt-4">
                  <motion.button
                    className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Get Started</span>
                    <Sparkles className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
