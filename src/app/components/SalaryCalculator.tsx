'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  UserCheck, 
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';

interface TrackROI {
  title: string;
  isJobGuarantee?: boolean;
  currentAvg: string;
  targetAvg: string;
  maxCtc: string;
  avgHike: string;
  timeline: string;
  topHirers: string[];
  alumniPlaced: {
    name: string;
    company: string;
    pkg: string;
    img: string;
  };
}

const ROI_DATA: Record<string, TrackROI> = {
  datascience: {
    title: "Data Science & Generative AI",
    isJobGuarantee: true,
    currentAvg: "₹4.0 LPA",
    targetAvg: "₹14.2 LPA",
    maxCtc: "₹24.5 LPA",
    avgHike: "+210% Hike",
    timeline: "20 Weeks",
    topHirers: ["Accenture", "DAZN", "Deloitte", "LTI Mindtree", "Fractal"],
    alumniPlaced: {
      name: "Malothu Balram",
      company: "DAZN",
      pkg: "₹14.0 LPA",
      img: "/12.jpg"
    }
  },
  dataanalytics: {
    title: "Data Analytics & Business Intelligence",
    isJobGuarantee: true,
    currentAvg: "₹3.5 LPA",
    targetAvg: "₹9.5 LPA",
    maxCtc: "₹16.0 LPA",
    avgHike: "+160% Hike",
    timeline: "16 Weeks",
    topHirers: ["Accenture", "Cognizant", "Deloitte", "KPMG", "TCS"],
    alumniPlaced: {
      name: "S Sneha",
      company: "Accenture",
      pkg: "₹9.5 LPA",
      img: "/sneha s.jpeg"
    }
  },
  hrm: {
    title: "Human Resource Management (HRM)",
    isJobGuarantee: true,
    currentAvg: "₹3.0 LPA",
    targetAvg: "₹8.5 LPA",
    maxCtc: "₹14.0 LPA",
    avgHike: "+170% Hike",
    timeline: "16 Weeks",
    topHirers: ["Deloitte", "Wipro", "LTI Mindtree", "Genpact", "Infosys"],
    alumniPlaced: {
      name: "PhaniBhushan Rao",
      company: "LTI Mindtree",
      pkg: "₹10.5 LPA",
      img: "/phanibhu.jpeg"
    }
  },
  fullstack: {
    title: "Full Stack Web Engineering",
    isJobGuarantee: false,
    currentAvg: "₹3.6 LPA",
    targetAvg: "₹12.5 LPA",
    maxCtc: "₹21.0 LPA",
    avgHike: "+180% Hike",
    timeline: "16 Weeks",
    topHirers: ["Microsoft", "PayPal", "Impetus", "Accenture", "Swiggy"],
    alumniPlaced: {
      name: "Ganesh Sai Katta",
      company: "Impetus Technologies",
      pkg: "₹12.0 LPA",
      img: "/ganesh nyeras.jpeg"
    }
  }
};

export default function SalaryCalculator() {
  const [background, setBackground] = useState<'student' | 'service' | 'nontech'>('student');
  const [targetTrack, setTargetTrack] = useState<string>('datascience');

  const activeData = ROI_DATA[targetTrack] || ROI_DATA.datascience;

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <Calculator className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Placement ROI Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Calculate Your Career & Salary Trajectory
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            See real compensation outcomes, expected percentage hikes, and hiring MNC pipelines tailored to your background.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Inputs (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 glossy-black-card flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Background Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  1. Select Your Current Background
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setBackground('student')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-left transition-all w-full ${
                      background === 'student'
                        ? 'skeuo-tab-active text-slate-950 dark:text-white'
                        : 'skeuo-btn-secondary text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-slate-900 dark:text-slate-200" />
                      <div>
                        <div className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white">College Student / Fresh Graduate</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Aiming for first high-paying MNC job</div>
                      </div>
                    </div>
                    {background === 'student' && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setBackground('service')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-left transition-all w-full ${
                      background === 'service'
                        ? 'skeuo-tab-active text-slate-950 dark:text-white'
                        : 'skeuo-btn-secondary text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-slate-900 dark:text-slate-200" />
                      <div>
                        <div className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white">Service IT / Support Engineer</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Switching from ₹3.5L to Product ₹12L+</div>
                      </div>
                    </div>
                    {background === 'service' && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setBackground('nontech')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-left transition-all w-full ${
                      background === 'nontech'
                        ? 'skeuo-tab-active text-slate-950 dark:text-white'
                        : 'skeuo-btn-secondary text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-slate-900 dark:text-slate-200" />
                      <div>
                        <div className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white">Non-Tech / Career Transitioner</div>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Zero-to-One tech career launch</div>
                      </div>
                    </div>
                    {background === 'nontech' && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Target Track Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2.5">
                  2. Select Target Career Track
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(ROI_DATA).map(([key, item], trackIdx) => (
                    <button
                      key={`salary-track-${key}-${trackIdx}`}
                      type="button"
                      onClick={() => setTargetTrack(key)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        targetTrack === key
                          ? 'skeuo-btn-primary text-white'
                          : 'skeuo-btn-secondary text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <div className="text-xs font-extrabold truncate">{item.title.split('(')[0]}</div>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-bold ${targetTrack === key ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}`}>
                          {item.avgHike}
                        </span>
                        {item.isJobGuarantee && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                            targetTrack === key ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            Guarantee
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Micro Callout */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Backed by 100+ Hiring Partners</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Placement Cell</span>
            </div>

          </div>

          {/* Right Column: Dynamic Projected Outcome Card (7 cols) */}
          <div className="lg:col-span-7 relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl glass-skeuo-dark text-white">
            
            <div className="relative z-10">
              
              {/* Track Title & Timeline Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Projected Trajectory</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{activeData.title}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-xs font-extrabold shadow-sm">
                  Duration: {activeData.timeline}
                </span>
              </div>

              {/* Salary Comparison Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-sm">
                  <span className="text-xs font-bold text-slate-300">Current Market Baseline</span>
                  <div className="text-2xl font-black text-white mt-1">{activeData.currentAvg}</div>
                  <span className="text-[11px] font-bold text-slate-400">Industry entry level</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 shadow-sm">
                  <span className="text-xs font-bold text-emerald-300">Expected Nyeras Median</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    {activeData.targetAvg}
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-300">{activeData.avgHike}</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 shadow-sm">
                  <span className="text-xs font-bold text-amber-300">Upper Tier Placements</span>
                  <div className="text-2xl font-black text-amber-300 mt-1">{activeData.maxCtc}</div>
                  <span className="text-[11px] font-extrabold text-amber-300">Top 10% graduates</span>
                </div>

              </div>

              {/* Hiring Companies Bar */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 block">
                  Actively Recruiting From This Cohort
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeData.topHirers.map((company, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-100 border border-slate-700 text-xs font-bold shadow-xs"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Alumnus Spotlight */}
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/90 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <img
                    src={activeData.alumniPlaced.img}
                    alt={activeData.alumniPlaced.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-600 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-extrabold text-white">{activeData.alumniPlaced.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Placed at <strong className="text-white font-bold">{activeData.alumniPlaced.company}</strong> <span className="text-slate-300">({activeData.alumniPlaced.pkg})</span>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shrink-0">
                  Verified Alum
                </span>
              </div>

            </div>

            {/* Action CTA Bar */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/domains"
                className="w-full sm:flex-1 text-center py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Enroll in This Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-extrabold text-xs text-center shadow-md transition-all"
              >
                View Job Guarantee
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
