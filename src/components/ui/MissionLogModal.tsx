'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  X, 
  Github, 
  Calendar, 
  Users, 
  Target, 
  Activity,
  Code,
  Globe,
  TrendingUp
} from 'lucide-react'
import type { Project } from '@/types'

interface MissionLogModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function MissionLogModal({ project, isOpen, onClose }: MissionLogModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'metrics'>('overview')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!project) return null

  const missionStatus = project.featured ? 'CRITICAL SUCCESS' : 'MISSION COMPLETE'
  const statusColor = project.featured ? 'text-green-400' : 'text-blue-400'
  const missionDate = '2025'
  
  // Get user metrics based on project - Campus Club and Forex have no public users
  const getImpactMetric = (projectId: string) => {
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
        return '500+ users'
    }
  }
  
  const impactMetric = getImpactMetric(project.id)

  const tabs = [
    { id: 'overview', label: 'Mission Overview', icon: <Target className="w-4 h-4" /> },
    { id: 'technical', label: 'Technical Specs', icon: <Code className="w-4 h-4" /> },
    { id: 'metrics', label: 'Impact Metrics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const technicalSpecs = [
    { label: 'Mission Type', value: project.category },
    { label: 'Deployment Status', value: project.liveUrl ? 'Live' : 'Archived' },
    { label: 'Repository Access', value: project.githubUrl ? 'Available' : 'Classified' },
    { label: 'Tech Stack', value: `${project.technologies.length} components` },
    { label: 'Mission Timeline', value: '3-6 months' },
    { label: 'Team Size', value: '2-4 specialists' }
  ]

  const getMetrics = (projectId: string, impactMetric: string) => {
    switch (projectId) {
      case '1': // Nurse Nest
        return [
          { label: 'Active Nurses', value: impactMetric, trend: '+25%' },
          { label: 'Mission Success Rate', value: '98.5%', trend: '+2.1%' },
          { label: 'Performance Score', value: '96/100', trend: '+8%' },
          { label: 'Client Satisfaction', value: '4.9/5', trend: '+0.3%' }
        ]
      case '2': // Frizit
        return [
          { label: 'Daily Deliveries', value: impactMetric, trend: '+40%' },
          { label: 'On-time Delivery', value: '99.2%', trend: '+1.5%' },
          { label: 'Temperature Control', value: '100%', trend: '0%' },
          { label: 'Client Retention', value: '95%', trend: '+5%' }
        ]
      case '4': // Campus Club
        return [
          { label: 'Status', value: impactMetric, trend: 'N/A' },
          { label: 'Development Progress', value: '90%', trend: '+10%' },
          { label: 'Feature Completion', value: '85/100', trend: '+15%' },
          { label: 'Code Quality', value: 'A+', trend: 'Stable' }
        ]
      case '5': // Forex Trading
        return [
          { label: 'Platform Status', value: impactMetric, trend: 'N/A' },
          { label: 'Trade Execution', value: '<10ms', trend: 'Optimal' },
          { label: 'Uptime', value: '99.9%', trend: '+0.1%' },
          { label: 'Security Score', value: 'AAA', trend: 'Max' }
        ]
      default:
        return [
          { label: 'Active Users', value: impactMetric, trend: '+15%' },
          { label: 'Mission Success Rate', value: '98.5%', trend: '+2.1%' },
          { label: 'Performance Score', value: '94/100', trend: '+8%' },
          { label: 'Client Satisfaction', value: '4.9/5', trend: '+0.2%' }
        ]
    }
  }
  
  const metrics = getMetrics(project.id, impactMetric)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] as const }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-space-deep/95 backdrop-blur-xl rounded-2xl border border-white/20"
          >
            {/* Header */}
            <div className="relative px-6 py-4 bg-gradient-to-r from-cosmic-purple/20 to-cosmic-cyan/20 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
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

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)] overflow-hidden">
              {/* Left Side - Image and Basic Info */}
              <div className="lg:w-1/2 p-6 overflow-y-auto">
                <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={project.heroImage || '/placeholder.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-deep via-transparent to-transparent" />
                  
                  {/* Classification Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-600/90 to-green-500/90 backdrop-blur-sm border border-green-400/30">
                        <Target className="w-3 h-3 text-white" />
                        <span className="text-xs font-semibold text-white uppercase tracking-wide">PRIORITY</span>
                      </div>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-deep/90 backdrop-blur-sm border border-white/20">
                      <Calendar className="w-3 h-3 text-cosmic-cyan" />
                      <span className="text-xs font-mono text-white">{missionDate}</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl lg:text-3xl font-display font-bold mb-3 text-white">
                  {project.title}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="text-xs font-mono text-cosmic-cyan uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-cosmic-cyan" />
                    {project.category}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Users className="w-3 h-3" />
                    <span>{impactMetric}</span>
                  </div>
                </div>

                <p className="text-text-muted leading-relaxed mb-6">
                  {project.longDescription || project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300"
                    >
                      <Globe className="w-4 h-4" />
                      View Live Site
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium rounded-lg transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Side - Tabs and Details */}
              <div className="lg:w-1/2 p-6 lg:border-l border-white/10 overflow-y-auto">
                {/* Tab Navigation */}
                <div className="flex items-center gap-1 mb-6 p-1 bg-white/5 rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'overview' | 'technical' | 'metrics')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6 flex-1">
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Mission Briefing</h3>
                        <p className="text-text-muted leading-relaxed">
                          {project.longDescription || project.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-3 text-white uppercase tracking-wide">Tech Arsenal</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 text-sm rounded-lg bg-cosmic-purple/15 border border-cosmic-purple/25 text-white/90 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'technical' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-white">Technical Specifications</h3>
                      <div className="space-y-3">
                        {technicalSpecs.map((spec) => (
                          <div key={spec.label} className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-text-muted text-sm">{spec.label}</span>
                            <span className="text-white text-sm font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'metrics' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-white">Mission Impact Metrics</h3>
                      <div className="space-y-4">
                        {metrics.map((metric) => (
                          <div key={metric.label} className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-text-muted text-sm">{metric.label}</span>
                              <span className="text-green-400 text-xs font-mono">{metric.trend}</span>
                            </div>
                            <div className="text-white text-lg font-bold">{metric.value}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}