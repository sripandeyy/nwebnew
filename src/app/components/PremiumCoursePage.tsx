"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { CheckCircle2, ArrowLeft, ArrowRight, Award, BookOpen, Clock, Users, ExternalLink, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Layers, ShieldCheck, Terminal, Check, X, Zap, Crown, CreditCard, Video, Workflow, Briefcase, GraduationCap } from "lucide-react"
import FloatingParticles from "./FloatingParticles"
import { enrichCourseCurriculum } from "../domains/curriculumEnricher"
import CourseRoadmapFlowchart from "../roadmaps/CourseRoadmapFlowchart"
import { findRoadmapCourse } from "../roadmaps/roadmapsData"
import MentorCard from "./MentorCard"
import { getMentorsForCourse } from "../domains/mentors"

const certificates = [
  { title: "Course Completion", pdf: "/internships/course.pdf" },
  { title: "Internship", pdf: "/internships/internship.pdf" },
  { title: "Project", pdf: "/internships/project.pdf" },
];

interface CurriculumModule {
  title: string
  topics: string[]
}

interface Course {
  slug?: string
  title: string
  summary: string
  image?: string
  curriculum: CurriculumModule[]
  jobGuarantee?: boolean
  price?: string
  originalPrice?: string
}

interface PremiumCoursePageProps {
  course: Course
  domainName: string
}

