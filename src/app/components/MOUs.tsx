"use client";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const mous = [
  {
    name: "ASHOKA AUTONOMOUS COLLEGE",
    image: "/MOU's/ashoka-automonus-logo.jpg",
  },
  {
    name: "SRI SAI DEGREE / P.G. COLLEGE",
    image: "/MOU's/sri sai college.png",
  },
  {
    name: "SRI VENKATESWARA UNIVERSITY",
    image: "/MOU's/sv college.jpeg",
  },
  {
    name: "ENLIGHT DEGREE COLLEGE",
    image: "/MOU's/enlight college.png",
  },
  {
    name: "S.S.G.S. DEGREE COLLEGE",
    image:
      "/MOU's/sri-sankarananda-giri-swamy-degree-college-koya-nagar-guntakal-colleges-pqebpz8jw4.avif",
  },
  {
    name: "SSBN JUNIOR COLLEGE",
    image: "/MOU's/ssbn.gif",
  },
  {
    name: "ACHARYA NAGARJUNA UNIVERSITY",
    image: "/MOU's/AN college.png",
  },
  {
    name: "CT COLLEGE",
    image: "/MOU's/ct college.jpeg",
  },
  {
    name: "MIND POWER UNIVERSITY",
    image: "/MOU's/mp college.png",
  },
];

export default function MOUsSection() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <section className="w-full py-16 bg-white/40 relative">
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Signed MOU's With
          </h2>
        </div>

        <div className="relative">
          <div className="group marquee overflow-hidden">
            <div className="marquee-track flex items-stretch gap-6 px-1 py-2">
              {[...mous, ...mous].map((mou, idx) => (
                <div
                  key={`${mou.name}-${idx}`}
                  data-card
                  className="group relative flex-none w-72 md:w-80 bg-white border border-[#e6d7ff] rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                  data-aos="fade-up"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={mou.image}
                      alt={`${mou.name} logo`}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 320px"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base md:text-lg font-semibold text-[#4b0082] text-center">{mou.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* edge fade mask for modern look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}
      ></div>
      <style jsx>{`
        @keyframes mscroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          width: max-content;
          animation: mscroll 28s linear infinite;
        }
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (min-width: 768px) {
          .marquee-track { animation-duration: 36s; }
        }
      `}</style>
    </section>
  );
}
