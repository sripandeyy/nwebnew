"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { applyCustomCourses, futureSkillsSchoolCourses, isBuiltInCourse } from "../data";
import { COURSES_EVENT } from "../../utils/courseStore";
import {
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  Brain,
  LineChart,
  Landmark,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Compass,
  FileCheck,
  ChevronRight,
  Layers,
  GraduationCap,
  School,
  PhoneCall,
  Calendar,
  ExternalLink,
} from "lucide-react";

const streamMapping = [
  {
    stream: "Computer Science / IT",
    tag: "High Coding Focus",
    courses: ["C++ Programming Foundations", "Java & Full-Stack Foundations"],
    reason: "Builds rigorous coding fluency and demonstrates how software and web systems are made end-to-end.",
  },
  {
    stream: "Science (PCM / PCB)",
    tag: "Maths & Intelligent Systems",
    courses: ["AI & Machine Learning Foundations", "C++ Programming Foundations"],
    reason: "Connects mathematics, logic, and scientific thinking to real-world data and intelligent algorithms.",
  },
  {
    stream: "Commerce",
    tag: "Business & Financial Literacy",
    courses: ["Finance & Stock Market Awareness", "AI in Economics & Data Thinking"],
    reason: "Links business concepts, money, and financial markets to structured data analysis and decision-making.",
  },
  {
    stream: "Humanities / Economics",
    tag: "Evidence & Policy",
    courses: ["AI in Economics & Data Thinking", "Finance & Stock Market Awareness"],
    reason: "Cultivates evidence-based reasoning about people, economic incentives, markets, and public policy.",
  },
  {
    stream: "Curious Beginners (Any Stream)",
    tag: "Concept-First Exploration",
    courses: ["AI & Machine Learning Foundations", "Java & Full-Stack Foundations"],
    reason: "Concept-first entry points with immediate visible results, requiring zero prior coding experience.",
  },
];

const pedagogySteps = [
  { step: "01", name: "LEARN", desc: "Concepts from first principles with clear, plain language." },
  { step: "02", name: "PRACTICE", desc: "Guided, bite-sized activities and code exercises." },
  { step: "03", name: "BUILD", desc: "Turn newly acquired concepts into a tangible project." },
  { step: "04", name: "EXPLORE", desc: "Examine real-world industrial and corporate use cases." },
  { step: "05", name: "PRESENT", desc: "Demonstrate, explain, and defend decisions on demo day." },
  { step: "06", name: "CERTIFY", desc: "Receive official verified Nyeras program credentials." },
];

const implementationSteps = [
  { num: "1", title: "Select", desc: "Identify suitable classes & student cohorts." },
  { num: "2", title: "Choose", desc: "Select one or more tracks from the 5 programs." },
  { num: "3", title: "Agree", desc: "Finalize format, duration and school timetable." },
  { num: "4", title: "Pilot", desc: "Run a premier pilot cohort with guided mentoring." },
  { num: "5", title: "Review", desc: "Assess learning outcomes & student response." },
  { num: "6", title: "Expand", desc: "Seamlessly add further groups and curriculum tracks." },
];

