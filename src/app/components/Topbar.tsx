'use client'

import { useState } from 'react'
import React from 'react'
import { ArrowUpRight } from 'lucide-react' ;
import CallbackForm from '../components/CallBackform';
const Topbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-8 text-xs sm:text-sm text-gray-900">
            <span className="mr-2 font-medium">Need Help? Talk to our Academic Advisors</span>
            <a
              href="/request-call"
              onClick={(e) => {
                e.preventDefault()
                setIsModalOpen(true)
              }}
              className="text-[#6600CC] flex items-center hover:underline transition-colors duration-200 font-semibold underline"
            >
              Request a Call
              <ArrowUpRight className="w-4 h-4 ml-1/2" />
            </a>
          </div>
        </div>
      </div>
      {isModalOpen && <CallbackForm onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default Topbar
