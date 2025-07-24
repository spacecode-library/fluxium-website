'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing Mission Control...')
  
  // Generate fixed positions to avoid hydration mismatch
  const particlePositions = Array.from({ length: 20 }, (_, i) => ({
    left: (i * 37 + 13) % 100, // Deterministic positioning
    top: (i * 29 + 23) % 100,
    delay: i * 0.15,
    duration: 3 + (i % 3)
  }))

  // Realistic loading progression with text updates
  useEffect(() => {
    const phases = [
      { progress: 15, text: 'Loading starfield dynamics...' },
      { progress: 35, text: 'Calibrating rocket trajectory...' },
      { progress: 55, text: 'Synchronizing mission systems...' },
      { progress: 75, text: 'Preparing launch sequence...' },
      { progress: 90, text: 'Finalizing orbital mechanics...' },
      { progress: 100, text: 'Mission ready for launch!' }
    ]

    let currentPhase = 0
    const interval = setInterval(() => {
      if (currentPhase < phases.length) {
        const phase = phases[currentPhase]
        setProgress(phase.progress)
        setLoadingText(phase.text)
        
        if (phase.progress === 100) {
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => {
              onComplete?.()
            }, 2000)
          }, 800)
        }
        
        currentPhase++
      }
    }, 800)

    return () => clearInterval(interval)
  }, [onComplete])

  const handleComplete = () => {
    setIsComplete(true)
    // Premium SVG morphing exit animation timing
    setTimeout(() => {
      onComplete?.()
    }, 2000) // Longer for premium morphing animation
  }

  return (
    <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-space-void"
        initial={{ opacity: 1 }}
        animate={{ opacity: isComplete ? 0 : 1 }}
        transition={{ duration: isComplete ? 2 : 0.5 }}
        onAnimationComplete={() => isComplete && onComplete?.()}
      >
        {/* Premium SVG Morphing Overlay for Exit Animation */}
        {isComplete && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 1000 1000" 
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
                fill="rgb(0, 0, 0)"
                initial={{ d: "M0,1005S175,995,500,995s500,5,500,5V0H0Z" }}
                animate={{ 
                  d: [
                    "M0,1005S175,995,500,995s500,5,500,5V0H0Z",
                    "M0 502S175 272 500 272s500 230 500 230V0H0Z",
                    "M0 2S175 1 500 1s500 1 500 1V0H0Z"
                  ]
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.76, 0, 0.24, 1], // Premium cubic-bezier
                  times: [0, 0.6, 1]
                }}
              />
            </svg>
          </motion.div>
        )}
        {/* Background with premium starfield effect */}
        <div className="absolute inset-0">
          {/* Subtle animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-purple/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-cyan/8 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.08, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Floating particles */}
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Main loading content */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center min-h-screen">
          {/* Fluxium Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              delay: 0.2
            }}
          >
            <Image
              src="https://res.cloudinary.com/dizbrnm2l/image/upload/v1752674056/Fluxium-logo_rbhphy.svg"
              alt="Fluxium"
              width={200}
              height={80}
              className="relative z-10"
              priority
            />
          </motion.div>

          {/* Loading text with typewriter effect */}
          <motion.div
            className="space-y-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Fluxium
            </motion.h1>
            
            <motion.p
              className="text-text-muted text-lg font-medium"
              key={loadingText} // Re-animate when text changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {loadingText}
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mt-12 w-64 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cosmic-purple to-cosmic-cyan"
                style={{ width: `${progress}%` }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
            </div>
            
            {/* Progress percentage */}
            <motion.div 
              className="text-center mt-3"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-mono text-cosmic-cyan">
                {progress}%
              </span>
            </motion.div>
            
            {/* Progress dots */}
            <div className="flex justify-between mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-cosmic-cyan/30"
                  animate={{
                    backgroundColor: [
                      'rgba(6, 182, 212, 0.3)',
                      'rgba(6, 182, 212, 1)',
                      'rgba(6, 182, 212, 0.3)'
                    ],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2 + 2.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skip button */}
        <motion.button
          className="absolute bottom-8 right-8 text-text-dim hover:text-white transition-colors text-sm"
          onClick={handleComplete}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          Skip →
        </motion.button>
      </motion.div>
  )
}