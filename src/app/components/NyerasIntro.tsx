'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function NyerasIntro() {
  const [stage, setStage] = useState<'white' | 'dots' | 'logo' | 'underline' | 'sweep' | 'reveal' | 'done'>('white')
  const [isMounted, setIsMounted] = useState<boolean>(true)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsMounted(false)
      }, 300)
      return () => clearTimeout(timer)
    }

    // Lock scrolling while intro is active
    document.body.style.overflow = 'hidden'

    // Timeline Sequence (Total: 3.0 Seconds):
    // 0.0s – 0.25s: Pure solid white screen
    
    // 0.25s: 6 Glowing Electric Blue Dots appear in center
    const t1 = setTimeout(() => setStage('dots'), 250)

    // 0.8s: Dots smoothly expand and resolve into the exact NYERAS Electric Blue Logo
    const t2 = setTimeout(() => setStage('logo'), 800)

    // 1.4s: Underline streams & taglines appear beneath the logo
    const t3 = setTimeout(() => setStage('underline'), 1400)

    // 1.9s: Radiant light shine sweeps directly across the logo
    const t4 = setTimeout(() => setStage('sweep'), 1900)

    // 2.4s: Smooth dissolve revealing the landing page
    const t5 = setTimeout(() => setStage('reveal'), 2400)

    // 3.0s: Complete unmount from DOM & restore scrolling
    const t6 = setTimeout(() => {
      setStage('done')
      setIsMounted(false)
      document.body.style.overflow = ''
    }, 3000)

    const handleSkip = () => {
      setIsMounted(false)
      document.body.style.overflow = ''
    }

    window.addEventListener('keydown', handleSkip)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      clearTimeout(t6)
      window.removeEventListener('keydown', handleSkip)
      document.body.style.overflow = ''
    }
  }, [])

  if (!isMounted) return null

  const showDots = stage === 'dots'
  const showLogo = stage === 'logo' || stage === 'underline' || stage === 'sweep' || stage === 'reveal' || stage === 'done'
  const showUnderline = stage === 'underline' || stage === 'sweep' || stage === 'reveal' || stage === 'done'
  const isShining = stage === 'sweep' || stage === 'reveal' || stage === 'done'
  const isRevealing = stage === 'reveal' || stage === 'done'

  return (
    <aside
      aria-label="Nyeras Intro Screen"
      role="status"
      onClick={() => {
        setIsMounted(false)
        document.body.style.overflow = ''
      }}
      className={`fixed inset-0 z-[999999] flex items-center justify-center bg-white select-none cursor-pointer overflow-hidden transition-opacity duration-600 ease-out will-change-[opacity] ${
        isRevealing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Center Floating Content: Exact Electric Blue NYERAS Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center bg-transparent border-none outline-none shadow-none px-4 max-w-4xl w-full">
        
        {/* Stage 1: 6 Glowing Electric Blue Dots */}
        {showDots && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 py-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={`intro-dot-${i}`}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-[#0012FF] opacity-100 scale-100 transition-all duration-300 ease-out animate-pulse"
                style={{
                  boxShadow: '0 0 16px rgba(0, 18, 255, 0.85), 0 0 32px rgba(0, 18, 255, 0.5)',
                  animationDelay: `${i * 65}ms`
                }}
              />
            ))}
          </div>
        )}

        {/* Stage 2: Exact NYERAS Logo Image with Electric Blue Aura & Smooth Scale */}
        <div
          className={`relative w-full max-w-[290px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-[620px] aspect-[538/163] transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            showLogo
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-50 translate-y-4 absolute pointer-events-none'
          }`}
          style={{
            filter: showLogo ? 'drop-shadow(0 0 28px rgba(0, 18, 255, 0.35))' : 'none'
          }}
        >
          <Image
            src="/nyeras-wordmark-electric-blue.png"
            alt="NYERAS Logo"
            fill
            priority
            className="object-contain"
          />

          {/* Radiant Light Shine Sweep Overlay */}
          {isShining && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg nyeras-logo-shine-beam" />
          )}
        </div>

        {/* Crisp Electric Blue Underline Line */}
        <div 
          className={`relative w-full max-w-[270px] sm:max-w-[400px] md:max-w-[520px] lg:max-w-[590px] h-1 sm:h-1.5 md:h-2 rounded-full mt-3 sm:mt-4 bg-transparent transition-opacity duration-400 ${
            showUnderline ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`h-full rounded-full bg-[#0012FF] relative transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              showUnderline ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}
            style={{
              boxShadow: '0 0 16px rgba(0, 18, 255, 0.75)',
            }}
          >
            {showUnderline && (
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#0012FF] opacity-95 animate-pulse" 
                style={{ boxShadow: '0 0 14px rgba(0, 18, 255, 0.95)' }}
              />
            )}
          </div>
        </div>

        {/* 2 Taglines Under the Wordmark */}
        <div
          className={`flex flex-col items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 bg-transparent transition-all duration-500 ease-out ${
            showUnderline
              ? 'opacity-95 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <p 
            className="text-xs sm:text-sm md:text-base font-black tracking-[0.3em] uppercase text-[#0012FF]"
            style={{ textShadow: '0 0 12px rgba(0, 18, 255, 0.2)' }}
          >
            YOUR UPSKILLING PARTNER
          </p>
          <p className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase text-slate-600">
            ONE STOP SOLUTION
          </p>
        </div>

      </div>

      {/* Shine Sweep CSS */}
      <style jsx global>{`
        .nyeras-logo-shine-beam {
          background: linear-gradient(
            110deg,
            transparent 0%,
            transparent 35%,
            rgba(255, 255, 255, 0.85) 50%,
            transparent 65%,
            transparent 100%
          );
          background-size: 250% 100%;
          mix-blend-mode: overlay;
          animation: logoShineSweep 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes logoShineSweep {
          0% {
            background-position: 150% 0;
          }
          100% {
            background-position: -150% 0;
          }
        }
      `}</style>
    </aside>
  )
}


