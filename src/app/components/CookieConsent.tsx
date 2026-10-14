'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('nyeras_cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore local storage error
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('nyeras_cookie_consent', 'accepted');
    } catch {}
    setShow(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('nyeras_cookie_consent', 'declined');
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl skeuo-card text-slate-900 dark:text-slate-100 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl skeuo-badge text-slate-800 dark:text-slate-200 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            We use cookies to ensure you get the best experience on Nyeras and to analyze traffic.{' '}
            <Link href="/cookie-policy" className="text-slate-900 dark:text-slate-100 font-bold underline hover:text-slate-700">
              Cookie Policy
            </Link>.
          </div>
          <button
            onClick={handleDecline}
            aria-label="Close"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <button
            type="button"
            onClick={handleDecline}
            className="px-3.5 py-2 text-xs font-extrabold skeuo-btn-secondary rounded-xl text-slate-900 dark:text-slate-100"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4.5 py-2 text-xs font-extrabold text-white skeuo-btn-primary rounded-xl shadow-md"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
