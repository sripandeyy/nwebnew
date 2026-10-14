'use client';
import React, { useEffect } from 'react';
import { Clock, Briefcase, GraduationCap } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroBC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    {
      icon: <Clock className="w-5 h-5 text-slate-200" />,
      title: "Learn at Your Own Pace",
      desc: "Access courses anytime, anywhere, and tailor your learning journey to fit your schedule."
    },
    {
      icon: <Briefcase className="w-5 h-5 text-slate-200" />,
      title: "Industry-Ready Skills",
      desc: "Gain hands-on experience with real-world projects designed by industry experts."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-slate-200" />,
      title: "Expert Instructors",
      desc: "Learn from seasoned professionals and mentors who guide you every step of the way."
    }
  ];

  return (
    <section className="relative py-16 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 justify-between gap-16 lg:flex md:px-8">
        <div className="max-w-xl" data-aos="fade-right">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-200 dark:border-slate-700">
            Excellence in Learning
          </span>
          <h3 className="text-slate-900 dark:text-white text-3xl font-extrabold sm:text-4xl tracking-tight">Bring Out the Best in You</h3>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            Talent is not enough. You need to be equipped with the right skills to succeed in your career. Our courses are designed to help you grow professionally and personally.
          </p>
        </div>
        <div className="mt-12 lg:mt-0" data-aos="fade-up">
          <ul className="grid gap-6 sm:grid-cols-2">
            {features.map((item, idx) => (
              <li key={idx} className="flex gap-x-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover-lift transition-all">
                <div className="flex-none w-11 h-11 bg-slate-900 dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroBC;
