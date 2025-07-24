'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import type { NavLink } from '@/types'

const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#crew', label: 'Crew' },
  { href: '#missions', label: 'Missions' },
  { href: '#launch', label: 'Launch' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [adminClickCount, setAdminClickCount] = useState(0)
  const adminClickTimerRef = useRef<NodeJS.Timeout>()
  
  // Removed unused scroll transforms for cleaner code

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle secret admin access (triple-click)
  const handleLogoClick = () => {
    setAdminClickCount(prev => prev + 1)
    
    // Clear previous timer
    if (adminClickTimerRef.current) {
      clearTimeout(adminClickTimerRef.current)
    }
    
    // Check if triple-clicked
    if (adminClickCount >= 2) {
      window.location.href = '/admin/login'
      setAdminClickCount(0)
      return
    }
    
    // Reset count after 1.5 seconds and navigate to home if it was just a regular click
    adminClickTimerRef.current = setTimeout(() => {
      if (adminClickCount === 0) {
        // This was just a single click, navigate to home
        window.location.href = '/'
      }
      setAdminClickCount(0)
    }, 1500)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        className={cn(
          "fixed w-full top-0 z-50 transition-all duration-500",
          isScrolled && "backdrop-blur-2xl shadow-2xl shadow-cosmic-cyan/5"
        )}
        style={{
          backgroundColor: `rgba(3, 3, 3, ${isScrolled ? 0.85 : 0})`,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: isScrolled ? `linear-gradient(90deg, rgba(79, 70, 229, 0.05), rgba(6, 182, 212, 0.05))` : 'transparent',
          }}
        />
        
        <div className="container relative">
          <div className="flex items-center justify-between py-4 md:py-6">
            {/* Logo with Hidden Admin Access */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className="flex items-center gap-3 group relative cursor-pointer"
                onClick={handleLogoClick}
              >
                <Image 
                  src="https://res.cloudinary.com/dizbrnm2l/image/upload/v1752674061/Fluxium-logo_hb7vp8.png"
                  alt="Fluxium"
                  width={220}
                  height={70}
                  className="h-14 md:h-16 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
                  priority
                />
              </div>
            </motion.div>

            {/* Desktop Navigation Links */}
            <motion.div
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navLinks.map((link, index) => (
                <NavLinkItem key={link.href} link={link} index={index} />
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative z-50 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <motion.div
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="absolute inset-0"
                >
                  <Menu 
                    className={cn(
                      "absolute inset-0 text-white transition-opacity",
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <X 
                    className={cn(
                      "absolute inset-0 text-white transition-opacity",
                      isMobileMenuOpen ? "opacity-100" : "opacity-0"
                    )}
                  />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        initial={false}
        animate={isMobileMenuOpen ? "open" : "closed"}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-space-void/90 backdrop-blur-md"
          variants={{
            open: { opacity: 1 },
            closed: { opacity: 0 }
          }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <motion.div
          className="absolute right-0 top-0 h-full w-full max-w-sm bg-space-deep/95 backdrop-blur-xl border-l border-white/10"
          variants={{
            open: { x: 0 },
            closed: { x: "100%" }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex flex-col gap-8 p-8 pt-24">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                variants={{
                  open: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.1 }
                  },
                  closed: {
                    opacity: 0,
                    x: 20
                  }
                }}
              >
                <Link
                  href={link.href}
                  className="text-2xl font-medium text-white hover:text-cosmic-cyan transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

// Individual navigation link component
function NavLinkItem({ link, index }: { link: NavLink; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
    >
      <Link
        href={link.href}
        className="relative py-2 text-text-secondary hover:text-white transition-colors duration-300 font-medium group"
      >
        {link.label}
        
        {/* Hover underline effect */}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        
        {/* Glow effect on hover */}
        <span className="absolute inset-0 rounded-lg bg-cosmic-cyan/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
      </Link>
    </motion.div>
  )
}