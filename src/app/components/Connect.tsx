'use client';
import { useState } from 'react';
import React from 'react';
import CallbackForm from '../components/CallBackform';

const Connect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="w-full bg-slate-50/70 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white text-center md:text-left tracking-tight">
                Connect with an Academic Counsellor
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
                Get personalized guidance on career roadmaps, syllabus details, and certifications.
              </p>
            </div>

            <button
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-sm whitespace-nowrap shadow-md border border-slate-700/50 hover-lift transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              Request A Call
            </button>
          </div>
        </div>
      </section>
      {isModalOpen && <CallbackForm onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Connect;
