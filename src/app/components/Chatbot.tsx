'use client'

import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void
      minimize?: () => void
      toggle?: () => void
      showWidget?: () => void
      hideWidget?: () => void
      onLoad?: () => void
      onChatMinimized?: () => void
      onChatMaximized?: () => void
      onChatHidden?: () => void
      isChatMaximized?: () => boolean
      [key: string]: unknown
    }
    Tawk_LoadStart?: Date
  }
}

function BotAssistantIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Antenna */}
      <path d="M12 5.5V2" />
      <circle cx="12" cy="2" r="1.2" fill="currentColor" stroke="none" />

      {/* Left Ear */}
      <path d="M4 11a2.2 2.2 0 0 0 0 4.5" />

      {/* Right Ear */}
      <path d="M20 11a2.2 2.2 0 0 1 0 4.5" />

      {/* Head / Chat Bubble */}
      <path d="M5 5.5h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7.5l-3.5 3v-3H5a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z" />

      {/* Eyes */}
      <circle cx="8.5" cy="11.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="11.5" r="1.4" fill="currentColor" stroke="none" />

      {/* Smile */}
      <path d="M9.5 14.5c.8.8 2.2.8 3 0" />
    </svg>
  )
}

export default function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const launcherRef = useRef<HTMLElement>(null)

  // Permanently suppress Tawk's default purple circular button and tooltip
  useEffect(() => {
    const removePurpleBubble = () => {
      // 1. Target and hide all small launcher iframes
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach((iframe) => {
        const title = (iframe.getAttribute('title') || '').toLowerCase()
        const ariaLabel = (iframe.getAttribute('aria-label') || '').toLowerCase()
        const width = iframe.offsetWidth || parseInt(iframe.style.width, 10) || 0
        const height = iframe.offsetHeight || parseInt(iframe.style.height, 10) || 0
        const isCircle = iframe.style.borderRadius && (iframe.style.borderRadius.includes('50%') || iframe.style.borderRadius.includes('100%'))

        // If it's a small launcher bubble (not the full chat window)
        if (
          (title.includes('chat widget') || title.includes('tawk') || ariaLabel.includes('chat widget') || isCircle) &&
          (width < 180 || height < 180 || isCircle)
        ) {
          iframe.style.setProperty('display', 'none', 'important')
          iframe.style.setProperty('visibility', 'hidden', 'important')
          iframe.style.setProperty('opacity', '0', 'important')
          iframe.style.setProperty('pointer-events', 'none', 'important')
          iframe.style.setProperty('transform', 'scale(0)', 'important')
        }
      })

      // 2. Target any container/div/tooltip elements created by Tawk
      const tawkElements = document.querySelectorAll(
        '.tawk-min-container, .tawk-button-circle, .tawk-bubble-container, .tawk-tooltip, [id*="tawk-bubble"], [id*="tawk-tooltip"], [class*="tawk-min"], [class*="tawk-bubble"], [class*="tawk-tooltip"]'
      )
      tawkElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.setProperty('display', 'none', 'important')
        htmlEl.style.setProperty('visibility', 'hidden', 'important')
        htmlEl.style.setProperty('opacity', '0', 'important')
        htmlEl.style.setProperty('pointer-events', 'none', 'important')
        htmlEl.style.setProperty('transform', 'scale(0)', 'important')
      })

      // 3. Keep widget hidden if minimized
      if (typeof window !== 'undefined' && window.Tawk_API) {
        if (typeof window.Tawk_API.hideWidget === 'function') {
          if (!window.Tawk_API.isChatMaximized?.()) {
            window.Tawk_API.hideWidget()
          }
        }
      }
    }

    removePurpleBubble()
    const interval = setInterval(removePurpleBubble, 150)
    const observer = new MutationObserver(removePurpleBubble)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true })

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])


  // Listen to Tawk state changes and poll maximized state
  useEffect(() => {
    const handleChatState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>
      if (customEvent.detail !== undefined) {
        setIsChatOpen(!!customEvent.detail.isOpen)
      }
    }

    const checkMaximized = () => {
      if (typeof window !== 'undefined' && window.Tawk_API) {
        if (typeof window.Tawk_API.isChatMaximized === 'function') {
          const isMax = window.Tawk_API.isChatMaximized()
          setIsChatOpen((prev) => (prev !== isMax ? isMax : prev))
        }
      }
    }

    window.addEventListener('tawk_chat_state', handleChatState)
    const interval = setInterval(checkMaximized, 250)

    return () => {
      window.removeEventListener('tawk_chat_state', handleChatState)
      clearInterval(interval)
    }
  }, [])

  // Smooth scroll positioning so the button doesn't clash with navbars or footer
  useEffect(() => {
    let ticking = false

    const updateChatPosition = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0

      const widgetHeight = 54
      const maxTravel = Math.max(window.innerHeight - widgetHeight - 95, 0)
      const translateY = -(progress * maxTravel)

      document.documentElement.style.setProperty('--chat-translate-y', `${translateY}px`)
      ticking = false
    }

    const handleScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateChatPosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScrollOrResize, { passive: true })
    window.addEventListener('resize', handleScrollOrResize, { passive: true })

    handleScrollOrResize()

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize)
      window.removeEventListener('resize', handleScrollOrResize)
    }
  }, [])

  const handleOpenChat = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (typeof window !== 'undefined' && window.Tawk_API) {
      if (typeof window.Tawk_API.showWidget === 'function') {
        window.Tawk_API.showWidget()
      }
      if (typeof window.Tawk_API.maximize === 'function') {
        window.Tawk_API.maximize()
      } else if (typeof window.Tawk_API.toggle === 'function') {
        window.Tawk_API.toggle()
      }
      setIsChatOpen(true)
    }
  }

  const handleCloseChat = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (typeof window !== 'undefined' && window.Tawk_API) {
      try {
        if (typeof window.Tawk_API.minimize === 'function') {
          window.Tawk_API.minimize()
        }
      } catch (err) {}
      try {
        if (typeof window.Tawk_API.hideWidget === 'function') {
          window.Tawk_API.hideWidget()
        }
      } catch (err) {}
    }
    setIsChatOpen(false)
  }

  return (
    <>
      <Script id="tawk-to-script" strategy="afterInteractive">
        {`
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          Tawk_API.onLoad = function() {
            if (Tawk_API.hideWidget) {
              Tawk_API.hideWidget();
            }
          };
          Tawk_API.onChatMaximized = function() {
            window.dispatchEvent(new CustomEvent('tawk_chat_state', { detail: { isOpen: true } }));
          };
          Tawk_API.onChatMinimized = function() {
            if (Tawk_API.hideWidget) {
              Tawk_API.hideWidget();
            }
            window.dispatchEvent(new CustomEvent('tawk_chat_state', { detail: { isOpen: false } }));
          };
          Tawk_API.onChatHidden = function() {
            if (Tawk_API.hideWidget) {
              Tawk_API.hideWidget();
            }
            window.dispatchEvent(new CustomEvent('tawk_chat_state', { detail: { isOpen: false } }));
          };
          (function() {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = "https://embed.tawk.to/69e77be7735c041c325377d6/1jmo3o0ti";
            s1.charset = "UTF-8";
            s1.setAttribute("crossorigin", "*");
            s0.parentNode.insertBefore(s1, s0);
          })();
        `}
      </Script>

      {/* Backdrop overlay: full-screen invisible layer below Tawk's chat window to catch any outside click */}
      {isChatOpen && (
        <div
          aria-label="Close Chat Backdrop"
          onClick={handleCloseChat}
          onMouseDown={handleCloseChat}
          onTouchStart={handleCloseChat}
          style={{ zIndex: 2147483646 }}
          className="fixed inset-0 bg-transparent cursor-default select-none"
        />
      )}

      {/* Custom Floating Robot Launcher Button */}
      <aside
        ref={launcherRef}
        aria-label="Chat Support"
        style={{
          zIndex: 2147483646,
          transform: 'translateY(var(--chat-translate-y, 0px))',
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
        }}
        className="fixed bottom-6 right-5 sm:right-6"
      >
        <button
          type="button"
          onClick={isChatOpen ? handleCloseChat : handleOpenChat}
          aria-label="Toggle Chat Assistant"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 text-white border border-slate-700 shadow-2xl hover:bg-slate-800 hover:border-slate-500 hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <BotAssistantIcon className="w-7 h-7 text-slate-100 group-hover:text-white group-hover:scale-110 transition-all" />
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
        </button>
      </aside>
    </>
  )
}

