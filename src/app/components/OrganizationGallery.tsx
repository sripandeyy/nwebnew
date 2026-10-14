'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  MapPin,
  Play,
  Pause
} from 'lucide-react'
import { GalleryItem, galleryStore } from '../utils/galleryStore'
import { mergeCollection } from '../utils/siteContent'

export type { GalleryItem }

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'mlrit-ai-career-roadmap',
    title: "Build Your AI Career Roadmap Keynote",
    subtitle: "MLR Institute of Technology (MLRIT)",
    category: 'Conferences',
    location: 'MLRIT Auditorium, Hyderabad',
    date: 'Campus Keynote Series',
    image: '/gallery/mlrit-ai-career-roadmap.jpg',
    shortDesc: "Founder and lead mentors delivering an executive keynote on generative AI career roadmaps, technical portfolios, and campus hiring pathways at MLRIT."
  },
  {
    id: 'gitam-mou-delegation',
    title: "Strategic Academic MoU & Alliance",
    subtitle: "GITAM Deemed to be University",
    category: 'Partnership',
    location: 'GITAM University Campus',
    date: 'Institutional Alliance',
    image: '/gallery/gitam-university-mou-delegation.jpg',
    shortDesc: "Formal strategic partnership signing and academic delegation meet with university leadership and senior deans at GITAM."
  },
  {
    id: 'school-of-business-delegation',
    title: "School of Business Delegation & Cohort",
    subtitle: "Academic Leadership & Student Group",
    category: 'Partnership',
    location: "School of Business Campus",
    date: "Annual Cohort Graduation",
    image: '/gallery/school-of-business-delegation.jpg',
    shortDesc: "Academic leadership, department deans, and enrolled management students gathered for the official Nyeras industry cohort group portrait."
  },
  {
    id: 'vignan-mou',
    title: "MoU Signing & Academic Incubation",
    subtitle: "Vignan's Institute of Information Technology",
    category: 'Partnership',
    location: 'Duvvada, Visakhapatnam',
    date: 'Academic Collaboration',
    image: '/gallery/vignan-mou-signing.jpg',
    shortDesc: "Official academic partnership and strategic MoU signing with Principal Dr. J. Sudhakar and department heads."
  },
  {
    id: 'nyeras-team-mentorship-strategy',
    title: "Product Engineering & Curriculum Sprint",
    subtitle: "Internal Mentor & Architecture Sync",
    category: 'Mentorship',
    location: 'Nyeras HQ Tech Lab, Bengaluru',
    date: 'Core Sprint Meeting',
    image: '/gallery/nyeras-team-mentorship-strategy.jpg',
    shortDesc: "Hands-on engineering whiteboard sprint aligning real-world industrial capstone projects, LMS features, and student learning paths."
  },
  {
    id: 'student-mentorship',
    title: "1:1 Student Code Review & Mentorship",
    subtitle: "Systems & Architecture Guidance",
    category: 'Mentorship',
    location: 'Nyeras Innovation Lab',
    date: 'Tech Mentoring',
    image: '/gallery/student-mentorship-session.jpg',
    shortDesc: "Lead architects conducting deep-dive 1:1 code debugging, algorithm evaluation, and system design reviews."
  },
  {
    id: 'executive-amphitheater-workshop',
    title: "Applied Engineering & Career Masterclass",
    subtitle: "Executive Tiered Lecture Theater",
    category: 'Workshop',
    location: 'Executive Smart Classroom',
    date: 'Specialized Cohort Workshop',
    image: '/gallery/executive-amphitheater-workshop.jpg',
    shortDesc: "Interactive cohort masterclass where engineering students break into live problem-solving squads and pitch architectural solutions."
  },
  {
    id: 'campus-tech-symposium',
    title: "National Student Innovation Symposium",
    subtitle: "Campus Tech & Placement Drive",
    category: 'Conferences',
    location: 'Convention Center Amphitheater',
    date: 'Annual Placement Conclave',
    image: '/gallery/campus-tech-symposium-audience.jpg',
    shortDesc: "Full-house student conclave engaging with industry leaders on tech recruitment trends, interview prep, and corporate internship openings."
  },
  {
    id: 'executive-handshake',
    title: "Leadership Felicitation & Dignitary Honour",
    subtitle: "Executive Tech Summit",
    category: 'Conferences',
    location: 'University Auditorium Hall',
    date: 'Annual Tech Summit',
    image: '/gallery/executive-handshake-felicitation.jpg',
    shortDesc: "Honouring esteemed academic dignitaries and celebrating landmark corporate placement and internship figures."
  },
  {
    id: 'computer-lab-workshop',
    title: "50+ Workstation Live Coding Lab",
    subtitle: "Hands-on Engineering Masterclass",
    category: 'Workshop',
    location: 'Advanced Computing Center',
    date: 'Live Lab Series',
    image: '/gallery/computer-lab-workshop.jpg',
    shortDesc: "Intensive engineering masterclass with 50+ students coding and deploying live cloud applications concurrently."
  },
  {
    id: 'pavan-sai-gitam-felicitation',
    title: "Certificate of Appreciation Honour",
    subtitle: "GITAM School of Business & Technology",
    category: 'Conferences',
    location: "GITAM University, Visakhapatnam",
    date: "Academic Dignitary Honour",
    image: '/gallery/pavan-sai-gitam-certificate-felicitation.jpg',
    shortDesc: "Honouring Mr. K. H Pavan Sai (Founder & CEO, Nyeras Edutech) with official Certificate of Appreciation by GITAM academic leadership."
  },
  {
    id: 'gitam-mentor-felicitation',
    title: "Faculty & Mentor Recognition",
    subtitle: "Academic Excellence Citation",
    category: 'Partnership',
    location: "GITAM University Campus",
    date: "Partner Felicitation",
    image: '/gallery/gitam-faculty-appreciation-honour.jpg',
    shortDesc: "Presenting official citation and appreciation honors to technical leads for outstanding student development and institutional impact."
  },
  {
    id: 'founder-mentor-dialogue',
    title: "Academic Advisory & Strategy Dialogue",
    subtitle: "Institutional Curriculum Board",
    category: 'Mentorship',
    location: "GITAM Executive Conference Hall",
    date: "Strategic Dialogue",
    image: '/gallery/founder-mentor-academic-dialogue.jpg',
    shortDesc: "Founder Mr. K. H Pavan Sai in in-depth strategic consultation with department leadership on modernising syllabus for AI and Cloud careers."
  },
  {
    id: 'gitam-student-mentoring',
    title: "1:1 Career Mentoring & Interaction",
    subtitle: "Student Career Enablement Cell",
    category: 'Mentorship',
    location: "Smart Tiered Classroom",
    date: "Student Mentoring Hours",
    image: '/gallery/gitam-student-interactive-mentoring.jpg',
    shortDesc: "Direct student engagement session reviewing individual internship milestones, project architectures, and career aspirational goals."
  },
  {
    id: 'design-thinking-hackathon',
    title: "Design Thinking & Innovation Drill",
    subtitle: "Interactive Squad Problem Solving",
    category: 'Workshop',
    location: "Smart Amphitheater Floor",
    date: "Hands-on Hackathon",
    image: '/gallery/design-thinking-student-hackathon.jpg',
    shortDesc: "Students collaborating on the amphitheater floor during a high-energy prototyping sprint to design real-world tech solutions."
  },
  {
    id: 'auditorium-seminar',
    title: "Executive Tech Keynote & Vision Seminar",
    subtitle: "Faculty & Student Delegates",
    category: 'Conferences',
    location: 'Grand Seminar Theater',
    date: 'National Conference',
    image: '/gallery/auditorium-seminar-audience.jpg',
    shortDesc: "Interactive technology roadmap seminar addressing faculty and students on Generative AI and global tech trends."
  }
]

