'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'

const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), {
  ssr: false
})

export default function RocketTracker() {
  const [shouldStop, setShouldStop] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const rocketRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Calculate viewport-based position that tracks with scroll
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const maxScroll = 0.85 // Stop at 85% to avoid CTA
  
  // Position rocket proportionally with scroll - it should track the user's position
  const y = useTransform(
    scrollYProgress,
    [0, maxScroll],
    [0, viewportHeight * 0.8] // Move 80% of viewport height
  )

  // Scale transform for launch effect at the end
  const scale = useTransform(
    scrollYProgress,
    [0.75, maxScroll],
    [1, 1.3]
  )
  
  // Trail height grows with scroll progress
  const trailHeight = useTransform(
    scrollYProgress,
    [0, maxScroll],
    [0, 200] // Trail grows to 200px max
  )

  // Spring animation for smooth movement
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    mass: 0.1
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const percent = Math.round(latest * 100)
      setScrollPercent(percent)
      
      // Stop animation when reaching 85% to avoid going into CTA
      if (latest > 0.85) {
        setShouldStop(true)
      } else {
        setShouldStop(false)
      }
    })
    
    return unsubscribe
  }, [scrollYProgress])

  return (
    <motion.div
      ref={rocketRef}
      className="fixed right-8 top-0 z-50 pointer-events-none"
      style={{ y: springY, scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollPercent > 5 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Percentage Display */}
        <motion.div
          className="mb-4 px-3 py-1 rounded-full bg-cosmic-purple/20 border border-cosmic-cyan/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: scrollPercent > 10 ? 1 : 0,
            scale: scrollPercent > 10 ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs font-mono text-cosmic-cyan font-bold">
            {scrollPercent}%
          </span>
        </motion.div>

        {/* Rocket Trail */}
        <motion.div
          className="w-1 bg-gradient-to-b from-cosmic-cyan/60 via-cosmic-purple/40 to-transparent rounded-full mb-2"
          style={{ height: trailHeight }}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollPercent > 10 ? 1 : 0 }}
        />
        
        {/* Rocket Container */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 blur-xl">
            <div className="w-20 h-20 bg-cosmic-cyan/30 rounded-full animate-pulse-glow" />
          </div>
          
          {/* Lottie Rocket Animation */}
          <Player
            src="https://lottie.host/7bc152c5-4407-43df-aa01-74799dda8ca8/6l1unkOmFF.json"
            style={{ width: '80px', height: '80px', transform: 'rotate(180deg)' }}
            speed={1}
            autoplay
            loop={!shouldStop}
          />
        </div>
        
        {/* Mission Progress Text */}
        <motion.div
          className="mt-4 px-2 py-1 rounded bg-space-deep/80 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollPercent > 15 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs text-text-muted font-medium">
            Mission Progress
          </span>
        </motion.div>
      </div>
      
    </motion.div>
  )
}