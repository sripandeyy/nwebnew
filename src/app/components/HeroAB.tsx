'use client';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroAB() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Counter Animation Logic
    const animateCounter = (
      element: HTMLElement,
      start: number,
      end: number,
      suffix: string,
      duration: number
    ) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Animate Each Counter
    const counters = [
      { selector: ".count-educators", start: 0, end: 100, suffix: "+" },
      { selector: ".count-downloads", start: 0, end: 10000, suffix: "+" },
      { selector: ".count-alumni", start: 0, end: 11000, suffix: "+" },
      { selector: ".count-placements", start: 0, end: 92, suffix: "%" },
    ];

    counters.forEach(({ selector, start, end, suffix }) => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        animateCounter(element, start, end, suffix, 2000); 
      }
    });
  }, []);

  return (
    <section className="relative py-14 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-y border-slate-100 dark:border-slate-800">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-slate-900 dark:text-white text-3xl font-extrabold sm:text-4xl tracking-tight" data-aos="fade-up">
            Our Students are Always Happy
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400" data-aos="fade-up" data-aos-delay="100">
            Student satisfaction is our top priority. We are proud to maintain a 98% learner satisfaction rate.
          </p>
        </div>

        <div className="mt-12">
          <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x lg:divide-slate-200 dark:lg:divide-slate-800">
            <li className="text-center px-12 md:px-16" data-aos="zoom-in" data-aos-delay="100">
              <h4 className="text-4xl font-extrabold text-slate-900 dark:text-white count-educators">0</h4>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">Expert Educators</p>
            </li>

            <li className="text-center px-12 md:px-16" data-aos="zoom-in" data-aos-delay="200">
              <h4 className="text-4xl font-extrabold text-slate-900 dark:text-white count-downloads">0</h4>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">Resource Downloads</p>
            </li>

            <li className="text-center px-12 md:px-16" data-aos="zoom-in" data-aos-delay="300">
              <h4 className="text-4xl font-extrabold text-slate-900 dark:text-white count-alumni">0</h4>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">Trained Alumni</p>
            </li>

            <li className="text-center px-12 md:px-16" data-aos="zoom-in" data-aos-delay="400">
              <h4 className="text-4xl font-extrabold text-slate-900 dark:text-white count-placements">0</h4>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">Placement Record</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
