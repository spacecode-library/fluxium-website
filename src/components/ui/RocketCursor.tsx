'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'

export default function RocketCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const rocketRef = useRef<HTMLDivElement>(null)
  
  // Smooth spring animation for cursor movement
  const springX = useSpring(mousePosition.x, {
    stiffness: 260,
    damping: 20,
    mass: 0.8
  })
  
  const springY = useSpring(mousePosition.y, {
    stiffness: 260,
    damping: 20,
    mass: 0.8
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX - 40, y: e.clientY - 40 })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Track mouse movement
    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      ref={rocketRef}
      className="fixed z-[9998] pointer-events-none"
      style={{ 
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* Rocket trail/glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/30 to-cosmic-purple/30 rounded-full blur-md animate-pulse" />
        
        {/* Lottie Rocket Animation */}
        <Player
          src="https://lottie.host/7bc152c5-4407-43df-aa01-74799dda8ca8/6l1unkOmFF.json"
          style={{ width: '80px', height: '80px' }}
          speed={1}
          autoplay
          loop
        />
      </div>
    </motion.div>
  )
}