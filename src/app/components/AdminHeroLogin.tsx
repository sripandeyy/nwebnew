"use client"

import React, { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Plus_Jakarta_Sans } from "next/font/google"
import {
  Shield,
  ShieldCheck,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  KeyRound,
  GraduationCap,
  ExternalLink,
  Star,
  Briefcase,
  Layers,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"
import Topbar from "./Topbar"
import Header from "./Header"
import Footer from "./Footer"
import AuthModal from "./AuthModal"
import CallbackFlashcard from "./CallbackFlashcard"
import LinkedInPopup from "./LinkedInPopup"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const ROTATING_HERO_WORDS = ["Bridge", "Gateway", "Pathway", "Foundation", "Launchpad", "Key"]

function RotatingHeroWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_HERO_WORDS.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const currentWord = ROTATING_HERO_WORDS[index]

  return (
    <span
      className="relative flex items-center justify-start h-full w-full text-left overflow-hidden"
      style={{ perspective: "800px" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`hero-word-${currentWord}`}
          initial={{ rotateX: -80, y: 22, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: 80, y: -22, opacity: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "inline-block",
            transformOrigin: "0% 50% -18px",
            transformStyle: "preserve-3d",
          }}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent font-black tracking-tight text-left"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

interface AdminHeroLoginProps {
  redirectPath?: string
  onLoginSuccess?: () => void
}

function AdminHeroLoginInner({ redirectPath: customRedirect, onLoginSuccess }: AdminHeroLoginProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = customRedirect || searchParams.get("redirect") || "/lms"

  const { isAdmin, isLoading: isAuthLoading, login, openAuthModal } = useAuth()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // If already authenticated as admin and on /admin/login, redirect to /lms
  useEffect(() => {
    if (!isAuthLoading && isAdmin && customRedirect !== undefined) {
      router.replace(redirectPath)
    }
  }, [isAdmin, isAuthLoading, router, redirectPath, customRedirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")
    setIsSubmitting(true)

    try {
      const res = await login(identifier, password)
      if (res.success && res.role === "admin") {
        setSuccessMsg("Admin authentication successful. Opening Admin Studio...")
        if (onLoginSuccess) {
          onLoginSuccess()
        } else {
          setTimeout(() => {
            router.replace(redirectPath)
          }, 500)
        }
      } else if (res.success) {
        setErrorMsg("This account does not have administrative privileges. Please use Master Admin credentials.")
        setIsSubmitting(false)
      } else {
        setErrorMsg(res.message || "Invalid administrative credentials. Please verify your username and password.")
        setIsSubmitting(false)
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred during authentication.")
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-50/50 dark:bg-[#070913]/50 text-slate-800 dark:text-slate-100 ${jakarta.className} selection:bg-blue-600 selection:text-white transition-colors duration-300 relative overflow-hidden`}
    >
      <Topbar />
      <Header />
      <AuthModal />

      {/* Ambient Lighting & Mesh Gradients matching Hero page */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] lg:w-[1100px] h-[550px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-cyan-500/10 dark:from-blue-600/15 dark:via-indigo-600/15 dark:to-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-15 pointer-events-none -z-10" />

      {/* Hero Section Container */}
      <main className="flex-grow relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          {/* 2-Column Balanced Split Layout matching Hero.tsx */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Hero Narrative, Branding & Trust Badges */}
            <div className="lg:col-span-6 xl:col-span-6 text-left">
              
              {/* Friendly Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm mb-6">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>MASTER ADMINISTRATOR STUDIO • ADMIN@2026</span>
              </div>

              {/* Headline with 3D Flip Text Transition */}
              <div className="mb-6 flex flex-col justify-start text-left">
                <h1 className="text-[32px] sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.16] sm:leading-[1.12] text-left">
                  <span className="block text-slate-900 dark:text-white text-left">
                    Admin Studio is the
                  </span>

                  {/* 3D Cube Face Flip Component */}
                  <span className="block h-[1.3em] my-0.5 sm:my-1 overflow-hidden text-left">
                    <RotatingHeroWord />
                  </span>

                  <span className="block text-slate-900 dark:text-white text-left">
                    to platform management.
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-0 mb-8 font-normal text-left">
                Manage live courses, update cohort pricing and discounts, publish real-time engineering blogs, curate gallery assets, and maintain institutional partnerships with enterprise-grade synchronization.
              </p>

              {/* Trust Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Real-time Database Sync
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Govt. MSME &amp; ISO Studio
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  256-Bit TLS Security
                </span>
              </div>

              {/* Direct Portal Quick Links (Skeuomorphic Buttons) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 mb-10">
                <a
                  href="https://lms.nyeras.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-2xl skeuo-btn-secondary text-slate-900 dark:text-slate-100 font-extrabold text-sm sm:text-base tracking-normal shadow-lg cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center shadow-inner shrink-0">
                    <GraduationCap className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                  </div>
                  <span>Visit LMS Portal</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-400 ml-0.5" />
                </a>

                <a
                  href="https://nxtmove.nyeras.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-2xl skeuo-btn-accent text-white font-extrabold text-sm sm:text-base tracking-normal shadow-lg cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-inner shrink-0 p-1">
                    <Image src="/nxtmove-icon.png" alt="NxtMove" width={24} height={24} className="w-full h-full object-contain" />
                  </div>
                  <span>Visit NxtMove</span>
                  <ExternalLink className="w-4 h-4 text-white/80 ml-0.5" />
                </a>

                <Link
                  href="/domains"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl skeuo-btn-secondary text-slate-800 dark:text-slate-100 font-extrabold text-sm sm:text-base"
                >
                  <Briefcase className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>Explore Cohorts</span>
                </Link>
              </div>

              {/* Social Proof Bar with Alumni Avatars */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
                <div className="flex items-center -space-x-3">
                  {["/s1.png", "/s2.png", "/s3.png"].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Alumni"
                      className="w-11 h-11 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-md"
                    />
                  ))}
                  <div className="w-11 h-11 rounded-full bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
                    15K+
                  </div>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white ml-1.5">4.9 / 5</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Rated by 15,000+ engineers placed at <strong className="text-slate-700 dark:text-slate-200">Microsoft, Cisco, Deloitte, TCS</strong>
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Interactive Admin Studio Card */}
            <div className="lg:col-span-6 xl:col-span-6 relative w-full flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-xl rounded-3xl bg-white/90 dark:bg-slate-900/90 p-7 sm:p-9 lg:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300 border border-slate-200/90 dark:border-slate-800/90 overflow-hidden"
              >
                {/* Top highlight bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                {/* macOS terminal dots bar matching Hero preview card */}
                <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-slate-150 dark:border-slate-800 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-xs" />
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-xs" />
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs" />
                    <span className="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-400 ml-2">
                      Nyeras Admin Studio
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px] font-black text-blue-700 dark:text-blue-300">
                    <KeyRound className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span>Master Auth</span>
                  </div>
                </div>

                {/* Badge & Icon Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-3.5 shadow-inner">
                    <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-2.5">
                    <KeyRound className="w-3 h-3" />
                    <span>Restricted System</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Admin Studio
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                    Please authenticate with master administrator credentials to access the management studio.
                  </p>
                </div>

                {/* Error & Success Feedback with Framer Motion */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs font-bold text-rose-700 dark:text-rose-300 flex items-start gap-2.5 shadow-sm"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {successMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-start gap-2.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{successMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Admin Username / Email
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <input
                        type="text"
                        required
                        autoFocus
                        autoComplete="username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="e.g. ADMIN@2026 or admin@nyeras.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-transparent transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Master Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-transparent transition-all font-mono shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.01] active:scale-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign In to Admin Studio</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Student Login Alternative Shortcut */}
                <div className="mt-6 pt-5 border-t border-slate-150 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Student looking to sign in?</span>
                  <button
                    type="button"
                    onClick={() => openAuthModal("signin")}
                    className="font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Open Student Login
                  </button>
                </div>

                {/* Security Note */}
                <div className="mt-4 pt-4 border-t border-slate-150 dark:border-slate-800/80 text-center">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                    <span>End-to-end encrypted administrative session</span>
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <CallbackFlashcard />
      <LinkedInPopup />
    </div>
  )
}

export default function AdminHeroLogin(props: AdminHeroLoginProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-white">
          <div className="w-10 h-10 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin" />
        </div>
      }
    >
      <AdminHeroLoginInner {...props} />
    </Suspense>
  )
}
