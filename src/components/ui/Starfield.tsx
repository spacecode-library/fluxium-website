'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Slow continuous movement simulating floating through space
  const spaceMovementX = useMotionValue(0)
  const spaceMovementY = useMotionValue(0)
  
  // Combine mouse parallax with space movement
  const mouseTranslateX = useTransform(mouseX, [0, 1], [-5, 5])
  const mouseTranslateY = useTransform(mouseY, [0, 1], [-5, 5])
  
  const translateX = useTransform(
    [mouseTranslateX, spaceMovementX], 
    ([mouse, space]) => mouse + space
  )
  const translateY = useTransform(
    [mouseTranslateY, spaceMovementY], 
    ([mouse, space]) => mouse + space
  )
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set(clientX / innerWidth)
    mouseY.set(clientY / innerHeight)
  }, [mouseX, mouseY])
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Clear any existing stars
    containerRef.current.innerHTML = ''
    
    // Generate realistic starfield with different star types
    const starCount = 300 // Increased for more realistic density
    
    // Use seeded random for consistent SSR/client rendering
    let seed = 12345; // Fixed seed for consistency
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Function to create scientifically accurate meteors with realistic physics
    const createMeteor = () => {
      if (!containerRef.current) return;
      
      // Randomize entry point and trajectory (meteors can come from any direction)
      const entryEdge = Math.random();
      let startX, startY, endX, endY, velocity;
      
      if (entryEdge < 0.25) {
        // Top edge entry
        startX = Math.random() * 120 - 10;
        startY = -10;
        endX = startX + (Math.random() - 0.5) * 160;
        endY = 110 + Math.random() * 20;
      } else if (entryEdge < 0.5) {
        // Left edge entry  
        startX = -10;
        startY = Math.random() * 120 - 10;
        endX = 110 + Math.random() * 20;
        endY = startY + (Math.random() - 0.5) * 160;
      } else if (entryEdge < 0.75) {
        // Right edge entry
        startX = 110;
        startY = Math.random() * 120 - 10;
        endX = -10 - Math.random() * 20;
        endY = startY + (Math.random() - 0.5) * 160;
      } else {
        // Diagonal entries (most visually appealing)
        if (Math.random() < 0.5) {
          // Top-left to bottom-right
          startX = -10 + Math.random() * 30;
          startY = -10 + Math.random() * 30;
          endX = 80 + Math.random() * 40;
          endY = 80 + Math.random() * 40;
        } else {
          // Top-right to bottom-left
          startX = 80 + Math.random() * 40;
          startY = -10 + Math.random() * 30;
          endX = -10 + Math.random() * 30;
          endY = 80 + Math.random() * 40;
        }
      }
      
      // Calculate meteor velocity and properties based on physics
      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      
      // Realistic meteor speeds: 11-72 km/s (average 30,000 mph)
      // Fast meteors = 0.5-1.5s, Medium = 1.5-3s, Slow = 3-6s
      const speedCategory = Math.random();
      let duration, temperature, isBright;
      
      if (speedCategory < 0.2) {
        // Very fast meteors (20% - Leonids, Perseids)
        duration = 400 + Math.random() * 800; // 0.4-1.2s
        temperature = 4000 + Math.random() * 2000; // High temp
        isBright = Math.random() < 0.7; // 70% chance to be bright
      } else if (speedCategory < 0.5) {
        // Fast meteors (30%)
        duration = 800 + Math.random() * 1200; // 0.8-2s  
        temperature = 3000 + Math.random() * 1500;
        isBright = Math.random() < 0.4; // 40% chance
      } else if (speedCategory < 0.8) {
        // Medium meteors (30%)
        duration = 1500 + Math.random() * 2000; // 1.5-3.5s
        temperature = 2000 + Math.random() * 1000;
        isBright = Math.random() < 0.2; // 20% chance
      } else {
        // Slow meteors (20% - often red/orange due to atmospheric heating)
        duration = 2500 + Math.random() * 3000; // 2.5-5.5s
        temperature = 1500 + Math.random() * 800;
        isBright = Math.random() < 0.1; // 10% chance
      }
      
      // Scientific color determination based on temperature and composition
      const colorRandom = Math.random();
      let meteorColor, elementName;
      
      if (colorRandom < 0.5) {
        // White/Blue-white (50% - most common, iron/magnesium)
        const intensity = isBright ? 0.8 + Math.random() * 0.2 : 0.4 + Math.random() * 0.4;
        meteorColor = `rgba(255, 255, ${245 + Math.floor(Math.random() * 10)}, ${intensity})`;
        elementName = 'iron-magnesium';
      } else if (colorRandom < 0.7) {
        // Yellow/Orange (20% - sodium, iron)
        const intensity = isBright ? 0.7 + Math.random() * 0.3 : 0.3 + Math.random() * 0.4;
        if (temperature < 2500) {
          // Lower temp = more orange
          meteorColor = `rgba(255, ${180 + Math.floor(Math.random() * 50)}, 100, ${intensity})`;
          elementName = 'sodium';
        } else {
          // Higher temp = more yellow  
          meteorColor = `rgba(255, ${220 + Math.floor(Math.random() * 35)}, 150, ${intensity})`;
          elementName = 'iron';
        }
      } else if (colorRandom < 0.85) {
        // Green/Blue-green (15% - magnesium, nickel)
        const intensity = isBright ? 0.6 + Math.random() * 0.4 : 0.3 + Math.random() * 0.3;
        if (Math.random() < 0.7) {
          // Magnesium green
          meteorColor = `rgba(150, 255, ${180 + Math.floor(Math.random() * 50)}, ${intensity})`;
          elementName = 'magnesium';
        } else {
          // Nickel green
          meteorColor = `rgba(100, 255, 150, ${intensity})`;
          elementName = 'nickel';
        }
      } else if (colorRandom < 0.95) {
        // Red/Orange-red (10% - atmospheric nitrogen/oxygen, slow meteors)
        const intensity = isBright ? 0.6 + Math.random() * 0.3 : 0.3 + Math.random() * 0.4;
        meteorColor = `rgba(255, ${120 + Math.floor(Math.random() * 100)}, 80, ${intensity})`;
        elementName = 'atmospheric';
      } else {
        // Purple/Violet (5% - calcium, very rare)
        const intensity = isBright ? 0.7 + Math.random() * 0.3 : 0.3 + Math.random() * 0.3;
        meteorColor = `rgba(${180 + Math.floor(Math.random() * 50)}, 120, 255, ${intensity})`;
        elementName = 'calcium';
      }
      
      // Size based on brightness and distance
      const baseBrightness = parseFloat(meteorColor.split(',')[3].replace(')', ''));
      const meteorSize = isBright ? 1.5 + Math.random() * 2 : 0.8 + Math.random() * 1.2;
      const trailLength = (isBright ? 80 : 40) + Math.random() * (isBright ? 80 : 40);
      
      // Create meteor element
      const meteor = document.createElement('div');
      meteor.className = `meteor-streak ${elementName.replace('-', '_')}`;
      meteor.style.position = 'absolute';
      meteor.style.left = startX + '%';
      meteor.style.top = startY + '%';
      meteor.style.width = trailLength + 'px';
      meteor.style.height = meteorSize + 'px';
      meteor.style.pointerEvents = 'none';
      meteor.style.zIndex = '3';
      
      // Calculate angle and set rotation
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      meteor.style.transform = `rotate(${angle}deg)`;
      meteor.style.transformOrigin = '0 50%';
      
      // Create realistic gradient trail (transparent tail to bright head)
      meteor.style.background = `linear-gradient(90deg, 
        transparent 0%, 
        ${meteorColor.replace(/[\d\.]+\)$/g, (baseBrightness * 0.1) + ')')} 30%,
        ${meteorColor.replace(/[\d\.]+\)$/g, (baseBrightness * 0.4) + ')')} 70%,
        ${meteorColor.replace(/[\d\.]+\)$/g, (baseBrightness * 0.8) + ')')} 90%,
        ${meteorColor} 100%
      )`;
      
      // Add realistic glow effect
      const glowIntensity = isBright ? meteorSize * 4 : meteorSize * 2;
      meteor.style.boxShadow = `0 0 ${glowIntensity}px ${meteorColor.replace(/[\d\.]+\)$/g, '0.6)')}`;
      meteor.style.borderRadius = `${meteorSize}px`;
      meteor.style.filter = `blur(${isBright ? 0.3 : 0.5}px)`;
      
      // Add subtle flickering for bright meteors
      if (isBright && Math.random() < 0.3) {
        meteor.style.animation = 'meteor-flicker 0.1s infinite alternate';
      }
      
      containerRef.current.appendChild(meteor);
      
      // Animate with realistic physics
      const animation = meteor.animate([
        {
          left: startX + '%',
          top: startY + '%',
          opacity: '0',
          transform: `rotate(${angle}deg) scale(0.3)`
        },
        {
          left: startX + '%',
          top: startY + '%', 
          opacity: baseBrightness.toString(),
          transform: `rotate(${angle}deg) scale(1)`,
          offset: 0.05
        },
        {
          left: endX + '%',
          top: endY + '%',
          opacity: baseBrightness.toString(),
          transform: `rotate(${angle}deg) scale(1)`,
          offset: 0.9
        },
        {
          left: endX + '%',
          top: endY + '%',
          opacity: '0',
          transform: `rotate(${angle}deg) scale(1.2)`
        }
      ], {
        duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Slight deceleration like real meteors
      });
      
      // Clean up when animation finishes
      animation.onfinish = () => {
        if (meteor.parentNode) {
          meteor.parentNode.removeChild(meteor);
        }
      };
    };

    // Schedule random meteors - much less frequent
    const scheduleMeteor = () => {
      // Random delay between meteors (15-45 seconds - more realistic)
      const delay = Math.random() * 30000 + 15000; // 15-45 seconds
      
      setTimeout(() => {
        createMeteor();
        scheduleMeteor(); // Schedule next meteor
      }, delay);
    };
    
    // Start meteor scheduling after initial delay
    setTimeout(scheduleMeteor, Math.random() * 10000 + 10000); // 10-20 seconds initial delay
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      const random = seededRandom()
      
      // Determine star type based on probability (realistic distribution)
      if (random < 0.7) {
        // Main sequence stars (small, white/yellow) - 70%
        star.className = 'star star-main'
        const size = seededRandom() * 1.5 + 0.8 // 0.8-2.3px
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.background = `rgba(255, 255, ${240 + seededRandom() * 15}, 0.${6 + Math.floor(seededRandom() * 4)})` // Subtle yellowish tint
      } else if (random < 0.85) {
        // Bright stars (larger, brighter) - 15%
        star.className = 'star star-bright'
        const size = seededRandom() * 2 + 2 // 2-4px
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.background = '#ffffff'
        star.style.boxShadow = '0 0 4px rgba(255, 255, 255, 0.8)'
      } else if (random < 0.95) {
        // Colored stars (blue giants, red giants) - 10%
        star.className = 'star star-colored'
        const size = seededRandom() * 1.8 + 1.2 // 1.2-3px
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        const colors = [
          '#87CEEB', // Blue stars (hot)
          '#FFB347', // Orange stars (cool)
          '#FF6B6B', // Red giants
          '#98FB98'  // Green (rare)
        ]
        const color = colors[Math.floor(seededRandom() * colors.length)]
        star.style.background = color
        star.style.boxShadow = `0 0 3px ${color}`
      } else {
        // Nebula-like distant stars - 5%
        star.className = 'star star-nebula'
        const size = seededRandom() * 1 + 0.5 // 0.5-1.5px
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.background = 'rgba(6, 182, 212, 0.6)'
        star.style.boxShadow = '0 0 8px rgba(6, 182, 212, 0.4)'
      }
      
      // Random position with some clustering (more realistic)
      let x, y
      if (seededRandom() < 0.3) {
        // Cluster some stars (like star clusters/constellations)
        const clusterX = seededRandom() * 100
        const clusterY = seededRandom() * 100
        x = clusterX + (seededRandom() - 0.5) * 15 // ±7.5% cluster spread
        y = clusterY + (seededRandom() - 0.5) * 15
        x = Math.max(0, Math.min(100, x)) // Keep within bounds
        y = Math.max(0, Math.min(100, y))
      } else {
        x = seededRandom() * 100
        y = seededRandom() * 100
      }
      
      star.style.left = x + '%'
      star.style.top = y + '%'
      
      // Varied animation timing for more natural feel
      star.style.animationDelay = seededRandom() * 5 + 's'
      star.style.animationDuration = (4 + seededRandom() * 4) + 's' // 4-8s
      
      containerRef.current.appendChild(star)
    }
    
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  // Continuous space movement animation
  useEffect(() => {
    const animateSpaceMovement = () => {
      // Very slow movement in a subtle circular/elliptical pattern
      const time = Date.now() * 0.0001 // Very slow time progression
      
      // Create a subtle figure-8 or elliptical movement
      const moveX = Math.sin(time) * 15 + Math.cos(time * 0.7) * 8
      const moveY = Math.cos(time * 0.8) * 12 + Math.sin(time * 0.5) * 6
      
      spaceMovementX.set(moveX)
      spaceMovementY.set(moveY)
      
      requestAnimationFrame(animateSpaceMovement)
    }
    
    animateSpaceMovement()
  }, [spaceMovementX, spaceMovementY])
  
  return (
    <>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none"
        style={{ 
          x: translateX, 
          y: translateY,
          zIndex: -1
        }}
      />
      
      <style jsx global>{`
        .star {
          position: absolute;
          border-radius: 50%;
          animation: twinkle 3s infinite;
        }
        
        .star-main {
          animation: twinkle-subtle 6s infinite;
          opacity: 0.4;
        }
        
        .star-bright {
          animation: twinkle-bright 4s infinite;
          opacity: 0.8;
        }
        
        .star-colored {
          animation: twinkle-colored 5s infinite;
          opacity: 0.6;
        }
        
        .star-nebula {
          animation: twinkle-nebula 8s infinite;
          opacity: 0.3;
        }
        
        @keyframes twinkle-subtle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes twinkle-bright {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          25% { opacity: 1; transform: scale(1.3); }
          75% { opacity: 0.9; transform: scale(1.1); }
        }
        
        @keyframes twinkle-colored {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          33% { opacity: 0.8; transform: scale(1.2); }
          66% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes twinkle-nebula {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        
        /* Scientifically Accurate Meteor Styles */
        .meteor-streak {
          position: absolute;
          pointer-events: none;
          z-index: 3;
          mix-blend-mode: screen;
          will-change: transform, opacity;
        }
        
        /* Element-specific meteor classes for debugging */
        .meteor-streak.iron_magnesium {
          /* Most common white/blue meteors */
        }
        
        .meteor-streak.sodium {
          /* Orange meteors from sodium */
        }
        
        .meteor-streak.iron {
          /* Yellow meteors from iron */
        }
        
        .meteor-streak.magnesium {
          /* Green meteors from magnesium */
        }
        
        .meteor-streak.nickel {
          /* Green meteors from nickel */
        }
        
        .meteor-streak.atmospheric {
          /* Red meteors from atmospheric heating */
        }
        
        .meteor-streak.calcium {
          /* Rare purple meteors from calcium */
        }
        
        /* Realistic flickering animation for bright meteors */
        @keyframes meteor-flicker {
          0% { 
            opacity: 1; 
            filter: blur(0.3px) brightness(1);
            transform: scale(1);
          }
          50% {
            filter: blur(0.2px) brightness(1.1);
          }
          100% { 
            opacity: 0.95; 
            filter: blur(0.4px) brightness(0.95);
            transform: scale(1.02);
          }
        }
        
        /* Atmospheric scintillation for very bright meteors */
        @keyframes meteor-scintillate {
          0%, 100% { 
            filter: blur(0.3px) brightness(1) saturate(1);
          }
          25% { 
            filter: blur(0.2px) brightness(1.15) saturate(1.1);
          }
          75% { 
            filter: blur(0.4px) brightness(0.9) saturate(0.9);
          }
        }
      `}</style>
    </>
  )
}