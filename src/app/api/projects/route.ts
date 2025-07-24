import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// GET /api/projects - Get all projects (public)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        screenshots: true,
      },
      orderBy: {
        missionNumber: 'asc'
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { message: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const longDescription = formData.get('longDescription') as string
    const category = formData.get('category') as string
    const technologies = JSON.parse(formData.get('technologies') as string || '[]')
    const githubUrl = formData.get('githubUrl') as string || null
    const liveUrl = formData.get('liveUrl') as string || null
    const featured = formData.get('featured') === 'true'
    const heroImageFile = formData.get('heroImage') as File

    // For now, we'll use placeholder image URLs
    // In production, you'd upload to cloud storage (AWS S3, Cloudinary, etc.)
    const heroImage = heroImageFile ? 
      `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop` : 
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug }
    })

    if (existingProject) {
      return NextResponse.json(
        { message: 'A project with this slug already exists' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        longDescription,
        category,
        heroImage,
        technologies,
        githubUrl,
        liveUrl,
        featured
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { message: 'Failed to create project' },
      { status: 500 }
    )
  }
}