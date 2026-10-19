"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowRight, Linkedin, Sparkles, X } from "lucide-react"
import type { Mentor } from "../domains/mentors"

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"

function MentorAvatar({ mentor, size }: { mentor: Mentor; size: "md" | "lg" }) {
  const dims = size === "lg" ? "w-20 h-20 text-2xl" : "w-16 h-16 text-xl"
  if (mentor.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={mentor.photo}
        alt={`Portrait of ${mentor.name}`}
        className={`${dims} rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0`}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={`${mentor.name} initials avatar`}
      className={`${dims} rounded-2xl shrink-0 flex items-center justify-center font-black tracking-tight text-indigo-700 dark:text-indigo-200 bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-indigo-950/70 dark:to-slate-800 border border-indigo-100 dark:border-indigo-900/70 shadow-sm`}
    >
      {mentor.initials}
    </div>
  )
}

function LinkedInButton({ mentor, full }: { mentor: Mentor; full?: boolean }) {
  return (
    <a
      href={mentor.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${mentor.name}'s LinkedIn profile (opens in a new tab)`}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0A66C2] dark:text-sky-300 font-bold text-sm transition-all hover:border-[#0A66C2]/40 hover:bg-sky-50 dark:hover:bg-slate-700 ${full ? "w-full px-5 py-3" : "w-full sm:w-auto px-4 py-3"} ${focusRing}`}
    >
      <Linkedin className="w-4 h-4" aria-hidden="true" />
      <span>LinkedIn</span>
    </a>
  )
}

function MentorDetailDialog({ mentor, onClose }: { mentor: Mentor; onClose: () => void }) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab" || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close mentor profile"
          className={`absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors ${focusRing}`}
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-4 pr-10">
          <MentorAvatar mentor={mentor} size="lg" />
          <div className="min-w-0">
            <span className="inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
              {mentor.domain}
            </span>
            <h3 id={titleId} className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {mentor.name}
            </h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{mentor.role}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {mentor.fullBio.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Areas of Expertise
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {mentor.expertise.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {mentor.interests.length > 0 && (
          <div className="mt-5">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              Also Interested In
            </h4>
            <div className="flex flex-wrap gap-2">
              {mentor.interests.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold border border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-7 pt-5 border-t border-slate-200 dark:border-slate-800">
          <LinkedInButton mentor={mentor} full />
        </div>
      </motion.div>
    </motion.div>
  )
}

const PREVIEW_TAGS = 4

interface MentorCardProps {
  mentor: Mentor
  heading?: string
  description?: string
}

export default function MentorCard({ mentor, heading = "Meet Your Mentor", description }: MentorCardProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hiddenCount = mentor.expertise.length - PREVIEW_TAGS

  useEffect(() => setMounted(true), [])

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  return (
    <div className="relative group">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl glossy-black-card transition-shadow duration-300 group-hover:shadow-2xl">
        <div className={`flex items-start justify-between gap-3 ${description ? "mb-2" : "mb-5"}`}>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{heading}</h3>
          <span className="mt-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-xs bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 shrink-0">
            {mentor.domainLabel}
          </span>
        </div>
        {description && (
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mb-5">{description}</p>
        )}

        <div className="mb-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center gap-4">
            <MentorAvatar mentor={mentor} size="md" />
            <div className="min-w-0">
              <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">{mentor.name}</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">{mentor.role}</p>
              <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-1">{mentor.domain}</p>
            </div>
          </div>

          <ul className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700/70 flex flex-wrap gap-1.5" aria-label="Key expertise">
            {mentor.expertise.slice(0, PREVIEW_TAGS).map((item) => (
              <li
                key={item}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              >
                {item}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="px-2.5 py-1 rounded-full text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                +{hiddenCount} more
              </li>
            )}
          </ul>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">{mentor.shortBio}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm rounded-2xl shadow-lg border border-slate-700/60 transition-all cursor-pointer ${focusRing}`}
          >
            <span>Explore Expertise</span>
            <ArrowRight className="w-4 h-4 text-slate-300" aria-hidden="true" />
          </motion.button>
          <LinkedInButton mentor={mentor} />
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>{open && <MentorDetailDialog mentor={mentor} onClose={close} />}</AnimatePresence>,
          document.body
        )}
    </div>
  )
}
