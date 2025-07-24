'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Rocket, Send, Mail, Clock, Zap, ArrowUpRight, Satellite } from 'lucide-react'
import { useRef, useState } from 'react'
import MissionInitForm from '@/components/ui/MissionInitForm'

export default function Launch() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  const handleMissionLaunch = () => {
    setIsButtonClicked(true)
    
    // Open the form after button animation
    setTimeout(() => {
      setIsFormOpen(true)
      setIsButtonClicked(false)
    }, 800)
  }
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="section-padding relative overflow-hidden min-h-screen flex items-center justify-center" 
      id="launch"
    >
      {/* Mission Control Background Elements */}
      <div className="absolute inset-0">
        {/* Deep space gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-cosmic-purple/6 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-cosmic-cyan/6 rounded-full blur-3xl"
          style={{ y: y2 }}
        />
        
        {/* Floating orbital elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 opacity-20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Satellite className="w-8 h-8 text-cosmic-cyan" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 opacity-15"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Satellite className="w-6 h-6 text-cosmic-purple" />
        </motion.div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Mission Control Status */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass border border-white/20 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Rocket className="w-6 h-6 text-cosmic-cyan" />
                  <div className="absolute -inset-2 rounded-full border border-cosmic-cyan/30 animate-ping" />
                </div>
                <span className="text-sm font-mono text-text-secondary uppercase tracking-wider">
                  Launch Sequence Ready
                </span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400 uppercase">All Systems Go</span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-fluid-4xl md:text-fluid-5xl font-display font-bold mb-6 max-w-4xl mx-auto"
          >
            Launch Your Next
            <br />
            <span className="gradient-text">Mission-Critical</span> Project
          </motion.h2>

          {/* Mission Queue Position */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 group"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={handleMissionLaunch}
                className={`text-fluid-6xl font-bold gradient-text relative inline-block hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${isButtonClicked ? 'animate-pulse scale-110' : ''}`}
                aria-label="Click to initialize mission"
              >
                #21
                {/* Orbital ring effect - Accelerates when clicked */}
                <motion.div 
                  className="absolute inset-0 -m-8"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: isButtonClicked ? 5 : 30, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <div className={`w-full h-full rounded-full border border-dashed transition-all ${isButtonClicked ? 'border-cosmic-cyan/80' : 'border-cosmic-cyan/20 group-hover:border-cosmic-cyan/40'}`} />
                </motion.div>
                
                {/* Animated glow - Intensifies when clicked */}
                <div className={`absolute inset-0 blur-3xl bg-gradient-to-r from-cosmic-purple to-cosmic-cyan animate-pulse transition-opacity ${isButtonClicked ? 'opacity-60' : 'opacity-20 group-hover:opacity-40'}`} />
                
                {/* Spinning Ring - Accelerates and brightens when clicked */}
                <motion.div
                  className="absolute inset-0 -m-12"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: isButtonClicked ? 3 : 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <div className={`w-full h-full rounded-full border-2 border-transparent border-t-cosmic-cyan border-r-cosmic-purple transition-opacity ${isButtonClicked ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'}`} />
                </motion.div>

                {/* Second Orbital Ring - Counter-accelerates when clicked */}
                <motion.div
                  className="absolute inset-0 -m-16"
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: isButtonClicked ? 4 : 25, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <div className="relative w-full h-full">
                    {/* Outer spinning ring - Brightens when clicked */}
                    <div className={`w-full h-full rounded-full border border-transparent border-b-cosmic-purple border-l-cosmic-cyan transition-opacity ${isButtonClicked ? 'opacity-80' : 'opacity-30 group-hover:opacity-60'}`} />
                    
                    {/* Small orbital indicator - Scales and brightens when clicked */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: isButtonClicked ? 4 : 25, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      <div className={`w-3 h-3 rounded-full shadow-sm shadow-cosmic-cyan/50 transition-all ${isButtonClicked ? 'scale-150 bg-cosmic-cyan shadow-cosmic-cyan/100' : 'bg-cosmic-cyan/70 group-hover:scale-125 group-hover:bg-cosmic-cyan'}`}>
                        <div className={`w-full h-full rounded-full bg-cosmic-cyan ${isButtonClicked ? 'animate-ping' : 'animate-pulse'}`} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Energy burst effect when clicked */}
                {isButtonClicked && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.8, 1.2, 1.5] 
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-cosmic-cyan/50 animate-ping" />
                    <div className="absolute inset-0 -m-4 rounded-full border border-cosmic-purple/30 animate-ping" style={{ animationDelay: '0.1s' }} />
                    <div className="absolute inset-0 -m-8 rounded-full border border-cosmic-cyan/20 animate-ping" style={{ animationDelay: '0.2s' }} />
                  </motion.div>
                )}

                {/* Enhanced hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                
                {/* Subtle button-like background on hover */}
                <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-cosmic-purple/5 to-cosmic-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-white/10 group-hover:border-white/20" />
              </button>
            </div>
            <div className="text-sm font-mono text-text-muted uppercase tracking-wider">
              Next in Launch Queue
            </div>
            
            {/* Dynamic instruction text */}
            <motion.div
              className={`text-xs font-mono uppercase tracking-wider mt-2 transition-all duration-300 ${
                isButtonClicked 
                  ? 'text-green-400 opacity-100' 
                  : 'text-cosmic-cyan opacity-0 group-hover:opacity-100'
              }`}
              initial={{ y: 10 }}
              animate={{ y: 0 }}
            >
              {isButtonClicked ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 border border-green-400 border-t-transparent rounded-full"
                  />
                  Initializing Mission...
                </motion.span>
              ) : (
                'Click to Initialize Mission'
              )}
            </motion.div>
          </motion.div>

          {/* Mission Brief */}
          <motion.p
            variants={itemVariants}
            className="text-fluid-xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            From concept to deployment, we engineer solutions that perform under pressure.
            <br />
            Ready to initiate your mission sequence?
          </motion.p>

          {/* Mission Launch Button */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
          >

            {/* Energy Beam Effect when clicked */}
            {isButtonClicked && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-cyan/20 via-transparent to-cosmic-purple/20 rounded-2xl blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/10 to-cosmic-cyan/10 rounded-2xl animate-pulse" />
              </motion.div>
            )}
            
            {/* Mission Control Grid */}
            <motion.div
              className="absolute -inset-8 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
              initial={false}
            >
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Mission Parameters */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-8 text-xs font-mono text-text-dim uppercase tracking-wider"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cosmic-cyan" />
              <span>T-Minus: Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-400" />
              <span>Fuel: 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-yellow-400" />
              <span>Trajectory: Optimal</span>
            </div>
          </motion.div>

          {/* Mission Control Communications */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            <a 
              href="mailto:hello@fluxium.dev?subject=New Project Inquiry&body=Hi Fluxium Team,%0D%0A%0D%0AI'm interested in discussing a new project. Here are the details:%0D%0A%0D%0AProject Type: %0D%0ATechnology Requirements: %0D%0ATimeline: %0D%0ABudget Range: %0D%0A%0D%0ALooking forward to hearing from you!"
              className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl glass border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Send project inquiry email to hello@fluxium.dev"
              role="button"
            >
              <Mail className="w-4 h-4 text-cosmic-cyan group-hover:text-white transition-colors" />
              <div className="text-left">
                <div className="text-sm font-mono text-white group-hover:text-cosmic-cyan transition-colors">
                  hello@fluxium.dev
                </div>
                <div className="text-xs text-text-dim uppercase tracking-wide">
                  Primary Channel
                </div>
              </div>
            </a>
            
            <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl glass border border-white/10 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-green-400" />
              <div className="text-left">
                <div className="text-sm font-mono text-white">
                  24 Hour Response
                </div>
                <div className="text-xs text-text-dim uppercase tracking-wide">
                  Mission SLA
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Mission Initialization Form */}
      <MissionInitForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </section>
  )
}