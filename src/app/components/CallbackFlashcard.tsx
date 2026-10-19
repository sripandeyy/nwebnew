'use client'

import React, { useState, useEffect } from 'react'
import { PhoneCall, X, ArrowRight, UserCheck } from 'lucide-react'
import CallbackForm from './CallBackform'
import { useFloatingPromptSlot } from '../utils/floatingPrompts'

export default function CallbackFlashcard() {
  const [isScrolledPastStats, setIsScrolledPastStats] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showCard = useFloatingPromptSlot('callback', 'left', isScrolledPastStats && !isDismissed)

  useEffect(() => {
    const handleScroll = () => {
      const statsGrid = document.getElementById('hero-stats-grid')
      if (statsGrid) {
        const rect = statsGrid.getBoundingClientRect()
        // Appears only after user has fully scrolled past the stats section
        setIsScrolledPastStats(rect.bottom < 40)
      } else {
        const scrollY = window.scrollY || document.documentElement.scrollTop
        setIsScrolledPastStats(scrollY > 750)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Flashcard Popup */}
      {showCard && (
        <aside
          aria-label="Request a Callback Notification"
          className="fixed bottom-24 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:w-full sm:max-w-[370px] z-40 animate-in fade-in slide-in-from-bottom-5 duration-500"
        >
          <div className="relative rounded-2xl bg-white/95 text-slate-950 p-4 sm:p-5 shadow-2xl skeuo-card group hover:border-slate-500 transition-all">
            
            {/* Top Close Button (Ignore / Dismiss) */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss callback popup"
              className="absolute top-3 right-3 p-1.5 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
                <PhoneCall className="w-3.5 h-3.5 text-slate-800" />
                Request Callback
              </span>
            </div>

            {/* Body Info */}
            <div className="flex items-start gap-3 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 shadow-xs">
                <PhoneCall className="w-5 h-5 text-slate-900" />
              </div>
              <div className="pr-4">
                <h4 className="text-sm font-black text-slate-950 leading-tight">
                  Need Help Choosing a Track?
                </h4>
                <p className="text-xs font-semibold text-slate-800 mt-1 leading-snug">
                  Speak directly with an academic mentor for fee structure &amp; placement guidance.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleOpenModal}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl skeuo-btn-primary text-white px-3.5 py-2.5 text-xs font-black shadow-md"
              >
                <UserCheck className="w-3.5 h-3.5 text-white" />
                <span>Request a Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal on Click */}
      {isModalOpen && (
        <CallbackForm onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
