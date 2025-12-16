"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Premium3DIcon from "./Premium3DIcon"

interface PremiumCourseCardProps {
  href: string
  title: string
  summary?: string
  image?: string
  badge?: string
  badgeColor?: string
  gradient?: string
  icon?: React.ReactNode
  topics?: string[]
  index?: number
}

const PremiumCourseCard = ({
  href,
  title,
  summary,
  image,
  badge,
  badgeColor = "from-purple-600 to-pink-600",
  gradient = "from-purple-500 via-pink-500 to-blue-500",
  icon,
  topics = [],
  index = 0,
}: PremiumCourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative h-full"
    >
      <Link href={href} className="block h-full group">
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-300`}
        />

        {/* Card Container */}
        <motion.div 
          className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full flex flex-col"
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {/* Image Section */}
          {image && (
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Badge Overlay */}
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 right-4"
                >
                  <span className={`inline-block px-3 py-1.5 bg-gradient-to-r ${badgeColor} text-white text-xs font-bold rounded-full shadow-lg`}>
                    {badge}
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Icon if no image */}
            {!image && icon && (
              <motion.div
                className="mb-4 origin-center"
                whileHover={{ 
                  scale: 1.05,
                  transition: { 
                    type: "spring",
                    stiffness: 500,
                    damping: 10 
                  } 
                }}
                initial={false}
              >
                <Premium3DIcon 
                  icon={icon} 
                  gradient={gradient} 
                  size="md" 
                />
              </motion.div>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-2">
              {title}
            </h3>

            {/* Summary */}
            {summary && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                {summary}
              </p>
            )}

            {/* Topics */}
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {topics.slice(0, 3).map((topic, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {topic}
                  </motion.span>
                ))}
              </div>
            )}

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-purple-600 font-semibold mt-auto pt-4 border-t border-gray-100"
              whileHover={{ gap: 12 }}
            >
              <span>View Details</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Decorative Corner */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 blur-2xl`} />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default PremiumCourseCard
