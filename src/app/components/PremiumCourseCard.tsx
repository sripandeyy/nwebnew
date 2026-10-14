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
  badgeColor = "from-slate-800 to-slate-900",
  gradient = "from-slate-700 via-slate-800 to-slate-900",
  icon,
  topics = [],
  index = 0,
}: PremiumCourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative h-full"
    >
      <Link href={href} className="block h-full group">
        {/* Glow Effect */}
        <div
          className="absolute -inset-0.5 bg-slate-900/10 dark:bg-slate-400/10 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Card Container */}
        <div 
          className="relative bg-white dark:bg-slate-900 rounded-3xl glossy-black-card h-full flex flex-col group-hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
        >
          {/* Image Section */}
          {image && (
            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Badge Overlay */}
              {badge && (
                <div
                  className="absolute top-4 right-4"
                >
                  <span className={`inline-block px-3 py-1.5 bg-gradient-to-r ${badgeColor} text-white text-xs font-bold rounded-full shadow-md`}>
                    {badge}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Icon if no image */}
            {!image && icon && (
              <div
                className="mb-4 origin-center"
              >
                <Premium3DIcon 
                  icon={icon} 
                  gradient={gradient} 
                  size="md" 
                />
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors line-clamp-2">
              {title}
            </h3>

            {/* Summary */}
            {summary && (
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                {summary}
              </p>
            )}

            {/* Core Skills Preview Tags */}
            {topics.length > 0 && (
              <div className="mt-2 mb-4 flex flex-wrap gap-1.5">
                {topics.slice(0, 3).map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-750 text-xs font-medium rounded-lg"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="truncate max-w-[140px]">{topic}</span>
                  </span>
                ))}
                {topics.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs font-medium rounded-lg">
                    +{topics.length - 3} skills
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div
              className="flex items-center justify-between text-slate-900 dark:text-slate-100 font-semibold mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 group-hover:text-slate-700 dark:group-hover:text-white transition-colors text-xs sm:text-sm"
            >
              <span>Explore Domain & All Skills</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Decorative Corner */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 blur-2xl`} />
        </div>
      </Link>
    </motion.div>
  )
}

export default PremiumCourseCard
