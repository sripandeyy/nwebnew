'use client'

import React, { useState, useEffect } from 'react'
import { PhoneCall, X, ArrowRight, UserCheck } from 'lucide-react'
import CallbackForm from './CallBackform'

export default function CallbackFlashcard() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Trigger after 2.5 seconds on every page load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Flashcard Popup */}
      {isVisible && !isDismissed && (
        <aside
          aria-label="Request a Callback Notification"
          className="fixed bottom-5 left-4 sm:left-6 z-40 max-w-[340px] sm:max-w-[370px] w-full animate-in fade-in slide-in-from-bottom-5 duration-500"
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
