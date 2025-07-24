'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Script from 'next/script'

export default function RocketTracker() {
  const [isReady, setIsReady] = useState(false)
  const [shouldStop, setShouldStop] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const rocketRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Calculate rocket position based on scroll (shows full page progress)
  const rocketY = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    ['25vh', '75vh', '80vh'] // Start lower, reach 100% at 90% scroll
  )
  
  // Smooth spring animation for rocket movement
  const smoothY = useSpring(rocketY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  // Rocket stays visible throughout the scroll
  const rocketOpacity = useTransform(
    scrollYProgress,
    [0, 0.98, 1],
    [1, 1, 0]
  )
  
  const rocketScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.3]
  )
  
  // Trail height based on rocket position
  const trailHeight = useTransform(
    scrollYProgress,
    [0, 0.9],
    ['0vh', '70vh']
  )
  
  // Removed trail and fire effects since Lottie animation handles all visuals

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Keep rocket animating throughout the scroll, only stop at very end
      setShouldStop(latest >= 0.98)
      // Show 100% when reaching 90% scroll (in CTA section)
      setScrollPercent(Math.round(Math.min(latest / 0.9, 1) * 100))
    })
    
    return unsubscribe
  }, [scrollYProgress, isReady, isScriptLoaded])

  // Check if Lottie is already available (from LoadingScreen)
  useEffect(() => {
    console.log('RocketTracker mounted')
    // Check if dotlottie-wc is already available
    if (typeof window !== 'undefined' && window.customElements.get('dotlottie-wc')) {
      console.log('RocketTracker: dotlottie-wc already registered')
      setIsScriptLoaded(true)
      setIsReady(true)
    }
  }, [])

  // Debug effect to log component state
  useEffect(() => {
    console.log('RocketTracker state - isScriptLoaded:', isScriptLoaded, 'isReady:', isReady)
  }, [isScriptLoaded, isReady])

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
            console.log('RocketTracker: Lottie script loaded successfully')
            setIsScriptLoaded(true)
            setTimeout(() => {
              console.log('RocketTracker: Setting isReady to true')
              setIsReady(true)
            }, 100)
          }}
          onError={() => {
            console.log('RocketTracker: Lottie script failed to load')
            setIsReady(false)
          }}
        />
      )}
      
      <motion.div
        ref={rocketRef}
        className="fixed right-4 md:right-8 z-40 pointer-events-none"
        style={{ 
          y: smoothY,
          opacity: rocketOpacity,
          scale: rocketScale
        }}
      >
        <div className="relative">
          {/* Progress trail behind rocket */}
          <motion.div 
            className="absolute right-10 top-0 w-1 bg-gradient-to-b from-cosmic-cyan/50 to-transparent rounded-full"
            style={{ 
              height: trailHeight,
              transformOrigin: 'top',
              transform: 'translateY(-100%)'
            }} 
          />
          
          {/* Progress indicator */}
          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Arrow pointing to rocket */}
            <div className="w-0 h-0 border-t-2 border-b-2 border-r-4 border-transparent border-r-cosmic-cyan/50" />
            <div className="bg-space-dark/80 backdrop-blur-sm border border-cosmic-cyan/20 rounded-full px-3 py-1">
              <motion.span 
                className="text-xs font-mono text-cosmic-cyan"
                style={{ opacity: rocketOpacity }}
              >
                {scrollPercent}%
              </motion.span>
            </div>
          </div>
          
          {/* Always show something - either Lottie or fallback SVG */}
          <div className="relative">
            {/* Glow effect behind rocket */}
            <div className="absolute inset-0 blur-xl">
              <div className="w-20 h-20 bg-cosmic-cyan/30 rounded-full animate-pulse-glow" />
            </div>
            
            {/* Lottie Rocket Animation Only */}
            {isReady ? (
              <dotlottie-wc
                src="https://lottie.host/7bc152c5-4407-43df-aa01-74799dda8ca8/6l1unkOmFF.json"
                style={{ width: '80px', height: '80px', transform: 'rotate(180deg)' }}
                speed="1"
                autoplay
                loop={!shouldStop}
              />
            ) : isScriptLoaded ? (
              // Show a loading indicator while Lottie element registers
              <div className="w-20 h-20 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-cosmic-cyan/30 border-t-cosmic-cyan rounded-full animate-spin"></div>
              </div>
            ) : null}
          </div>
          
        </div>
        
      </motion.div>
    </>
  )
}