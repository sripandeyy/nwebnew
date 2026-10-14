"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus_Jakarta_Sans } from "next/font/google"
import {
  Users,
  BookOpen,
  ArrowRight,
  Compass,
  Award,
  TrendingUp,
  ShieldCheck,
  Laptop,
  Quote,
  CheckCircle2,
  ExternalLink,
  Layers,
  Code2,
  Briefcase,
  GraduationCap,
  Star,
  Building2,
  MapPin,
  Play
} from "lucide-react"

import Header from "../components/Header"
import Topbar from "../components/Topbar"
import Footer from "../components/Footer"
import OrganizationGallery from "../components/OrganizationGallery"
import LinkedInFeed from "../components/LinkedInFeed"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export default function AboutClient() {
  const stats = [
    {
      value: "15,000+",
      label: "Students Trained",
      detail: "Across 20+ tech fields",
      icon: Users,
    },
    {
      value: "100+",
      label: "Hiring Partners",
      detail: "Companies hiring our graduates",
      icon: Building2,
    },
    {
      value: "95%",
      label: "Hands-on Projects",
      detail: "Learn by building real things",
      icon: Code2,
    },
    {
      value: "4.9 / 5.0",
      label: "Student Rating",
      detail: "Rated by students & mentors",
      icon: Star,
    },
  ]

  const pillars = [
    {
      title: "Real Projects, Not Just Theory",
      description: "Work on real-world projects that solve actual problems. Build a portfolio you can proudly talk about in interviews.",
      icon: Laptop,
      badge: "Hands-on Practice",
    },
    {
      title: "Certified Internships",
      description: "Earn verified certificates recognized by companies, while working in teams just like a real software company.",
      icon: Briefcase,
      badge: "Govt. Recognized",
    },
    {
      title: "Mentorship from Working Pros",
      description: "Learn directly from experienced engineers and managers working at top tech and IT companies in India.",
      icon: Award,
      badge: "Personal Support",
    },
    {
      title: "Resume & Interview Help",
      description: "Get your resume reviewed, practice real technical interviews, and get connected to companies looking to hire freshers.",
      icon: CheckCircle2,
      badge: "Job Support",
    },
  ]

  const values = [
    {
      number: "01",
      title: "Equal Opportunity",
      description:
        "Every student deserves a chance to learn and grow, no matter which college you attend, where you live, or what your marks are.",
      icon: Users,
      glow: "hover:border-blue-500/50 hover:shadow-blue-500/10",
      iconBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
    },
    {
      number: "02",
      title: "Learning by Doing",
      description:
        "You learn best when you build things with your own hands. We focus on real coding and projects rather than just memorizing notes.",
      icon: Laptop,
      glow: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
    },
    {
      number: "03",
      title: "Real Mentorship",
      description:
        "Having someone guide you makes a huge difference. Our mentors share practical advice to help you avoid common career mistakes.",
      icon: Award,
      glow: "hover:border-purple-500/50 hover:shadow-purple-500/10",
      iconBg: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
    },
    {
      number: "04",
      title: "Affordable Education",
      description:
        "Quality tech training should be within reach for everyone. We keep our courses affordable and accessible for all students.",
      icon: Compass,
      glow: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      iconBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
    },
    {
      number: "05",
      title: "Staying Up to Date",
      description:
        "Technology moves quickly. We constantly update what we teach so you learn the modern tools and skills companies actually use.",
      icon: TrendingUp,
      glow: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
      iconBg: "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400",
    },
    {
      number: "06",
      title: "Honesty & Transparency",
      description:
        "No false promises. We give you honest feedback on your progress, clear certificates, and real support to reach your goals.",
      icon: ShieldCheck,
      glow: "hover:border-rose-500/50 hover:shadow-rose-500/10",
      iconBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400",
    },
  ]

  const offerings = [
    {
      title: "Interactive Live Classes",
      description: "Join live online sessions with experienced trainers. Ask your doubts in real time and get feedback on your code.",
      icon: BookOpen,
      tag: "Live & Practical",
    },
    {
      title: "Active Student Community",
      description: "Connect with over 15,000 students and alumni. Share ideas, work on projects together, and make lifelong friends.",
      icon: Users,
      tag: "15,000+ Students",
    },
    {
      title: "Job & Placement Support",
      description: "Improve your resume, practice technical interviews, and get introduced to companies looking to hire freshers.",
      icon: Award,
      tag: "Placement Help",
    },
  ]

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-800 dark:text-slate-100 ${jakarta.className} selection:bg-blue-600 selection:text-white`}>
      <Topbar />
      <Header />

      <main className="flex-grow relative z-10 overflow-hidden">
        {/* Ambient Animated Mesh Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-40 right-1/4 w-[450px] h-[450px] bg-indigo-500/15 dark:bg-indigo-600/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-72 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-[140px]" />
        </div>

        {/* =========================================================================
            1. HERO SECTION: Clean, Grounded & Aesthetic
           ========================================================================= */}
        <section className="pt-32 sm:pt-36 lg:pt-40 pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
          <div className="w-full max-w-[1780px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto p-8 sm:p-12 lg:p-16 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-500/5 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 sm:w-80 h-[3px] bg-gradient-to-r from-transparent via-blue-600 dark:via-blue-400 to-transparent" />

              {/* Friendly Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-black mb-6 shadow-sm">
                <span>WHERE LEARNING MEETS REAL INDUSTRY WORK</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight mb-6 leading-[1.15]">
                Learn Real Tech Skills.{" "}
                <span className="block mt-1 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent">
                  Build Projects. Get Hired.
                </span>
              </h1>

              {/* Subtitle in plain, human words */}
              <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8">
                Nyeras helps college students and graduates learn real-world technology skills. Through practical internships, hands-on projects, and 1-on-1 mentorship from working industry professionals, we help you get ready for a great tech career.
              </p>

              {/* Trust Badges Row */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Govt. MSME &amp; ISO Certified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  AICTE Approved Syllabus
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Based in Bengaluru
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            2. IMPACT METRICS BAR (Floating Bento Stats)
           ========================================================================= */}
        <section className="py-6 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-[1780px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-xl flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7 text-slate-850 dark:text-slate-200" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">
                        {stat.label}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {stat.detail}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. FOUNDER & LEADERSHIP + VISION / MISSION
           ========================================================================= */}
        <section className="py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-[1780px] mx-auto">
            <div className="p-8 sm:p-10 lg:p-14 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-2xl relative overflow-hidden">
              {/* Decorative Ambient Highlights */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 relative z-10 items-stretch">

                {/* Left Side: Founder Profile */}
                <div className="lg:col-span-5 flex flex-col justify-between lg:pr-10 lg:border-r border-slate-200/90 dark:border-slate-800">
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-extrabold shadow-xs">
                        <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Leadership</span>
                      </span>
                      <span className="text-xs font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        Founder &amp; CEO
                      </span>
                    </div>

                    {/* CEO Photo */}
                    <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/4.6] mx-auto rounded-3xl overflow-hidden border-2 border-slate-300/90 dark:border-slate-700 shadow-2xl bg-slate-100 dark:bg-slate-800 mb-6 group">
                      <Image
                        src="/ceo-pavan.jpg"
                        alt="Pavan Samudra - Founder & CEO of Nyeras"
                        fill
                        sizes="(max-width: 768px) 280px, 320px"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                    </div>

                    {/* Intro */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                        Pavan Samudra
                      </h3>
                      <p className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                        Founder &amp; Chief Executive Officer
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-2 leading-relaxed max-w-sm mx-auto">
                        Dedicated to helping students gain real, practical tech skills that companies actually look for.
                      </p>
                    </div>

                    {/* Quote Card */}
                    <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200/90 dark:border-slate-700/80 text-center shadow-sm">
                      <Quote className="w-7 h-7 text-blue-500/40 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-bold italic relative z-10">
                        &ldquo;Skills matter more than college marks. When students work on real projects with real mentors, they build real careers.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-8 pt-5 border-t border-slate-200/90 dark:border-slate-800 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-extrabold">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      Bengaluru, India
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      15,000+ Students Mentored
                    </span>
                  </div>
                </div>

                {/* Right Side: Vision & Mission (Clear & Simple Words) */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-6">

                  {/* Vision Card */}
                  <div className="p-7 sm:p-9 rounded-3xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-700/80 shadow-md relative overflow-hidden group hover:border-blue-500/50 transition-all">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          Where We Are Heading
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                          Our Vision
                        </h2>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 hidden sm:inline-block">
                        Skills Over Marks
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-5">
                      At <strong className="font-black text-slate-950 dark:text-white">Nyeras</strong>, our vision is to change how students learn and start their careers. We believe hands-on skills and real project experience matter much more than just college marks. We want every student to have the guidance, tools, and confidence to succeed in today&apos;s tech world.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                        <div className="text-xs font-black text-slate-950 dark:text-white">Practical Learning</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Build real things, not just theory</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                        <div className="text-xs font-black text-slate-950 dark:text-white">Open to Everyone</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Students from any college or city</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                        <div className="text-xs font-black text-slate-950 dark:text-white">Job Ready</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Skills modern companies need</div>
                      </div>
                    </div>
                  </div>

                  {/* Mission Card */}
                  <div className="p-7 sm:p-9 rounded-3xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-700/80 shadow-md relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          What We Do Every Day
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                          Our Mission
                        </h2>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 hidden sm:inline-block">
                        Real Internships
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-5">
                      Our mission is to help students from all branches — CSE, IT, AI, ECE, Mechanical, and Management — bridge the gap between classroom theory and real corporate jobs. We do this through certified national internships, direct mentorship from working professionals, and dedicated job placement support.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                        <div className="text-xs font-black text-slate-950 dark:text-white">Live Classes</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Learn with expert mentors</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                        <div className="text-xs font-black text-slate-950 dark:text-white">100+ Companies</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Job &amp; internship openings</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                        <div className="text-xs font-black text-slate-950 dark:text-white">Job Guarantee</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Pay after you get placed</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. WHY STUDENTS CHOOSE NYERAS (Simple & Clear Bento Grid)
           ========================================================================= */}
        <section className="py-10 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-[1780px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-extrabold shadow-xs mb-3">
                <span>Why Choose Us</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                Why Students Choose Nyeras
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 font-bold max-w-2xl mx-auto">
                We replace boring memorization with practical coding, real projects, and friendly mentors who support you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    className="p-7 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col justify-between group hover:border-slate-400 dark:hover:border-slate-600 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-slate-850 dark:text-slate-200" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-950 dark:text-white mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. PROPRIETARY PLATFORMS (Nyeras LMS & NxtMove)
           ========================================================================= */}
        <section className="py-10 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-[1780px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-extrabold shadow-xs mb-3">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Our Learning Platforms</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                Learning Tools Built by Nyeras
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 font-bold max-w-2xl mx-auto">
                We built our own platforms to make learning easy and help you land interviews faster.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Nyeras LMS Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 sm:p-10 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition-all"
              >
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                          Nyeras LMS
                        </h3>
                        <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
                          Online Learning Portal
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700 hidden sm:inline-block">
                      lms.nyeras.com
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Our custom online learning portal where you can attend live classes, watch recorded lectures anytime, work on practical coding exercises, and download your certificates.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Live classes and lifetime access to recorded lessons</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Hands-on coding exercises and project tasks</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Instant verified certificates and progress reports</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href="https://lms.nyeras.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs sm:text-sm font-black w-full sm:w-auto shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <span>Visit Nyeras LMS</span>
                    <ExternalLink className="w-4 h-4 text-slate-300" />
                  </a>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Official Nyeras Platform
                  </span>
                </div>
              </motion.div>

              {/* NxtMove Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 sm:p-10 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/50 transition-all"
              >
                <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs p-2.5">
                        <Image
                          src="/nxtmove-icon.png"
                          alt="NxtMove Icon"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                          NxtMove
                        </h3>
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                          AI Resume &amp; Career Portal
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-full bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-slate-700 hidden sm:inline-block">
                      nxtmove.nyeras.com
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Our career portal designed to help you get hired. Check your resume score against job descriptions, practice mock interviews, and apply directly to hiring partners.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Instant AI resume score and tips to pass company filters</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Practice mock technical interviews with helpful feedback</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Direct applications to openings at 100+ hiring companies</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href="https://nxtmove.nyeras.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-black w-full sm:w-auto shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Image
                      src="/nxtmove-icon.png"
                      alt="NxtMove"
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                    <span>Open NxtMove</span>
                    <ExternalLink className="w-4 h-4 text-white/80" />
                  </a>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Official Nyeras Platform
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CORE VALUES (Grid with Friendly Descriptions)
           ========================================================================= */}
        <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-[1780px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-black mb-4 shadow-xs">
                <span>What We Stand For</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
                Our Core Values
              </h2>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-bold">
                The simple principles that guide how we teach, mentor, and support our students every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {values.map((val, idx) => {
                const Icon = val.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    className={`p-8 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col justify-between transition-all group ${val.glow}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform ${val.iconBg}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                          {val.number}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-950 dark:text-white mb-3">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ORGANIZATIONS GALLERY (MoU & University Alliances)
           ========================================================================= */}
        <OrganizationGallery />

        {/* =========================================================================
            8. OUR STORY (Video Showcase)
           ========================================================================= */}
        <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-[1780px] mx-auto">
            <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-2xl relative overflow-hidden">
              {/* Backlight Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

              <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-extrabold shadow-xs mb-3">
                  <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Watch Our Story</span>
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                  Our Story &amp; Journey
                </h2>
                <p className="text-sm sm:text-base font-bold text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                  Watch how Nyeras started in Bengaluru and grew into a platform helping thousands of students across India build tech careers.
                </p>
              </div>

              {/* Video Player Frame with macOS style header */}
              <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-2xl bg-slate-950">
                <div className="h-9 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">Nyeras Edutech • Our Story</span>
                  <div className="w-12" />
                </div>

                <div className="relative aspect-video">
                  <iframe
                    loading="lazy"
                    title="Nyeras Edutech Introduction"
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/Z8e-65cMXJs?rel=0&modestbranding=1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Journey Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800 text-center">
                <div className="p-3">
                  <div className="text-lg font-black text-slate-950 dark:text-white">Started in Bengaluru</div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Based in India&apos;s tech capital</div>
                </div>
                <div className="p-3 border-x border-slate-200 dark:border-slate-800">
                  <div className="text-lg font-black text-slate-950 dark:text-white">Students Across India</div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Learners from every state</div>
                </div>
                <div className="p-3">
                  <div className="text-lg font-black text-slate-950 dark:text-white">College Partnerships</div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Working with top universities &amp; colleges</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. WHAT WE OFFER
           ========================================================================= */}
        <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-[1780px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-extrabold shadow-xs mb-3">
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>What We Offer</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                Everything You Need to Succeed
              </h2>
              <p className="text-sm sm:text-base font-bold text-slate-600 dark:text-slate-300">
                Simple, complete programs designed to take you from beginner to job-ready.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {offerings.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    className="p-8 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl glossy-black-card border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col items-center text-center group transition-all"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-slate-850 dark:text-slate-200" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 mb-3">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-black text-slate-950 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. REAL-TIME LINKEDIN UPDATES
           ========================================================================= */}
        <LinkedInFeed />

        {/* =========================================================================
            11. HIGH IMPACT FINAL CTA
           ========================================================================= */}
        <section className="py-16 px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
          <div className="w-full max-w-[1780px] mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto p-10 sm:p-14 lg:p-16 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white shadow-2xl relative overflow-hidden border border-slate-800"
            >
              {/* Radial glow background */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black mb-6 backdrop-blur-md">
                  <span>START LEARNING TODAY</span>
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                  Ready to Build Your Tech Career?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 mb-8 font-semibold leading-relaxed">
                  Join over 15,000 students who learned practical tech skills and started their careers with Nyeras.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/domains"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                  >
                    <span>Browse Courses &amp; Internships</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-sm backdrop-blur-md hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                  >
                    <span>Talk to an Advisor</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
