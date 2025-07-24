'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { Github } from 'lucide-react'

const crewMembers = [
  {
    name: 'Rahul Kumar',
    role: 'Full-Stack Engineer',
    initials: 'RK',
    github: 'https://github.com/Rahulkumarhavit',
    profileImage: 'https://avatars.githubusercontent.com/u/92990906?v=4'
  },
  {
    name: 'Mukela Katungu',
    role: 'Full-Stack Engineer', 
    initials: 'MK',
    github: 'https://github.com/Mukela12',
    profileImage: 'https://avatars.githubusercontent.com/u/65640620?v=4'
  }
]

export default function Crew() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

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
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const codeLines = [
    { text: "const fluxium = {", delay: 0 },
    { text: '  mission: "Build stuff that works",', delay: 0.2 },
    { text: '  approach: "No BS, just code",', delay: 0.4 },
    { text: '  stack: ["React", "Node", "Whatever fits"],', delay: 0.6 },
    { text: '  deliveryTime: "On time, every time",', delay: 0.8 },
    { text: '  bugs: null, // We wish 😅', delay: 1.0 },
    { text: "};", delay: 1.2 },
    { text: "", delay: 1.4 },
    { text: "// Ready to launch?", delay: 1.6 },
    { text: "fluxium.launch(yourProject);", delay: 1.8 }
  ]

  return (
    <section className="section-padding relative overflow-hidden" id="crew">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Content Side */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-fluid-4xl font-display font-bold mb-6">
                The <span className="gradient-text">Crew</span>
              </h2>
              <div className="space-y-4 text-fluid-lg text-text-muted leading-relaxed">
                <p>
                  Hey, we&apos;re Rahul and Mukela. We started Fluxium because we got tired of seeing good ideas die in bad execution.
                </p>
                <p>
                  We write code that scales, design interfaces people actually want to use, and deliver projects on time. Wild concept, right?
                </p>
                <p>
                  From healthcare platforms that doctors love to logistics systems that handle thousands of deliveries daily, we build stuff that works. No fancy jargon, no endless meetings, just solid engineering.
                </p>
              </div>
            </div>

            {/* Founders Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {crewMembers.map((member) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="group h-full"
                >
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                    aria-label={`View ${member.name}'s GitHub profile`}
                  >
                    <div className="premium-card p-6 hover:scale-105 transition-transform duration-300 h-full flex flex-col justify-center cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-cosmic-purple to-cosmic-cyan p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden bg-space-deep flex items-center justify-center relative">
                              <Image
                                src={member.profileImage}
                                alt={member.name}
                                width={60}
                                height={60}
                                className="rounded-full object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Online Status Indicator */}
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-space-deep animate-pulse" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white group-hover:text-cosmic-cyan transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-sm text-text-muted font-mono">
                            {member.role}
                          </p>
                        </div>
                        
                        <div className="p-2 rounded-lg bg-white/5 text-text-dim group-hover:text-cosmic-cyan transition-all duration-200 border border-white/10 group-hover:border-cosmic-cyan/40">
                          <Github className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Animation Side */}
          <motion.div variants={itemVariants} className="lg:pl-8">
            <div className="premium-card p-8 bg-space-deep/50 backdrop-blur-xl border-2 border-cosmic-cyan/20">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm font-mono text-text-dim">fluxium.js</span>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      delay: line.delay + 0.5,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    className={`${
                      line.text.includes('//') ? 'text-green-400' :
                      line.text.includes('"') ? 'text-yellow-300' :
                      line.text.includes(':') ? 'text-blue-300' :
                      line.text.includes('const') || line.text.includes('fluxium.') ? 'text-purple-400' :
                      'text-white'
                    }`}
                  >
                    {line.text || '\u00A0'}
                  </motion.div>
                ))}
              </div>
              
              {/* Terminal Cursor */}
              <motion.div
                className="w-2 h-5 bg-cosmic-cyan mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}