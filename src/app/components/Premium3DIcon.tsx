"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Premium3DIconProps {
  icon: ReactNode
  gradient?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
  xl: "w-24 h-24",
}

const Premium3DIcon = ({ 
  icon, 
  gradient = "from-blue-500 via-purple-500 to-pink-500",
  size = "md",
  className = ""
}: Premium3DIconProps) => {
  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      initial={{ rotateY: 0, rotateX: 0 }}
      whileHover={{ 
        rotateY: 15, 
        rotateX: -15,
        scale: 1.1,
        transition: { duration: 0.3 }
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-50`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Main Icon Container */}
      <motion.div
        className={`relative w-full h-full bg-gradient-to-br ${gradient} rounded-2xl shadow-2xl flex items-center justify-center`}
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {/* Inner Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Icon */}
        <div className="relative z-10 text-white">
          {icon}
        </div>
      </motion.div>

      {/* Back Layer for Depth */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl"
        style={{
          transform: "translateZ(-20px)",
        }}
      />
    </motion.div>
  )
}

export default Premium3DIcon
