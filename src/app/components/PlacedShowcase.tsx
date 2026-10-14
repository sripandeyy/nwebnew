"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Award, Linkedin, ExternalLink, CheckCircle2, Users } from 'lucide-react'

const PlacedShowcase = () => {
  const profiles = useMemo(
    () => [
      {
        name: 'S Sneha',
        title: 'Development Analyst',
        company: 'Accenture',
        package: '₹9.5 LPA',
        hike: '+160% Hike',
        domain: 'Data Analytics & AI',
        image: '/sneha s.jpeg',
        paragraphs: [
          `My learning journey in Data Science and Data Analytics at Nyeras gave me practical exposure to enterprise analytics workflows, real SQL querying on production datasets, and predictive modeling.`,
          `The 1:1 mentor mock interviews and resume optimization directly prepared me for Accenture's technical interview panels. Proud to be working as a Development Analyst at Accenture today!`,
        ],
        status: 'Placed at Accenture',
        linkedin: 'https://www.linkedin.com/in/s-sneha-58a539213',
      },
      {
        name: 'Malothu Balram',
        title: 'Analytics Engineer',
        company: 'DAZN',
        package: '₹14.0 LPA',
        hike: '+180% Hike',
        domain: 'Data Science & Big Data',
        image: '/12.jpg',
        paragraphs: [
          `I completed the comprehensive Data Analytics and Data Science cohort at Nyeras. Working on live BigQuery and ETL data pipeline capstones gave me the confidence needed for international product companies.`,
          `The structured hands-on modules and continuous mentor syncs were crucial in landing my dream role as an Analytics Engineer at DAZN.`,
        ],
        status: 'Placed at DAZN',
        linkedin: 'https://www.linkedin.com/in/malothu-balram-39211519b',
      },
      {
        name: 'Marglin J',
        title: 'Security Operations Analyst',
        company: 'Microsoft',
        package: '₹18.0 LPA',
        hike: '+220% Hike',
        domain: 'Cyber Security & Threat Intel',
        image: '/marglin.jpg',
        paragraphs: [
          `The hands-on threat hunting, penetration testing labs, and enterprise SIEM analysis at Nyeras provided industry-standard exposure that set me apart.`,
          `The mentors' relentless focus on real incident response scenarios gave me the competitive edge to join Microsoft's security division.`,
        ],
        status: 'Placed at Microsoft',
        linkedin: 'https://www.linkedin.com/in/marglin-j-73892019b',
      },
      {
        name: 'Ganesh Sai Katta',
        title: 'Software Engineer',
        company: 'Impetus Technologies',
        package: '₹12.0 LPA',
        hike: '+150% Hike',
        domain: 'Full Stack Engineering',
        image: '/ganesh nyeras.jpeg',
        paragraphs: [
          `My transition into production software engineering started with Nyeras. The live coding reviews, system architecture design patterns, and DSA mock interview drills set me apart during recruitment.`,
          `Today I build distributed applications at Impetus Technologies. Huge gratitude to the mentors who guided me through every roadblock.`,
        ],
        status: 'Placed at Impetus',
        linkedin: 'https://www.linkedin.com/in/ganesh-sai-katta-824097189',
      },
      {
        name: 'Rithika Srikanth',
        title: 'Data Analyst & BI Specialist',
        company: 'Deloitte',
        package: '₹13.5 LPA',
        hike: '+170% Hike',
        domain: 'Data Science & Analytics',
        image: '/rithika.jpg',
        paragraphs: [
          `The deep-dive into enterprise machine learning and cloud data pipelines at Nyeras transformed my analytical problem-solving skills. The live capstone projects matched real client deliverables.`,
          `With thorough mock behavioral drills and technical guidance from senior mentors, I secured my Data Engineering role at Deloitte.`,
        ],
        status: 'Placed at Deloitte',
        linkedin: 'https://www.linkedin.com/in/rithika-srikanth-82193b211',
      },
      {
        name: 'Harsha Vardhan Reddy',
        title: 'Technical Consulting Engineer',
        company: 'Cisco Systems',
        package: '₹16.5 LPA',
        hike: '+200% Hike',
        domain: 'Cyber Security & Networking',
        image: '/harsha.jpeg',
        paragraphs: [
          `The Cyber Security and Network Infrastructure training at Nyeras was pure practical immersion. We worked with real packet inspection, threat modeling, and enterprise firewalls.`,
          `That real-world engineering exposure gave me a massive edge to clear Cisco's rigorous technical rounds. Now working as a Technical Consulting Engineer at Cisco!`,
        ],
        status: 'Placed at Cisco',
        linkedin: 'https://www.linkedin.com/in/harsha-vardhan-reddy-kovvuru-763a7623a',
      },
      {
        name: 'Karthiban M',
        title: 'Cloud Solutions Engineer',
        company: 'Cognizant',
        package: '₹15.2 LPA',
        hike: '+190% Hike',
        domain: 'Cloud & Infrastructure',
        image: '/karthiban.jpg',
        paragraphs: [
          `Nyeras gave me deep practical expertise in multi-cloud architecture, container orchestration, and automated infrastructure deployments using Terraform.`,
          `The 1:1 resume vetting and industry mentorship helped me confidently crack multi-round interviews at Cognizant.`,
        ],
        status: 'Placed at Cognizant',
        linkedin: 'https://www.linkedin.com/in/karthiban-m-29104820a',
      },
      {
        name: 'Harsha Vardhan Kesanapalli',
        title: 'DevOps Engineer',
        company: 'DXC Technology',
        package: '₹11.2 LPA',
        hike: '+140% Hike',
        domain: 'DevOps & AWS Cloud',
        image: '/harsha new nyeras.jpeg',
        paragraphs: [
          `The DevOps track gave me real hands-on mastery over Kubernetes clusters, Terraform infrastructure-as-code, and production CI/CD deployment pipelines.`,
          `I transitioned directly into a DevOps Engineer role at DXC Technology thanks to Nyeras's dedicated referral network and placement support.`,
        ],
        status: 'Placed at DXC Technology',
        linkedin: 'https://www.linkedin.com/in/khvs',
      },
      {
        name: 'PhaniBhushan Rao Kallamari',
        title: 'SAP BW Consultant',
        company: 'LTI Mindtree',
        package: '₹10.5 LPA',
        hike: '+130% Hike',
        domain: 'Enterprise SAP Architecture',
        image: '/phanibhu.jpeg',
        paragraphs: [
          `I completed the SAP enterprise curriculum at Nyeras. The hands-on project workflows and guided business scenario modeling gave me genuine corporate readiness.`,
          `I'm delighted to be consulting as a SAP BW Consultant at LTI Mindtree. Thank you Nyeras for the unwavering career mentorship!`,
        ],
        status: 'Placed at LTI Mindtree',
        linkedin: 'https://www.linkedin.com/in/phanibhushan-rao-kallamari-054ab623a',
      },
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [dir, setDir] = useState<1 | -1>(1)
  const [isPaused, setIsPaused] = useState(false)
  const active = profiles[index]

  const animateTo = (nextIndex: number, direction: 1 | -1) => {
    setDir(direction)
    setIsFading(true)
    window.setTimeout(() => {
      setIndex(nextIndex)
      setIsFading(false)
    }, 480)
  }

  const prev = () => animateTo((index - 1 + profiles.length) % profiles.length, -1)
  const next = () => animateTo((index + 1) % profiles.length, 1)

  // Keyboard Navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  // Dynamic Auto-Advance
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [index, isPaused])

  return (
    <section 
      className="relative py-16 sm:py-24 bg-gradient-to-b from-transparent via-slate-100/20 to-transparent overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-3 shadow-sm backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Real Career Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Students Who Transformed Their Careers
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
            Verified alumni placed at top multinational organizations worldwide.
          </p>
        </div>

        {/* 3/4 + 1/4 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Poster Showcase Card (3/4 -> 9 Cols) */}
          <div className="lg:col-span-9 relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 lg:p-9 skeuo-card">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Profile Image & Status (5 cols inside 9 cols) */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className={`relative transition-all duration-500 ease-out ${isFading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/90 dark:ring-slate-700 bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={active.image} 
                      alt={active.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Verified Badge */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-lg backdrop-blur-sm">
                      <Award className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                {/* Company Tag Below Image */}
                <div className="mt-3.5 text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-slate-950 text-white dark:bg-slate-800 dark:text-slate-100 text-xs font-black tracking-wide shadow-sm">
                    {active.status}
                  </span>
                </div>
              </div>

              {/* Story & Quote (7 cols inside 9 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between h-full">
                <div className={`transition-all duration-500 ease-out ${isFading ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-400/40">
                      Offer: {active.package}
                    </span>
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-950 text-white dark:bg-slate-800 dark:text-slate-200">
                      {active.hike}
                    </span>
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-950 border border-slate-200 dark:bg-white/10 dark:text-slate-200 dark:border-white/10">
                      {active.domain}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                    {active.name}
                  </h3>
                  <p className="text-slate-900 dark:text-slate-300 text-sm sm:text-base font-black mb-3">
                    {active.title} • {active.company}
                  </p>

                  <div className="space-y-2.5 text-slate-900 dark:text-slate-200 text-xs sm:text-sm leading-relaxed mb-5 font-bold">
                    {active.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs text-slate-950 dark:text-slate-400 font-black">
                      Alumni {index + 1} of {profiles.length}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={prev}
                        aria-label="Previous profile"
                        className="p-2.5 rounded-full skeuo-btn-primary text-white shadow-md cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next profile"
                        className="p-2.5 rounded-full skeuo-btn-primary text-white shadow-md cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Dedicated LinkedIn Connect Card (1/4 -> 3 Cols) */}
          <div className="lg:col-span-3 relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 skeuo-card">
            
            {/* Top LinkedIn Branding */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white shrink-0 font-bold text-sm shadow-md">
                    <Linkedin className="w-4 h-4 fill-current text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-wider">LinkedIn Verified</h4>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                      Direct Redirect
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Spotlight Card */}
              <div className="mt-5 p-4 rounded-2xl bg-white/75 dark:bg-slate-800/80 border border-white/90 dark:border-slate-700/80 shadow-xs backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <img
                    src={active.image}
                    alt={active.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#0A66C2] shadow-md shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <h5 className="text-sm font-black text-slate-950 dark:text-white truncate">{active.name}</h5>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-300 font-bold truncate">{active.title}</p>
                    <p className="text-[11px] font-black text-emerald-700 dark:text-emerald-400 mt-0.5">{active.company}</p>
                  </div>
                </div>
              </div>

              {/* Verified Connect Description */}
              <p className="text-xs text-slate-900 dark:text-slate-300 font-bold leading-relaxed mt-4">
                Verify this placement or connect directly with <strong className="text-slate-950 dark:text-white font-black">{active.name}</strong> to learn about their interview prep and technical rounds.
              </p>
            </div>

            {/* LinkedIn Redirect CTA Button */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <a
                href={active.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl skeuo-btn-accent text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 group transition-transform active:scale-95 shadow-md"
              >
                <Linkedin className="w-4 h-4 fill-current text-white" />
                <span>View LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/company/nyeras-edutech-innovations/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-white/80 hover:bg-white dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-950 dark:text-slate-200 text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Users className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>Explore Nyeras Community</span>
              </a>
            </div>

          </div>

        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {profiles.map((_, i) => (
            <button
              key={i}
              onClick={() => animateTo(i, i > index ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === i 
                  ? 'w-8 bg-slate-800 dark:bg-slate-200 shadow-md' 
                  : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default PlacedShowcase
