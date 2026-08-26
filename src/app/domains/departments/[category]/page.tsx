"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCoursesForDepartmentCategory } from "../../data";
import Topbar from "../../../components/Topbar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { GraduationCap, BookOpen } from "lucide-react";

export default function DepartmentCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const data = getCoursesForDepartmentCategory(category as string);
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Topbar />
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <h1 className="text-2xl font-semibold">Category not found</h1>
          <p className="mt-2 text-gray-600">Please choose another category.</p>
          <Link href="/domains/departments" className="mt-6 inline-block px-4 py-2 rounded-md bg-[#6600cc] text-white">Back to Departments</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const uniqueCoursesMap = new Map<string, typeof data.courses[number]>();
  for (const c of data.courses) {
    const existing = uniqueCoursesMap.get(c.slug);
    if (!existing) {
      uniqueCoursesMap.set(c.slug, c);
    } else {
      const hasImage = !!existing.image;
      const newHasImage = !!c.image;
      if (!hasImage && newHasImage) {
        uniqueCoursesMap.set(c.slug, c);
      }
    }
  }
  const uniqueCourses = Array.from(uniqueCoursesMap.values());

  return (
    <div className="min-h-screen flex flex-col bg-white/60">
      <Topbar />
      <Header />

      {/* Hero Header */}
      <div className="relative pt-24 pb-16 bg-white/40">
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
              Department Courses
            </motion.span>
            
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {data.title}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select a course to view detailed curriculum and sample certificates
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
                    {uniqueCourses.length}
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
      <main className="relative flex-grow py-12 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueCourses.map((course) => (
              <Link 
                key={course.slug} 
                href={`/domains/${course.slug}`} 
                className="group block rounded-3xl border bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {course.image ? (
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={course.image.startsWith('/') ? course.image : `/${course.image}`} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.png';
                        target.className = 'w-full h-full object-cover';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-300" />
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
