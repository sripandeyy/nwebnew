'use client'
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    })
  }, [])

  return (
    <section className="py-14 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          
          {/* Image Section with Animation */}
          <div 
            className="flex-1 sm:hidden lg:block"
            data-aos="fade-right"
          >
            <img 
              src="/founders.jpg" 
              className="md:max-w-lg sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md" 
              alt="Professional Services" 
            />
          </div>

          {/* Text Content Section with Animation */}
          <div 
            className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl"
            data-aos="fade-left"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-slate-200 dark:border-slate-700">
              Professional Services
            </span>
            <p className="text-slate-900 dark:text-white text-3xl font-extrabold sm:text-4xl tracking-tight">
              Bring Your Ideas to Reality with Nyeras
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              It&apos;s not just a project that you make, but a solution for the problem you solve. We are here to help you bring your ideas to reality. We also fund your project if the idea has potential and can bring a great change in society.
            </p>
            <div className="pt-2">
              <Link 
                href="/about" 
                className="inline-flex gap-x-1.5 items-center text-slate-900 dark:text-slate-200 hover:text-slate-700 dark:hover:text-white font-semibold transition-colors group"
              >
                <span>Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Services
