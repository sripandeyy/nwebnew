"use client"

import { motion } from "framer-motion";
import { jobGuaranteeCourses } from "../data";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import FloatingParticles from "../../components/FloatingParticles";
import PremiumCourseCard from "../../components/PremiumCourseCard";
import { Briefcase, Shield, TrendingUp } from "lucide-react";

export default function JobGuaranteePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white/60">
      <Topbar />
      <Header />

      {/* Hero Header */}
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-600/20 rounded-full text-emerald-700 font-semibold text-sm mb-6"
            >
              <Shield className="w-4 h-4" />
              100% Placement Assurance
            </motion.span>
            
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              <span className="block">Job Guarantee</span>
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Programs
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a track with guaranteed job placement and comprehensive career support
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-3 gap-8 text-center text-white">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="space-y-2"
                >
                  <div className="text-4xl font-black">100%</div>
                  <div className="text-sm opacity-90">Placement Rate</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="space-y-2"
                >
                  <div className="text-4xl font-black">₹5-8L</div>
                  <div className="text-sm opacity-90">Avg. Package</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="space-y-2"
                >
                  <div className="text-4xl font-black">500+</div>
                  <div className="text-sm opacity-90">Partner Companies</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <main className="relative flex-grow pb-20 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobGuaranteeCourses.map((course, index) => (
              <PremiumCourseCard
                key={course.slug}
                href={`/domains/${course.slug}`}
                title={course.title}
                summary={course.summary}
                image={course.image}
                badge="Job Guarantee"
                badgeColor="from-emerald-600 to-green-600"
                gradient="from-emerald-500 via-green-500 to-teal-500"
                topics={course.curriculum.slice(0, 3).map(m => m.title)}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
