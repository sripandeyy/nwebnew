'use client';

import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

const NOTIFICATIONS = [
  {
    name: "S Sneha",
    role: "Development Analyst",
    company: "Accenture",
    pkg: "₹9.5 LPA",
    hike: "+160%",
    time: "4 mins ago",
    img: "/sneha s.jpeg",
  },
  {
    name: "Ganesh Sai Katta",
    role: "Software Engineer",
    company: "Impetus Technologies",
    pkg: "₹12.0 LPA",
    hike: "+150%",
    time: "18 mins ago",
    img: "/ganesh nyeras.jpeg",
  },
  {
    name: "Harsha Vardhan Reddy",
    role: "Consulting Engineer",
    company: "Cisco Systems",
    pkg: "₹16.5 LPA",
    hike: "+200%",
    time: "32 mins ago",
    img: "/harsha.jpeg",
  },
  {
    name: "Malothu Balram",
    role: "Analytics Engineer",
    company: "DAZN",
    pkg: "₹14.0 LPA",
    hike: "+180%",
    time: "45 mins ago",
    img: "/12.jpg",
  }
];

export default function LivePlacementToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setIsVisible(true);
      }, 700);
    }, 11000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = NOTIFICATIONS[currentIndex];

  return (
    <div
      className={`fixed bottom-28 left-4 sm:bottom-32 sm:left-6 z-30 transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
      }`}
    >
      <div className="relative max-w-sm rounded-2xl bg-slate-900/95 dark:bg-[#0c1020]/95 text-white p-3.5 glossy-black-card shadow-2xl flex items-center gap-3">
        
        {/* Real Student Image */}
        <div className="relative shrink-0">
          <img
            src={current.img}
            alt={current.name}
            className="w-12 h-12 rounded-xl object-cover border-2 border-slate-600 shadow-md"
          />
          <span className="absolute -bottom-1 -right-1 inline-flex rounded-full h-4 w-4 bg-slate-800 border border-slate-600 text-[9px] font-bold text-slate-200 items-center justify-center">
            ✓
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-bold text-white truncate">{current.name}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {current.pkg}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            Placed at <strong className="text-white">{current.company}</strong>
          </p>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-medium">
            <span>{current.time}</span>
            <span>•</span>
            <Link href="/domains/job-guarantee" className="text-slate-300 hover:text-white underline">
              View Track
            </Link>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
