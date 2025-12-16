'use client';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroAB() {
  useEffect(() => {
    AOS.init({ duration: 1000 });

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
      const element = document.querySelector(selector) as HTMLElement; // Cast to HTMLElement
      if (element) {
        animateCounter(element, start, end, suffix, 2000); 
      }
    });
  }, []);

  return (
    <>
      <section className="relative py-10 bg-white/40">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl" data-aos="fade-up">
              Our Students are always happy
            </h3>
            <p className="mt-3" data-aos="fade-up" data-aos-delay="200">
              Student satisfaction is our top priority. We are proud to have a 98% satisfaction rate.
            </p>
          </div>

          <div className="mt-12">
            <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
              <li className="text-center px-12 md:px-16" data-aos="zoom-in" data-aos-delay="100">
                <h4 className="text-4xl text-[#6600cc] font-semibold count-educators">0</h4>
                <p className="mt-3 font-medium">Educators</p>
              </li>

              <li className="text-center px-12 md:px-16" data-aos="zoom-in" data-aos-delay="200">
                <h4 className="text-4xl text-[#6600cc] font-semibold count-downloads">0</h4>
                <p className="mt-3 font-medium">Downloads</p>
              </li>

              <li className="text-center px-12 md:px-16" data-aos="zoom-in" data-aos-delay="300">
                <h4 className="text-4xl text-[#6600cc] font-semibold count-alumni">0</h4>
                <p className="mt-3 font-medium">Alumni</p>
              </li>

              <li className="text-center px-12 md:px-16" data-aos="zoom-in" data-aos-delay="400">
                <h4 className="text-4xl text-[#6600cc] font-semibold count-placements">0</h4>
                <p className="mt-3 font-medium">Placements</p>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
          }}
        ></div>
      </section>
    </>
  );
}
