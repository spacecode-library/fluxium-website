'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import MissionInitForm from '@/components/ui/MissionInitForm'
import TechLogos from '@/components/ui/TechLogos'

export default function Hero() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  
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
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24" id="home">
      {/* Very subtle background enhancement - minimal interference with starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-cosmic-purple/5 rounded-full blur-3xl"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cosmic-cyan/5 rounded-full blur-3xl"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 }
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-sm font-medium text-text-secondary">
                Software for Growing Businesses
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-fluid-5xl md:text-fluid-6xl font-display font-bold mb-6 leading-[0.9]"
          >
            Custom Software{' '}
            <span className="relative inline-block">
              <span className="gradient-text">For Small Business</span>
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </span>
            <br />
            That Grows With You
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-fluid-lg md:text-fluid-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            We create custom software that handles the repetitive work, streamlines your operations, and gives you the competitive edge you need.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#missions"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-full overflow-hidden"
            >
              {/* Button gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan" />
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              
              {/* Button content */}
              <span className="relative flex items-center gap-2">
                See Our Work
                <motion.div
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Link>

            <button
              onClick={() => setIsFormOpen(true)}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold transition-all duration-300 rounded-full overflow-hidden border border-white/20 backdrop-blur-sm hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/20 to-cosmic-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              
              {/* Enhanced border on hover */}
              <div className="absolute inset-0 border border-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Button content */}
              <span className="relative text-white">
                Start Your Project
              </span>
            </button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "20+", label: "Projects Shipped" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "15+", label: "Technologies" },
              { number: "6", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-text-dim">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <TechLogos />
          </motion.div>
        </motion.div>
      </div>

      {/* Mission Initialization Form */}
      <MissionInitForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </section>
  )
}