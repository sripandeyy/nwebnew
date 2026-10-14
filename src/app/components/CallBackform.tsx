'use client'

import { useState } from 'react'
import { X, CheckCircle2, PhoneCall, AlertCircle } from 'lucide-react'

interface CallbackFormProps {
  onClose: () => void
}

export default function CallbackForm({ onClose }: CallbackFormProps) {
  const [formData, setFormData] = useState({
    program: '',
    name: '',
    email: '',
    phone: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          onClose()
        }, 2200)
      } else {
        setErrorMessage('Failed to submit callback request. Please try again.')
      }
    } catch {
      setErrorMessage('Something went wrong. Please check your network and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 text-slate-950 rounded-3xl shadow-2xl w-full max-w-3xl relative overflow-hidden skeuo-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-modal-title"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-5">
          
          {/* Left Feature Column (Clean Frosted Tactile Sidebar with Dark Text) */}
          <div className="md:col-span-2 bg-slate-50/90 p-6 sm:p-8 text-slate-950 flex flex-col justify-between border-r border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-black text-slate-950 mb-4 shadow-xs">
                <PhoneCall className="w-3.5 h-3.5 text-slate-900" />
                <span>Academic Counseling</span>
              </div>
              <h2 id="callback-modal-title" className="text-2xl sm:text-3xl font-black leading-tight mb-3 text-slate-950">
                Talk to an Academic Advisor
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed mb-6">
                Get clarity on program curriculums, career roadmaps, and available placement assistance.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-900 font-bold">
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

            <div className="pt-6 mt-6 border-t border-slate-200 text-xs text-slate-800 font-bold flex items-center gap-2">
              <PhoneCall className="w-4 h-4 shrink-0 text-slate-900" />
              <span>Response within 15 minutes during work hours</span>
            </div>
          </div>

          {/* Right Form Column with Dark Black Text */}
          <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center bg-white/95 text-slate-950">
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
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">
                    Domain / Program of Interest *
                  </label>
                  <select
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl skeuo-input text-slate-950 focus:outline-none"
                  >
                    <option value="">Select Domain / Track</option>
                    <option value="Java FullStack Development">Java FullStack Development</option>
                    <option value="AI & ML">AI & Machine Learning</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="AWS + DevOps">AWS Cloud + DevOps</option>
                    <option value="Automation Testing">Automation Testing</option>
                    <option value="Very Large Scale Integration">VLSI Design</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Human Resources">HR & Management</option>
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
                  className="w-full mt-2 py-3.5 px-4 rounded-xl skeuo-btn-primary disabled:opacity-60 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg"
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
    </div>
  )
}