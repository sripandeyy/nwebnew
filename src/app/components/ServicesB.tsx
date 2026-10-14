'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Code, Briefcase, Globe, BookOpen, Users, ArrowRight } from 'lucide-react'

const resources = [
  { icon: Github, title: 'Nyera GitHub Access', description: 'Exclusive access to Nyera\'s GitHub repositories for hands-on learning and contribution.' },
  { icon: Code, title: 'Real-time Projects', description: 'Work on cutting-edge projects that solve real-world problems in collaboration with industry experts.' },
  { icon: Briefcase, title: 'Internship Opportunities', description: 'Gain practical experience through our extensive network of partner companies offering internships.' },
  { icon: Globe, title: 'Global Networking', description: 'Connect with students, professionals, and mentors from around the world to expand your horizons.' },
  { icon: BookOpen, title: 'Advanced Courses', description: 'Access to specialized courses tailored for B.Tech students, covering emerging technologies and industry trends.' },
  { icon: Users, title: 'Mentorship Program', description: 'One-on-one guidance from industry professionals to help you navigate your career path.' },
]

const BTechResources = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200 dark:border-slate-700">
            Student Toolkit
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            Essential Resources for Students
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Empowering your journey from classroom to career with Nyeras
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover-lift transition-all"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 dark:bg-slate-800 text-white mb-4 shadow-xs">
                  <resource.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{resource.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{resource.description}</p>
              </div>
              <motion.div
                className="h-1 bg-slate-900 dark:bg-slate-700"
                initial={{ width: '0%' }}
                animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.a
            href="/plans"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700/50 text-base font-semibold rounded-xl text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-md hover-lift transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default BTechResources

