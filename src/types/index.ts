export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  category: string
  heroImage: string
  technologies: string[]
  screenshots: Screenshot[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  missionNumber: number
  createdAt: Date
  updatedAt: Date
}

export interface Screenshot {
  id: string
  url: string
  caption?: string
  projectId: string
  createdAt: Date
}

export interface Admin {
  id: string
  username: string
  createdAt: Date
  updatedAt: Date
}

export interface Capability {
  icon: React.ReactNode
  title: string
  description: string
}

export interface NavLink {
  href: string
  label: string
}

export interface Stats {
  missionsCompleted: number
  successRate: number
  technologiesMastered: number
  yearsInOrbit: number
}