"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { domains } from "../data";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingParticles from "../../components/FloatingParticles";
import { GraduationCap, Award, Star, ArrowRight } from "lucide-react";

function getCreativeDesignCourses() {
  const creativeSlugs = new Set(["graphic-design", "ui-ux", "car-design"]);
  const courses: Array<{ slug: string; title: string; summary: string; image?: string; curriculum: { title: string; topics?: string[] }[] }>
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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Background */}
      <FloatingParticles count={10} color="grey" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <Topbar />
      <Header />

      {/* Hero Header */}
      <div className="relative pt-28 pb-16">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm mb-6">
              <GraduationCap className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              Creative &amp; Design
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Creative &amp;{' '}
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
                Design Programs
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Master cutting-edge creative design tools, user research, and UI/UX systems with hands-on industrial projects.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm glossy-black-card">
              <div className="flex items-center justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {courses.length}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Available Courses</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                <div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Placement Support</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                <div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                    <span className="text-amber-500">★</span> 4.9
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Learner Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <main className="relative flex-grow pb-20">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link 
                key={course.slug} 
                href={`/domains/${course.slug}`} 
                className="group block rounded-3xl bg-white dark:bg-slate-900 glossy-black-card hover-lift overflow-hidden"
              >
                {course.image ? (
                  <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-44 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Award className="w-12 h-12 text-slate-400" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {course.title}
                  </h3>
                  {course.summary && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {course.summary}
                    </p>
                  )}
                  {/* Core Tags */}
                  {(() => {
                    const points: string[] = [];
                    if (course.curriculum) {
                      for (const m of course.curriculum) {
                        if (m.topics && m.topics.length > 0) {
                          points.push(...m.topics);
                        } else if (m.title) {
                          points.push(m.title);
                        }
                      }
                    }
                    const previewPoints = points.slice(0, 3);

                    return (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {previewPoints.map((pt, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 text-xs font-medium"
                          >
                            <span className="truncate max-w-[140px]">{pt}</span>
                          </span>
                        ))}
                        {points.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs font-medium">
                            +{points.length - 3} skills
                          </span>
                        )}
                      </div>
                    );
                  })()}

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                    <span>View All Technologies & Skills</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white" />
                  </div>
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
