'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { 
  X, 
  Rocket, 
  User, 
  Mail, 
  Phone, 
  DollarSign, 
  Target, 
  Send, 
  Lightbulb,
  Code,
  Zap,
  Sparkles
} from 'lucide-react'

// Dynamically import Lottie Player to avoid SSR issues
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => ({ default: mod.Player })), {
  ssr: false,
  loading: () => <div className="w-32 h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cosmic-cyan border-t-transparent rounded-full animate-spin" />
  </div>
})

interface MissionInitFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  painPoint: string
  additionalInfo: string
}

const projectTypes = [
  'Web Application',
  'Mobile App (iOS/Android)', 
  'E-Commerce Platform',
  'SaaS Product',
  'API/Backend System',
  'AI/ML Integration',
  'Blockchain/Web3',
  'Healthcare Platform',
  'FinTech Solution',
  'Logistics System',
  'Custom Enterprise Solution'
]

const budgetRanges = [
  '$500 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $15,000',
  '$15,000 - $30,000', 
  '$30,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+'
]

export default function MissionInitForm({ isOpen, onClose }: MissionInitFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    painPoint: '',
    additionalInfo: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Validate required fields
    if (!formData.name || !formData.email || !formData.projectType || !formData.painPoint) {
      setError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact/mission-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            phone: '',
            projectType: '',
            budget: '',
            painPoint: '',
            additionalInfo: ''
          })
        }, 3000)
      } else {
        throw new Error('Failed to send mission brief')
      }
    } catch {
      setError('Failed to initialize mission. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.6, -0.05, 0.01, 0.99] as const,
              rotateX: { duration: 0.8 }
            }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden"
          >
            {/* Success State */}
            {isSubmitted ? (
              <div className="bg-gradient-to-br from-space-deep to-space-void backdrop-blur-xl rounded-3xl border border-cosmic-cyan/20 overflow-hidden">
                {/* Premium gradient background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple via-transparent to-cosmic-cyan" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(79,70,229,0.3),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.3),transparent_50%)]" />
                </div>
                
                <div className="relative p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center"
                  >
                    {/* Lottie Animation Container */}
                    <div className="w-32 h-32 mx-auto mb-8 relative">
                      <div className="absolute inset-0 bg-cosmic-cyan/20 blur-3xl rounded-full" />
                      <Player
                        autoplay
                        loop={false}
                        src="https://lottie.host/091d0cc0-0964-43e8-80e4-8c4d11fda213/meJMEwICdf.json"
                        style={{ height: '128px', width: '128px' }}
                        className="relative z-10"
                      />
                    </div>
                    
                    {/* Success Message */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
                        Your Inquiry Has Been Sent
                      </h3>
                      <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out to Fluxium. We&apos;ve received your project details and will respond within 24 hours.
                      </p>
                    </motion.div>
                    
                    {/* Status Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-cosmic-cyan/10 border border-cosmic-cyan/30 rounded-full"
                    >
                      <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-cosmic-cyan animate-pulse" />
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-cosmic-cyan animate-ping" />
                      </div>
                      <span className="text-cosmic-cyan font-medium">Message Delivered Successfully</span>
                    </motion.div>
                    
                    {/* Decorative Elements */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-8 flex justify-center gap-2"
                    >
                      {[...Array(3)].map((_, i) => (
                        <Sparkles 
                          key={i} 
                          className="w-4 h-4 text-cosmic-cyan/40" 
                          style={{ 
                            animation: `pulse 2s ease-in-out ${i * 0.3}s infinite` 
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            ) : (
              /* Form */
              <div className="bg-gradient-to-br from-space-deep/95 to-space-void/95 backdrop-blur-xl rounded-3xl border border-cosmic-cyan/30 overflow-hidden">
                {/* Header */}
                <div className="relative px-8 py-6 bg-gradient-to-r from-cosmic-purple/20 to-cosmic-cyan/20 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-cosmic-purple to-cosmic-cyan">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-white">Mission Initialization</h2>
                        <p className="text-sm text-text-muted">Configure your project parameters</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-mono text-green-400 uppercase tracking-wider">
                      Mission Control Online
                    </span>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8 max-h-[calc(90vh-180px)] overflow-y-auto">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-cosmic-cyan" />
                        Mission Commander Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-text-secondary">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
                            placeholder="Your full name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-text-secondary">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2 text-text-secondary">
                            WhatsApp Number (Optional)
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Specifications */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Code className="w-5 h-5 text-cosmic-cyan" />
                        Mission Specifications
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-text-secondary">
                            Project Type *
                          </label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => handleInputChange('projectType', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white"
                            required
                          >
                            <option value="">Select project type</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type} className="bg-space-deep">
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-text-secondary">
                            Budget Range
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                            <select
                              value={formData.budget}
                              onChange={(e) => handleInputChange('budget', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white"
                            >
                              <option value="">Select budget range</option>
                              {budgetRanges.map((range) => (
                                <option key={range} value={range} className="bg-space-deep">
                                  {range}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mission Objective */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-cosmic-cyan" />
                        Mission Objective
                      </h3>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-text-secondary">
                          Core Problem/Idea *
                        </label>
                        <div className="relative">
                          <Lightbulb className="absolute left-3 top-3 w-4 h-4 text-text-dim" />
                          <textarea
                            value={formData.painPoint}
                            onChange={(e) => handleInputChange('painPoint', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim h-32 resize-none"
                            placeholder="Describe the core problem you're trying to solve or your project idea..."
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-text-secondary">
                          Additional Requirements
                        </label>
                        <textarea
                          value={formData.additionalInfo}
                          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim h-24 resize-none"
                          placeholder="Any additional features, integrations, or requirements..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-mono uppercase tracking-wider"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Transmitting Mission Brief...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            Initialize Mission Sequence
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}