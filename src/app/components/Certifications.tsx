'use client';
import Image from "next/image"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const certifications = [
  {
    name: "AICTE",
    fullName: "All India Council for Technical Education",
    description: "Recognized for meeting national standards in technical education.",
    icon: "/aicte.png"
  },
  {
    name: "MSME",
    fullName: "Micro, Small and Medium Enterprises",
    description: "Certified as a recognized MSME, supporting economic growth and innovation.",
    icon: "/msme-500x500-1.webp"
  },
  {
    name: "ISO",
    fullName: "International Organization for Standardization",
    description: "Compliant with international quality management standards.",
    icon: "/iso.png"
  }
]

export default function CertificationSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <section className="w-full py-12 bg-white/40">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">We are Recognized by</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div key={cert.name} className="bg-white border border-[#6600CC] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={cert.icon}
                    alt={`${cert.name} logo`}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                  <div  data-aos="fade-up">
                    <h3 className="text-xl font-semibold text-[#6600CC]">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.fullName}</p>
                    
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{cert.description}</p>
                <div className="mt-auto">
                  <span className="inline-block w-full py-2 px-4 bg-[#f0e6ff] text-[#6600CC] text-center font-semibold rounded-full">
                    Certified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}