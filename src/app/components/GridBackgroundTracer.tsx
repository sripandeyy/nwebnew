'use client'

import React, { useState, useEffect } from 'react'

export default function GridBackgroundTracer() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (!isHovered) setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isHovered])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* 1. Base Subtle Soft-Focus Grid (Clean, slightly softened, no heavy bokeh) */}
      <div 
        className="absolute inset-0 opacity-[0.5] dark:opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          filter: 'blur(1.2px)',
        }}
      />

      {/* 2. Crystal-Clear High-Definition Grid (Sharply illuminated directly under cursor) */}
      <div
        className="absolute inset-0 transition-opacity duration-150"
        style={{
          opacity: isHovered ? 1 : 0,
          backgroundImage: `
            linear-gradient(to right, rgba(71, 85, 105, 0.55) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71, 85, 105, 0.55) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          filter: 'none',
          WebkitMaskImage: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0, 0, 0, 0.7) 40%, transparent 100%)`,
          maskImage: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0, 0, 0, 0.7) 40%, transparent 100%)`,
        }}
      />

      {/* 3. Subtle Ambient Light around cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(148, 163, 184, 0.08) 0%, transparent 75%)`,
        }}
      />
      
    </div>
  )
}
