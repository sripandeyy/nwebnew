'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ROADMAP_DOMAINS,
  PLAN_SCHEDULES,
  PDF_METADATA_DISCLAIMER,
  RoadmapCourse,
  PlanType,
  isProPlanEligible,
} from './roadmapsData';
import CourseRoadmapFlowchart from './CourseRoadmapFlowchart';
import {
  Search,
  Filter,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Send,
  X,
  Compass,
  FileCheck2,
  Workflow,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

interface CourseRoadmapsSectionProps {
  isStandalonePage?: boolean;
}

export default function CourseRoadmapsSection({
  isStandalonePage = false,
}: CourseRoadmapsSectionProps) {
  // State
  const [selectedDomainId, setSelectedDomainId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('advanced');
  const [activeCourseCode, setActiveCourseCode] = useState<string>('C01');
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);
  const [advisorCourseSubject, setAdvisorCourseSubject] = useState<string>('');
  const [advisorFormState, setAdvisorFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [advisorSubmitted, setAdvisorSubmitted] = useState<boolean>(false);
  const [isSubmittingAdvisor, setIsSubmittingAdvisor] = useState<boolean>(false);

  // Flatten all courses
  const allCourses = useMemo(() => {
    const list: RoadmapCourse[] = [];
    const seenCodes = new Set<string>();

    for (const d of ROADMAP_DOMAINS) {
      for (const c of d.courses) {
        // For 'all', keep unique course codes
        if (!seenCodes.has(c.code)) {
          seenCodes.add(c.code);
          list.push(c);
        }
      }
    }
    return list;
  }, []);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    let domainCourses: RoadmapCourse[] = [];
    if (selectedDomainId === 'all') {
      domainCourses = allCourses;
    } else {
      const dom = ROADMAP_DOMAINS.find((d) => d.id === selectedDomainId);
      domainCourses = dom ? dom.courses : allCourses;
    }

    if (!searchQuery.trim()) return domainCourses;

    const q = searchQuery.toLowerCase().trim();
    return domainCourses.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.domainName.toLowerCase().includes(q) ||
        c.suggestedProject.toLowerCase().includes(q) ||
        c.flow.some((stage) => stage.toLowerCase().includes(q))
    );
  }, [selectedDomainId, allCourses, searchQuery]);

  // Active course
  const activeCourse = useMemo(() => {
    const found = allCourses.find((c) => c.code === activeCourseCode);
    return found || allCourses[0];
  }, [allCourses, activeCourseCode]);

  // Handle Advisor Modal
  const openAdvisorModal = (courseTitle: string) => {
    setAdvisorCourseSubject(courseTitle);
    setIsAdvisorModalOpen(true);
    setAdvisorSubmitted(false);
  };

  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAdvisor(true);
    try {
      await fetch('/api/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          program: `Roadmap Syllabus Enquiry: ${advisorCourseSubject || activeCourse.title}`,
          name: advisorFormState.name,
          email: advisorFormState.email,
          phone: advisorFormState.phone,
          note: `Selected Plan: ${selectedPlan}. Message: ${advisorFormState.message}`,
        }),
      });
      setAdvisorSubmitted(true);
      setTimeout(() => {
        setIsAdvisorModalOpen(false);
        setAdvisorFormState({ name: '', email: '', phone: '', message: '' });
      }, 2500);
    } catch {
      setAdvisorSubmitted(true);
    } finally {
      setIsSubmittingAdvisor(false);
    }
  };

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-slate-50/50 dark:bg-[#070913]/40">
      {/* Background radial accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-slate-400/5 via-indigo-500/5 to-slate-400/5 dark:from-slate-700/5 dark:via-indigo-500/5 dark:to-slate-700/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black tracking-wide uppercase mb-3.5 border border-slate-300/80 dark:border-slate-700 shadow-xs">
            <Workflow className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
            <span>Interactive Learning Pathways</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Comprehensive Course Roadmaps & Stage Progression
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl">
            Explore complete learning roadmaps across 6 engineering and business domains. Select your preferred tier (Basic, Advanced, or Pro) to simulate your stage schedule, module dependencies, practical capstones, and placement milestones.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 w-full max-w-2xl">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">6</div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Core Domains</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">93</div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Unique Courses</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">3</div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Plan Pathways</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">279</div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Simulated Pathways</div>
            </div>
          </div>
        </div>

        {/* Customer Value & Pathway Highlights Box */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800/50 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  Industry-Aligned Learning Pathways & Career Outcomes
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Structured Stage Progression • Live Mentor Sessions • Production Capstones • Verified Credentials
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openAdvisorModal('Curriculum & Cohort Syllabus')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Request Detailed Syllabus from Advisor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
            {/* Stage-Based Learning Framework */}
            <div className="space-y-2.5 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/70 dark:border-slate-800">
              <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Structured Learning Progression
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Outcome-focused pathways engineered for real-world technical competency and workplace readiness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Flexible plans: Basic (2-Month Foundational) and Advanced (4-Month Comprehensive) pathways across all domains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Exclusive Pro Plan (6 Months with 100% Placement Assurance) dedicated to HRM, Data Analytics, and Data Science.</span>
                </li>
              </ul>
            </div>

            {/* Practical Experience & Career Support */}
            <div className="space-y-2.5 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/70 dark:border-slate-800">
              <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Practical Experience & Mentorship
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Live mentor-led interactive sessions with weekly code reviews and 1:1 doubt clearing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Industry-grade capstone projects simulating actual enterprise software and production workloads.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Verified course completion & internship certificates accredited under Nyera Educational Organisation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Domain Navigation & Search Bar */}
        <div className="space-y-4 mb-8">
          {/* Domain Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedDomainId('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedDomainId === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Domains (93)
            </button>

            {ROADMAP_DOMAINS.map((domain) => {
              const isSelected = selectedDomainId === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setSelectedDomainId(domain.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{domain.name}</span>
                  <span className="text-[11px] opacity-75 font-mono">
                    ({domain.courses.length})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Plan Selector Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by code (e.g. C01), course title, technology (React, Python, VLSI, SAP)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Plan Switcher */}
            {(() => {
              const activeProEligible = isProPlanEligible(activeCourse);
              const availablePlans: PlanType[] = activeProEligible
                ? ['basic', 'advanced', 'pro']
                : ['basic', 'advanced'];
              const currentPlan = !activeProEligible && selectedPlan === 'pro' ? 'advanced' : selectedPlan;

              return (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Plan Pathway:</span>
                    <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/70 dark:border-slate-700">
                      {availablePlans.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setSelectedPlan(p)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold capitalize cursor-pointer transition-all ${
                            currentPlan === p
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                          }`}
                        >
                          {p} ({PLAN_SCHEDULES[p].durationMonths}m)
                        </button>
                      ))}
                    </div>
                  </div>
                  {!activeProEligible && (
                    <span className="text-[10px] text-slate-400 font-medium">
                      *Pro Plan exclusive to HRM & Data tracks
                    </span>
                  )}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Featured Interactive Flowchart for Currently Selected Course */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Active Interactive Flowchart Visualizer
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Click any stage node below to inspect dependencies, learning objectives, and syllabus breakdown.
            </div>
          </div>

          <CourseRoadmapFlowchart
            course={activeCourse}
            activePlan={selectedPlan}
            onPlanChange={(newPlan) => setSelectedPlan(newPlan)}
            onOpenAdvisorModal={(title) => openAdvisorModal(title)}
          />
        </div>

        {/* Course Directory Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Browse Roadmaps Directory ({filteredCourses.length} Courses Found)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any course to load its complete interactive flowchart above.
              </p>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">No courses match your search</h4>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for other keywords like "Data", "Cloud", "SAP", "React", or "Embedded".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((c) => {
                const isActive = c.code === activeCourse.code;
                return (
                  <div
                    key={c.code}
                    onClick={() => {
                      setActiveCourseCode(c.code);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xl scale-[1.01]'
                        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                            isActive
                              ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {c.code}
                        </span>
                        <span
                          className={`text-[11px] font-bold ${
                            isActive
                              ? 'text-white/80 dark:text-slate-800/80'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {c.domainName}
                        </span>
                      </div>

                      {/* Course Title */}
                      <h4 className="text-base font-black tracking-tight mb-1 group-hover:underline">
                        {c.title}
                      </h4>

                      {/* Summary */}
                      <p
                        className={`text-xs line-clamp-2 leading-relaxed mb-3 ${
                          isActive
                            ? 'text-slate-200 dark:text-slate-700'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {c.summary}
                      </p>

                      {/* Stage Progression Flow Badges */}
                      <div className="mb-3">
                        <div
                          className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                            isActive ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'
                          }`}
                        >
                          Learning Progression:
                        </div>
                        <div className="flex items-center flex-wrap gap-1 text-[11px]">
                          {c.flow.map((stage, sIdx) => (
                            <React.Fragment key={sIdx}>
                              <span
                                className={`px-2 py-0.5 rounded font-medium ${
                                  isActive
                                    ? 'bg-white/15 text-white dark:bg-slate-900/10 dark:text-slate-900'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                {stage}
                              </span>
                              {sIdx < c.flow.length - 1 && (
                                <span
                                  className={`text-[10px] ${
                                    isActive ? 'text-white/60 dark:text-slate-600' : 'text-slate-400'
                                  }`}
                                >
                                  →
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA / Status */}
                    <div
                      className={`pt-3 border-t flex items-center justify-between text-xs font-bold ${
                        isActive
                          ? 'border-white/20 dark:border-slate-900/20 text-white dark:text-slate-900'
                          : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="truncate max-w-[180px] font-medium text-[11px]">
                        Project: {c.suggestedProject}
                      </span>
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>{isActive ? 'Active' : 'Load Roadmap'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Advisor Consultation & Syllabus Request Modal */}
      <AnimatePresence>
        {isAdvisorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setIsAdvisorModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Academic Advisor Connect
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  Request Official Syllabus & Roadmap Consultation
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enquiring for: <strong>{advisorCourseSubject || activeCourse.title}</strong>
                </p>
              </div>

              {advisorSubmitted ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Request Received!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    A Nyeras academic counselor will contact you within 24 hours with the verified module syllabus and fee structure.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAdvisorSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={advisorFormState.name}
                      onChange={(e) =>
                        setAdvisorFormState({ ...advisorFormState, name: e.target.value })
                      }
                      placeholder="e.g. Aditi Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={advisorFormState.email}
                        onChange={(e) =>
                          setAdvisorFormState({ ...advisorFormState, email: e.target.value })
                        }
                        placeholder="aditi@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={advisorFormState.phone}
                        onChange={(e) =>
                          setAdvisorFormState({ ...advisorFormState, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Preferred Plan
                    </label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value as PlanType)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none"
                    >
                      <option value="basic">Basic (2 Months • 36+ Live Hours)</option>
                      <option value="advanced">Advanced (4 Months • 52+ Live Hours • Capstone)</option>
                      <option value="pro">Pro (6 Months • 100+ Live Hours • Placement Prep)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Specific Questions or Domain Prerequisites (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={advisorFormState.message}
                      onChange={(e) =>
                        setAdvisorFormState({ ...advisorFormState, message: e.target.value })
                      }
                      placeholder="Ask about live batch timings, mentor credentials, or syllabus topics..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingAdvisor}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold text-xs hover:opacity-95 transition-opacity shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingAdvisor ? 'Submitting...' : 'Submit Syllabus Request'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