export default function FutureSkillsSchoolPage() {
  const getCourses = () =>
    applyCustomCourses(
      futureSkillsSchoolCourses,
      (c) => !isBuiltInCourse(c.slug) && (c.category || "").toLowerCase().includes("future skills")
    );

  const [courses, setCourses] = useState(futureSkillsSchoolCourses);
  const [selectedStream, setSelectedStream] = useState<string>("All");
  const [expandedCourseSlug, setExpandedCourseSlug] = useState<string | null>(null);

  useEffect(() => {
    setCourses(getCourses());
    const handleUpdate = () => setCourses(getCourses());
    window.addEventListener(COURSES_EVENT, handleUpdate);
    return () => window.removeEventListener(COURSES_EVENT, handleUpdate);
  }, []);

  const filteredCourses =
    selectedStream === "All"
      ? courses
      : courses.filter((c) => {
          const match = streamMapping.find((s) => s.stream === selectedStream);
          return match ? match.courses.includes(c.title) : true;
        });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      <Topbar />
      <Header />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-cyan-400/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 shadow-xs mb-6">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm font-black text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                Nyeras School Curriculum Overview • Classes 9–12 & Beginners
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-6">
              Future Skills{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                School Program
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300 mb-4">
              From Classroom Learning to Real-World Skills
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              A curated, project-based curriculum in programming, AI, data thinking, and financial awareness,
              designed to complement the academic foundation the school already provides. Advanced professional
              topics are deliberately simplified so every learner works at the right level.
            </p>

            {/* Quick Stats Bento */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">5</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">Foundational Tracks</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">100%</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">Hands-on Projects</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">Grades 9-12</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">Age-Appropriate</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400">Official</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">Nyeras Verified Cert</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Every Program is Taught - Pedagogy */}
      <section className="py-12 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1.5">
              Structured Pedagogy
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              How Every Program is Taught
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {pedagogySteps.map((p, idx) => (
              <div
                key={p.step}
                className="relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-black tracking-widest text-blue-600 dark:text-blue-400">
                    STAGE {p.step}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1 mb-2">
                    {p.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stream Selector Guidance */}
      <section className="py-12 bg-transparent">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Course Guidance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-1">
                Which Program Suits Which Students?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                Filter by academic stream or interest to discover which programs provide the best fit.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {["All", ...streamMapping.map((s) => s.stream)].map((stream) => (
                <button
                  key={stream}
                  type="button"
                  onClick={() => setSelectedStream(stream)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedStream === stream
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>

          {/* Stream Explanation Bento (when specific stream selected) */}
          {selectedStream !== "All" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {streamMapping.find((s) => s.stream === selectedStream)?.tag}
                </span>
                <h4 className="text-lg font-black text-slate-950 dark:text-white mt-0.5">
                  Stream Fit: {selectedStream}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">
                  {streamMapping.find((s) => s.stream === selectedStream)?.reason}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStream("All")}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shrink-0 cursor-pointer"
              >
                Clear Filter
              </button>
            </motion.div>
          )}

          {/* Courses List */}
          <div className="space-y-8">
            {filteredCourses.map((course, idx) => {
              const isExpanded = expandedCourseSlug === course.slug;
              return (
                <div
                  key={course.slug}
                  id={course.slug}
                  className="rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-extrabold uppercase tracking-wider">
                              School Program Track
                            </span>
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold">
                              {course.curriculum.length} Modules
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                            {course.title}
                          </h3>
                        </div>
                      </div>

                      {/* Right CTA / Action */}
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => setExpandedCourseSlug(isExpanded ? null : course.slug)}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold transition-all cursor-pointer"
                        >
                          {isExpanded ? "Hide Full Syllabus" : "View Full Syllabus"}
                        </button>
                        <Link
                          href={`/domains/${course.slug}`}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Course Summary & Capstone Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                      <div className="lg:col-span-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                          What This Program Develops
                        </h4>
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                          {course.summary}
                        </p>

                        {/* Indicative project badge */}
                        <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex items-start gap-3">
                          <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                              Capstone Project
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-100 mt-0.5">
                              {course.curriculum[course.curriculum.length - 1]?.topics?.find((t) =>
                                t.toLowerCase().includes("capstone")
                              ) ||
                                course.curriculum[course.curriculum.length - 1]?.title ||
                                "A comprehensive real-world working project showcase."}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Preview Image / Card Asset */}
                      <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 aspect-video lg:aspect-auto">
                        {course.image ? (
                          <img
                            src={course.image.startsWith("/") ? course.image : `/${course.image}`}
                            alt={course.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.png";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center p-6 text-slate-400">
                            <BookOpen className="w-10 h-10" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expandable Full Syllabus Grid */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800 overflow-hidden"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span>Complete Step-by-Step Module Roadmap</span>
                            </h4>
                            <span className="text-xs text-slate-500 font-bold">
                              Adapted for school-level pacing
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course.curriculum.map((mod, modIdx) => (
                              <div
                                key={modIdx}
                                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80"
                              >
                                <div className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                  {mod.title}
                                </div>
                                <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                                  {mod.topics.map((t, tIdx) => (
                                    <li key={tIdx} className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-1.5 shrink-0" />
                                      <span className="font-semibold">{t}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects and Certification (Page 8 of PDF) */}
      <section className="py-16 bg-white/40 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Projects & Certification
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mt-1">
              Every Track Ends with Something Students Have Built
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              The project is finalised by Nyeras academic team according to the learner level, the selected curriculum,
              and the duration agreed with the partner school.
            </p>
          </div>

          {/* Project Journey Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
            {[
              { step: "IDENTIFY", desc: "Choose a problem, question or product idea." },
              { step: "PLAN", desc: "Define objective, concepts and expected output." },
              { step: "BUILD", desc: "Create the solution through guided hands-on work." },
              { step: "TEST & IMPROVE", desc: "Check output, find limits, improve reliability." },
              { step: "DOCUMENT", desc: "Record approach and document learning milestones." },
              { step: "PRESENT", desc: "Demonstrate and explain what was learned to peers." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs"
              >
                <div className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase">
                  Step 0{idx + 1}
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1 mb-1.5">
                  {item.step}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Assessment Grid */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-black mb-6">
                Assessment and Certification Pillars
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="space-y-1.5">
                  <div className="text-xs font-black uppercase text-blue-400">1. Understanding</div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Quizzes, exercises, or instructor checks on fundamental concepts.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-black uppercase text-indigo-400">2. Practice</div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Guided activities and incremental project milestones completed.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-black uppercase text-emerald-400">3. Project</div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    A completed working capstone project built for the chosen track.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-black uppercase text-amber-400">4. Presentation</div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Explaining approach, technical decisions, and takeaways in demo day.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-black uppercase text-cyan-400">5. Completion</div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Eligible students receive the official verified Nyeras certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation: From first conversation to a school-wide program (Page 9 of PDF) */}
      <section className="py-16 bg-transparent">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Institutional Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mt-1">
              From First Conversation to a School-Wide Program
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              A school can begin with a pilot cohort and expand only after reviewing participation and learning outcomes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
            {implementationSteps.map((imp) => (
              <div
                key={imp.num}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs text-center"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-sm flex items-center justify-center mx-auto mb-2">
                  {imp.num}
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">{imp.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium leading-snug">
                  {imp.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Academic Counsellor CTA Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-black uppercase tracking-wider">
                Next Step for Schools & Principals
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Schedule a Discussion to Choose the First Track & Cohort
              </h3>
              <p className="text-sm text-slate-300 font-medium">
                Reach out directly to Nyeras Academic Counselling to discuss batch sizes, schedule options,
                institutional partnership models, or to request a presentation for your faculty.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Rudransh Yadav, Academic Counsellor, Nyeras
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  +91 9180514028
                </span>
                <span className="flex items-center gap-1.5">
                  <School className="w-4 h-4 text-amber-400" />
                  Nyeras.com
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="tel:9180514028"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>Call +91 9180514028</span>
              </a>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span>Book School Presentation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
