'use client';
import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, QrCode, ExternalLink, FileCheck } from "lucide-react";

const certifications = [
  {
    name: "AICTE Aligned",
    fullName: "All India Council for Technical Education",
    description: "Curriculum and skills framework aligned with national technical education benchmarks for engineering students.",
    icon: "/aicte.png",
    badge: "National Standards",
    badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
  },
  {
    name: "VTU Verified",
    fullName: "Visvesvaraya Technological University, Belagavi",
    description: "Nyeras programs and internships are verified by VTU, recognised for engineering students across Karnataka.",
    icon: "/vtu-logo.png",
    badge: "University Verified",
    badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
  },
  {
    name: "Ministry of MSME",
    fullName: "Micro, Small & Medium Enterprises",
    description: "Registered & approved enterprise training provider under the Ministry of MSME, Government of India.",
    icon: "/msme-500x500-1.webp",
    badge: "Govt. Registered",
    badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
  },
  {
    name: "ISO 9001:2015",
    fullName: "International Organization for Standardization",
    description: "Audited and certified for global standards in educational course delivery, mentor quality, and learner outcomes.",
    icon: "/iso.png",
    badge: "ISO 9001 Certified",
    badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
  }
]

export default function CertificationSection() {
  return (
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-3 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Verifiable Industry Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recognized & Certified by National Bodies
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base sm:text-lg font-normal">
            Every Nyeras credential carries a unique cryptographic ID and QR code, instantly verifiable by hiring recruiters globally.
          </p>
        </div>

        {/* 2-Column Genuine Certificate Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Certificate Mockup Preview (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 glossy-black-card p-4 sm:p-6 shadow-xl backdrop-blur-xl">
              
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-950">
                <Image
                  src="/new-certificate.png"
                  alt="Nyeras Official Course Completion Certificate - Data Analytics"
                  width={2000}
                  height={1414}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Certificate Ribbon Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">Trust Reg No: 4-23/2024 • ISO 9001:2015</span>
                </div>
                <Link
                  href="/certverify"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white underline underline-offset-2"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Verify Sample Certificate ID</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>

          {/* Accreditations List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={`cert-${cert.name}-${index}`}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 skeuo-card transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
                    <Image
                      src={cert.icon}
                      alt={cert.name}
                      width={48}
                      height={48}
                      className="object-contain max-h-10 w-auto"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {cert.name}
                      </h3>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${cert.badgeColor}`}>
                        {cert.badge}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      {cert.fullName}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}