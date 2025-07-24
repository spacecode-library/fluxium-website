'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProjectCard from '@/components/ui/ProjectCard'
import MissionLogModal from '@/components/ui/MissionLogModal'
import type { Project } from '@/types'

// Mock data for now - will be replaced with dynamic data from database
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Nurse Nest Healthcare Platform',
    slug: 'nurse-nest-healthcare',
    description: 'Built a platform where nurses find work and facilities find nurses. Handled the tricky bits: secure payments, automated timecards, and making sure everything&apos;s HIPAA-compliant. 500+ nurses using it daily.',
    longDescription: 'A comprehensive healthcare platform designed to bridge the gap between nursing professionals and healthcare facilities. The platform handles complex scheduling algorithms, secure payment processing through Stripe, automated timecard management, and ensures complete HIPAA compliance. Features include real-time matching, geolocation-based job searches, instant notifications, and comprehensive background verification systems.',
    category: 'Healthcare',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    technologies: ['React', 'Supabase', 'Stripe', 'HIPAA', 'Node.js'],
    screenshots: [],
    githubUrl: 'https://github.com/spacecode-library/nurse-nest-97',
    liveUrl: 'https://nurse-nest.lovable.app/',
    featured: true,
    missionNumber: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Frizit Logistics Platform',
    slug: 'frizit-logistics',
    description: 'Cold chain logistics was a mess. We fixed it. Real-time tracking, automated dispatch, and dashboards that make sense. Now handling 1,000+ deliveries daily without breaking a sweat.',
    longDescription: 'A sophisticated cold chain logistics management system that revolutionizes temperature-sensitive delivery operations. The platform features real-time GPS tracking, automated dispatch algorithms, intelligent route optimization, and comprehensive analytics dashboards. Integrated IoT sensors monitor temperature throughout the delivery chain, ensuring product integrity and regulatory compliance.',
    category: 'Logistics',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'GPS', 'AWS'],
    screenshots: [],
    githubUrl: '',
    liveUrl: 'https://frizit.in',
    featured: true,
    missionNumber: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'BotMint AI Assistant',
    slug: 'botmint-ai',
    description: 'Gave businesses their own AI assistant. No more &quot;press 1 for sales&quot; nonsense. Just conversations that actually help customers and don&apos;t waste everyone&apos;s time.',
    longDescription: 'An intelligent conversational AI platform that transforms customer service interactions. Built with advanced natural language processing, the system understands context, intent, and sentiment. Features include multi-language support, seamless human handoff, analytics dashboard, and integration with existing CRM systems. The AI learns from each interaction to continuously improve response quality.',
    category: 'AI/ML',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'OpenAI', 'Socket.io', 'MongoDB', 'Python'],
    screenshots: [],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    missionNumber: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'CampusClub',
    slug: 'campusclub',
    description: 'Students love discounts. Businesses love customers. We connected them. Location-based deals, instant verification, everybody wins. Multi-platform ecosystem in development.',
    longDescription: 'A comprehensive location-based marketplace connecting students with local businesses through exclusive deals and discounts. The platform features geofenced offers, instant student ID verification, social sharing capabilities, and merchant analytics. Built as a multi-platform ecosystem with separate apps for students, merchants, and administrators. Advanced algorithms match students with relevant deals based on location, preferences, and spending patterns, creating a win-win ecosystem for education and commerce. Additional repositories: CampusClubMerchant and CampusClub-Admin.',
    category: 'E-Commerce',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Express', 'JWT', 'Maps API', 'PostgreSQL'],
    screenshots: [],
    githubUrl: 'https://github.com/spacecode-library/CampusClubStudent',
    liveUrl: '',
    featured: false,
    missionNumber: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    title: 'Forex Trading Platform',
    slug: 'forex-trading',
    description: 'Real-time market data, instant trades, zero downtime. When money moves this fast, the code better keep up. MetaTrader integration included.',
    longDescription: 'A high-performance financial trading platform built for speed and reliability. Features real-time market data feeds, advanced charting tools, risk management systems, and seamless MetaTrader integration. The platform handles microsecond-level trade execution, comprehensive analytics, and robust security measures to protect financial transactions. Built with separate frontend and backend repositories for optimal scalability. Additional repository: forex-app-backend.',
    category: 'FinTech',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    technologies: ['React', 'WebSocket', 'MT5', 'Redis', 'Node.js'],
    screenshots: [],
    githubUrl: 'https://github.com/spacecode-library/forex-app',
    liveUrl: '',
    featured: false,
    missionNumber: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    title: 'Reactlyve Video Reactions',
    slug: 'reactlyve',
    description: 'Record reactions to messages in real-time. Because sometimes a thumbs up isn&apos;t enough. Video responses that actually capture emotion.',
    longDescription: 'An innovative communication platform that enables real-time video reactions to messages and content. Built with WebRTC technology for seamless peer-to-peer connections, the platform features instant video recording, emotion recognition, content moderation, and social sharing capabilities. Advanced video processing ensures optimal quality while maintaining low latency for authentic real-time interactions.',
    category: 'SaaS',
    heroImage: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=800&h=600&fit=crop',
    technologies: ['WebRTC', 'React', 'Node.js', 'AWS', 'FFmpeg'],
    screenshots: [],
    githubUrl: 'https://github.com/spacecode-library/reactlyve',
    liveUrl: '',
    featured: false,
    missionNumber: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function Missions() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="section-padding relative overflow-hidden" id="missions">
      {/* Very subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cosmic-purple/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-cosmic-cyan/5 rounded-full blur-3xl -translate-x-1/2" />
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
            Mission <span className="gradient-text">Log</span>
          </h2>
          <p className="text-fluid-lg text-text-muted">
            Projects we&apos;ve shipped (and clients who still talk to us)
          </p>
        </motion.div>

        {/* Featured Projects Section */}
        <motion.div
          ref={ref}
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-display font-semibold text-white mb-2">Featured Missions</h3>
            <p className="text-text-muted">Our biggest successes and most interesting challenges</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockProjects
              .filter(project => project.featured)
              .map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onOpenModal={handleOpenModal} />
              ))}
          </div>
        </motion.div>

        {/* Other Projects Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-display font-semibold text-white mb-2">More Missions</h3>
            <p className="text-text-muted">Additional projects across different industries</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProjects
              .filter(project => !project.featured)
              .map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + 2} onOpenModal={handleOpenModal} />
              ))}
          </div>
        </motion.div>

        {/* Action Links */}
        <motion.div
          className="text-center mt-12 space-y-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/projects" className="inline-flex items-center gap-2 text-cosmic-cyan hover:text-white transition-colors">
              <span className="font-medium">View All Missions</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="https://github.com/spacecode-library" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 hover:border-cosmic-cyan/40 text-white hover:text-cosmic-cyan transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Open Source Library</span>
            </Link>
          </div>
          
        </motion.div>
      </div>

      {/* Mission Log Modal */}
      <MissionLogModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