export default function OrganizationGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [popupItem, setPopupItem] = useState<GalleryItem | null>(null)
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS)
  const total = items.length

  useEffect(() => {
    const refresh = () => setItems(mergeCollection(GALLERY_ITEMS, galleryStore.read(), (item) => item.id))
    refresh()
    window.addEventListener(galleryStore.event, refresh)
    return () => window.removeEventListener(galleryStore.event, refresh)
  }, [])

  useEffect(() => {
    if (currentIndex >= total) setCurrentIndex(0)
  }, [currentIndex, total])

  // Auto-play dynamic movement
  useEffect(() => {
    if (!isAutoPlaying || isHovered || popupItem !== null || total < 2) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, 4000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, isHovered, popupItem, total])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  // Calculate circular offset distance (-2, -1, 0, 1, 2)
  const getOffset = (index: number) => {
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  if (total === 0) return null

  return (
    <section id="organization-gallery" className="relative py-10 sm:py-14 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">

      {/* Dynamic Ambient Glass Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[450px] h-[450px] bg-blue-500/12 dark:bg-blue-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[450px] h-[450px] bg-indigo-500/12 dark:bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1780px] mx-auto">

        {/* Header with Glass Pill and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-extrabold shadow-sm mb-2.5">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Campus & Industry Presence</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Our Organization Gallery
            </h2>

            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-normal">
              Dynamically showcasing institutional partnerships, live campus masterclasses, 1:1 student mentorship, and academic summits.
            </p>
          </div>

          {/* Interactive Navigation Dock */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause movement" : "Resume movement"}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/40 dark:border-white/10 text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-blue-500 fill-current" />
                  <span>Autoplay</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                  <span>Resume</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-sm">
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="p-2.5 rounded-lg bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Dynamic Glassmorphic Carousel Stage */}
        <div
          className="relative pt-3 pb-4 px-2 sm:px-4 rounded-3xl bg-white/25 dark:bg-slate-900/30 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.1)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main 3D Row Track with snug height anchored to the top */}
          <div className="relative w-full h-[395px] sm:h-[415px] lg:h-[435px] flex justify-center perspective-[1200px]">
            {items.map((item, index) => {
              const offset = getOffset(index)
              const isCenter = offset === 0
              const absOffset = Math.abs(offset)

              // Only render items within visible range (-2 to 2)
              if (absOffset > 2) return null

              // Responsive horizontal spread
              const xTranslate = offset * 260

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    x: `${xTranslate}px`,
                    scale: isCenter ? 1.04 : absOffset === 1 ? 0.9 : 0.78,
                    y: isCenter ? 0 : absOffset === 1 ? 14 : 28,
                    zIndex: isCenter ? 30 : 30 - absOffset * 10,
                    opacity: isCenter ? 1 : absOffset === 1 ? 0.85 : 0.5,
                    filter: isCenter ? 'blur(0px) grayscale(0%)' : `blur(${absOffset * 1.6}px) grayscale(${absOffset * 12}%)`,
                    rotateY: offset * -6,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 26,
                    mass: 0.8,
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setCurrentIndex(index)
                    } else {
                      setPopupItem(item)
                    }
                  }}
                  className={`absolute top-2 w-[295px] sm:w-[365px] lg:w-[405px] rounded-3xl p-3.5 sm:p-4 transition-colors duration-300 cursor-pointer select-none flex flex-col justify-start ${isCenter
                      ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl shadow-[0_20px_45px_-10px_rgba(37,99,235,0.32)] dark:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.85)] border-2 border-blue-500/80 dark:border-blue-400/80 ring-4 ring-blue-500/15'
                      : 'bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:bg-white/65 dark:hover:bg-slate-800/65 shadow-xl'
                    }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Photo Container */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-2.5 bg-slate-950 shadow-md shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 300px, 410px"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      priority={isCenter}
                    />

                    {/* Gradient Inset Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

                    {/* Zoom Quick View Button (Top Right on Center Card) */}
                    {isCenter && (
                      <div className="absolute top-3 right-3 z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPopupItem(item)
                          }}
                          aria-label="Quick View Popup"
                          className="p-2 rounded-full bg-slate-950/70 hover:bg-slate-950/90 text-white backdrop-blur-md border border-white/20 transition-transform hover:scale-110 shadow-md cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Location Badge on Image Bottom */}
                    <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center gap-1.5 text-xs font-bold text-slate-200 truncate">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>

                  {/* Fully Visible Description Under the Pic */}
                  <div className="flex-1 flex flex-col justify-start pt-1">
                    <h3 className={`text-base sm:text-lg font-extrabold leading-snug tracking-tight mb-1 ${isCenter
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-900 dark:text-white'
                      }`}>
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {item.shortDesc}
                    </p>
                  </div>

                </motion.div>
              )
            })}
          </div>

          {/* Interactive Thumbnail Strip */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 px-2 max-w-full scrollbar-none mt-4">
            {items.map((thumbItem, idx) => (
              <button
                key={thumbItem.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Select ${thumbItem.title}`}
                className={`relative shrink-0 w-12 sm:w-16 h-8 sm:h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${currentIndex === idx
                    ? 'border-blue-600 dark:border-blue-400 scale-105 shadow-md ring-2 ring-blue-500/30 opacity-100'
                    : 'border-white/40 dark:border-slate-800 opacity-60 hover:opacity-100 hover:scale-102'
                  }`}
              >
                <Image
                  src={thumbItem.image}
                  alt={thumbItem.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Bottom Dot Nav Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${currentIndex === i
                    ? 'w-6 h-2 bg-blue-600 dark:bg-blue-400 shadow-md'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Neat, Compact Glassmorphic Popup Modal ("Little Popup") */}
      <AnimatePresence>
        {popupItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setPopupItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
              className="relative max-w-lg w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-white/40 dark:border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Popup Header with Close */}
              <div className="flex items-center justify-between p-4 sm:p-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-xs">
                    {popupItem.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    {popupItem.location}
                  </span>
                </div>

                <button
                  onClick={() => setPopupItem(null)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                  aria-label="Close popup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Popup Image */}
              <div className="relative w-full aspect-[16/10] bg-slate-950">
                <Image
                  src={popupItem.image}
                  alt={popupItem.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Popup Body Content with Full Description */}
              <div className="p-5 sm:p-6 space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                  {popupItem.title}
                </h3>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {popupItem.subtitle} • {popupItem.date}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1">
                  {popupItem.shortDesc}
                </p>
              </div>

              {/* Popup Action Footer */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span>Nyeras Edutech Official Moments</span>
                <button
                  onClick={() => setPopupItem(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  )
}
