"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { domains } from "../data";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingParticles from "../../components/FloatingParticles";
import { GraduationCap, Award, Star } from "lucide-react";

// Remove metadata export since we're using client component

function getCreativeDesignCourses() {
  // Pull from existing domain data: graphic-design, ui-ux, car-design
  const creativeSlugs = new Set(["graphic-design", "ui-ux", "car-design"]);
  const courses: Array<{ slug: string; title: string; summary: string; image?: string; curriculum: { title: string }[] }>
    = [];
  for (const d of domains) {
    for (const c of d.courses) {
      if (creativeSlugs.has(c.slug)) courses.push(c as any);
    }
  }
  return courses;
}

export default function CreativeDesignPage() {
  const courses = getCreativeDesignCourses();
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-blue-50" />
      <FloatingParticles count={12} color="purple" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <Topbar />
      <Header />

      {/* Hero Header */}
      <div className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-4"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-full text-purple-600 font-semibold text-sm mb-6"
            >
              <GraduationCap className="w-4 h-4" />
              Creative & Design
            </motion.span>
            
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Creative / Design
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our creative and design courses to unleash your artistic potential
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {courses.length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Available Courses</div>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Job Assistance Program</div>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ⭐ 4.8
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Average Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <main className="relative flex-grow pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link 
                key={course.slug} 
                href={`/domains/${course.slug}`} 
                className="group block rounded-3xl border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {course.image ? (
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <Award className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#6600cc]">
                    {course.title}
                  </h3>
                  {course.summary && (
                    <p className="mt-2 text-sm text-gray-600">
                      {course.summary}
                    </p>
                  )}
                  {course.curriculum?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {course.curriculum.slice(0, 3).map((m) => (
                        <span 
                          key={m.title} 
                          className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-700 ring-1 ring-gray-200"
                        >
                          {m.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
