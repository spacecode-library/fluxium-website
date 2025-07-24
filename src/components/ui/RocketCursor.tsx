'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import Script from 'next/script'

export default function RocketCursor() {
  const [isReady, setIsReady] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const rocketRef = useRef<HTMLDivElement>(null)
  
  // Smooth spring animation for cursor movement
  const springX = useSpring(mousePosition.x, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001
  })
  
  const springY = useSpring(mousePosition.y, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001
  })
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset cursor to center the rocket on mouse position
      setMousePosition({ 
        x: e.clientX - 40, // Half of rocket width (80px)
        y: e.clientY - 40  // Half of rocket height (80px)
      })
      setIsVisible(true)
    }
    
    const handleMouseLeave = () => {
      setIsVisible(false)
    }
    
    const handleMouseEnter = () => {
      setIsVisible(true)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  // Check if Lottie is already available
  useEffect(() => {
    console.log('RocketCursor mounted')
    // Check if dotlottie-wc is already available
    if (typeof window !== 'undefined' && window.customElements.get('dotlottie-wc')) {
      console.log('RocketCursor: dotlottie-wc already registered')
      setIsScriptLoaded(true)
      setIsReady(true)
    }
  }, [])

  // Hide default cursor when rocket cursor is active
  useEffect(() => {
    if (isVisible && isReady) {
      document.body.style.cursor = 'none'
    } else {
      document.body.style.cursor = 'auto'
    }
    
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [isVisible, isReady])

  return (
    <>
      {/* Only load script if not already loaded */}
      {!isScriptLoaded && !window.customElements?.get('dotlottie-wc') && (
        <Script 
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" 
          type="module"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          onLoad={() => {
            console.log('RocketCursor: Lottie script loaded successfully')
            setIsScriptLoaded(true)
            setTimeout(() => {
              console.log('RocketCursor: Setting isReady to true')
              setIsReady(true)
            }, 100)
          }}
          onError={() => {
            console.log('RocketCursor: Lottie script failed to load')
            setIsReady(false)
          }}
        />
      )}
      
      <motion.div
        ref={rocketRef}
        className="fixed z-[9998] pointer-events-none"
        style={{ 
          x: springX,
          y: springY,
          opacity: isVisible && isReady ? 1 : 0,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible && isReady ? 1 : 0,
          scale: isVisible && isReady ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          {/* Glow effect behind rocket */}
          <div className="absolute inset-0 blur-lg">
            <div className="w-20 h-20 bg-cosmic-cyan/20 rounded-full animate-pulse-glow" />
          </div>
          
          {/* Lottie Rocket Animation */}
          {isReady && (
            <dotlottie-wc
              src="https://lottie.host/7bc152c5-4407-43df-aa01-74799dda8ca8/6l1unkOmFF.json"
              style={{ width: '80px', height: '80px' }}
              speed="1"
              autoplay
              loop
            />
          )}
        </div>
      </motion.div>
    </>
  )
}