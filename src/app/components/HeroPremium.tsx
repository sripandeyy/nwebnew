"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Rocket, Award, Users, TrendingUp } from "lucide-react"
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
    { icon: <Award className="w-8 h-8" />, gradient: "from-amber-400 via-amber-500 to-amber-600", label: "Certified" },
    { icon: <Users className="w-8 h-8" />, gradient: "from-slate-700 via-slate-800 to-slate-900", label: "15K+ Students" },
    { icon: <TrendingUp className="w-8 h-8" />, gradient: "from-emerald-400 via-emerald-500 to-teal-500", label: "100% Growth" },
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
              <p className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap mb-4 sm:mb-6">
                Education is the
                {' '}
                <span className="font-black text-slate-700 dark:text-slate-300">
                  {words[wordIndex]}
                </span>
                {' '}
                to your future.
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                <span className="block text-slate-900 dark:text-white">Unlock Your</span>
                <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Potential
                </span>
                <span className="block text-slate-900 dark:text-white">with Nyeras</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Empower your learning journey with our cutting-edge online program. Gain skills, knowledge, and confidence to excel in today&apos;s digital world.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="/domains/departments"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-2xl shadow-lg border border-slate-700/60 hover-lift transition-all"
              >
                <span className="relative flex items-center gap-2">
                  Explore Courses
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="/plans"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400 font-bold rounded-2xl shadow-sm hover-lift transition-all backdrop-blur-sm"
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
              className="flex flex-wrap items-center gap-8 pt-8 justify-center lg:justify-start"
            >
              {/* Student Avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {["/s3.png", "/s2.png", "/s1.png"].map((src, i) => (
                    <motion.img
                      key={i}
                      src={src}
                      alt="Student"
                      className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 shadow-md"
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    />
                  ))}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 dark:bg-slate-800 border-4 border-white dark:border-slate-800 text-white font-bold text-xs shadow-md"
                  >
                    15K+
                  </div>
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
                  gradient="from-slate-800 via-slate-700 to-slate-900"
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
