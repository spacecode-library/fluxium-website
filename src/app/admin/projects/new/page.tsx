'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Link as LinkIcon,
  Github,
  ExternalLink,
  Save,
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectForm {
  title: string
  slug: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  heroImage: File | null
  screenshots: File[]
  githubUrl: string
  liveUrl: string
  featured: boolean
}

export default function NewProject() {
  const [project, setProject] = useState<ProjectForm>({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    technologies: [],
    category: '',
    heroImage: null,
    screenshots: [],
    githubUrl: '',
    liveUrl: '',
    featured: false
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [newTechnology, setNewTechnology] = useState('')
  const router = useRouter()

  const categories = [
    'Healthcare',
    'Logistics', 
    'AI/ML',
    'FinTech',
    'E-Commerce',
    'SaaS',
    'Mobile App',
    'Web App',
    'API/Backend',
    'Other'
  ]

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setProject(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !project.technologies.includes(newTechnology.trim())) {
      setProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }))
      setNewTechnology('')
    }
  }

  const removeTechnology = (tech: string) => {
    setProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const formData = new FormData()
      
      // Add all text fields
      Object.entries(project).forEach(([key, value]) => {
        if (key === 'technologies') {
          formData.append(key, JSON.stringify(value))
        } else if (key === 'heroImage' && value) {
          formData.append(key, value)
        } else if (key === 'screenshots') {
          ;(value as File[]).forEach((file, index) => {
            formData.append(`screenshots`, file)
          })
        } else if (typeof value === 'string' || typeof value === 'boolean') {
          formData.append(key, value.toString())
        }
      })
      
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to create project')
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-space-void">
      {/* Header */}
      <header className="border-b border-white/10 bg-space-deep/50 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex items-center gap-4">
              <Image 
                src="https://res.cloudinary.com/dizbrnm2l/image/upload/v1752674056/Fluxium-logo_rbhphy.svg"
                alt="Fluxium"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <div className="h-6 w-px bg-white/20" />
              <div className="flex items-center gap-2 text-text-muted">
                <Rocket className="w-4 h-4" />
                <span className="text-sm font-medium">Add New Mission</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="premium-card">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
                      placeholder="Nurse Nest Healthcare Platform"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      value={project.slug}
                      onChange={(e) => setProject(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
                      placeholder="nurse-nest-healthcare"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      Category *
                    </label>
                    <select
                      value={project.category}
                      onChange={(e) => setProject(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category} className="bg-space-dark">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-4">Description</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      Short Description *
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => setProject(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim h-24 resize-none"
                      placeholder="Built a platform where nurses find work and facilities find nurses..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      Detailed Description *
                    </label>
                    <textarea
                      value={project.longDescription}
                      onChange={(e) => setProject(prev => ({ ...prev, longDescription: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim h-40 resize-none"
                      placeholder="Full project details, challenges solved, impact created..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-4">Technologies Used</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-full text-sm flex items-center gap-2 text-cosmic-cyan"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
                      placeholder="Add technology (e.g., React, Node.js)"
                    />
                    <button
                      type="button"
                      onClick={addTechnology}
                      className="px-4 py-2 bg-cosmic-cyan/20 border border-cosmic-cyan/30 rounded-lg hover:bg-cosmic-cyan/30 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-cosmic-cyan" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-4">Project Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      <Github className="inline w-4 h-4 mr-2" />
                      GitHub URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={project.githubUrl}
                      onChange={(e) => setProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      <ExternalLink className="inline w-4 h-4 mr-2" />
                      Live URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={project.liveUrl}
                      onChange={(e) => setProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-4">Images</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      Hero Image *
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-cosmic-cyan/50 transition-colors">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-text-dim" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProject(prev => ({ ...prev, heroImage: e.target.files?.[0] || null }))}
                        className="hidden"
                        id="heroImage"
                        required
                      />
                      <label htmlFor="heroImage" className="cursor-pointer text-cosmic-cyan hover:text-white transition-colors">
                        {project.heroImage ? project.heroImage.name : 'Click to upload hero image'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-4">Settings</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={project.featured}
                    onChange={(e) => setProject(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-5 h-5 rounded bg-white/10 border-white/20 text-cosmic-cyan focus:ring-cosmic-cyan"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-text-secondary">
                    Feature this mission on homepage
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
                <Link
                  href="/admin/dashboard"
                  className="px-6 py-3 text-text-muted hover:text-white transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Creating Mission...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Launch Mission
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}