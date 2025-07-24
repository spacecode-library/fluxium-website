import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import { prisma } from '@/lib/prisma'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        screenshots: true
      }
    })
    return project
  } catch {
    return null
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-space-void text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-space-deep/50 backdrop-blur-sm">
        <div className="container py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-dim hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-cosmic-purple/20 border border-cosmic-purple/30 text-cosmic-cyan text-sm font-medium">
              Mission #{project.missionNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-dim text-sm">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-stellar-gold/20 border border-stellar-gold/30 text-stellar-gold text-sm font-medium">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-text-muted mb-8 max-w-3xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-deep/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-text-secondary leading-relaxed">
                {project.longDescription}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="premium-card">
              <h3 className="text-xl font-display font-semibold mb-6">Project Details</h3>
              
              {/* Technologies */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-cosmic-purple/20 border border-cosmic-purple/30 text-cosmic-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Timeline
                </h4>
                <p className="text-text-muted text-sm">
                  Completed: {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>

              {/* Links */}
              <div className="space-y-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-cosmic-cyan" />
                    <span>Live Project</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4 text-cosmic-cyan" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found - Fluxium'
    }
  }

  return {
    title: `${project.title} - Fluxium`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.heroImage],
    },
  }
}