'use client'

import { useState } from 'react'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function Faq() {
  const faqs = [
    {
      question: "What courses and career domains does Nyeras offer?",
      answer: "Nyeras offers industry-aligned programs in Full Stack Development, Data Science & AI, Cloud Computing (AWS/DevOps), VLSI Design, Cyber Security, Digital Marketing, and Core Engineering tracks, designed in collaboration with hiring leaders."
    },
    {
      question: "How does the placement assistance and job guarantee work?",
      answer: "Our career programs provide 100% placement support including 1:1 resume building, LinkedIn optimization, domain-specific mock interviews with tech leads, and direct referrals to our network of 100+ hiring partner companies."
    },
    {
      question: "Are Nyeras certifications verified and recognized?",
      answer: "Yes, every graduate receives an official, digitally verifiable certificate from Nyeras (Nyera Educational Organisation). Recruiters can instantly verify certificate credentials through our public online verification portal at /certverify."
    },
    {
      question: "Does Nyeras provide live mentorship and doubt clearance?",
      answer: "Absolutely. You get access to live instructor-led masterclasses, weekend doubt resolution clinics, and dedicated 1:1 mentor syncs to guide you through project roadblocks and coding assessments."
    },
    {
      question: "Can college students or non-IT professionals enroll?",
      answer: "Yes! Our courses start from foundational fundamentals and progress into advanced practical implementations. We provide dedicated pre-requisite prep modules for non-technical or beginner students."
    },
    {
      question: "Are internships included with the training?",
      answer: "Yes, every enrolled student undergoes practical capstone projects and structured virtual/hybrid internships where you build real production-grade products for your portfolio."
    },
    {
      question: "What flexible payment plans are available?",
      answer: "We support one-time discounted fees, easy no-cost monthly EMI options, and merit-based financial aid through our educational organisation to ensure affordability."
    }
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-transparent via-slate-100/30 to-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-4 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto">
            Everything you need to know about our courses, certifications, and placement assistance.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. placement, certificate, fees)..."
            className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl skeuo-input text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
              No matching questions found. <Link href="/contact" className="text-slate-800 dark:text-slate-200 font-semibold hover:underline">Contact our support</Link>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'skeuo-tab-active shadow-md' 
                      : 'skeuo-btn-secondary'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-slate-900 dark:text-white' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  )
}
