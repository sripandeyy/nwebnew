"use client"

import { motion } from "framer-motion"
import { Lightbulb, Target, Zap, Shield, TrendingUp, Users } from "lucide-react"
import Premium3DIcon from "./Premium3DIcon"

const ServicesPremium = () => {
  const services = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovative Learning",
      description: "Cutting-edge courses designed to prepare you for the future of work",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Career Focused",
      description: "Industry-aligned curriculum with 100% placement assistance",
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Track Success",
      description: "Accelerated programs to get you job-ready in months, not years",
      gradient: "from-pink-400 via-purple-500 to-indigo-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Certified Programs",
      description: "Industry-recognized certifications that employers trust",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Skill Enhancement",
      description: "Continuous learning paths to keep you ahead of the curve",
      gradient: "from-cyan-400 via-blue-500 to-indigo-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      description: "Join 15,000+ students in our thriving learning community",
      gradient: "from-purple-400 via-pink-500 to-rose-500",
    },
  ]

  return (
    <section className="relative py-10 lg:py-14 bg-white/40 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-full text-purple-600 font-semibold text-sm mb-4"
          >
            What We Offer
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Professional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your career with our comprehensive learning ecosystem
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card Background with Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500`} />
              
              {/* Card Content */}
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Premium3DIcon
                    icon={service.icon}
                    gradient={service.gradient}
                    size="md"
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-4 flex items-center gap-2 text-purple-600 font-semibold"
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/plans"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl overflow-hidden"
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
              <span className="relative">Explore All Services</span>
              <motion.svg
                className="relative w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesPremium
