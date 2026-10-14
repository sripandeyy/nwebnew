"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, BookOpen, Zap, Crown, ArrowRight, ShieldCheck, Clock, Award, Users, Briefcase, ChevronRight, GraduationCap } from "lucide-react"
import Topbar from "../components/Topbar"
import Header from "../components/Header"
import Footer from "../components/Footer"

type PlanType = "basic" | "advanced" | "job-assistance" | "pro"
type SubPlanType = "recorded" | "live" | "offline" | "online"

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)
  const [selectedSubPlan, setSelectedSubPlan] = useState<{ plan: PlanType; type: SubPlanType } | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const planParam = params.get("plan") as PlanType | null
      const subPlanParam = params.get("subplan") as SubPlanType | null
      if (planParam && ["basic", "advanced", "job-assistance", "pro"].includes(planParam)) {
        setSelectedPlan(planParam)
        if (subPlanParam && ["recorded", "live", "offline", "online"].includes(subPlanParam)) {
          setSelectedSubPlan({ plan: planParam, type: subPlanParam })
        }
      }
    }
  }, [])

  const resetAllPlanState = () => {
    setSelectedSubPlan(null)
    setSelectedPlan(null)
  }

  const openPlan = (planId: PlanType) => {
    setSelectedSubPlan(null)
    setSelectedPlan(planId)
  }

  const plans = [
    {
      id: "basic" as PlanType,
      name: "Basic",
      tagline: "Essential skill foundations for self-starters",
      badge: "Foundation",
      startingPrice: "₹4,999",
      accentColor: "blue",
      duration: "2 Months Duration",
      icon: <BookOpen className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
      highlight: "Perfect for students & beginners looking to build core technical practical skills.",
      pros: [
        "Real Time Industry Projects",
        "Recorded Video Sessions",
        "Dedicated Doubt Clearance",
        "36Hr+ Live Sessions",
        "Verified Course Certifications",
        "ATS-Friendly Resume Building",
        "Nyeras LMS Subscription",
      ],
      cons: [
        "1:1 Mentor Guidance",
        "Comprehensive Placement Training",
        "Technical Mock Interviews",
        "Live Executive Seminars",
        "Corporate Presentation Sessions",
      ],
      subPlans: [
        {
          type: "recorded" as SubPlanType,
          name: "Self-Paced Learning",
          tag: "Flexible",
          description: "Learn at your own pace with full access to curriculum & resources.",
          features: [
            "Lifetime access to all recorded course modules",
            "Self-paced curriculum with hands-on exercises",
            "Budget-friendly one-time investment",
            "Downloadable study guides & starter code",
          ],
        },
        {
          type: "live" as SubPlanType,
          name: "Live Interactive Sessions",
          tag: "Interactive",
          description: "Engage in real-time with instructors and collaborative peer groups.",
          features: [
            "Real-time instructor interaction & live coding",
            "Immediate in-session doubt resolution",
            "Full access to class recordings & notes",
            "Weekly live Q&A & project review workshops",
          ],
        },
      ],
    },
    {
      id: "advanced" as PlanType,
      name: "Advanced",
      tagline: "Deep industry-grade specializations & live mentor sessions",
      badge: "Most Balanced",
      startingPrice: "₹11,999",
      accentColor: "slate",
      duration: "4 Months Duration",
      icon: <Zap className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
      highlight: "Ideal for aspiring software engineers ready for hands-on production experience.",
      pros: [
        "Real Time Industry Projects",
        "Recorded Video Sessions",
        "Dedicated Doubt Clearance",
        "52Hr+ Live Sessions",
        "Verified Course Certifications",
        "ATS-Friendly Resume Building",
        "1:1 Mentor Support",
        "1 Year Full LMS Subscription",
      ],
      cons: [
        "Comprehensive Placement Training",
        "Technical Mock Interviews",
        "Live Executive Seminars",
        "Corporate Presentation Sessions",
        "100% Placement Training & Interview Prep",
      ],
      subPlans: [
        {
          type: "recorded" as SubPlanType,
          name: "Self-Paced Advanced",
          tag: "Flexible",
          description: "Deep dive into advanced modules on your own schedule.",
          features: [
            "Lifetime access to advanced projects & modules",
            "Self-paced industry-grade capstones",
            "Premium email & portal support",
            "Curated interview question repository",
          ],
        },
        {
          type: "live" as SubPlanType,
          name: "Live Masterclass Cohort",
          tag: "Popular",
          description: "Live interactive cohort with weekly mentor feedback.",
          features: [
            "Live real-time mentor interaction & code reviews",
            "Priority doubt clearance during & after sessions",
            "Includes all session recordings & repositories",
            "Architectural design & code quality drills",
          ],
        },
      ],
    },
    {
      id: "job-assistance" as PlanType,
      name: "Job Assistance",
      tagline: "Comprehensive career acceleration & placement support for DS, DA & HRM tracks",
      badge: "DS • DA • HRM Tracks",
      startingPrice: "₹59,999",
      accentColor: "indigo",
      duration: "6 Months Duration",
      icon: <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      highlight: "Complete career transformation with 1:1 mentor guidance, ATS resume revamps, 4 live mock interviews, and corporate recruitment referrals (Exclusive to Data Science, Data Analytics, and HRM).",
      pros: [
        "Real Time Industry Projects & Capstones",
        "Recorded Video Sessions (Lifetime LMS)",
        "Dedicated Doubt Clearance & Code Reviews",
        "80Hr+ Live Intensive Cohort Sessions",
        "Verified Course & Internship Certifications",
        "ATS-Friendly Executive Resume Building",
        "Dedicated 1:1 Senior Mentor Support",
        "1 Year Nyeras LMS & Portal Access",
        "4 Live Technical & HR Mock Interviews",
        "Aptitude & Soft Skills Bootcamps",
        "Direct Recruiter Referrals & Job Board Access",
        "1 Year Priority Placement Support Window",
      ],
      cons: [
        "100% Contractual Job Guarantee Bond (Exclusive to Pro DS/DA/HRM)",
      ],
      subPlans: [
        {
          type: "online" as SubPlanType,
          name: "Online Live Track + Job Assistance",
          tag: "DS • DA • HRM",
          description: "Live mentor-led cohort with intensive technical training, 4 live mock interviews, and dedicated job assistance for Data Science, Data Analytics & HRM.",
          features: [
            "Full 6-month intensive curriculum with live mentor sessions",
            "4 Live technical & HR mock interviews with detailed rubrics",
            "1:1 ATS resume re-engineering & GitHub portfolio review",
            "Direct recruiter referrals to 100+ partner MNCs & startups",
            "1-Year priority placement assistance window",
          ],
        },
        {
          type: "recorded" as SubPlanType,
          name: "Self-Paced Track + Job Assistance",
          tag: "DS • DA • HRM",
          description: "Complete self-paced curriculum with dedicated mentor guidance and full job assistance for Data Science, Data Analytics & HRM.",
          features: [
            "Lifetime access to all course modules, repositories & capstones",
            "Weekly mentor office hours & doubt clearance",
            "Executive ATS resume overhaul & portfolio curation",
            "Direct corporate referrals & continuous job board access",
            "1-Year priority placement support window",
          ],
        },
      ],
    },
    {
      id: "pro" as PlanType,
      name: "Pro",
      tagline: "Exclusive to HRM, Data Analytics & Data Science Tracks",
      badge: "DS • DA • HRM EXCLUSIVE",
      popular: true,
      startingPrice: "Pay After Placement Available",
      accentColor: "zinc",
      duration: "6 Months Duration",
      icon: <Crown className="w-5 h-5 text-amber-400" />,
      highlight: "Complete end-to-end career transformation with 100% placement assistance, exclusive to Data Science, Data Analytics, and HRM.",
      pros: [
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
      ],
      cons: [],
      subPlans: [
        {
          type: "offline" as SubPlanType,
          name: "Offline Classes (Job Guarantee)",
          tag: "100% Placement",
          description: "In-person intensive bootcamp with 100% placement assurance and dedicated corporate matchmaking.",
          features: [
            "Exclusively for Data Science, Data Analytics & HRM Tracks",
            "In-person & live intensive career bootcamps",
            "Guaranteed placement network across 100+ hiring partner MNCs",
            "Pay 70% to start; 30% only after you land a job",
            "Direct recruitment drives & dedicated HR matchmaking",
          ],
        },
        {
          type: "online" as SubPlanType,
          name: "Online Classes (Job Guarantee)",
          tag: "100% Placement",
          description: "Complete live online training track with 100% placement assurance and referral pipeline.",
          features: [
            "Available across all tech & engineering domains",
            "Attend from anywhere with live + recorded access",
            "1:1 Resume review & technical mock interview drills",
            "Direct corporate referrals to active job openings",
          ],
        },
      ],
    },
  ]

  const paymentConfig: Record<PlanType, Record<SubPlanType, { price: string; pre: string; full: string }>> = {
    basic: {
      recorded: { price: "₹4,999 + GST", pre: "https://rzp.io/rzp/NYE1kPR2m", full: "https://rzp.io/rzp/NYFPBaSp" },
      live: { price: "₹6,999 + GST", pre: "https://rzp.io/rzp/NYE1kPR2m", full: "https://rzp.io/rzp/NYFPBaL" },
      offline: { price: "₹4,999 + GST", pre: "https://rzp.io/rzp/NYE1kPR2m", full: "https://rzp.io/rzp/NYFPBaSp" },
      online: { price: "₹6,999 + GST", pre: "https://rzp.io/rzp/NYE1kPR2m", full: "https://rzp.io/rzp/NYFPBaL" },
    },
    advanced: {
      recorded: { price: "₹11,999 + GST", pre: "https://rzp.io/rzp/NYE2kPR4m", full: "https://rzp.io/rzp/NYFPAdSp" },
      live: { price: "₹14,999 + GST", pre: "https://rzp.io/rzp/NYE2kPR4m", full: "https://rzp.io/rzp/NYFPAdL" },
      offline: { price: "₹11,999 + GST", pre: "https://rzp.io/rzp/NYE2kPR4m", full: "https://rzp.io/rzp/NYFPAdSp" },
      online: { price: "₹14,999 + GST", pre: "https://rzp.io/rzp/NYE2kPR4m", full: "https://rzp.io/rzp/NYFPAdL" },
    },
    "job-assistance": {
      online: { price: "₹59,999 + GST", pre: "https://rzp.io/rzp/NYE3kPRPRO", full: "https://rzp.io/rzp/NYFPProL" },
      recorded: { price: "₹59,999 + GST", pre: "https://rzp.io/rzp/NYE3kPRPRO", full: "https://rzp.io/rzp/NYFPProL" },
      live: { price: "₹59,999 + GST", pre: "https://rzp.io/rzp/NYE3kPRPRO", full: "https://rzp.io/rzp/NYFPProL" },
      offline: { price: "₹59,999 + GST", pre: "https://rzp.io/rzp/NYE3kPRPRO", full: "https://rzp.io/rzp/NYFPProL" },
    },
    pro: {
      offline: { price: "₹1,19,999 + GST", pre: "https://rzp.io/rzp/NYE5kPRoffline", full: "https://rzp.io/rzp/NYFPOff" },
      online: { price: "₹99,999 + GST", pre: "https://rzp.io/rzp/NYE3kPRPRO", full: "https://rzp.io/rzp/NYFPProL" },
      recorded: { price: "₹1,19,999 + GST", pre: "https://rzp.io/rzp/NYE3kPRPRO", full: "https://rzp.io/rzp/NYFPOff" },
      live: { price: "₹99,999 + GST", pre: "https://rzp.io/rzp/NYE3kPRPRO", full: "https://rzp.io/rzp/NYFPProL" },
    },
  }

  const activePlanData = plans.find((p) => p.id === selectedPlan)

  return (
    <div 
      className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-[#070913]/50 text-slate-900 dark:text-slate-100 antialiased selection:bg-slate-500/20 selection:text-slate-700 dark:selection:text-slate-200 transition-colors duration-300 relative"
    >
      <Topbar />
      <Header />

      {/* Main Content */}
      <main className="relative flex-grow pt-32 pb-24 z-10">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-slate-300 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Flexible Learning Tracks
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              Choose Your{" "}
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Learning Path
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Accelerate your engineering journey with production projects, 1:1 mentor feedback, and guaranteed corporate placement pathways.
            </motion.p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1740px] mx-auto items-stretch">
            {plans.map((plan, index) => {
              const isPopular = plan.popular

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 backdrop-blur-xl glossy-black-card ${
                    isPopular
                      ? "border-2 border-slate-900/15 dark:border-slate-700 shadow-2xl lg:-translate-y-2 ring-1 ring-slate-900/5 dark:ring-white/10"
                      : "border border-slate-200/80 dark:border-slate-800"
                  } bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100`}
                >
                  {/* Popular Floating Badge */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-800 dark:border-slate-200 text-xs font-bold shadow-xl uppercase tracking-wider">
                        <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="p-7 sm:p-8 pb-6 border-b border-slate-200/70 dark:border-slate-800/80">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${
                          isPopular ? "text-amber-500" : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {plan.icon}
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {plan.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {plan.tagline}
                    </p>

                    <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                          {plan.startingPrice}
                        </span>
                        {plan.id !== "pro" && (
                          <span className="text-xs text-slate-500 dark:text-slate-400">/ track</span>
                        )}
                      </div>

                      {/* 2 Format Sections */}
                      <div className="mt-4 space-y-2">
                        {plan.id === "basic" && (
                          <>
                            <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">Recorded (Self-Paced)</span>
                              <span className="font-bold text-slate-900 dark:text-white">₹4,999</span>
                            </div>
                            <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">Live Interactive</span>
                              <span className="font-bold text-slate-900 dark:text-white">₹6,999</span>
                            </div>
                          </>
                        )}
                        {plan.id === "advanced" && (
                          <>
                            <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">Recorded (Self-Paced)</span>
                              <span className="font-bold text-slate-900 dark:text-white">₹11,999</span>
                            </div>
                            <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">Live Masterclass Cohort</span>
                              <span className="font-bold text-slate-900 dark:text-white">₹14,999</span>
                            </div>
                          </>
                        )}
                        {plan.id === "job-assistance" && (
                          <>
                            <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800">
                              <span className="font-semibold text-indigo-900 dark:text-indigo-300">Online Live Track</span>
                              <span className="font-bold text-indigo-950 dark:text-white">₹59,999</span>
                            </div>
                            <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">Self-Paced Track</span>
                              <span className="font-bold text-slate-900 dark:text-white">₹59,999</span>
                            </div>
                          </>
                        )}
                        {plan.id === "pro" && (
                          <>
                            <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">Online Classes</span>
                              <span className="font-bold text-slate-950 dark:text-white">₹99,999</span>
                            </div>
                            <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40">
                              <span className="font-semibold text-emerald-800 dark:text-emerald-300">Offline Classes</span>
                              <span className="font-bold text-emerald-700 dark:text-emerald-400">₹1,19,999</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Feature List */}
                  <div className="p-7 sm:p-8 flex-grow space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Included Features
                    </p>
                    <ul className="space-y-3">
                      {plan.pros.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <div className="mt-0.5 rounded-full p-0.5 flex-shrink-0 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}

                      {plan.cons.map((feature, idx) => (
                        <li key={`cons-${idx}`} className="flex items-start gap-3 text-sm opacity-40">
                          <div className="mt-0.5 rounded-full p-0.5 flex-shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-400">
                            <X className="w-3.5 h-3.5 stroke-[2]" />
                          </div>
                          <span className="text-slate-400 dark:text-slate-500 line-through">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action CTA - Skeuomorphic Button */}
                  <div className="p-7 sm:p-8 pt-0">
                    <button
                      type="button"
                      onClick={() => openPlan(plan.id)}
                      className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 skeuo-btn-primary text-white"
                    >
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Dedicated Career & Placement Support System Matrix */}
          <div className="mt-20 max-w-6xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-2xl glossy-black-card space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-black mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Integrated Placement & Job Assistance Cell</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                  Career Enablement & Placement Support by Plan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Transparent breakdown of career services included across all cohorts. Access our real-time Student Dashboard to track resumes, mock evaluations, and corporate job applications.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/domains/job-guarantee"
                  className="px-5 py-2.5 rounded-xl skeuo-btn-primary text-white text-xs font-black shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>Explore Job Guarantee Tracks</span>
                </Link>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                    <th className="py-3 px-4">Placement Service</th>
                    <th className="py-3 px-4">Basic Plan (2 Months)</th>
                    <th className="py-3 px-4">Advanced Plan (4 Months)</th>
                    <th className="py-3 px-4 text-indigo-600 dark:text-indigo-400">Job Assistance Plan (₹59,999)</th>
                    <th className="py-3 px-4 text-emerald-600 dark:text-emerald-400">Pro Plan (100% Job Guarantee)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-bold">
                  <tr>
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">Resume Assistance</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">ATS Structure Templates & Rubric</td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">1:1 Senior Mentor Review & Edits</td>
                    <td className="py-3.5 px-4 text-indigo-700 dark:text-indigo-300 font-extrabold">1:1 Senior ATS Re-engineering & Portfolio Review</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-extrabold">Dedicated ATS Packaging & Executive Branding</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">Mock Interview Drills</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Question Bank & Recorded Guides</td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">2 Live 1:1 Technical & HR Mocks</td>
                    <td className="py-3.5 px-4 text-indigo-700 dark:text-indigo-300 font-extrabold">4 Live 1:1 Technical & HR Mocks with Feedback</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-extrabold">Unlimited Technical, HR & Aptitude Mocks</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">Recruitment & Referrals</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Opportunities Board Access</td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">Direct Partner Referral Pipeline</td>
                    <td className="py-3.5 px-4 text-indigo-700 dark:text-indigo-300 font-extrabold">Recruiter Referrals + Continuous Job Board Pipeline</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-extrabold">Dedicated Corporate Matchmaking Desk</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">Contractual Commitment</td>
                    <td className="py-3.5 px-4 text-slate-500">Placement Assistance</td>
                    <td className="py-3.5 px-4 text-slate-500">Placement Assistance</td>
                    <td className="py-3.5 px-4 text-indigo-700 dark:text-indigo-300 font-extrabold">Placement Support (DS, DA & HRM)</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-black">100% Job Guarantee (Pay 70:30 Bond)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">Support Window</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Course Duration</td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">6 Months Post-Completion</td>
                    <td className="py-3.5 px-4 text-indigo-700 dark:text-indigo-300 font-extrabold">1 Year Priority Placement Window</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-extrabold">Active Support Until Successful Placement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span>* 100% Job Guarantee applies exclusively to verified Data Science, Data Analytics, and HRM cohorts upon meeting attendance & capstone criteria.</span>
              <Link href="/domains/job-guarantee" className="font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0">
                Read Guarantee Terms & Policy &rarr;
              </Link>
            </div>
          </div>

          {/* Value Guarantee / Trust Badges */}
          <div className="mt-20 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-slate-200 dark:border-slate-800 pt-12">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-2 border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">100% Verified</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Industry recognized</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-2 border border-slate-200 dark:border-slate-700">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">1:1 Mentorship</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Direct senior support</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-2 border border-slate-200 dark:border-slate-700">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Hiring Partners</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">100+ Top MNCs</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-2 border border-slate-200 dark:border-slate-700">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Live Capstones</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Production portfolios</span>
            </div>
          </div>
        </div>
      </main>

      {/* Plan Selection & Checkout Modal */}
      <AnimatePresence>
        {selectedPlan && activePlanData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
            onClick={resetAllPlanState}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 pb-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2 border border-slate-200 dark:border-slate-700">
                    {activePlanData.duration}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {activePlanData.name} Plan Options
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Select your preferred learning delivery format to proceed with enrollment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetAllPlanState}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                {!selectedSubPlan ? (
                  <div className="space-y-4">
                    {activePlanData.subPlans.map((subPlan) => {
                      const priceLabel = paymentConfig[selectedPlan][subPlan.type].price

                      return (
                        <div
                          key={subPlan.type}
                          className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-200 flex flex-col justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 mb-1">
                                  {subPlan.tag}
                                </span>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                                  {subPlan.name}
                                </h4>
                              </div>
                              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                                {priceLabel}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
                              {subPlan.description}
                            </p>

                            <ul className="space-y-2 mb-4">
                              {subPlan.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Skeuomorphic Proceed Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedSubPlan({ plan: selectedPlan, type: subPlan.type })}
                            className="w-full py-3 px-5 rounded-xl skeuo-btn-primary text-white font-extrabold text-sm flex items-center justify-center gap-2"
                          >
                            <span>Select & Proceed to Payment</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Selected Format
                        </div>
                        <div className="text-base font-bold text-slate-900 dark:text-white">
                          {activePlanData.name} — {selectedSubPlan.type === "live" ? "Live Interactive" : selectedSubPlan.type === "recorded" ? "Self-Paced" : selectedSubPlan.type === "online" ? "Online Classes" : "Offline Classes"}
                        </div>
                      </div>
                      <div className="text-base font-extrabold text-slate-900 dark:text-white">
                        {paymentConfig[selectedSubPlan.plan][selectedSubPlan.type].price}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href={paymentConfig[selectedSubPlan.plan][selectedSubPlan.type].pre}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-600 dark:hover:border-slate-500 bg-white dark:bg-slate-800/80 transition-all flex flex-col justify-between hover:shadow-lg"
                      >
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                            Seat Reservation
                          </div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            Pre-registration
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Reserve your seat now and lock your cohort spot.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:translate-x-0.5 transition-transform">
                          <span>Pay Token Fee</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </a>

                      <a
                        href={paymentConfig[selectedSubPlan.plan][selectedSubPlan.type].full}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-5 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800/60 hover:border-emerald-600 dark:hover:border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 transition-all flex flex-col justify-between hover:shadow-lg"
                      >
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                            Full Enrollment
                          </div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            Full Payment
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Instant full access to all curriculum, LMS & community.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-emerald-100 dark:border-emerald-900/60 flex items-center justify-between text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                          <span>Pay Total Amount</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </a>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSubPlan(null)}
                        className="text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 underline underline-offset-4"
                      >
                        ← Change Delivery Format
                      </button>
                      <button
                        type="button"
                        onClick={resetAllPlanState}
                        className="text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default PlansPage
