"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Handshake, ExternalLink } from "lucide-react";
import { MouPartner, mouStore } from "../utils/mouStore";
import { mergeCollection } from "../utils/siteContent";

export const DEFAULT_MOUS: MouPartner[] = [
  {
    name: "Ashoka Autonomous College",
    image: "/MOU's/ashoka-automonus-logo.jpg",
    url: "https://www.ashokacollege.in/",
  },
  {
    name: "Sri Sai Degree / P.G. College",
    image: "/MOU's/sri sai college.png",
    url: "https://srisaicollege.com/",
  },
  {
    name: "Sri Venkateswara University",
    image: "/MOU's/sv college.jpeg",
    url: "https://svuniversity.edu.in/",
  },
  {
    name: "Enlight Degree College",
    image: "/MOU's/enlight college.png",
    url: "https://enlightcollege.com/",
  },
  {
    name: "S.S.G.S. Degree College",
    image:
      "/MOU's/sri-sankarananda-giri-swamy-degree-college-koya-nagar-guntakal-colleges-pqebpz8jw4.avif",
    url: "http://ssgsdegreecollege.com/",
  },
  {
    name: "SSBN College",
    image: "/MOU's/ssbn.gif",
    url: "https://www.ssbnc.in/",
  },
  {
    name: "Acharya Nagarjuna University",
    image: "/MOU's/AN college.png",
    url: "https://www.acharyanagarjunauniversity.in/",
  },
  {
    name: "CT College",
    image: "/MOU's/ct college.jpeg",
    url: "https://www.ctgroup.in/",
  },
  {
    name: "Mind Power University",
    image: "/MOU's/mp college.png",
    url: "https://mindpoweruniversity.ac.in/",
  },
];

export default function MOUsSection() {
  const [mous, setMous] = useState<MouPartner[]>(DEFAULT_MOUS);

  useEffect(() => {
    const refresh = () => setMous(mergeCollection(DEFAULT_MOUS, mouStore.read(), (m) => m.name));
    refresh();
    window.addEventListener(mouStore.event, refresh);
    return () => window.removeEventListener(mouStore.event, refresh);
  }, []);

  if (mous.length === 0) return null;

  return (
    <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-slate-100/30 via-transparent to-transparent overflow-hidden relative">
      <div className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-3 backdrop-blur-md">
            <Handshake className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Academic Alliances</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional MoUs & University Partnerships
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
            Collaborating with leading universities and autonomous colleges to power student career readiness. Click any institution to visit their official website.
          </p>
        </div>

        {/* Marquee Carousel Container */}
        <div className="relative w-full overflow-hidden">
          <div className="marquee-track flex items-stretch gap-6 py-4">
            {[...mous, ...mous].map((mou, idx) => (
              <a
                key={`${mou.name}-${idx}`}
                href={mou.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${mou.name} Official Website`}
                className="flex-none w-64 sm:w-72 p-6 rounded-3xl bg-white dark:bg-slate-900 glossy-black-card border border-slate-200/80 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-between text-center group cursor-pointer relative"
              >
                {/* External link indicator */}
                <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs">
                  <ExternalLink className="w-3 h-3" />
                </div>

                <div className="relative h-28 w-full flex items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <Image
                    src={mou.image}
                    alt={`${mou.name} logo`}
                    width={180}
                    height={90}
                    className="object-contain max-h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 w-full flex flex-col items-center">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {mou.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <span>Signed MoU Partner</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Gradient Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 dark:from-[#070913] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 dark:from-[#070913] to-transparent z-20" />
        </div>

      </div>

      <style jsx>{`
        .marquee-track {
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
