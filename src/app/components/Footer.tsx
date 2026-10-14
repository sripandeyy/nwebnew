'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import axios from 'axios'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return // spam bot trap
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    try {
      await axios.post('/api/newsletters', { email })
      setStatus('success')
      setMessage('Thank you for subscribing! Check your inbox for updates.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#070913] text-slate-700 dark:text-slate-300 relative overflow-hidden transition-colors duration-300">
      {/* Footer Top Ambient Neutral Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-gradient-to-r from-slate-400/5 via-slate-500/5 to-slate-400/5 dark:from-slate-700/5 dark:via-slate-600/5 dark:to-slate-700/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Nyeras Logo"
                width={130}
                height={38}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed font-normal">
              Nyera Educational Organisation empowers students and working professionals with industry certifications, practical live projects, and 100% placement assistance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/nyeras"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 transition-all shadow-sm border border-slate-300/60 dark:border-slate-700/60"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/nyeras_edutech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 transition-all shadow-sm border border-slate-300/60 dark:border-slate-700/60"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@nyeras.com"
                aria-label="Email Support"
                className="p-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 transition-all shadow-sm border border-slate-300/60 dark:border-slate-700/60"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Programs & Tracks */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/domains/departments" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Departments & Tech
                </Link>
              </li>
              <li>
                <Link href="/domains/job-guarantee" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Job Guarantee Tracks
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Pricing & Plans
                </Link>
              </li>

              <li>
                <Link href="/certverify" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Verify Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company & Trust */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Engineering Blogs
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Careers & Hiring
                </Link>
              </li>
              <li>
                <Link href="/hire-from-us" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Hire From Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Get free career guides, placement tips, and batch announcements.
            </p>

            {status === 'success' ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="website_honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="flex gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    aria-label="Email for newsletter"
                    className="flex-1 min-w-0 px-3 py-2.5 text-xs rounded-xl skeuo-input text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-4 py-2.5 rounded-xl skeuo-btn-primary text-white text-xs font-extrabold shrink-0 flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-xs text-rose-500">{message}</p>
                )}
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar & Legal */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Nyeras Edutech (Nyera Educational Organisation). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/cancellation-refund-policy" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Refund Policy
            </Link>
            <Link href="/cookie-policy" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
