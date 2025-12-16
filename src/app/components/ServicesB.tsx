'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Code, Briefcase, Globe, BookOpen, Users } from 'lucide-react'

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
    <section className="py-16 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Essential Resources for Students
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Empowering your journey from classroom to career with Nyeras
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#6600CC] text-white mb-4">
                  <resource.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                <p className="mt-2 text-base text-gray-600">{resource.description}</p>
              </div>
              <motion.div
                className="h-1 bg-[#6600CC]"
                initial={{ width: '0%' }}
                animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.a
            href="/plans"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6600CC] hover:bg-[#4d0099] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enroll Now
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default BTechResources

