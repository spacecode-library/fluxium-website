import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// GET /api/admin/stats - Get dashboard statistics (admin only)
export async function GET(request: NextRequest) {
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

    // Fetch statistics
    const [totalProjects, featuredProjects, totalContacts] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.contact ? prisma.contact.count() : 0, // Contact model is optional
    ])

    const stats = {
      totalProjects,
      featuredProjects,
      totalViews: totalProjects * 1250, // Mock data for now
      inquiries: totalContacts
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { message: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}