'use client'

import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  separator?: string
  className?: string
  trigger: boolean
}

export default function AnimatedCounter({ 
  end, 
  duration = 2500, 
  suffix = '', 
  separator = ',',
  className = '',
  trigger 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    console.log('AnimatedCounter - trigger:', trigger, 'end:', end, 'isAnimating:', isAnimating)
    
    if (!trigger || isAnimating) return

    console.log('Starting animation for:', end)
    setIsAnimating(true)
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
        setIsAnimating(false)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [trigger, end, duration, isAnimating])

  const formatNumber = (num: number) => {
    return separator ? num.toLocaleString() : num.toString()
  }

  return (
    <span className={className}>
      {formatNumber(count)}{suffix}
    </span>
  )
}