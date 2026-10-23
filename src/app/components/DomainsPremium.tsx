"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, Briefcase, GraduationCap, TrendingUp, Users, ArrowRight, CheckCircle2, Award, Sparkles } from "lucide-react"

const DomainsPremium = () => {
  const domains = [
    {
      href: "/domains/departments",
      icon: <GraduationCap className="w-7 h-7 text-slate-800 dark:text-slate-200" />,
      badge: "Academic Tracks",
      badgeClass: "bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 border border-slate-700/60 shadow-xs",
      title: "Academic & Tech Departments",
      description: "Rigorous industry curriculum spanning Computer Science, Electronics, Mechanical, Civil, Management, Biotech, and UI/UX Design.",
      stats: "8+ Specialized Departments",
      features: [
        "Full Stack Web & Mobile App Engineering",
        "Agentic AI, GenAI & Advanced Machine Learning",
        "Cloud Architecture on AWS & Microsoft Azure",
        "VLSI, FPGA & Embedded Systems Engineering",
        "CAD/CAM, FEA Modeling & Mechanical Dynamics",
        "Civil BIM (Revit), STAAD Pro & Structural GIS",
        "Strategic Management, HR Operations & Payroll",
        "UI/UX Design Systems & Creative Prototyping",
        "Bioinformatics, Genomic Tech & Food Quality",
        "Live Production Capstones with Client Briefs",
        "1:1 Code Reviews & Senior Practitioner Mentorship",
        "Govt & Industry Recognized Verified Certifications",
      ],
      ctaText: "Explore All Departments",
    },
    {
      href: "/domains/job-guarantee",
      icon: <Briefcase className="w-7 h-7 text-slate-800 dark:text-slate-200" />,
      badge: "100% Placement",
      badgeClass: "bg-green-900 text-white dark:bg-green-800 dark:text-slate-100 border border-green-700/60 shadow-xs",
      title: "Job Guarantee Programs",
      description: "Intensive, outcome-driven career bootcamps with corporate hiring drives, 100% placement agreement, and pay-after-placement option.",
      stats: "100% Placement Assurance",
      features: [
        "Exclusively in Data Science, Analytics & HRM Tracks",
        "Guaranteed Placement Agreement with 100+ Hiring Partners",
        "Average Salary Packages of ₹5.0 LPA to ₹18.0 LPA",
        "Pay 70% to start, remaining 30% ONLY after landing a job",
        "Unlimited Technical Mock Interviews & Live Whiteboarding",
        "ATS-Optimized Resume & Custom GitHub Portfolio Review",
        "Direct HR Matchmaking & Private Recruitment Drives",
        "Corporate Executive Seminars & Communication Drills",
        "Live Mentorship from Senior MNC Engineers & HR Heads",
        "Dedicated Career Coach & Salary Negotiation Strategy",
        "Lifetime Access to Capstone Repositories & LMS",
        "Formal Job Guarantee Bond & Compliance Certificate",
      ],
      ctaText: "Explore Job Guarantee Tracks",
    },
    {
      href: "/domains/future-skills-school",
      icon: <Sparkles className="w-7 h-7 text-blue-600 dark:text-blue-400" />,
      badge: "School Curriculum",
      badgeClass: "bg-blue-900 text-white dark:bg-blue-800 dark:text-slate-100 border border-blue-700/60 shadow-xs",
      title: "Future Skills School Program",
      description: "From classroom learning to real-world skills. A curated, project-based curriculum in programming, AI, data thinking, sciences, and financial literacy for schools.",
      stats: "7 Specialized School Programs",
      features: [
        "C++ Programming Foundations (Memory, Logic & OOP)",
        "Java & Full-Stack Foundations (Web, APIs & DB)",
        "AI & Machine Learning Foundations (Heuristics & Neural Nets)",
        "AI in Economics & Data Thinking (Evidence & Trends)",
        "Finance & Financial Literacy (Budgeting, Banking & Compounding)",
        "Stock Market Awareness (Equities, IPOs & SEBI Regulation)",
        "Chemistry Curriculum (Matter, Bonding, Reactions & Titration)",
        "6-Stage Pedagogy: Learn • Practice • Build • Explore • Present • Certify",
        "Curated School Edition Adapted from Industry Tracks",
        "Real-World Hands-on Projects & Guided Milestones",
        "Stream-Optimized for CS, Science, Commerce & Humanities",
        "Responsible Tech: AI Ethics, Algorithmic Bias & Safety",
        "Capstone Console Apps, Web Demos & Data Presentations",
        "Official Nyeras Verified School Certificate of Completion",
      ],
      ctaText: "Explore School Programs",
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="relative pt-32 pb-14">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm mb-6 shadow-xs">
              Choose Your Career Track
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
                Domains
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Select the perfect learning track engineered to accelerate your skills, portfolio, and corporate career.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative pb-20">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={`domain-${domain.title || index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative h-full"
              >
                <Link href={domain.href} className="block h-full">
                  {/* Card Container */}
                  <div className="relative bg-white/55 dark:bg-slate-900/55 backdrop-blur-2xl rounded-3xl skeuo-card h-full flex flex-col justify-between group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    {/* Card Content */}
                    <div className="p-8 lg:p-10 flex-1 flex flex-col">
                      {/* Badge and Icon Row */}
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <span
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-slate-700 shadow-xs backdrop-blur-md text-slate-950 dark:text-slate-100 text-xs font-black uppercase tracking-wider"
                        >
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          <span>{domain.badge}</span>
                        </span>

                        <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-slate-700 backdrop-blur-md flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 text-slate-950 dark:text-white">
                          {domain.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl lg:text-3xl font-black text-slate-950 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {domain.title}
                      </h2>

                      {/* Description */}
                      <p className="text-slate-800 dark:text-slate-300 text-sm sm:text-base mb-6 leading-relaxed flex-1 font-semibold">
                        {domain.description}
                      </p>

                      {/* Stats Badge */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl mb-6 bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-slate-700 shadow-xs backdrop-blur-md w-fit">
                        <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs sm:text-sm font-black text-slate-950 dark:text-slate-100">
                          {domain.stats}
                        </span>
                      </div>

                      {/* Features List - 12 Key Points */}
                      <div className="mb-8 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                        <p className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-slate-300 mb-3">
                          Curriculum & Placement Highlights:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {domain.features.map((feature, i) => (
                            <div
                              key={`domain-feat-${index}-${i}`}
                              className="flex items-start gap-2 text-xs sm:text-xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span className="font-bold text-slate-900 dark:text-slate-200 leading-snug">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-auto pt-4 border-t border-slate-200/80 dark:border-slate-800">
                        <div
                          className="w-full py-3.5 px-6 rounded-2xl skeuo-btn-primary text-white font-black text-sm flex items-center justify-between shadow-md group-hover:scale-[1.01] transition-transform"
                        >
                          <span>{domain.ctaText}</span>
                          <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative pb-20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 dark:bg-white/60 rounded-3xl p-8 lg:p-10 skeuo-card backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-6 text-center text-slate-950 dark:text-slate-950">
              <div className="space-y-1.5">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-slate-950 tracking-tight">
                  15K+
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 font-extrabold uppercase tracking-wider">
                  Active Students
                </div>
              </div>
              <div className="space-y-1.5 border-x border-slate-200/90 dark:border-slate-200/90">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-slate-950 tracking-tight">
                  100+
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 font-extrabold uppercase tracking-wider">
                  Expert Mentors
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-600 dark:text-emerald-600 tracking-tight">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 font-extrabold uppercase tracking-wider">
                  Placement Record
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DomainsPremium
