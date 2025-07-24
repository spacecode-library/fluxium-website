import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key'

export interface AdminPayload {
  id: string
  username: string
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function generateToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload
  } catch {
    return null
  }
}

export async function authenticateAdmin(username: string, password: string) {
  // Temporary: Use environment variables for admin login (bypass database)
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD
  
  if (username === adminUsername && password === adminPassword) {
    return {
      id: 'admin',
      username: adminUsername || 'admin'
    }
  }
  
  // Fallback to database if environment variables don't match
  try {
    const admin = await prisma.admin.findUnique({
      where: { username }
    })

    if (!admin) {
      return null
    }

    const isValid = await comparePassword(password, admin.password)
    
    if (!isValid) {
      return null
    }

    return {
      id: admin.id,
      username: admin.username
    }
  } catch (error) {
    console.error('Database authentication failed, using env fallback only')
    return null
  }
}

export async function createAdmin(username: string, password: string) {
  const hashedPassword = await hashPassword(password)
  
  return await prisma.admin.create({
    data: {
      username,
      password: hashedPassword
    }
  })
}

// Middleware for protecting admin routes
export function requireAuth(handler: any) {
  return async (req: Request) => {
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 })
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token)

    if (!payload) {
      return new Response('Invalid token', { status: 401 })
    }

    // Add user to request object for use in handler
    ;(req as any).admin = payload

    return handler(req)
  }
}