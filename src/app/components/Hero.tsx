"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

const Hero = () => {
  const router = useRouter();

  const words = ["Foundation", "Gateway", "Bridge", "Key", "Path"];
  const [wordIndex, setWordIndex] = useState(1); // start on "gateway" to match your example

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative w-full bg-white/40 min-h-screen flex items-center pt-16 sm:pt-20">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Text and CTAs */}
          <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-8">
            <div className="space-y-4 max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6600cc]/80">
                Future-ready learning
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
                <span className="block">Education is the</span>
                <span className="block text-[#6600cc]">{words[wordIndex]}</span>
                <span className="block">to your future.</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Unlock Your <span className="text-[#6600cc]">Potential</span> with Nyeras
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Empower your learning journey with our cutting-edge online program. Gain skills, knowledge, and
                confidence to excel in today&apos;s digital world.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => router.push('/domains/departments')}
                className="group relative inline-flex items-center justify-center rounded-2xl bg-[#6600cc] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#6600cc]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6600cc] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(102,0,204,0.45)]"
              >
                <span className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Explore Courses
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => router.push('/plans')}
                className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-400/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(249,115,22,0.6)]"
              >
                <span className="absolute inset-0 rounded-2xl border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Enroll Now
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full max-w-xl">
              <div className="flex-1 rounded-2xl border border-purple-200 bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#ec4899] px-5 py-4 shadow-md backdrop-blur-sm flex items-center gap-4 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xs font-semibold">
                  15K+
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Trusted by 15,000+ students</p>
                  <p className="text-xs text-white/80">From beginners to working professionals</p>
                </div>
              </div>

              <div className="flex-1 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 px-5 py-4 shadow-md backdrop-blur-sm flex flex-col justify-center text-white">
                <p className="text-sm font-semibold">Certified | 100% Growth</p>
                <p className="text-xs text-white/80">Industry-recognized curriculum & outcomes</p>
              </div>
            </div>
          </div>

          {/* Right: Hero image as a clean rounded visual (no visible layout/card edges) */}
          <div className="relative flex justify-center lg:justify-end pt-4 lg:pt-8">
            <div className="relative w-full max-w-md">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src="/girl_img.png"
                  alt="Learner studying with Nyeras platform"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Small floating tag on the image */}
              <div className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live & Interactive
              </div>

              {/* Micro stat chip */}
              <div className="pointer-events-none absolute right-4 bottom-4 rounded-2xl bg-[#6600cc]/90 px-3 py-2 text-xs font-semibold text-white shadow-lg flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[0.7rem]">15K+</span>
                <span>Students placed & upskilled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
