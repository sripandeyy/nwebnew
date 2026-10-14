'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  ShieldCheck, 
  Search, 
  QrCode, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  Building,
  FileCheck
} from 'lucide-react';

const RECENT_VERIFICATIONS = [
  { id: "NYE-2024-FS-8921", name: "Ganesh Sai Katta", course: "Full Stack Web Engineering", org: "Impetus Technologies" },
  { id: "NYE-2024-DS-7412", name: "S Sneha", course: "Data Science & AI", org: "Accenture" },
  { id: "NYE-2024-DO-6320", name: "Harsha Vardhan K", course: "Cloud & DevOps Architecture", org: "DXC Technology" },
  { id: "NYE-2024-CS-5109", name: "Harsha Vardhan Reddy", course: "Cyber Security & SOC", org: "Cisco Systems" },
];

export default function CertVerifyIndexPage() {
  const [certId, setCertId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = certId.trim();
    if (!cleanId) {
      setError('Please enter a valid Certificate ID');
      return;
    }
    router.push(`/certverify/${encodeURIComponent(cleanId)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <Topbar />
      <Header />

      <main className="flex-grow pt-32 pb-20 relative overflow-hidden">
        {/* Subtle Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-slate-400/10 dark:bg-slate-700/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Official Verification Portal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Verify Nyeras Credential Authenticity
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
              Enter the unique Certificate ID or scan the QR code printed on the official certificate to confirm candidate credentials in real time.
            </p>
          </div>

          {/* Verification Search Box */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label htmlFor="certId" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Enter Certificate ID
                  </label>
                  <div className="relative flex items-center">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                    <input
                      id="certId"
                      type="text"
                      value={certId}
                      onChange={(e) => {
                        setCertId(e.target.value);
                        setError('');
                      }}
                      placeholder="e.g. NYE-2024-FS-8921 or custom certificate ID"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 focus:border-slate-500 dark:focus:border-slate-400 text-slate-900 dark:text-white font-mono text-sm sm:text-base outline-none transition-colors"
                    />
                  </div>
                  {error && <p className="text-xs font-semibold text-rose-500 mt-1.5">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-base shadow-lg border border-slate-700/50 hover-lift transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Verify Credential Instantly</span>
                </button>
              </form>

              {/* Sample Search Quick Links */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Try Sample Verifications
                </span>
                <div className="flex flex-wrap gap-2">
                  {RECENT_VERIFICATIONS.map((item, idx) => (
                    <button
                      key={`sample-cert-${item.id}-${idx}`}
                      type="button"
                      onClick={() => {
                        setCertId(item.id);
                        router.push(`/certverify/${item.id}`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex items-center gap-1.5"
                    >
                      <span>{item.id}</span>
                      <span className="text-[10px] text-slate-400 font-sans">({item.name})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Official Verification Standards Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Trust Reg No: 4-23/2024</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Issued by Nyera Educational Organisation under official regulatory registry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-3 border border-slate-200 dark:border-slate-700">
                <Award className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">ISO 9001:2015 Certified</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                International standard quality governance for skill delivery and training outcome compliance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-3 border border-slate-200 dark:border-slate-700">
                <Building className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Enterprise Recruiter Accepted</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Directly recognized by 100+ partner tech organizations for technical internship verification.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
