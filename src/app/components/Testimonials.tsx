'use client'

import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsGrid() {
  const testimonials = [
    {
      name: "Aditya Varma",
      company: "Microsoft",
      role: "Software Engineer",
      initials: "AV",
      border: "border-slate-200 dark:border-slate-800 hover:border-slate-400",
      companyTag: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
      quote: "Nyeras’s curriculum in AI and data science empowered me to excel in my technical rounds and solve complex real-world engineering problems effectively."
    },
    {
      name: "Priya Nair",
      company: "Product Studio",
      role: "UI/UX Designer",
      initials: "PN",
      border: "border-slate-200 dark:border-slate-800 hover:border-slate-400",
      companyTag: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
      quote: "The hands-on project approach at Nyeras helped me master modern product design principles and build a portfolio that got me hired."
    },
    {
      name: "Rohith Kumar",
      company: "Deloitte",
      role: "Cloud Engineer",
      initials: "RK",
      border: "border-slate-200 dark:border-slate-800 hover:border-slate-400",
      companyTag: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
      quote: "Thanks to Nyeras’s hands-on AWS and Cloud certifications, I secured an offer at Deloitte and gained immense confidence in live systems."
    },
    {
      name: "Harsha Vardhan Reddy",
      company: "Cisco",
      role: "Technical Consulting Engineer",
      initials: "HR",
      border: "border-slate-200 dark:border-slate-800 hover:border-slate-400",
      companyTag: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
      quote: "Training in Cyber Security at Nyeras gave me practical exposure to enterprise networking protocols and incident management."
    },
    {
      name: "Arjun Kumar",
      company: "PayPal",
      role: "Software Developer",
      initials: "AK",
      border: "border-slate-200 dark:border-slate-800 hover:border-slate-400",
      companyTag: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
      quote: "The mock interview series and mentor feedback at Nyeras prepared me directly for competitive DSA and system design assessments."
    },
    {
      name: "S Sneha",
      company: "Accenture",
      role: "Development Analyst",
      initials: "SS",
      border: "border-slate-200 dark:border-slate-800 hover:border-slate-400",
      companyTag: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
      quote: "The personalized career counseling, resume optimization, and hands-on analytics training made a massive difference in my placements."
    }
  ];

  return (
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 mb-4 backdrop-blur-md">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">4.9 / 5 Rating</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Hear From Our Alumni
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Real stories from students who transformed their careers and landed dream roles.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col justify-between p-7 rounded-3xl bg-white/55 dark:bg-slate-900/55 backdrop-blur-2xl skeuo-card hover:-translate-y-2 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-950 text-white font-black flex items-center justify-center text-sm shadow-md">
                      {item.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-950 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-800 dark:text-slate-300 font-bold">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border border-white/90 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 shadow-xs ${item.companyTag}`}>
                    {item.company}
                  </span>
                </div>

                <div className="relative mt-2">
                  <Quote className="w-6 h-6 text-slate-400 dark:text-slate-700 absolute -top-1 -left-1 -z-10" />
                  <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-200 leading-relaxed italic font-bold">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
