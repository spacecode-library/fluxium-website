'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Rocket, Shield, Code2, Clock } from 'lucide-react'
import SimpleCounter from '@/components/ui/SimpleCounter'

const stats = [
  {
    icon: <Rocket className="w-6 h-6" />,
    number: 20,
    suffix: '+',
    label: 'Missions Completed',
    description: 'Successfully launched projects'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    number: 100,
    suffix: '%',
    label: 'Success Rate',
    description: 'Client satisfaction guaranteed'
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    number: 15,
    suffix: '+',
    label: 'Technologies Mastered',
    description: 'From React to AI/ML'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    number: 6,
    suffix: '',
    label: 'Years in Orbit',
    description: 'Shipping quality code'
  }
]

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Debug logging
  console.log('Stats component - inView:', inView)

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
    <section className="section-padding relative overflow-hidden">
      {/* Very subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cosmic-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="premium-card text-center relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/10 via-transparent to-cosmic-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-cosmic-cyan">
                    {stat.icon}
                  </div>
                </div>

                {/* Number */}
                <div className="text-fluid-4xl font-bold mb-2">
                  <SimpleCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    className="gradient-text"
                    trigger={inView}
                  />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-dim">
                  {stat.description}
                </p>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 border border-cosmic-cyan/20 rounded-2xl"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}