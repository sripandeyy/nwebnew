"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  size: number
  startX: number
  startY: number
  duration: number
  delay: number
  x: number[]
  y: number[]
  scale: number[]
  opacity: number[]
}

interface FloatingParticlesProps {
  count?: number
  color?: string
}

const FloatingParticles = ({ count = 15, color = "purple" }: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClient, setIsClient] = useState(false)

  const colorVariants: Record<string, string> = {
    purple: "from-purple-400/30 to-pink-400/30",
    blue: "from-blue-400/30 to-cyan-400/30",
    green: "from-green-400/30 to-emerald-400/30",
    orange: "from-orange-400/30 to-red-400/30",
  }

  useEffect(() => {
    setIsClient(true)
    
    const newParticles = Array.from({ length: count }, (_, i) => {
      const x1 = Math.random() * 200 - 100
      const y1 = Math.random() * 200 - 100
      return {
        id: i,
        size: Math.random() * 60 + 40,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        x: [0, x1, 0],
        y: [0, y1, 0],
        scale: [1, Math.random() + 0.5, 1],
        opacity: [0.3, 0.6, 0.3],
      }
    })
    
    setParticles(newParticles)
  }, [count])

  if (!isClient) {
    // Don't render anything on the server or during hydration
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-br ${colorVariants[color] || colorVariants.purple} blur-xl`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: particle.scale,
            opacity: particle.opacity,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles
