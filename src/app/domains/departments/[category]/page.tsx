"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCoursesForDepartmentCategory } from "../../data";
import { COURSES_EVENT } from "../../../utils/courseStore";
import Topbar from "../../../components/Topbar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CourseRoadmapFlowchart from "../../../roadmaps/CourseRoadmapFlowchart";
import {
  findRoadmapCourse,
  RoadmapCourse,
  PlanType,
  PLAN_SCHEDULES,
  isProPlanEligible,
} from "../../../roadmaps/roadmapsData";
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  Workflow,
  Layers,
  X,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Sliders,
  Send,
} from "lucide-react";

export default function DepartmentCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [data, setData] = useState(() => getCoursesForDepartmentCategory(category as string, false));
  const [viewMode, setViewMode] = useState<"grid" | "roadmaps">("grid");
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("advanced");
  const [activeRoadmapModalCourse, setActiveRoadmapModalCourse] = useState<RoadmapCourse | null>(null);
  const [selectedRoadmapSlug, setSelectedRoadmapSlug] = useState<string>("");

  useEffect(() => {
    setData(getCoursesForDepartmentCategory(category as string));
    const handleUpdate = () => {
      setData(getCoursesForDepartmentCategory(category as string));
    };
    window.addEventListener(COURSES_EVENT, handleUpdate);
    return () => window.removeEventListener(COURSES_EVENT, handleUpdate);
  }, [category]);

  const uniqueCourses = useMemo(() => {
    if (!data) return [];
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
    return Array.from(uniqueCoursesMap.values());
  }, [data]);

  const hasProCourses = useMemo(() => {
    return uniqueCourses.some((c) => isProPlanEligible(c.slug || c.title));
  }, [uniqueCourses]);

  // Set default selected course for roadmaps view
  useEffect(() => {
    if (uniqueCourses.length > 0 && !selectedRoadmapSlug) {
      setSelectedRoadmapSlug(uniqueCourses[0].slug);
    }
  }, [uniqueCourses, selectedRoadmapSlug]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Topbar />
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center">
          <h1 className="text-2xl font-bold">Category not found</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Please choose another category.</p>
          <Link
            href="/domains/departments"
            className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-medium hover-lift transition-all"
          >
            Back to Departments
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const activeRoadmapInDepartment = findRoadmapCourse(selectedRoadmapSlug || (uniqueCourses[0]?.slug ?? ""));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Topbar />
      <Header />

      {/* Hero Header */}
      <div className="relative pt-28 pb-10 bg-transparent">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm mb-4">
              <GraduationCap className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              Department Programs & Interactive Roadmaps
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
                {data.title}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore each course along with its learning progression roadmap, stage dependencies, and full syllabus breakdown.
            </p>
          </motion.div>

          {/* Stats Bar & View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 dark:border-slate-800"
          >
            <div className="flex items-center gap-6 text-center">
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{uniqueCourses.length}</div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Available Courses</div>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {hasProCourses ? '3 Plans' : '2 Plans'}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {hasProCourses ? 'Basic • Adv • Pro' : 'Basic (2m) • Adv (4m)'}
                </div>
              </div>
              <Link href="/domains/job-guarantee" className="hover:opacity-80 transition-opacity text-left">
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <span>Placement Support</span>
                  <span className="text-emerald-500 font-bold">&rarr;</span>
                </div>
              </Link>
            </div>

            {/* View Mode Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Course Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("roadmaps")}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "roadmaps"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>Roadmap Visualizer</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative flex-grow pb-20">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Option A: Full Department Interactive Roadmaps View */}
          {viewMode === "roadmaps" ? (
            <div className="space-y-6">
              {/* Horizontal Course Selector Pill Bar */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5" /> Select a course in {data.title} to view its complete learning progression roadmap:
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {uniqueCourses.map((c) => {
                    const isSelected = selectedRoadmapSlug === c.slug;
                    const rMap = findRoadmapCourse(c.slug || c.title);
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => setSelectedRoadmapSlug(c.slug)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                          isSelected
                            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {rMap && <span className="font-mono text-[10px] opacity-70">{rMap.code}</span>}
                        <span>{c.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Roadmap Flowchart */}
              {activeRoadmapInDepartment ? (
                <div className="space-y-4">
                  <CourseRoadmapFlowchart
                    course={activeRoadmapInDepartment}
                    activePlan={selectedPlan}
                    onPlanChange={(newPlan) => setSelectedPlan(newPlan)}
                  />

                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Ready to view the complete modular syllabus & pricing for {activeRoadmapInDepartment.title}?
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Access week-by-week live sessions, faculty mentors, and enrolment options.
                      </p>
                    </div>
                    <Link
                      href={activeRoadmapInDepartment.url}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
                    >
                      <span>Open Full Course Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-500">Select a course above to display its roadmap.</p>
                </div>
              )}
            </div>
          ) : (
            /* Option B: Course Cards Grid with Embedded Roadmap Progression Previews */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {uniqueCourses.map((course, index) => {
                const roadmap = findRoadmapCourse(course.slug || course.title);

                return (
                  <div
                    key={`cat-course-${course.slug || "item"}-${index}`}
                    className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <Link href={`/domains/${course.slug}`} className="block relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        {course.image ? (
                          <img
                            src={course.image.startsWith("/") ? course.image : `/${course.image}`}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.dataset.fallbackApplied === "1") return;
                              target.dataset.fallbackApplied = "1";
                              target.src = "/placeholder.png";
                              target.className = "w-full h-full object-cover";
                            }}
                          />
                        ) : (
                          <div className="h-44 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-slate-400" />
                          </div>
                        )}

                        {roadmap && (
                          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                            {roadmap.code}
                          </span>
                        )}
                      </Link>

                      {/* Content Area */}
                      <div className="p-6">
                        <Link href={`/domains/${course.slug}`}>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                            {course.title}
                          </h3>
                        </Link>

                        {course.summary && (
                          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {course.summary}
                          </p>
                        )}

                        {/* Roadmap Learning Progression Flow (From Source PDF) */}
                        {roadmap && (
                          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800">
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Workflow className="w-3 h-3 text-slate-700 dark:text-slate-300" />
                                Roadmap Progression
                              </span>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                Structured Pathway
                              </span>
                            </div>

                            <div className="flex items-center flex-wrap gap-1 text-[11px] font-medium text-slate-800 dark:text-slate-200">
                              {roadmap.flow.map((stage, sIdx) => (
                                <span key={sIdx} className="inline-flex items-center gap-1">
                                  <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-[10px]">
                                    {stage}
                                  </span>
                                  {sIdx < roadmap.flow.length - 1 && (
                                    <span className="text-[10px] text-slate-400">→</span>
                                  )}
                                </span>
                              ))}
                            </div>

                            {roadmap.suggestedProject && (
                              <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                                <span className="font-bold text-slate-700 dark:text-slate-300">Project:</span>{" "}
                                <span className="italic">{roadmap.suggestedProject}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Core Topics Badges */}
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
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {previewPoints.map((pt, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 text-[11px] font-medium"
                                >
                                  <span className="truncate max-w-[130px]">{pt}</span>
                                </span>
                              ))}
                              {points.length > 3 && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-[10px] font-medium">
                                  +{points.length - 3} skills
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between gap-2">
                      {roadmap ? (
                        <button
                          type="button"
                          onClick={() => setActiveRoadmapModalCourse(roadmap)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors cursor-pointer"
                        >
                          <Workflow className="w-3.5 h-3.5" />
                          <span>View Roadmap</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      <Link
                        href={`/domains/${course.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900 dark:text-slate-200 hover:text-slate-600 dark:hover:text-white transition-colors"
                      >
                        <span>Syllabus & Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Interactive Modal to Inspect Any Course Roadmap Flowchart */}
      <AnimatePresence>
        {activeRoadmapModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 relative my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setActiveRoadmapModalCourse(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4 pr-10">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {data.title} Department Roadmap
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {activeRoadmapModalCourse.title} Learning Progression
                </h3>
              </div>

              <CourseRoadmapFlowchart
                course={activeRoadmapModalCourse}
                activePlan={selectedPlan}
                onPlanChange={(newPlan) => setSelectedPlan(newPlan)}
              />

              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveRoadmapModalCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close Roadmap
                </button>

                <Link
                  href={activeRoadmapModalCourse.url}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-extrabold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 shadow-md"
                >
                  <span>Go to Full Course Page & Enrol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
