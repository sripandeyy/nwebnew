'use client';
import { useState } from 'react'
import React from 'react'
import CallbackForm from '../components/CallBackform';
const Connect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    
    <>
    <section className="w-full bg-white/40">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center md:text-left">
                  Connect with an Academic Counsellor
                </h2>

                <button
                  className="text-white px-6 py-2.5 rounded-lg transition-colors duration-300 text-base font-medium whitespace-nowrap"
                  onClick={() => setIsModalOpen(true)}
                  style={{ backgroundColor: '#6600CC' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6600CC'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6600CC'}
                >
                  Request A Call
                </button>
              </div>
            </div>
          </section>
          {isModalOpen && <CallbackForm onClose={() => setIsModalOpen(false)} />}
          </>

  )
}

export default Connect