const PremiumCoursePage = ({ course, domainName }: PremiumCoursePageProps) => {
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function submitCallback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    if (!name || !phone || !email) {
      setMessage("Please fill all fields")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/callback-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone_number: phone, email, course: course.title }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({} as any))
        throw new Error((j as any).error || "Failed to submit")
      }
      setMessage("Request submitted. We'll contact you soon.")
      setName("")
      setPhone("")
      setEmail("")
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  // Job Guarantee pricing card is ONLY shown for Data Science (DS), Data Analytics (DA), and Human Resource Management (HRM)
  const courseTitleLower = (course.title || "").toLowerCase();
  const courseSlugLower = (course.slug || "").toLowerCase();
  const isJobGuaranteeEligible = 
    Boolean(course.jobGuarantee) ||
    courseSlugLower.includes("data-science") ||
    courseSlugLower.includes("data-analytics") ||
    courseSlugLower.includes("hrm") ||
    courseSlugLower.includes("human-resource") ||
    courseSlugLower.includes("job-guarantee") ||
    courseTitleLower.includes("data science") ||
    courseTitleLower.includes("data analytics") ||
    courseTitleLower.includes("human resource") ||
    courseTitleLower.includes("hrm") ||
    courseTitleLower.includes("job guarantee");

  const domainLower = (domainName || "").toLowerCase();
  const isSchoolCourse =
    domainLower.includes("school") ||
    (course as any).category === "Future Skills School Program" ||
    courseSlugLower.includes("cpp-programming-foundations") ||
    courseSlugLower.includes("java-full-stack-foundations") ||
    courseSlugLower.includes("ai-machine-learning-foundations") ||
    courseSlugLower.includes("ai-in-economics-data-thinking") ||
    courseSlugLower.includes("finance-stock-market-awareness") ||
    courseSlugLower.includes("finance-market-awareness") ||
    courseSlugLower.includes("finance-foundations") ||
    courseSlugLower.includes("stock-market-awareness") ||
    courseSlugLower.includes("chemistry-curriculum") ||
    courseSlugLower.includes("chemistry") ||
    courseTitleLower.includes("programming foundations") ||
    courseTitleLower.includes("full-stack foundations") ||
    courseTitleLower.includes("machine learning foundations") ||
    courseTitleLower.includes("data thinking") ||
    courseTitleLower.includes("financial literacy") ||
    courseTitleLower.includes("chemistry") ||
    courseTitleLower.includes("market awareness");

  const domainCareerRoles = useMemo(() => {
    const title = (course.title || '').toLowerCase();
    const domain = (domainName || '').toLowerCase();
    if (title.includes('data science') || domain.includes('data science')) {
      return ['Junior Data Scientist', 'Machine Learning Associate', 'AI Model Engineer', 'Predictive Analytics Specialist'];
    }
    if (title.includes('data analytics') || domain.includes('data analytics') || title.includes('analyst')) {
      return ['Data Analyst Associate', 'Power BI Developer', 'Business Intelligence Specialist', 'SQL Analytics Engineer'];
    }
    if (title.includes('hr') || domain.includes('hr') || title.includes('human resource')) {
      return ['Talent Acquisition Specialist', 'HR Operations Associate', 'Technical Recruiter', 'People Operations Coordinator'];
    }
    if (title.includes('cloud') || title.includes('aws') || domain.includes('cloud')) {
      return ['Cloud Solutions Associate', 'DevOps Trainee Engineer', 'AWS Infrastructure Specialist', 'Site Reliability Associate'];
    }
    if (title.includes('vlsi') || domain.includes('ece') || title.includes('embedded')) {
      return ['VLSI Physical Design Trainee', 'RTL Verification Engineer', 'Embedded Systems Developer', 'FPGA Prototyping Specialist'];
    }
    if (domain.includes('mechanical') || domain.includes('civil')) {
      return ['CAD/CAM Design Engineer', 'Finite Element Analysis Trainee', 'Structural Planning Associate', 'Project Execution Engineer'];
    }
    return ['Full Stack Web Developer', 'Frontend Engineer (React/Next.js)', 'Backend API Engineer (Node/Java)', 'Software Development Engineer in Test (SDET)'];
  }, [course.title, domainName]);

  const [selectedCurriculumPlan, setSelectedCurriculumPlan] = useState<'basic' | 'advanced' | 'job-assistance' | 'pro'>(
    isJobGuaranteeEligible ? 'job-assistance' : 'advanced'
  );

  useEffect(() => {
    if (!isJobGuaranteeEligible && (selectedCurriculumPlan === 'job-assistance' || selectedCurriculumPlan === 'pro')) {
      setSelectedCurriculumPlan('advanced');
    }
  }, [isJobGuaranteeEligible, selectedCurriculumPlan]);

  const effectiveCurriculumPlan = (!isJobGuaranteeEligible && (selectedCurriculumPlan === 'job-assistance' || selectedCurriculumPlan === 'pro'))
    ? 'advanced'
    : selectedCurriculumPlan;

  // Dynamic pricing mapped to the syllabus plan
  const planPricingDetails = useMemo(() => {
    const isPro = effectiveCurriculumPlan === 'pro';
    const isBasic = effectiveCurriculumPlan === 'basic';
    const isJobAssistance = effectiveCurriculumPlan === 'job-assistance';
    
    if (isBasic) {
      return {
        planName: 'Basic Plan',
        duration: '2 Months',
        price: '₹4,999',
        originalPrice: '₹9,999',
        tag: 'Foundation Track',
        badgeColor: 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        href: `/plans?plan=basic&course=${encodeURIComponent(course.title)}`,
      };
    }

    if (isJobAssistance) {
      return {
        planName: 'Job Assistance Plan',
        duration: '6 Months',
        price: '₹59,999',
        originalPrice: '₹89,999',
        tag: 'Career Launchpad Track',
        badgeColor: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
        href: `/plans?plan=job-assistance&course=${encodeURIComponent(course.title)}`,
      };
    }

    if (isPro) {
      return {
        planName: 'Pro Plan',
        duration: '6 Months',
        price: '₹99,999',
        originalPrice: '₹1,49,999',
        tag: 'Job Guarantee Track',
        badgeColor: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        href: `/plans?plan=pro&course=${encodeURIComponent(course.title)}`,
      };
    }

    // Default: 'advanced'
    return {
      planName: 'Advanced Plan',
      duration: '4 Months',
      price: '₹11,999',
      originalPrice: '₹19,999',
      tag: 'Specialization Track',
      badgeColor: 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      href: `/plans?plan=advanced&course=${encodeURIComponent(course.title)}`,
    };
  }, [effectiveCurriculumPlan, course.title]);

  // Generate enriched deep domain curriculum based on selected plan (Basic: 2 Mos, Advanced: 4 Mos, Pro: 6 Mos Job Guarantee)
  const displayedCurriculum = enrichCourseCurriculum(course, domainName, effectiveCurriculumPlan);

  // Extract all unique skills & technologies covered in this domain (from full master curriculum)
  const fullCurriculum = enrichCourseCurriculum(course, domainName, 'pro');
  const allSkills = Array.from(
    new Set(
      fullCurriculum.flatMap((m) => m.topics || []).filter(Boolean)
    )
  )

  const previewCount = 4
  const displayedSkills = showAllSkills ? allSkills : allSkills.slice(0, previewCount)

  // Find roadmap from PDF dataset for this particular course
  const roadmapCourse = useMemo(() => {
    return findRoadmapCourse(course.slug || course.title);
  }, [course.slug, course.title]);

  const courseMentors = useMemo(() => getMentorsForCourse(course.slug), [course.slug]);

  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <FloatingParticles count={10} color="grey" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Hero Section */}
      <header className="relative pt-32 pb-16">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/domains"
              className="inline-flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold group mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Domains
            </Link>
          </motion.div>

          {/* Course Image */}
          {course.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[28rem] rounded-3xl overflow-hidden shadow-2xl mb-12 group"
            >
              <motion.img
                src={course.image.startsWith('/') ? course.image : `/${course.image}`}
                alt={course.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Floating Badge on Image */}
              {course.jobGuarantee && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6"
                >
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-2xl backdrop-blur-sm">
                    <Award className="w-5 h-5" />
                    <span className="font-bold">Job Guarantee Program</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Course Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
              {course.title}
            </h1>

            {/* Summary */}
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
              {course.summary}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pb-20">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Curriculum & Skills Section */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* All Technologies & Skills Showcase (With 3-4 preview toggle) */}
              {allSkills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl glossy-black-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-150 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl border border-slate-700">
                        <Layers className="w-6 h-6 text-slate-200" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                          Technologies & Skills Covered
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          Hands-on tools and industry frameworks you will master in this domain
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-bold whitespace-nowrap">
                      <Layers className="w-3.5 h-3.5 text-emerald-500" />
                      {allSkills.length}+ Core Skills
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {displayedSkills.map((skill, index) => (
                      <motion.div
                        key={`skill-${skill || 'item'}-${index}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.02 * index }}
                        className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-855/90 border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs group"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Toggle Button */}
                  {allSkills.length > previewCount && (
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1">
                        {showAllSkills 
                          ? `Showing all ${allSkills.length} skills & technologies` 
                          : `Showing ${previewCount} of ${allSkills.length} skills (Preview)`}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowAllSkills(!showAllSkills)}
                        className="order-1 sm:order-2 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm font-bold transition-all hover-lift cursor-pointer"
                      >
                        <span>{showAllSkills ? "Show Less" : `View All ${allSkills.length} Skills`}</span>
                        {showAllSkills ? (
                          <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Detailed Modular Curriculum Roadmap */}
              <motion.div
                id="curriculum-roadmap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl glossy-black-card"
              >
                {/* Roadmap Header with Interactive Plan Switcher */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6 pb-6 border-b border-slate-150 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl border border-slate-700 shadow-sm shrink-0">
                      <BookOpen className="w-6 h-6 text-slate-200" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                          Curriculum Roadmap
                        </h2>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                          <Workflow className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Interactive Learning Flowchart</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {isSchoolCourse
                          ? "Interactive school curriculum engineered for hands-on classroom & project outcomes"
                          : "Interactive syllabus breakdown by plan and duration"}
                      </p>
                    </div>
                  </div>

                  {/* Plan Switcher Toggle Buttons */}
                  {!isSchoolCourse && (
                    <div className={`relative grid grid-cols-2 ${isJobGuaranteeEligible ? 'xl:inline-flex' : 'sm:inline-flex'} items-center p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] backdrop-blur-xl w-full lg:w-auto gap-1`}>
                    <motion.button
                      type="button"
                      onClick={() => setSelectedCurriculumPlan('basic')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex-1 lg:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 z-10 ${
                        selectedCurriculumPlan === 'basic'
                          ? 'text-slate-950 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {selectedCurriculumPlan === 'basic' && (
                        <motion.div
                          layoutId="activeCurriculumPlanPill"
                          className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200/90 dark:border-slate-700/80"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <div className={`relative z-10 p-1 rounded-lg transition-colors ${
                        selectedCurriculumPlan === 'basic' 
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' 
                          : 'text-slate-400'
                      }`}>
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <span className="relative z-10 tracking-tight">Basic</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => setSelectedCurriculumPlan('advanced')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex-1 lg:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 z-10 ${
                        selectedCurriculumPlan === 'advanced'
                          ? 'text-slate-950 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {selectedCurriculumPlan === 'advanced' && (
                        <motion.div
                          layoutId="activeCurriculumPlanPill"
                          className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200/90 dark:border-slate-700/80"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <div className={`relative z-10 p-1 rounded-lg transition-colors ${
                        selectedCurriculumPlan === 'advanced' 
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-500' 
                          : 'text-slate-400'
                      }`}>
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <span className="relative z-10 tracking-tight">Advanced</span>
                      <span className={`relative z-10 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                        selectedCurriculumPlan === 'advanced'
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60'
                          : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
                      }`}>
                        Pro
                      </span>
                    </motion.button>

                    {isJobGuaranteeEligible && (
                      <motion.button
                        type="button"
                        onClick={() => setSelectedCurriculumPlan('job-assistance')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex-1 lg:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 z-10 ${
                          selectedCurriculumPlan === 'job-assistance'
                            ? 'text-indigo-900 dark:text-indigo-200'
                            : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                      >
                        {selectedCurriculumPlan === 'job-assistance' && (
                          <motion.div
                            layoutId="activeCurriculumPlanPill"
                            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-indigo-300/80 dark:border-indigo-700/80"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                        <div className={`relative z-10 p-1 rounded-lg transition-colors ${
                          selectedCurriculumPlan === 'job-assistance' 
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400' 
                            : 'text-slate-400'
                        }`}>
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <span className="relative z-10 tracking-tight">Job Assistance</span>
                        <span className={`relative z-10 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          selectedCurriculumPlan === 'job-assistance'
                            ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300/60 dark:border-indigo-700/60'
                            : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
                        }`}>
                          ₹59,999
                        </span>
                      </motion.button>
                    )}

                    {isJobGuaranteeEligible && (
                      <motion.button
                        type="button"
                        onClick={() => setSelectedCurriculumPlan('pro')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex-1 lg:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 z-10 ${
                          selectedCurriculumPlan === 'pro'
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                        }`}
                      >
                        {selectedCurriculumPlan === 'pro' && (
                          <motion.div
                            layoutId="activeCurriculumPlanPill"
                            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-emerald-300/80 dark:border-emerald-700/80"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                        <div className={`relative z-10 p-1 rounded-lg transition-colors ${
                          selectedCurriculumPlan === 'pro' 
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500' 
                            : 'text-slate-400'
                        }`}>
                          <Crown className="w-3.5 h-3.5" />
                        </div>
                        <span className="relative z-10 tracking-tight">Job Guarantee</span>
                        <span className={`relative z-10 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          selectedCurriculumPlan === 'pro'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60'
                            : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
                        }`}>
                          100%
                        </span>
                      </motion.button>
                    )}
                  </div>
                  )}
                </div>

                {/* Active Plan Context Banner */}
                {isSchoolCourse ? (
                  <div className="mb-6 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        School Program Syllabus
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Classes 9–12 & Beginners &bull; Guided Project-Based Learning
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>{displayedCurriculum.length} Modules &bull; {displayedCurriculum.reduce((acc, m) => acc + m.topics.length, 0)} Topics Included</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                        selectedCurriculumPlan === 'basic'
                          ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : selectedCurriculumPlan === 'advanced'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : selectedCurriculumPlan === 'job-assistance'
                          ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {selectedCurriculumPlan === 'basic' ? 'Basic Plan Syllabus' : selectedCurriculumPlan === 'advanced' ? 'Advanced Plan Syllabus' : selectedCurriculumPlan === 'job-assistance' ? 'Job Assistance Plan Syllabus' : 'Pro Job Guarantee Syllabus'}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {selectedCurriculumPlan === 'basic' ? '2 Months • Foundational Track' : selectedCurriculumPlan === 'advanced' ? '4 Months • Industry Specialization' : selectedCurriculumPlan === 'job-assistance' ? '6 Months • Job Assistance & Career Enablement Track' : '6 Months • 100% Placement Bond Track'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>{displayedCurriculum.length} Modules &bull; {displayedCurriculum.reduce((acc, m) => acc + m.topics.length, 0)} Topics Included</span>
                    </div>
                  </div>
                )}

                {/* Course Interactive Roadmap Flowchart */}
                {roadmapCourse && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        Interactive Learning Progression Flowchart ({selectedCurriculumPlan.toUpperCase()} Plan)
                      </h3>
                    </div>
                    <CourseRoadmapFlowchart
                      course={roadmapCourse}
                      activePlan={selectedCurriculumPlan === 'job-assistance' ? 'pro' : selectedCurriculumPlan}
                      onPlanChange={(newPlan) => setSelectedCurriculumPlan(newPlan)}
                      hideCatalogAccordion={true}
                    />
                  </div>
                )}

                {/* Section Header for Detailed Module-by-Module Topics */}
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span>Detailed Modular Syllabus Breakdown ({displayedCurriculum.length} Modules)</span>
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Topics, Tools & Hands-on Lab Objectives
                  </span>
                </div>

                {/* Modules List */}
                <div className="space-y-4">
                  {displayedCurriculum.map((module, index) => (
                    <motion.div
                      key={`module-${module.title || 'item'}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.04 }}
                      className="group relative"
                    >
                      {/* Module Card */}
                      <div className="relative bg-slate-50/70 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs group-hover:shadow-md group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all duration-300">
                        {/* Module Header */}
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3.5">
                            <div
                              className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-sm border border-slate-700/60"
                            >
                              {String(index + 1).padStart(2, '0')}
                            </div>
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                                {module.title}
                              </h3>
                              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                                {module.topics.length} Core Topics & Skills Covered
                              </p>
                            </div>
                          </div>

                          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-lg border border-slate-300/60 dark:border-slate-700">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            Module {index + 1}
                          </span>
                        </div>

                        {/* Topics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-14 pt-1">
                          {module.topics.map((topic, topicIdx) => (
                            <div
                              key={`topic-${topic || 'item'}-${topicIdx}`}
                              className="flex items-start gap-2.5 p-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-750/70 text-xs sm:text-sm"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-slate-700 dark:text-slate-200 font-medium leading-snug">
                                {topic}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Pricing & Enrollment Plans Section */}
              {!isSchoolCourse && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl glossy-black-card"
                >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-150 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl border border-slate-700">
                      <CreditCard className="w-6 h-6 text-slate-200" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        Enrollment & Pricing Plans
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Select the learning format and mentorship level that suits your career goals
                      </p>
                    </div>
                  </div>
                  {isJobGuaranteeEligible && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs font-bold whitespace-nowrap">
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      100% Placement Bond Available
                    </span>
                  )}
                </div>

                <div className={`grid grid-cols-1 ${isJobGuaranteeEligible ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 max-w-4xl mx-auto"} gap-6`}>
                  {/* Basic Plan */}
                  <div className="relative rounded-3xl bg-slate-50/70 dark:bg-slate-850 glossy-black-card p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <BookOpen className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700">
                          2 Months Duration
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Basic Plan</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                        Essential skill foundations for self-starters & beginners
                      </p>

                      {/* 2 Format Sections */}
                      <div className="space-y-2 mb-6">
                        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                              <Video className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white">Recorded</div>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">Self-Paced Track</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-extrabold text-slate-900 dark:text-white">₹4,999</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                              <Users className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white">Live</div>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">Interactive Mentor Sessions</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-extrabold text-slate-900 dark:text-white">₹6,999</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                        Included Features:
                      </p>
                      <ul className="space-y-2 mb-6">
                        {[
                          "Real Time Industry Projects",
                          "Recorded Video Sessions",
                          "Dedicated Doubt Clearance",
                          "36Hr+ Live Sessions (Live Track)",
                          "Verified Course Certifications",
                          "ATS-Friendly Resume Building",
                          "Nyeras LMS Subscription",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {[
                          "1:1 Mentor Guidance",
                          "Comprehensive Placement Training",
                          "Technical Mock Interviews",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-400 dark:text-slate-600 line-through opacity-60">
                            <X className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCurriculumPlan('basic');
                          document.getElementById('curriculum-roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="w-full text-center py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all border border-blue-200 dark:border-blue-800/80 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>View Basic Syllabus</span>
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/plans?plan=basic&subplan=recorded&course=${encodeURIComponent(course.title)}`}
                          className="text-center py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-200 dark:border-slate-700"
                        >
                          Recorded (₹4,999)
                        </Link>
                        <Link
                          href={`/plans?plan=basic&subplan=live&course=${encodeURIComponent(course.title)}`}
                          className="text-center py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-all"
                        >
                          Live (₹6,999)
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Plan */}
                  <div className="relative rounded-3xl bg-slate-50/70 dark:bg-slate-850 glossy-black-card p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <Zap className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700">
                          4 Months Duration
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Advanced Plan</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                        Deep industry-grade specializations & live mentor sessions
                      </p>

                      {/* 2 Format Sections */}
                      <div className="space-y-2 mb-6">
                        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                              <Video className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white">Recorded</div>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">Self-Paced Track</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-extrabold text-slate-900 dark:text-white">₹11,999</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                              <Users className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white">Live</div>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">Masterclass Cohort</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-extrabold text-slate-900 dark:text-white">₹14,999</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                        Included Features:
                      </p>
                      <ul className="space-y-2 mb-6">
                        {[
                          "Real Time Industry Projects",
                          "Recorded Video Sessions",
                          "Dedicated Doubt Clearance",
                          "52Hr+ Live Sessions (Live Cohort)",
                          "Verified Course Certifications",
                          "ATS-Friendly Resume Building",
                          "1:1 Mentor Support",
                          "1 Year Full LMS Subscription",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {[
                          "100% Placement Training & Interview Prep",
                          "Corporate Pitch & Presentation Drills",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-400 dark:text-slate-600 line-through opacity-60">
                            <X className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCurriculumPlan('advanced');
                          document.getElementById('curriculum-roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="w-full text-center py-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-bold transition-all border border-amber-200 dark:border-amber-800/80 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>View Advanced Syllabus</span>
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/plans?plan=advanced&subplan=recorded&course=${encodeURIComponent(course.title)}`}
                          className="text-center py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-200 dark:border-slate-700"
                        >
                          Recorded (₹11,999)
                        </Link>
                        <Link
                          href={`/plans?plan=advanced&subplan=live&course=${encodeURIComponent(course.title)}`}
                          className="text-center py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-all"
                        >
                          Live (₹14,999)
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Job Assistance Plan Card - Exclusively for Data Science, Data Analytics, and HRM */}
                  {isJobGuaranteeEligible && (
                    <div className="relative rounded-3xl bg-slate-50/70 dark:bg-slate-850 text-slate-950 dark:text-white glossy-black-card p-6 flex flex-col justify-between hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="p-2.5 rounded-xl bg-indigo-500/10 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-300/60 dark:border-slate-700">
                            <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            6 Months Duration
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-slate-950 dark:text-white mb-1">Job Assistance</h3>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-4">
                          Comprehensive career acceleration & placement support
                        </p>

                        {/* 2 Format Sections */}
                        <div className="space-y-2 mb-6">
                          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-indigo-200 dark:border-indigo-800 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Video className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="text-xs font-black text-slate-950 dark:text-white">Online Live Track</div>
                                <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400">DS • DA • HRM Exclusive</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-base font-black text-slate-950 dark:text-white">₹59,999</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                                <Users className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="text-xs font-black text-slate-950 dark:text-white">Self-Paced Track</div>
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Mentor Guidance</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-base font-black text-slate-950 dark:text-white">₹59,999</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-3">
                          Included Features:
                        </p>
                        <ul className="space-y-2 mb-6">
                          {[
                            "Real Time Industry Projects & Capstones",
                            "Recorded Video Sessions (Lifetime LMS)",
                            "Dedicated Doubt Clearance & Code Reviews",
                            "80Hr+ Live Intensive Cohort Sessions",
                            "Verified Course & Internship Certifications",
                            "ATS-Friendly Executive Resume Building",
                            "Dedicated 1:1 Senior Mentor Support",
                            "1 Year Full Nyeras LMS Access",
                            "4 Live Technical & HR Mock Interviews",
                            "Direct Recruiter Referrals & Job Board Access",
                            "1 Year Priority Placement Support Window",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-900 dark:text-slate-200">
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCurriculumPlan('job-assistance');
                            document.getElementById('curriculum-roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="w-full text-center py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/70 text-indigo-900 dark:text-indigo-200 text-xs font-black transition-all border border-indigo-300 dark:border-indigo-500/40 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span>View Job Assistance Syllabus</span>
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`/plans?plan=job-assistance&subplan=recorded&course=${encodeURIComponent(course.title)}`}
                            className="text-center py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-200 dark:border-slate-700"
                          >
                            Self-Paced (₹59,999)
                          </Link>
                          <Link
                            href={`/plans?plan=job-assistance&subplan=online&course=${encodeURIComponent(course.title)}`}
                            className="text-center py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md"
                          >
                            Live (₹59,999)
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pro (Job Guarantee) Plan Card - Only for DS, DA, and HRM */}
                  {isJobGuaranteeEligible && (
                    <div className="relative rounded-3xl bg-slate-50/70 dark:bg-slate-850 text-slate-950 dark:text-white glossy-black-card p-6 flex flex-col justify-between hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300">
                      {/* Floating Most Popular Badge */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-3.5 py-1 bg-slate-900 text-amber-400 text-[11px] font-extrabold uppercase tracking-wider rounded-full border border-amber-400/50 shadow-xl">
                          MOST POPULAR
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4 mt-2">
                          <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-300/60 dark:border-slate-700">
                            <Crown className="w-4 h-4 text-amber-500" />
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700">
                            6 Months Duration
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-slate-950 dark:text-white mb-1">Pro Plan</h3>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-4">
                          Career transformation & placement enablement
                        </p>

                        {/* 2 Format Sections */}
                        <div className="space-y-2 mb-6">
                          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                                <Video className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="text-xs font-black text-slate-950 dark:text-white">Online Classes</div>
                                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">Job Guarantee</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-base font-black text-slate-950 dark:text-white">₹99,999</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-emerald-400/80 dark:border-emerald-500/40 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <Crown className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="text-xs font-black text-slate-950 dark:text-white">Offline Classes</div>
                                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">100% Job Guarantee</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">₹1,19,999</span>
                              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block">Pay 70:30</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-3">
                          Included Features:
                        </p>
                        <ul className="space-y-2 mb-6">
                          {[
                            "Real Time Industry Projects",
                            "Recorded Video Sessions",
                            "Dedicated Doubt Clearance",
                            "100Hr+ Live Intensive Sessions",
                            "Industry-Recognized Certifications",
                            "Executive Resume & Portfolio Building",
                            "Dedicated 1:1 Senior Mentor Support",
                            "1 Year Nyeras LMS Subscription",
                            "100% Placement Training & Interview Prep",
                            "Unlimited Technical Mock Interviews",
                            "Executive Tech Seminars & Guest Lectures",
                            "Corporate Pitch & Presentation Drills",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-900 dark:text-slate-200">
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCurriculumPlan('pro');
                            document.getElementById('curriculum-roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="w-full text-center py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/70 text-emerald-800 dark:text-emerald-300 text-xs font-black transition-all border border-emerald-300 dark:border-emerald-500/40 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Crown className="w-3.5 h-3.5 text-amber-500" />
                          <span>View Pro Job Guarantee Syllabus</span>
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`/plans?plan=pro&subplan=online&course=${encodeURIComponent(course.title)}`}
                            className="text-center py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all border border-slate-700 shadow-sm"
                          >
                            Online (₹99,999)
                          </Link>
                          <Link
                            href={`/plans?plan=pro&subplan=offline&course=${encodeURIComponent(course.title)}`}
                            className="text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold transition-all shadow-md"
                          >
                            Offline (₹1,19,999)
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
              )}

              {/* Certificates Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl glossy-black-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl border border-slate-700">
                    <Award className="w-6 h-6 text-slate-200" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Sample Certificates</h2>
                </div>

                <div className="relative">
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md">
                    <iframe
                      key={currentCertIndex}
                      title={certificates[currentCertIndex].title}
                      src={certificates[currentCertIndex].pdf}
                      className="w-full h-96"
                    />
                    <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <button
                        onClick={() => setCurrentCertIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1))}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors"
                        aria-label="Previous certificate"
                      >
                        <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                      </button>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {certificates[currentCertIndex].title} Certificate {currentCertIndex + 1} of {certificates.length}
                      </p>
                      <button
                        onClick={() => setCurrentCertIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1))}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors"
                        aria-label="Next certificate"
                      >
                        <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 space-x-2">
                    {certificates.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCertIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentCertIndex ? 'bg-slate-900 dark:bg-white' : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                        }`}
                        aria-label={`View certificate ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Domain Career & Placement Support Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl glossy-black-card space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-150 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl border border-slate-700">
                      <Briefcase className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Integrated Career & Placement Cell</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        Career Outcomes & Placement Support
                      </h2>
                    </div>
                  </div>

                  {isJobGuaranteeEligible ? (
                    <Link
                      href="/domains/job-guarantee"
                      className="px-4 py-2 rounded-xl skeuo-btn-primary text-white text-xs font-black shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                    >
                      <Crown className="w-4 h-4 text-amber-300" />
                      <span>100% Job Guarantee Track</span>
                    </Link>
                  ) : (
                    <Link
                      href="/plans"
                      className="px-4 py-2 rounded-xl skeuo-btn-primary text-white text-xs font-black shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Explore Career Plans</span>
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">Target Career Roles for this Domain</span>
                    <div className="flex flex-wrap gap-2">
                      {domainCareerRoles.map((role, rIdx) => (
                        <span key={rIdx} className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-200 shadow-2xs">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">Included Career Enablement</span>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>1:1 Domain ATS Resume Review & Optimization</span>
                      </li>
                      <li className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Live Technical & HR Mock Interviews with Senior Leads</span>
                      </li>
                      <li className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Direct Partner Referrals Across 100+ Hiring MNCs</span>
                      </li>
                      {isJobGuaranteeEligible && (
                        <li className="flex items-center gap-2 font-black text-emerald-600 dark:text-emerald-400">
                          <Crown className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>100% Contractual Job Guarantee (Pro Cohort Bond)</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-bold text-slate-500">
                  <span>Track applications, resume reviews, and career assistance within your student portal.</span>
                  {isJobGuaranteeEligible ? (
                    <Link
                      href="/domains/job-guarantee"
                      className="text-emerald-600 dark:text-emerald-400 font-extrabold hover:underline flex items-center gap-1"
                    >
                      <span>Explore Job Guarantee Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/plans"
                      className="text-emerald-600 dark:text-emerald-400 font-extrabold hover:underline flex items-center gap-1"
                    >
                      <span>Compare All Plans & Tracks</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-24 space-y-6"
              >
                {courseMentors.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    heading={`Meet Your ${mentor.domainLabel} Mentor`}
                    description={mentor.sectionDescription}
                  />
                ))}

                {/* Enroll / Institutional Partnership Card */}
                {isSchoolCourse ? (
                  <div className="relative group">
                    <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl glossy-black-card">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                        Institutional Partnership
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                        Introduce this future-skills curriculum in your school. Speak with our academic coordinators to discuss batch schedules, faculty presentations, and pilot cohorts.
                      </p>
                      <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-2xl shadow-lg border border-slate-700/60 hover-lift transition-all"
                      >
                        <span>Contact Academic Team</span>
                        <ExternalLink className="w-5 h-5 text-slate-300" />
                      </motion.a>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl glossy-black-card">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                          Ready to Start?
                        </h3>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-xs ${planPricingDetails.badgeColor}`}>
                          {planPricingDetails.planName}
                        </span>
                      </div>
                      
                      {/* Dynamic Pricing Box */}
                      <div className="mb-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Current Cohort Offer
                          </span>
                          <span className="text-[10px] font-extrabold text-slate-600 dark:text-slate-300">
                            {planPricingDetails.duration}
                          </span>
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedCurriculumPlan}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.18 }}
                            className="flex items-baseline gap-2.5"
                          >
                            <span className="text-3xl font-black text-slate-900 dark:text-white">
                              {planPricingDetails.price}
                            </span>
                            {planPricingDetails.originalPrice && (
                              <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 line-through">
                                {planPricingDetails.originalPrice}
                              </span>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {selectedCurriculumPlan === 'job-assistance' && isJobGuaranteeEligible && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-600 dark:text-slate-400">DS • DA • HRM: <strong className="text-slate-900 dark:text-white font-black">₹59,999</strong></span>
                            <span className="text-indigo-600 dark:text-indigo-400">Placement Support: <strong className="font-black">Included</strong></span>
                          </div>
                        )}
                        {selectedCurriculumPlan === 'pro' && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-600 dark:text-slate-400">Online: <strong className="text-slate-900 dark:text-white font-black">₹99,999</strong></span>
                            <span className="text-emerald-600 dark:text-emerald-400">Offline: <strong className="font-black">₹1,19,999</strong></span>
                          </div>
                        )}
                        {selectedCurriculumPlan === 'basic' && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-600 dark:text-slate-400">Recorded: <strong className="text-slate-900 dark:text-white font-black">₹4,999</strong></span>
                            <span className="text-blue-600 dark:text-blue-400">Live: <strong className="font-black">₹6,999</strong></span>
                          </div>
                        )}
                        {selectedCurriculumPlan === 'advanced' && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-600 dark:text-slate-400">Recorded: <strong className="text-slate-900 dark:text-white font-black">₹11,999</strong></span>
                            <span className="text-amber-600 dark:text-amber-400">Live: <strong className="font-black">₹14,999</strong></span>
                          </div>
                        )}
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                        Speak with our counselor, get the detailed brochure, and claim placement assistance.
                      </p>
                      
                      <motion.a
                        href={planPricingDetails.href}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-2xl shadow-lg border border-slate-700/60 hover-lift transition-all"
                      >
                        <span>Enroll Now • {planPricingDetails.planName}</span>
                        <ExternalLink className="w-5 h-5 text-slate-300" />
                      </motion.a>
                    </div>
                  </div>
                )}

                {/* Request a Callback Card */}
                <div className="relative group">
                  <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl glossy-black-card">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Request a Callback</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Leave your details and our counselor will call you back.</p>
                    <form onSubmit={submitCallback} className="space-y-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        maxLength={100}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        maxLength={15}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        maxLength={150}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold border border-slate-700/50 hover-lift disabled:opacity-60 transition-all"
                      >
                        {submitting ? "Submitting..." : "Request a Callback"}
                      </button>
                      {message && (
                        <div className="text-sm text-center text-slate-700 dark:text-slate-300">{message}</div>
                      )}
                    </form>
                  </div>
                </div>

                {/* Course Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl glossy-black-card space-y-4"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Course Highlights</h4>
                  
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <Clock className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Duration</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">6-12 months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <Users className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Batch Size</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">20-30 students</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <Award className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Certification</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Industry Recognized</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PremiumCoursePage
