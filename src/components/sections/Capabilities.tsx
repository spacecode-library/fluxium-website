'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code2, 
  Smartphone, 
  Brain, 
  Heart, 
  Zap, 
  Cloud 
} from 'lucide-react'
import type { Capability } from '@/types'

const capabilities: Capability[] = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Custom Web Applications",
    description: "Beautiful, fast business software built from scratch. We create stunning user interfaces with lightning-fast backends optimized for your specific business needs. Quality code that stands the test of time."
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile Apps for Business",
    description: "Gorgeous apps that work perfectly on iPhone and Android. Professional UI design meets optimized performance. Your customers get an amazing experience while you save on development costs."
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Business Process Automation",
    description: "We automate the repetitive stuff so you can focus on growing your business. From automated customer responses to smart scheduling systems that actually work the way you think."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Healthcare Software",
    description: "HIPAA compliant systems with exceptional user experience. We understand healthcare workflows and build optimized software that helps professionals work faster and more efficiently."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Real Time Features",
    description: "Instant everything. Live chat, real-time updates, automatic notifications. Built with optimized backends that handle high traffic without breaking a sweat."
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Setup & Hosting",
    description: "Enterprise-grade hosting optimized for performance and cost. We architect cloud solutions that scale seamlessly with your growth while keeping your costs predictable."
  }
]

export default function Capabilities() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  }

  return (
    <section className="section-padding relative overflow-hidden" id="capabilities">
      {/* Very subtle background gradient mesh */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cosmic-purple/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cosmic-cyan/15 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-fluid-4xl font-display font-bold mb-6">
            What We <span className="gradient-text">Build For You</span>
          </h2>
          <p className="text-fluid-lg text-text-muted">
            Software solutions that solve business pain points
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className="premium-card h-full relative"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/10 via-transparent to-cosmic-cyan/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-[-1px] bg-gradient-to-r from-cosmic-purple to-cosmic-cyan rounded-2xl blur-sm" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  {/* Icon Container */}
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 mb-6"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="text-cosmic-cyan">
                      {capability.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-fluid-xl font-display font-semibold mb-4 text-white transition-all duration-300">
                    {capability.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted group-hover:text-text-secondary leading-relaxed transition-colors duration-300">
                    {capability.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-cyan flex items-center justify-center">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}