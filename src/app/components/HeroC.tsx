'use client';

import React from 'react';
import { 
  GitPullRequest, 
  Video, 
  CalendarCheck, 
  ShieldCheck, 
  Users2,
  FileCode2
} from 'lucide-react';

const HeroC = () => {
  const highlights = [
    {
      icon: FileCode2,
      title: "Production GitHub Capstones",
      desc: "Push code to real Git repositories with CI/CD pipelines, Docker containerization, and cloud deployments.",
      tag: "Real Portfolios",
    },
    {
      icon: GitPullRequest,
      title: "Line-by-Line Code Reviews",
      desc: "Senior tech leads review your pull requests, providing architectural insights and enterprise best practices.",
      tag: "1:1 Code Audits",
    },
    {
      icon: Video,
      title: "Live Interactive Masterclasses",
      desc: "Real-time weekend masterclasses & doubt clinics. Never get stuck watching outdated pre-recorded videos.",
      tag: "Zero Recorded Filler",
    },
    {
      icon: CalendarCheck,
      title: "Mock Interview Drills (DSA + System Design)",
      desc: "Rigorous technical mock interviews modeled directly after Amazon, Cisco, and Deloitte hiring bars.",
      tag: "Hiring Bar Prep",
    },
    {
      icon: Users2,
      title: "Private Alumni Discord & Network",
      desc: "Direct access to 15,000+ alumni, hiring manager AMAs, internal hackathons, and job referral boards.",
      tag: "15,000+ Community",
    },
    {
      icon: ShieldCheck,
      title: "100% Placement Support Guarantee",
      desc: "Dedicated placement cell, resume ATS score tuning, portfolio reviews, and guaranteed interview shortlists.",
      tag: "Guaranteed Placement",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-slate-100/40 via-transparent to-transparent relative overflow-hidden">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>The Nyeras Engineering Pedagogy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How We Get You Hired at Top MNCs
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            No fluff or generic slide decks. A structured, rigorous engineering workflow built around live feedback and real software delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col justify-between p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-400 dark:hover:border-slate-600 hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HeroC;
