'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle2, PhoneCall, AlertCircle } from 'lucide-react'

interface CallbackFormProps {
  onClose: () => void
  initialProgram?: string
  notes?: string
  source?: string
  title?: string
  subtitle?: string
}

const STANDARD_DOMAINS = [
  'Java FullStack Development',
  'AI & ML',
  'Data Science',
  'Data Analytics',
  'AWS + DevOps',
  'Automation Testing',
  'Very Large Scale Integration',
  'Cyber Security',
  'Digital Marketing',
  'Human Resources',
]

export default function CallbackForm({
  onClose,
  initialProgram = '',
  notes = '',
  source = 'Website Request Callback',
  title = 'Talk to an Academic Advisor',
  subtitle = 'Get clarity on program curriculums, career roadmaps, and available placement assistance.',
}: CallbackFormProps) {
  const [formData, setFormData] = useState({
    program: initialProgram || '',
    name: '',
    email: '',
    phone: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, program: initialProgram }))
    }
  }, [initialProgram])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return // Spam prevention

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.')
      return
    }

    setErrorMessage(null)
    setLoading(true)

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          notes,
          source,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          onClose()
        }, 2200)
      } else {
        const data = await response.json().catch(() => null)
        setErrorMessage(data?.message || 'Failed to submit callback request. Please try again.')
      }
    } catch {
      setErrorMessage('Something went wrong. Please check your network and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  const modalContent = (
    <div 
      className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-[99999] overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white text-slate-950 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl relative overflow-hidden skeuo-card max-h-[92vh] flex flex-col md:grid md:grid-cols-5 my-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-modal-title"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Feature Column (Clean Frosted Tactile Sidebar with Dark Text) */}
        <div className="md:col-span-2 bg-slate-50/95 p-5 sm:p-6 lg:p-7 text-slate-950 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-black text-slate-950 mb-3 sm:mb-4 shadow-xs">
              <PhoneCall className="w-3.5 h-3.5 text-slate-900" />
              <span>Academic Counseling</span>
            </div>
            <h2 id="callback-modal-title" className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight mb-2 sm:mb-3 text-slate-950">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed mb-4 sm:mb-6">
              {subtitle}
            </p>

            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-900 font-bold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Personalized Career Roadmap</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Faculty Interaction</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Placement Insights</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-200 text-xs text-slate-800 font-bold flex items-center gap-2">
            <PhoneCall className="w-4 h-4 shrink-0 text-slate-900" />
            <span>Response within 15 minutes during work hours</span>
          </div>
        </div>

        {/* Right Form Column with Dark Black Text */}
        <div className="md:col-span-3 p-5 sm:p-6 lg:p-7 flex flex-col justify-center bg-white text-slate-950 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-950">
                Request Received!
              </h3>
              <p className="text-sm font-semibold text-slate-800 max-w-xs mx-auto">
                Our Academic Advisor will connect with you shortly on your provided number.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              {/* Honeypot field */}
              <input
                type="text"
                name="user_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {notes && (
                <div className="p-2.5 rounded-xl bg-slate-100/90 text-slate-800 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-950">Inquiry Context: </span>
                  <span className="font-semibold text-slate-700">{notes}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider">
                    Domain / Program of Interest *
                  </label>
                  {initialProgram && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Prefilled
                    </span>
                  )}
                </div>
                <select
                  required
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl skeuo-input text-slate-950 focus:outline-none"
                >
                  <option value="">Select Domain / Track</option>
                  {formData.program && !STANDARD_DOMAINS.includes(formData.program) && (
                    <option value={formData.program}>
                      {formData.program}
                    </option>
                  )}
                  {STANDARD_DOMAINS.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl skeuo-input text-slate-950 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl skeuo-input text-slate-950 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">
                  Phone Number (+91) *
                </label>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-3 text-xs font-black rounded-xl skeuo-badge text-slate-950">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 text-sm font-bold rounded-xl skeuo-input text-slate-950 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl skeuo-btn-primary disabled:opacity-60 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Request Callback Now</span>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}