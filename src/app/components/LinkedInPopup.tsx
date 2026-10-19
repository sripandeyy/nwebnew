'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useFloatingPromptSlot } from '../utils/floatingPrompts';

const LINKEDIN_URL = 'https://www.linkedin.com/company/nyeras-edutech-innovations/';

function LinkedInBrandIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8V10.9M7.86 6.54a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

export default function LinkedInPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const hasSlot = useFloatingPromptSlot('linkedin', 'right', isVisible && !isDismissed);

  // Trigger popup when user scrolls past the stats section
  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const statsGrid = document.getElementById('hero-stats-grid');
      if (statsGrid) {
        const rect = statsGrid.getBoundingClientRect();
        setIsVisible(rect.bottom < 40);
      } else {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 750);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!hasSlot) {
    return null;
  }

  return (
    <aside
      aria-label="Connect with Nyeras on LinkedIn"
      className="fixed bottom-24 left-3 right-3 sm:bottom-24 sm:left-auto sm:right-6 sm:w-full sm:max-w-[370px] z-40 animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="relative rounded-2xl bg-white/95 dark:bg-slate-900/95 text-slate-950 dark:text-white p-4 sm:p-5 shadow-2xl skeuo-card transition-all border border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss LinkedIn popup"
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4 pr-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center shrink-0">
            <LinkedInBrandIcon className="w-5 h-5 text-[#0077b5] dark:text-blue-400" />
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
            Stay connected with Nyeras on LinkedIn.
          </p>
        </div>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl skeuo-btn-primary text-white px-3.5 py-2.5 text-xs font-black shadow-md hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:-translate-y-0.5"
        >
          <LinkedInBrandIcon className="w-3.5 h-3.5 text-white" />
          <span>Connect on LinkedIn</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}
