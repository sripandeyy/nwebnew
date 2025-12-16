"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Sparkles, Rocket, Award, Users, TrendingUp } from "lucide-react"
import FloatingParticles from "./FloatingParticles"
import Premium3DIcon from "./Premium3DIcon"

const HeroPremium = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const words = ["Foundation", "Gateway", "Bridge", "Key", "Path"]
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [words.length])

  const features = [
    { icon: <Award className="w-8 h-8" />, gradient: "from-yellow-400 via-orange-500 to-red-500", label: "Certified" },
    { icon: <Users className="w-8 h-8" />, gradient: "from-blue-400 via-indigo-500 to-purple-500", label: "15K+ Students" },
    { icon: <TrendingUp className="w-8 h-8" />, gradient: "from-green-400 via-emerald-500 to-teal-500", label: "100% Growth" },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white/40 pt-24">

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-gray-900 whitespace-nowrap mb-4 sm:mb-6">
                Education is the
                {' '}
                <span className="font-black text-purple-600">
                  {words[wordIndex]}
                </span>
                {' '}
                to your future.
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                <span className="block text-gray-900">Unlock Your</span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Potential
                </span>
                <span className="block text-gray-900">with Nyeras</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Empower your learning journey with our cutting-edge online program. Gain skills, knowledge, and confidence to excel in today&apos;s digital world.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/domains/departments"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <span className="relative flex items-center gap-2">
                  Explore Courses
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="/plans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-shadow backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  Enroll Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center gap-8 pt-8"
            >
              {/* Student Avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {["/s3.png", "/s2.png", "/s1.png"].map((src, i) => (
                    <motion.img
                      key={i}
                      src={src}
                      alt="Student"
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    />
                  ))}
                  <motion.div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-white text-white font-bold text-xs shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    15K+
                  </motion.div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  Trusted by 15,000+ students
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Illustration Container */}
            <motion.div
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="relative"
            >
              {/* Center Large Icon */}
              <motion.div
                className="flex justify-center mb-8"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Premium3DIcon
                  icon={<Rocket className="w-16 h-16" />}
                  size="xl"
                  gradient="from-purple-500 via-pink-500 to-blue-500"
                />
              </motion.div>

              {/* Floating Feature Icons */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                    whileHover={{ y: -10 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <Premium3DIcon
                      icon={feature.icon}
                      size="lg"
                      gradient={feature.gradient}
                    />
                    <p className="text-xs font-semibold text-gray-700 text-center">
                      {feature.label}
                    </p>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroPremium
