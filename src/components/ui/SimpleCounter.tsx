'use client'

import { useEffect, useState } from 'react'

interface SimpleCounterProps {
  end: number
  suffix?: string
  className?: string
  trigger: boolean
}

export default function SimpleCounter({ 
  end, 
  suffix = '', 
  className = '',
  trigger 
}: SimpleCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('SimpleCounter - trigger:', trigger, 'end:', end)
    
    if (!trigger) {
      setCount(0)
      return
    }

    console.log('SimpleCounter starting animation to:', end)
    
    // Simple step-by-step animation
    let current = 0
    const increment = Math.max(1, Math.ceil(end / 60)) // 60 steps for smooth animation
    const duration = 2000 // 2 seconds
    const stepTime = duration / (end / increment)

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        current = end
        clearInterval(timer)
      }
      console.log('SimpleCounter updating count to:', current)
      setCount(current)
    }, stepTime)

    return () => clearInterval(timer)
  }, [trigger, end])

  return (
    <span className={className}>
      {count}{suffix}
    </span>
  )
}