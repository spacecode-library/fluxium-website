'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, ArrowUpRight, CheckCircle, Calendar, Users, Zap, Activity, Target } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
  onOpenModal?: (project: Project) => void
}

export default function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  // Generate mission metadata for enhanced display
  const missionStatus = project.featured ? 'CRITICAL SUCCESS' : 'MISSION COMPLETE'
  const statusColor = project.featured ? 'text-green-400' : 'text-blue-400'
  const missionDate = '2025'
  
  // Get user metrics based on project - Campus Club and Forex have no public users
  const getImpactMetric = (projectId: string, featured: boolean) => {
    switch (projectId) {
      case '1': // Nurse Nest
        return '500+ nurses'
      case '2': // Frizit
        return '1000+ deliveries'
      case '3': // BotMint
        return '50+ businesses'
      case '4': // Campus Club
        return 'Private beta'
      case '5': // Forex Trading
        return 'Private platform'
      case '6': // Reactlyve
        return 'Beta testing'
      default:
        return featured ? '1000+ users' : '500+ users'
    }
  }
  
  const impactMetric = getImpactMetric(project.id, project.featured)
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onOpenModal) {
      onOpenModal(project)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div onClick={handleCardClick} className="cursor-pointer">
        <motion.article
          className="group relative overflow-hidden rounded-2xl bg-glass-background backdrop-blur-md border border-glass-border h-full mission-card"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {/* Mission Control Header */}
          <div className="relative px-6 py-4 bg-gradient-to-r from-space-deep/90 to-space-deep/70 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
                  MISSION #{project.missionNumber.toString().padStart(3, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-cosmic-cyan" />
                <span className={`text-xs font-mono uppercase ${statusColor}`}>
                  {missionStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Mission Timeline Indicator */}
          <div className="absolute left-0 top-20 bottom-0 w-1 bg-gradient-to-b from-cosmic-cyan via-cosmic-purple to-transparent opacity-60" />
          
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/5 via-transparent to-cosmic-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          
          {/* Image Container with Mission Overlay */}
          <div className="relative h-56 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={project.heroImage || '/placeholder.jpg'}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            
            {/* Mission Control Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space-deep via-space-deep/40 to-transparent z-10" />
            
            {/* Mission Classification Badge */}
            {project.featured && (
              <div className="absolute top-4 left-4 z-20">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-600/90 to-green-500/90 backdrop-blur-sm border border-green-400/30">
                  <Target className="w-3 h-3 text-white" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">PRIORITY</span>
                </div>
              </div>
            )}

            {/* Mission Date Badge */}
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass backdrop-blur-sm border border-white/20">
                <Calendar className="w-3 h-3 text-cosmic-cyan" />
                <span className="text-xs font-mono text-white">{missionDate}</span>
              </div>
            </div>
          </div>
          
          {/* Mission Data Panel */}
          <div className="relative p-6 z-10">
            {/* Mission Classification */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-mono text-cosmic-cyan mb-2 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-cosmic-cyan" />
                {project.category}
              </div>
              <div className="flex items-center gap-1 text-xs text-white/60">
                <Users className="w-3 h-3" />
                <span>{impactMetric}</span>
              </div>
            </div>
            
            {/* Mission Title */}
            <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-cosmic-cyan transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
            
            {/* Mission Brief */}
            <p className="text-text-muted group-hover:text-text-secondary mb-5 line-clamp-3 leading-relaxed transition-colors duration-300 text-sm">
              {project.description}
            </p>
            
            {/* Technical Specifications */}
            <div className="mb-5">
              <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">Tech Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md bg-cosmic-purple/15 border border-cosmic-purple/25 text-white/90 font-mono hover:bg-cosmic-purple/25 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-text-dim font-mono">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
            
            {/* Mission Control Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {/* Access Mission Link */}
              <div className="flex items-center gap-2 text-cosmic-cyan group-hover:text-white transition-colors">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-mono font-medium">ACCESS MISSION</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              
              {/* External Mission Links */}
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-dim hover:text-white transition-all duration-200 border border-white/10 hover:border-white/20"
                    aria-label="View GitHub repository"
                  >
                    <Github className="w-4 h-4" />
                  </button>
                )}
                {project.liveUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-dim hover:text-white transition-all duration-200 border border-white/10 hover:border-white/20"
                    aria-label="View live site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Mission Control Scanning Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-purple to-transparent animate-pulse delay-150" />
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-cosmic-cyan/50 to-transparent animate-pulse delay-75" />
          </motion.div>
          
          {/* Holographic Shimmer Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500" />
          </motion.div>
        </motion.article>
      </div>
    </motion.div>
  )
}