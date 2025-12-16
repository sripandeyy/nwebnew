"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, Briefcase, GraduationCap, Target, TrendingUp, Users } from "lucide-react"
import Premium3DIcon from "./Premium3DIcon"

const DomainsPremium = () => {
  const domains = [
    {
      href: "/domains/departments",
      icon: <GraduationCap className="w-12 h-12" />,
      gradient: "from-violet-500 via-purple-500 to-indigo-500",
      badge: "Explore",
      badgeColor: "from-violet-600 to-purple-600",
      title: "Departments",
      description: "CSE/IT, ECE, Mechanical/Civil, Management & Commerce, Bio/Food Tech",
      stats: "8+ Specializations",
      features: ["Industry Projects", "Expert Mentors", "Flexible Learning"],
    },
    {
      href: "/domains/job-guarantee",
      icon: <Briefcase className="w-12 h-12" />,
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      badge: "Placement",
      badgeColor: "from-emerald-600 to-green-600",
      title: "Job Guarantee",
      description: "Data Science, Data Analytics, Human Resource Management",
      stats: "100% Placement",
      features: ["Job Assurance", "Mock Interviews", "Resume Building"],
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="relative pt-32 pb-16 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-full text-purple-600 font-semibold text-sm mb-6"
            >
              <Target className="w-4 h-4" />
              Choose Your Path
            </motion.span>
            
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              <span className="block">Explore Our</span>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Domains
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect learning track designed to accelerate your career growth
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative pb-20 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <Link href={domain.href}>
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${domain.gradient} rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-500`}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Card Container */}
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden h-full">
                    {/* Top Gradient Bar */}
                    <div className={`h-2 bg-gradient-to-r ${domain.gradient}`} />

                    {/* Card Content */}
                    <div className="p-8 lg:p-10">
                      {/* Badge and Icon Row */}
                      <div className="flex items-start justify-between mb-6">
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className={`inline-block px-4 py-1.5 bg-gradient-to-r ${domain.badgeColor} text-white text-xs font-bold rounded-full shadow-lg`}
                        >
                          {domain.badge}
                        </motion.span>
                        
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Premium3DIcon
                            icon={domain.icon}
                            gradient={domain.gradient}
                            size="lg"
                          />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {domain.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {domain.description}
                      </p>

                      {/* Stats Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl mb-6">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          {domain.stats}
                        </span>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {domain.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${domain.gradient}`} />
                            <span className="text-sm font-medium text-gray-700">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <motion.div
                        className="flex items-center gap-3 text-purple-600 font-bold group-hover:gap-5 transition-all"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-lg">
                          {index === 0 ? "View Categories" : "Browse Tracks"}
                        </span>
                        <motion.svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </motion.svg>
                      </motion.div>
                    </div>

                    {/* Bottom Decorative Element */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent opacity-50" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative pb-20 bg-white/40"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-3 gap-8 text-center text-white">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="space-y-2"
              >
                <div className="text-4xl lg:text-5xl font-black">15K+</div>
                <div className="text-sm lg:text-base opacity-90">Active Students</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="space-y-2"
              >
                <div className="text-4xl lg:text-5xl font-black">100+</div>
                <div className="text-sm lg:text-base opacity-90">Expert Mentors</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="space-y-2"
              >
                <div className="text-4xl lg:text-5xl font-black">95%</div>
                <div className="text-sm lg:text-base opacity-90">Success Rate</div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DomainsPremium
