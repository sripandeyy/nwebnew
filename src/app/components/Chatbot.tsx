'use client'

import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { X } from 'lucide-react'

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

function BotAssistantIcon({ className = "w-9 h-9 sm:w-10 sm:h-10" }: { className?: string }) {
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
  const isChatOpenRef = useRef(false)
  isChatOpenRef.current = isChatOpen
  const launcherRef = useRef<HTMLElement>(null)

  // Suppress Tawk's default purple circular bubble and tooltips when minimized
  useEffect(() => {
    const suppressDefaultLauncher = () => {
      // Never suppress or touch anything if the chat is currently open
      if (isChatOpenRef.current) return

      // Target and hide only small launcher iframes
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach((iframe) => {
        const title = (iframe.getAttribute('title') || '').toLowerCase()
        const ariaLabel = (iframe.getAttribute('aria-label') || '').toLowerCase()
        const width = iframe.offsetWidth || parseInt(iframe.style.width, 10) || 0
        const height = iframe.offsetHeight || parseInt(iframe.style.height, 10) || 0
        const isCircle =
          iframe.style.borderRadius &&
          (iframe.style.borderRadius.includes('50%') || iframe.style.borderRadius.includes('100%'))

        // Only hide if it's a small launcher bubble (never hide large/open chat windows or pre-chat forms)
        if (
          (title.includes('chat widget') || title.includes('tawk') || ariaLabel.includes('chat widget') || isCircle) &&
          (isCircle || (width > 0 && width < 120 && height > 0 && height < 120))
        ) {
          if (iframe.style.display !== 'none') {
            iframe.style.setProperty('display', 'none', 'important')
            iframe.style.setProperty('visibility', 'hidden', 'important')
            iframe.style.setProperty('pointer-events', 'none', 'important')
          }
        }
      })

      // Target small container/tooltip elements created by Tawk
      const tawkElements = document.querySelectorAll(
        '.tawk-min-container, .tawk-button-circle, .tawk-bubble-container, .tawk-tooltip, [id*="tawk-bubble"], [id*="tawk-tooltip"]'
      )
      tawkElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        if (htmlEl.style.display !== 'none') {
          htmlEl.style.setProperty('display', 'none', 'important')
          htmlEl.style.setProperty('visibility', 'hidden', 'important')
          htmlEl.style.setProperty('pointer-events', 'none', 'important')
        }
      })

      // Keep native widget hidden while minimized
      if (!isChatOpenRef.current && typeof window !== 'undefined' && window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget()
      }
    }

    suppressDefaultLauncher()
    const interval = setInterval(suppressDefaultLauncher, 300)

    // Only observe newly added nodes (no attributes: true to avoid recursive loops)
    const observer = new MutationObserver(() => {
      suppressDefaultLauncher()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  // Listen to Tawk state changes
  useEffect(() => {
    const handleChatState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>
      if (customEvent.detail !== undefined) {
        setIsChatOpen(!!customEvent.detail.isOpen)
      }
    }

    window.addEventListener('tawk_chat_state', handleChatState)

    return () => {
      window.removeEventListener('tawk_chat_state', handleChatState)
    }
  }, [])

  const handleOpenChat = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setIsChatOpen(true)
    isChatOpenRef.current = true
    if (typeof window !== 'undefined' && window.Tawk_API) {
      if (typeof window.Tawk_API.showWidget === 'function') {
        window.Tawk_API.showWidget()
      }
      if (typeof window.Tawk_API.maximize === 'function') {
        window.Tawk_API.maximize()
      } else if (typeof window.Tawk_API.toggle === 'function') {
        window.Tawk_API.toggle()
      }
    }
  }

  const handleCloseChat = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setIsChatOpen(false)
    isChatOpenRef.current = false
    if (typeof window !== 'undefined' && window.Tawk_API) {
      try {
        if (typeof window.Tawk_API.minimize === 'function') {
          window.Tawk_API.minimize()
        }
      } catch {}
      try {
        if (typeof window.Tawk_API.hideWidget === 'function') {
          window.Tawk_API.hideWidget()
        }
      } catch {}
    }
  }

  // Minimize chat when clicking anywhere outside the card on the screen
  useEffect(() => {
    if (!isChatOpen) return

    let lastInteractionTime = 0

    const isInsideCardOrLauncher = (e: PointerEvent | MouseEvent | TouchEvent): boolean => {
      const target = e.target as HTMLElement | null

      // Check if target is inside the floating launcher button
      if (launcherRef.current && (launcherRef.current === target || launcherRef.current.contains(target))) {
        return true
      }

      // Check if target element is part of Tawk
      if (
        target &&
        (target.tagName === 'IFRAME' ||
          target.closest('iframe') ||
          target.closest('[id*="tawk"]') ||
          target.closest('[class*="tawk"]'))
      ) {
        return true
      }

      // Check coordinate positions (handles iframes, touch, and desktop pointer events)
      let clientX: number | undefined
      let clientY: number | undefined

      if ('clientX' in e && typeof e.clientX === 'number') {
        clientX = e.clientX
        clientY = e.clientY
      } else if ('touches' in e && e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      }

      if (clientX !== undefined && clientY !== undefined) {
        // Check launcher button coordinates
        if (launcherRef.current) {
          const lRect = launcherRef.current.getBoundingClientRect()
          if (
            clientX >= lRect.left &&
            clientX <= lRect.right &&
            clientY >= lRect.top &&
            clientY <= lRect.bottom
          ) {
            return true
          }
        }

        // Check active chat window iframes
        const iframes = document.querySelectorAll('iframe')
        for (const iframe of iframes) {
          const rect = iframe.getBoundingClientRect()
          // Open chat card has substantial dimensions
          if (
            rect.width > 150 &&
            rect.height > 150 &&
            iframe.style.display !== 'none' &&
            iframe.style.visibility !== 'hidden'
          ) {
            if (
              clientX >= rect.left &&
              clientX <= rect.right &&
              clientY >= rect.top &&
              clientY <= rect.bottom
            ) {
              return true
            }
          }
        }

        // Check potential Tawk container elements
        const tawkElements = document.querySelectorAll<HTMLElement>('[id*="tawk"], [class*="tawk"]')
        for (const el of tawkElements) {
          const rect = el.getBoundingClientRect()
          if (
            rect.width > 150 &&
            rect.height > 150 &&
            el.style.display !== 'none' &&
            el.style.visibility !== 'hidden'
          ) {
            if (
              clientX >= rect.left &&
              clientX <= rect.right &&
              clientY >= rect.top &&
              clientY <= rect.bottom
            ) {
              return true
            }
          }
        }
      }

      return false
    }

    const handleOutsideClick = (e: PointerEvent | MouseEvent | TouchEvent) => {
      const now = Date.now()
      if (now - lastInteractionTime < 150) return

      if (isInsideCardOrLauncher(e)) {
        return
      }

      lastInteractionTime = now
      handleCloseChat()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseChat()
      }
    }

    const handleWindowBlur = () => {
      setTimeout(() => {
        if (!isChatOpenRef.current) return
        const active = document.activeElement
        if (active && active.tagName === 'IFRAME') {
          const rect = active.getBoundingClientRect()
          const isChatIframe =
            rect.width > 150 &&
            rect.height > 150 &&
            ((active as HTMLIFrameElement).src?.includes('tawk.to') ||
              active.getAttribute('title')?.toLowerCase().includes('chat') ||
              active.getAttribute('title')?.toLowerCase().includes('tawk'))
          if (!isChatIframe) {
            handleCloseChat()
          }
        }
      }, 100)
    }

    document.addEventListener('pointerdown', handleOutsideClick, true)
    document.addEventListener('touchstart', handleOutsideClick, true)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick, true)
      document.removeEventListener('touchstart', handleOutsideClick, true)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [isChatOpen])

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

      {/* Custom Floating Robot Launcher Button */}
      <aside
        ref={launcherRef}
        aria-label="AI Chat Support"
        style={{
          zIndex: 2147483646,
        }}
        className="fixed bottom-6 right-5 sm:right-7"
      >
        <div className="relative group">
          {/* Hover Tooltip Pill */}
          <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/95 dark:bg-slate-950/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Career Assistant</span>
          </div>

          <button
            type="button"
            onClick={isChatOpen ? handleCloseChat : handleOpenChat}
            aria-label="Toggle AI Chat Assistant"
            className="group relative flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 text-white border-2 border-slate-700/90 shadow-2xl hover:border-blue-400/80 hover:shadow-blue-500/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          >
            {isChatOpen ? (
              <X className="w-8 h-8 sm:w-9 sm:h-9 text-slate-100 group-hover:text-white transition-all" />
            ) : (
              <BotAssistantIcon className="w-9 h-9 sm:w-10 sm:h-10 text-slate-100 group-hover:text-white group-hover:scale-110 transition-all" />
            )}

            {/* Online Pulse Indicator */}
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900" />
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

