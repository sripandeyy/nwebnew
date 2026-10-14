'use client'

import React from 'react'
import { motion } from 'framer-motion'

const quotes = [
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal.",
  "The only way to do great work is to love what you do.",
  "Strive not to be a success, but rather to be of value.",
  "The future belongs to those who believe in the beauty of their dreams."
]

const Marquee = () => {
  const [currentQuote, setCurrentQuote] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8 border-y border-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-radial-vignette opacity-15 pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-lg sm:text-xl font-medium text-slate-200 italic tracking-wide">
            &ldquo;{quotes[currentQuote]}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Marquee

