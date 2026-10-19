'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Award, 
  Users, 
  Building2, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  Briefcase, 
  ChevronRight,
  Flame,
  ExternalLink,
  GraduationCap
} from 'lucide-react';


const ROTATING_WORDS = ['Bridge', 'Gateway', 'Pathway', 'Foundation', 'Launchpad', 'Key'];

function Cube3DTextTransition() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentWord = ROTATING_WORDS[index];

  return (
    <span
      className="relative flex items-center justify-start h-full w-full text-left overflow-hidden"
      style={{ perspective: '800px' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`hero-word-${currentWord}`}
          initial={{ rotateX: -80, y: 22, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: 80, y: -22, opacity: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: 'inline-block',
            transformOrigin: '0% 50% -18px',
            transformStyle: 'preserve-3d',
          }}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent font-black tracking-tight text-left"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const TRACKS = {
  fullstack: {
    title: "Full Stack Web Engineering",
    badge: "Placement Assistance Track",
    salary: "₹6.5 - ₹18 LPA",
    duration: "16 Weeks • Hybrid/Live",
    skills: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    hiring: ["Microsoft", "PayPal", "Impetus", "Accenture"],
    recentOffers: [
      { name: "Ganesh Sai", role: "Software Engineer", company: "Impetus", pkg: "₹12.0 LPA", img: "/ganesh nyeras.jpeg" },
      { name: "PhaniBhushan Rao", role: "SAP BW Consultant", company: "LTI Mindtree", pkg: "₹10.5 LPA", img: "/phanibhu.jpeg" },
      { name: "Rohit Verma", role: "Frontend Architect", company: "PayPal", pkg: "₹14.5 LPA", img: "/s1.png" },
    ]
  },
  datascience: {
    title: "Data Science & Generative AI",
    badge: "100% Job Guarantee Track",
    salary: "₹8.0 - ₹24 LPA",
    duration: "20 Weeks • Live Project Labs",
    skills: ["Python", "PyTorch", "LangChain", "BigQuery", "SQL", "Tableau"],
    hiring: ["Accenture", "DAZN", "Deloitte", "LTI Mindtree"],
    recentOffers: [
      { name: "S Sneha", role: "Development Analyst", company: "Accenture", pkg: "₹9.5 LPA", img: "/sneha s.jpeg" },
      { name: "Malothu Balram", role: "Analytics Engineer", company: "DAZN", pkg: "₹14.0 LPA", img: "/12.jpg" },
      { name: "Rithika Srikanth", role: "Data Analyst & BI", company: "Deloitte", pkg: "₹13.5 LPA", img: "/rithika.jpg" },
    ]
  },
  devops: {
    title: "Cloud & DevOps Architecture",
    badge: "Placement Assistance Track",
    salary: "₹7.5 - ₹22 LPA",
    duration: "16 Weeks • Enterprise Labs",
    skills: ["AWS Cloud", "Kubernetes", "Terraform", "CI/CD", "Linux", "Docker"],
    hiring: ["Cisco", "DXC Tech", "Cognizant", "Microsoft"],
    recentOffers: [
      { name: "Harsha Kesanapalli", role: "DevOps Engineer", company: "DXC Tech", pkg: "₹11.2 LPA", img: "/harsha new nyeras.jpeg" },
      { name: "Harsha Vardhan Reddy", role: "Consulting Engineer", company: "Cisco", pkg: "₹16.5 LPA", img: "/harsha.jpeg" },
      { name: "Karthiban M", role: "Cloud Solutions Architect", company: "Cognizant", pkg: "₹15.2 LPA", img: "/karthiban.jpg" },
      { name: "Marglin J", role: "Security Analyst", company: "Microsoft", pkg: "₹18.0 LPA", img: "/marglin.jpg" },
    ]
  }
};

const TRACK_KEYS: ('fullstack' | 'datascience' | 'devops')[] = ['fullstack', 'datascience', 'devops'];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'fullstack' | 'datascience' | 'devops'>('fullstack');
  const [offerIndex, setOfferIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isOfferFading, setIsOfferFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tracks = TRACKS;
  const trackKeys = TRACK_KEYS;

  const changeTab = (tab: 'fullstack' | 'datascience' | 'devops') => {
    if (tab === activeTab) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setOfferIndex(0);
      setIsFading(false);
    }, 280);
  };

  // Dynamic automatic transition to next track
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveTab((prev) => {
          const currentIndex = TRACK_KEYS.indexOf(prev);
          const nextIndex = (currentIndex + 1) % TRACK_KEYS.length;
          return TRACK_KEYS[nextIndex];
        });
        setOfferIndex(0);
        setIsFading(false);
      }, 280);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Dynamic automatic cycling of placed students within the current track
  useEffect(() => {
    if (isPaused) return;

    const currentOffers = TRACKS[activeTab].recentOffers;
    if (currentOffers.length <= 1) return;

    const offerTimer = setInterval(() => {
      setIsOfferFading(true);
      setTimeout(() => {
        setOfferIndex((prev) => (prev + 1) % currentOffers.length);
        setIsOfferFading(false);
      }, 200);
    }, 2200);

    return () => clearInterval(offerTimer);
  }, [isPaused, activeTab]);

  const current = tracks[activeTab];
  const activeOffer = current.recentOffers[offerIndex % current.recentOffers.length];

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] lg:w-[1100px] h-[500px] bg-gradient-to-tr from-slate-500/10 via-slate-400/10 to-slate-500/10 dark:from-slate-700/10 dark:via-slate-600/10 dark:to-slate-700/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-15 pointer-events-none -z-10" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* 2-Column Balanced Split Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-6 text-left">
            {/* Headline Box with 3D Flip Text */}
            <div className="mb-6 flex flex-col justify-start text-left">
              <h1 className="text-[32px] sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.16] sm:leading-[1.12] text-left">
                <span className="block text-slate-900 dark:text-white text-left">
                  Education is the
                </span>

                {/* 3D Cube Face Flip Component */}
                <span className="block h-[1.3em] my-0.5 sm:my-1 overflow-hidden text-left">
                  <Cube3DTextTransition />
                </span>

                <span className="block text-slate-900 dark:text-white text-left">
                  to your future.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-0 mb-8 font-normal text-left">
              Master industry tech stacks with live senior practitioners, build production-grade capstone projects, earn verified government-backed credentials, and crack tier-1 MNC placements with 1:1 mentorship.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 mb-5">
              <Link
                href="/domains"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl skeuo-btn-primary text-white font-extrabold text-base tracking-wide"
              >
                <span>Explore All 12+ Cohorts</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/plans"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl skeuo-btn-secondary text-slate-800 dark:text-slate-100 font-extrabold text-base"
              >
                <Briefcase className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>Job Guarantee Plans</span>
              </Link>
            </div>

            {/* Direct Portal Quick Links (Large 3D Skeuomorphic Buttons) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 mb-10">
              <a
                href="https://lms.nyeras.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-2xl skeuo-btn-secondary text-slate-900 dark:text-slate-100 font-extrabold text-sm sm:text-base tracking-normal shadow-lg"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center shadow-inner shrink-0">
                  <GraduationCap className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                </div>
                <span>Visit LMS Portal</span>
                <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-400 ml-0.5" />
              </a>

              <a
                href="https://nxtmove.nyeras.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-2xl skeuo-btn-accent text-white font-extrabold text-sm sm:text-base tracking-normal shadow-lg"
              >
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-inner shrink-0 p-1">
                  <Image src="/nxtmove-icon.png" alt="NxtMove" width={24} height={24} className="w-full h-full object-contain" />
                </div>
                <span>Visit NxtMove</span>
                <ExternalLink className="w-4 h-4 text-white/80 ml-0.5" />
              </a>
            </div>

            {/* Social Proof Bar with Real Student Avatars */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
              <div className="flex items-center -space-x-3">
                {["/s1.png", "/s2.png", "/s3.png"].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Alumni"
                    className="w-11 h-11 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-md"
                  />
                ))}
                <div className="w-11 h-11 rounded-full bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
                  15K+
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white ml-1.5">4.9 / 5</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Rated by 15,000+ engineers placed at <strong className="text-slate-700 dark:text-slate-200">Microsoft, Cisco, Deloitte, TCS</strong>
                </p>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Interactive Product & Career Roadmap Preview Card */}
          <div 
            className="lg:col-span-6 xl:col-span-6 relative w-full flex justify-center lg:justify-end"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            <div className="relative w-full max-w-2xl lg:max-w-none rounded-3xl bg-white dark:bg-slate-900 p-7 sm:p-9 lg:p-10 xl:p-11 shadow-2xl backdrop-blur-xl transition-all duration-300 border border-slate-200/90 dark:border-slate-800/90">
              
              {/* Card Header & Track Switcher Tabs */}
              <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-slate-150 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-xs" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-xs" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs" />
                  <span className="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-400 ml-2">Nyeras Career Studio</span>
                </div>
                <span className="text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full skeuo-badge text-slate-900 dark:text-slate-100 shadow-xs">
                  {current.badge}
                </span>
              </div>

              {/* Domain Selector Track & Tactile Tabs */}
              <div className="grid grid-cols-3 gap-2 p-2 skeuo-track rounded-2xl my-5 sm:my-6 text-xs sm:text-sm font-extrabold">
                <button
                  type="button"
                  onClick={() => changeTab('fullstack')}
                  className={`py-3 px-2 rounded-xl transition-all text-center ${
                    activeTab === 'fullstack'
                      ? 'skeuo-tab-active text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Full Stack
                </button>
                <button
                  type="button"
                  onClick={() => changeTab('datascience')}
                  className={`py-3 px-2 rounded-xl transition-all text-center ${
                    activeTab === 'datascience'
                      ? 'skeuo-tab-active text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  AI & Data
                </button>
                <button
                  type="button"
                  onClick={() => changeTab('devops')}
                  className={`py-3 px-2 rounded-xl transition-all text-center ${
                    activeTab === 'devops'
                      ? 'skeuo-tab-active text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  DevOps
                </button>
              </div>

              {/* Active Track Overview with smooth animation */}
              <div className={`space-y-5 sm:space-y-6 transition-all duration-300 ease-out ${isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {current.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Avg. CTC: {current.salary}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{current.duration}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Live Project Labs</span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">Curriculum Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {current.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl skeuo-badge text-slate-950 dark:text-slate-100 text-xs sm:text-sm font-extrabold shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Real Placed Student Live Notification Card with Dynamic Cycling */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-xs transition-transform duration-300 hover:scale-[1.01]">
                  <div className={`flex items-center gap-3.5 transition-all duration-300 ${isOfferFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <img
                      src={activeOffer.img}
                      alt={activeOffer.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-white dark:border-slate-700 shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">{activeOffer.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Placed at <strong className="text-slate-800 dark:text-slate-200">{activeOffer.company}</strong> ({activeOffer.pkg})
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500 text-white shadow-xs shrink-0">
                    Verified
                  </span>
                </div>

                {/* Action Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Link
                    href="/domains"
                    className="flex-1 text-center py-3.5 sm:py-4 px-6 rounded-2xl skeuo-btn-primary text-white font-extrabold text-sm sm:text-base shadow-md flex items-center justify-center gap-2"
                  >
                    <span>View Full Syllabus</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/certverify"
                    className="py-3.5 sm:py-4 px-6 rounded-2xl skeuo-btn-secondary text-slate-950 dark:text-white font-extrabold text-xs sm:text-sm text-center"
                  >
                    Verify Certificate
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4 Bottom High-Impact Metrics */}
        <div id="hero-stats-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20">
          
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                15,000+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Graduates Upskilled</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                92%
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Placement Success</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                100+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Hiring Partner MNCs</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                AICTE & ISO
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Certified Curriculum</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
