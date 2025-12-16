'use client'

import React from 'react'
import { motion } from 'framer-motion'

const quotes = [
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal",
  "The only way to do great work is to love what you do.",
  "Strive not to be a success, but rather to be of value.",
  "The future belongs to those who believe in the beauty of their dreams."
]

const Marquee = () => {
  const [currentQuote, setCurrentQuote] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-gradient-to-r from-[#6600CC] via-[#7a1cff] to-[#6600CC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-2xl sm:text-2xl font-medium text-white">
            {quotes[currentQuote]}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Marquee

