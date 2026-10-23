"use client"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X, GraduationCap, Briefcase, ExternalLink, LogOut, Shield, Sparkles } from "lucide-react"
import WorkWithUs from "./WorkWithUs"
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const { user, isAdmin, logout } = useAuth()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDomainsOpen, setIsDomainsOpen] = useState(false)
  const [isWorkWithUsOpen, setIsWorkWithUsOpen] = useState(false)
  const [isScrolledPastTop, setIsScrolledPastTop] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const closeTimer = useRef<number | null>(null)
  const hoverTimeoutRef = useRef<number | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 70) {
        setIsScrolledPastTop(true)
        // Check scroll direction
        if (currentScrollY < lastScrollY.current - 4) {
          // Scrolling UP -> Expand island
          setIsScrollingUp(true)
        } else if (currentScrollY > lastScrollY.current + 4) {
          // Scrolling DOWN -> Collapse into Dynamic Island notch
          setIsScrollingUp(false)
        }
      } else {
        // At or near top of the page
        setIsScrolledPastTop(false)
        setIsScrollingUp(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false)
      setIsDomainsOpen(false)
    }, 250)
  }

  const handleDomainsEnter = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setIsDomainsOpen(true)
  }

  const handleDomainsLeave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setIsDomainsOpen(false), 220)
  }

  // Floating rounded pill bar active across all pages including top of landing page
  const isIslandExpanded = isScrollingUp || isHovered || isDomainsOpen || isSidebarOpen || !isScrolledPastTop

  const renderNavContent = () => (
    <div className="w-full h-18 sm:h-20 px-5 sm:px-7 lg:px-8 xl:px-10 flex items-center justify-between gap-4 lg:gap-6 xl:gap-8">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center shrink-0 group focus-visible:ring-2 focus-visible:ring-slate-600 rounded-lg p-1"
      >
        <Image
          height={52}
          width={160}
          className="h-9 sm:h-10 lg:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          src="/logo.png"
          alt="Nyeras Logo"
          priority
        />
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden xl:flex items-center gap-4 xl:gap-6 2xl:gap-8 text-[14px] xl:text-[15px] 2xl:text-[16px] font-extrabold tracking-normal text-slate-900 dark:text-white shrink-0">
        <Link
          href="/"
          className="whitespace-nowrap relative py-2 px-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-0 after:bg-slate-900 dark:after:bg-white hover:after:w-full after:transition-all after:duration-200"
        >
          Home
        </Link>

        <Link
          href="/about"
          className="whitespace-nowrap relative py-2 px-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-0 after:bg-slate-900 dark:after:bg-white hover:after:w-full after:transition-all after:duration-200"
        >
          About
        </Link>

        {/* Domains Dropdown */}
        <div
          className="relative py-2 px-1 shrink-0"
          onMouseEnter={handleDomainsEnter}
          onMouseLeave={handleDomainsLeave}
        >
          <Link
            href="/domains"
            className="inline-flex items-center gap-1.5 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer font-extrabold whitespace-nowrap"
          >
            <span>Domains</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] ${
                isDomainsOpen ? "rotate-180 text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
              }`}
            />
          </Link>

          {/* Domains Popup Menu */}
          <AnimatePresence>
            {isDomainsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[360px] sm:w-[400px] z-50 pointer-events-auto"
              >
                <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800">
                  <div className="space-y-2">
                    <Link
                      href="/domains/departments"
                      onClick={() => setIsDomainsOpen(false)}
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors shadow-xs shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">Academic & Tech</p>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-0.5 whitespace-normal">
                          Engineering, AI, Cloud, VLSI & Design
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/domains/job-guarantee"
                      onClick={() => setIsDomainsOpen(false)}
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs shrink-0">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">Job Guarantee Tracks</p>
                          <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-bold mt-0.5 whitespace-normal">
                          100% Placement Assurance
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/domains/future-skills-school"
                      onClick={() => setIsDomainsOpen(false)}
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">Future Skills School</p>
                          <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                        <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 font-bold mt-0.5 whitespace-normal">
                          Curated AI, Coding, Sciences & Finance for Schools
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-2 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 px-2 pb-1">
                    <Link
                      href="/domains"
                      onClick={() => setIsDomainsOpen(false)}
                      className="flex items-center justify-center gap-2 py-1.5 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-colors"
                    >
                      <span>Explore Full Domain Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/plans"
          className="whitespace-nowrap relative py-2 px-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-0 after:bg-slate-900 dark:after:bg-white hover:after:w-full after:transition-all after:duration-200"
        >
          Our Plans
        </Link>

        <Link
          href="/blogs"
          className="whitespace-nowrap relative py-2 px-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-0 after:bg-slate-900 dark:after:bg-white hover:after:w-full after:transition-all after:duration-200"
        >
          Blogs
        </Link>

        <button
          type="button"
          onClick={() => setIsWorkWithUsOpen(true)}
          className="whitespace-nowrap relative py-2 px-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-0 after:bg-slate-900 dark:after:bg-white hover:after:w-full after:transition-all after:duration-200 text-left font-extrabold cursor-pointer"
        >
          Work With Us
        </button>
      </nav>

      {/* Right Side Actions: LMS Portal, NxtMove & Sign In / Admin Studio */}
      <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
        {/* Visit LMS Portal Button */}
        <a
          href="https://lms.nyeras.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LMS Portal"
          title="LMS Portal"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full skeuo-btn-secondary text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 hover:scale-105 active:scale-95 transition-all shadow-xs whitespace-nowrap shrink-0"
        >
          <GraduationCap className="w-4 h-4 text-slate-800 dark:text-slate-200" />
          <span className="xl:hidden min-[1440px]:inline">LMS Portal</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400 xl:hidden min-[1440px]:inline" />
        </a>

        {/* Visit NxtMove Button */}
        <a
          href="https://nxtmove.nyeras.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="NxtMove"
          title="NxtMove"
          className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full skeuo-btn-accent text-xs sm:text-sm font-extrabold text-white hover:scale-105 active:scale-95 transition-all shadow-md whitespace-nowrap shrink-0"
        >
          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
            <Image src="/nxtmove-icon.png" alt="NxtMove" width={16} height={16} className="w-full h-full object-contain" />
          </div>
          <span className="xl:hidden min-[1440px]:inline">NxtMove</span>
          <ExternalLink className="w-3.5 h-3.5 text-white/80 xl:hidden min-[1440px]:inline" />
        </a>

        {/* Auth Action: Only visible if already logged in as Master Admin */}
        {user && isAdmin && (
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/lms"
              aria-label="Admin Studio"
              className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full skeuo-btn-primary text-slate-100 text-xs sm:text-sm font-extrabold hover:scale-105 active:scale-95 transition-all shadow-md whitespace-nowrap shrink-0"
            >
              <Shield className="w-4 h-4 text-slate-200" />
              <span className="hidden sm:inline">Admin Studio</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline max-w-[100px] truncate">{user.name || user.username}</span>
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open navigation menu"
          className="xl:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Floating Header in Rounded Pill Shape */}
      <header key="dynamic-island-header" className="fixed left-0 right-0 top-3 sm:top-4 z-50 flex justify-center px-3 sm:px-6 lg:px-8 pointer-events-none">
        <AnimatePresence mode="wait">
          {!isIslandExpanded ? (
            /* Collapsed Dynamic Island Notch */
            <motion.div
              key="collapsed-island"
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
                mass: 0.8,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsHovered(true)}
              className="pointer-events-auto h-14 sm:h-16 min-w-[240px] sm:min-w-[280px] px-7 sm:px-9 rounded-full glass-island flex items-center justify-center gap-3.5 sm:gap-4 cursor-pointer hover:scale-105 active:scale-100 transition-all duration-200"
            >
              <Image
                height={60}
                width={180}
                className="h-10 sm:h-11 md:h-12 w-auto object-contain pointer-events-none drop-shadow-xs"
                src="/logo.png"
                alt="Nyeras Logo"
                priority
              />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-900 dark:bg-emerald-400 animate-pulse shadow-xs" />
            </motion.div>
          ) : (
            /* Expanded Curved Floating Header in Rounded Pill Shape */
            <motion.div
              key="expanded-island"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
                mass: 0.8,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="pointer-events-auto w-full max-w-[1680px] rounded-full glass-island overflow-visible"
            >
              {renderNavContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Sidebar Overlay & Drawer */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 xl:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 w-[280px] max-w-[85vw] sm:w-[320px] bg-white dark:bg-slate-900 z-50 xl:hidden shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <Image src="/logo.png" alt="Nyeras Logo" width={110} height={32} className="h-7 w-auto" />
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
          <Link
            href="/"
            onClick={() => setIsSidebarOpen(false)}
            className="block py-2.5 px-3 text-sm font-extrabold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsSidebarOpen(false)}
            className="block py-2.5 px-3 text-sm font-extrabold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/domains"
            onClick={() => setIsSidebarOpen(false)}
            className="block py-2.5 px-3 text-sm font-extrabold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Domains & Courses
          </Link>
          <Link
            href="/plans"
            onClick={() => setIsSidebarOpen(false)}
            className="block py-2.5 px-3 text-sm font-extrabold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Our Plans
          </Link>

          <Link
            href="/blogs"
            onClick={() => setIsSidebarOpen(false)}
            className="block py-2.5 px-3 text-sm font-extrabold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Blogs & Insights
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsSidebarOpen(false)
              setIsWorkWithUsOpen(true)
            }}
            className="w-full text-left py-2.5 px-3 text-sm font-extrabold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Want to Work With Us
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
          {/* Admin Studio shortcut in Mobile if logged in as Admin */}
          {user && isAdmin && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">Master Admin</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Link
                  href="/lms"
                  onClick={() => setIsSidebarOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-extrabold transition-colors"
                >
                  Admin Studio
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setIsSidebarOpen(false)
                  }}
                  className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-500/10"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5 mb-1">
            {isAdmin ? (
              <Link
                href="/lms"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl skeuo-btn-secondary text-slate-900 dark:text-slate-100 text-xs font-extrabold"
              >
                <Shield className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span>Admin Studio</span>
              </Link>
            ) : (
              <a
                href="https://lms.nyeras.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl skeuo-btn-secondary text-slate-900 dark:text-slate-100 text-xs font-extrabold"
              >
                <GraduationCap className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span>LMS Portal</span>
              </a>
            )}
            <a
              href="https://nxtmove.nyeras.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl skeuo-btn-accent text-white text-xs font-extrabold"
            >
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
                <Image src="/nxtmove-icon.png" alt="NxtMove" width={16} height={16} className="w-full h-full object-contain" />
              </div>
              <span>NxtMove</span>
            </a>
          </div>

          <Link
            href="/plans"
            onClick={() => setIsSidebarOpen(false)}
            className="w-full text-center rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 py-2.5 text-sm font-extrabold text-white shadow-md transition-colors"
          >
            Enroll Now
          </Link>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-sm font-extrabold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Work With Us Modal */}
      <WorkWithUs isOpen={isWorkWithUsOpen} onClose={() => setIsWorkWithUsOpen(false)} />
    </>
  )
}

export default Header
