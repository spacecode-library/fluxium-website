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
  
  // Smooth position transform
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vh', '90vh']
  )

  // Scale transform for launch effect
  const scale = useTransform(
    scrollYProgress,
    [0.95, 1],
    [1, 1.3]
  )
  
  // Trail height based on rocket position
  const trailHeight = useTransform(
    scrollYProgress,
    [0, 0.9],
    ['0vh', '70vh']
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
      
      // Stop animation when very close to the end
      if (latest > 0.95) {
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
          
          {/* Lottie Rocket Animation Only */}
          <Player
            src="https://lottie.host/7bc152c5-4407-43df-aa01-74799dda8ca8/6l1unkOmFF.json"
            style={{ width: '80px', height: '80px', transform: 'rotate(180deg)' }}
            speed={1}
            autoplay
            loop={!shouldStop}
          />
        </div>
        
      </div>
      
    </motion.div>
  )
}