'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/Navigation'
import Starfield from '@/components/ui/Starfield'
import RocketTracker from '@/components/ui/RocketTracker'
import LoadingScreen from '@/components/ui/LoadingScreen'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Capabilities from '@/components/sections/Capabilities'
import Missions from '@/components/sections/Missions'
import Crew from '@/components/sections/Crew'
import Launch from '@/components/sections/Launch'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  useEffect(() => {
    // Auto-complete loading after 5 seconds maximum
    const timer = setTimeout(() => {
      if (isLoading) {
        handleLoadingComplete()
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [isLoading])

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <>
      {/* Background Elements */}
      {showContent && (
        <>
          <Starfield />
          <RocketTracker />
        </>
      )}
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content - Add top padding to account for fixed navbar */}
      <main className="relative min-h-screen">
        <Hero />
        <div className="space-y-16 md:space-y-24">
          <Stats />
          <Capabilities />
          <Crew />
          <div className="space-y-12 md:space-y-16">
            <Missions />
            <Launch />
          </div>
        </div>
      </main>
    </>
  )
}
