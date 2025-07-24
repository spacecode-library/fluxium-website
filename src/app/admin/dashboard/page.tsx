'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Rocket, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Eye
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminDashboard() {
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalViews: 0,
    inquiries: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Fetch dashboard data
    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const [projectsRes, statsRes] = await Promise.all([
        fetch('/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData)
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.ok) {
        setProjects(projects.filter((p: any) => p.id !== projectId))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const filteredProjects = projects.filter((project: any) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-space-void flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-cosmic-cyan/20 border-t-cosmic-cyan rounded-full animate-spin" />
          <span className="text-text-muted">Loading Mission Control...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-space-void">
      {/* Header */}
      <header className="border-b border-white/10 bg-space-deep/50 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
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
                <span className="text-sm font-medium">Mission Control</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 text-text-dim hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">View Site</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-text-dim hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Projects', 
              value: stats.totalProjects, 
              icon: <Rocket className="w-5 h-5" />,
              color: 'from-cosmic-purple to-cosmic-blue'
            },
            { 
              label: 'Featured Projects', 
              value: stats.featuredProjects, 
              icon: <BarChart3 className="w-5 h-5" />,
              color: 'from-cosmic-cyan to-cosmic-blue'
            },
            { 
              label: 'Total Views', 
              value: stats.totalViews, 
              icon: <Eye className="w-5 h-5" />,
              color: 'from-nebula-pink to-cosmic-purple'
            },
            { 
              label: 'Inquiries', 
              value: stats.inquiries, 
              icon: <Users className="w-5 h-5" />,
              color: 'from-stellar-gold to-cosmic-cyan'
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="premium-card"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-dim">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="premium-card">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">
              Project <span className="gradient-text">Missions</span>
            </h2>
            
            <Link
              href="/admin/projects/new"
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Mission
            </Link>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cosmic-cyan transition-colors text-white placeholder-text-dim"
            />
          </div>

          {/* Projects Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-sm font-medium text-text-secondary">Project</th>
                  <th className="text-left py-3 text-sm font-medium text-text-secondary">Category</th>
                  <th className="text-left py-3 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left py-3 text-sm font-medium text-text-secondary">Mission #</th>
                  <th className="text-right py-3 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-text-dim">
                      No projects found. Create your first mission!
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project: any) => (
                    <tr key={project.id} className="border-b border-white/5 hover:bg-white/2">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 flex items-center justify-center">
                            <Rocket className="w-4 h-4 text-cosmic-cyan" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{project.title}</div>
                            <div className="text-sm text-text-dim truncate max-w-xs">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-cyan text-xs">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {project.featured && (
                            <span className="px-2 py-1 rounded-full bg-stellar-gold/20 text-stellar-gold text-xs">
                              Featured
                            </span>
                          )}
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                            Live
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-text-secondary">
                        #{project.missionNumber}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4 text-text-dim" />
                          </Link>
                          <Link
                            href={`/admin/projects/edit/${project.id}`}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-text-dim" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}