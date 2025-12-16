"use client"

import { motion } from "framer-motion";
import { departmentCategories } from "../data";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PremiumCourseCard from "../../components/PremiumCourseCard";
import { BookOpen, Cpu, Cog, TrendingUp, Microscope, Palette } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "cse-it": <Cpu className="w-10 h-10" />,
  "ece": <Cog className="w-10 h-10" />,
  "mech-civil": <TrendingUp className="w-10 h-10" />,
  "mgmt-commerce": <BookOpen className="w-10 h-10" />,
  "bio-food": <Microscope className="w-10 h-10" />,
};

export default function DepartmentsPage() {
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-full text-purple-600 font-semibold text-sm mb-6"
            >
              <BookOpen className="w-4 h-4" />
              Choose Your Field
            </motion.span>
            
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              <span className="block">Explore</span>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Departments
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select a category to discover specialized courses tailored for your field
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cards Grid */}
      <main className="flex-grow pb-20 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {departmentCategories.map((cat, index) => (
              <PremiumCourseCard
                key={cat.id}
                href={`/domains/departments/${cat.id}`}
                title={cat.title}
                icon={iconMap[cat.id] || <BookOpen className="w-10 h-10" />}
                gradient="from-violet-500 via-purple-500 to-indigo-500"
                index={index}
              />
            ))}
            
            {/* Creative Design Card */}
            <PremiumCourseCard
              href="/domains/creative-design"
              title="Creative / Design"
              summary="Graphic Design, UI/UX, Car Design"
              icon={<Palette className="w-10 h-10" />}
              gradient="from-pink-500 via-fuchsia-500 to-purple-500"
              index={departmentCategories.length}
            />
          </div>
        </div>
      </main>

    </div>
  );
}
