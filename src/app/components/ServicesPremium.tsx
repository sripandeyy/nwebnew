"use client"

import { Code2, Brain, Cloud, Shield, Cpu, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

const ServicesPremium = () => {
  const tracks = [
    {
      id: "fs",
      href: "/domains/web-development-fullstack",
      icon: <Code2 className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
      title: "Full Stack Web Engineering",
      subtitle: "MERN • Next.js 15 • PostgreSQL • Cloud Deployments",
      badge: "Most Popular",
      badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
      salary: "₹6.5 - ₹18 LPA",
      duration: "16 Weeks",
      projects: "12 Live Capstones",
      stack: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      id: "ds",
      href: "/domains/data-science",
      icon: <Brain className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
      title: "Data Science & Generative AI",
      subtitle: "Machine Learning • Deep Learning • LLMs • BigQuery",
      badge: "High Salary Growth",
      badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
      salary: "₹8.0 - ₹24 LPA",
      duration: "20 Weeks",
      projects: "10 AI Models Deployed",
      stack: ["Python", "PyTorch", "LangChain", "BigQuery", "Pandas", "Scikit-Learn"],
    },
    {
      id: "cloud",
      href: "/domains/cloud-computing",
      icon: <Cloud className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
      title: "DevOps & Cloud Architecture",
      subtitle: "AWS Solutions • Kubernetes • Terraform • CI/CD",
      badge: "High MNC Demand",
      badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
      salary: "₹7.5 - ₹22 LPA",
      duration: "16 Weeks",
      projects: "8 Enterprise Pipelines",
      stack: ["AWS Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Linux"],
    },
    {
      id: "sec",
      href: "/domains/cyber-security",
      icon: <Shield className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
      title: "Cyber Security & Defense",
      subtitle: "Ethical Hacking • SOC Analysis • SIEM • Network Defense",
      badge: "Global Cert Track",
      badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
      salary: "₹6.0 - ₹19 LPA",
      duration: "16 Weeks",
      projects: "15 Red/Blue Labs",
      stack: ["Wireshark", "Burp Suite", "Kali Linux", "Metasploit", "Splunk", "Python"],
    },
    {
      id: "vlsi",
      href: "/domains/vlsi",
      icon: <Cpu className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
      title: "VLSI & Embedded Systems",
      subtitle: "RTL Design • Verilog • FPGA • RTOS Firmware",
      badge: "Core Engineering",
      badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
      salary: "₹6.5 - ₹20 LPA",
      duration: "18 Weeks",
      projects: "6 Silicon Prototypes",
      stack: ["Verilog", "SystemVerilog", "ModelSim", "FPGA", "C/C++", "ARM Cortex"],
    },
    {
      id: "analytics",
      href: "/domains/data-analytics",
      icon: <BarChart3 className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
      title: "Data Analytics & BI",
      subtitle: "SQL • Tableau • Power BI • Business Metrics",
      badge: "Zero-Coding Option",
      badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
      salary: "₹5.5 - ₹15 LPA",
      duration: "12 Weeks",
      projects: "8 Live Dashboards",
      stack: ["SQL Server", "Power BI", "Tableau", "Excel VBA", "Python Analytics"],
    },
  ]

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-slate-50/50 dark:bg-transparent">
      <div className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider mb-3 backdrop-blur-md">
            <Code2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Job-Ready Career Tracks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Industry-Approved Career Programs
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            Choose your specialization. Every track includes live mentor sessions, capstone repos, mock interviews, and 100% placement referrals.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tracks.map((track) => (
            <Link
              key={track.id}
              href={track.href}
              className="group relative flex flex-col justify-between p-7 rounded-3xl bg-white/55 dark:bg-slate-900/55 backdrop-blur-2xl skeuo-card hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative z-10">
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-xs border border-white/90 dark:border-slate-700 backdrop-blur-md text-slate-950 dark:text-white">
                    {track.icon}
                  </div>
                  <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-950 dark:text-slate-100 border border-white/90 dark:border-slate-700 shadow-xs backdrop-blur-md">
                    {track.badge}
                  </span>
                </div>

                {/* Track Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs text-slate-800 dark:text-slate-300 font-bold mb-5 line-clamp-2 leading-relaxed">
                  {track.subtitle}
                </p>

                {/* Meta details (Duration + Capstones + CTC) */}
                <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-white/50 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/80 dark:border-slate-700/60 mb-5 text-xs shadow-xs">
                  <div>
                    <span className="text-slate-950 dark:text-slate-300 font-black block text-[10px] uppercase tracking-wider">Duration</span>
                    <span className="font-black text-slate-950 dark:text-slate-100">{track.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-950 dark:text-slate-300 font-black block text-[10px] uppercase tracking-wider">Capstones</span>
                    <span className="font-black text-slate-950 dark:text-slate-100">{track.projects}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-950 dark:text-slate-300 font-black text-[10px] uppercase tracking-wider">Avg. CTC</span>
                    <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">{track.salary}</span>
                  </div>
                </div>

                {/* Stack Pills */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 dark:text-slate-300 block mb-2.5">
                    Tech Stack Covered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.stack.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/75 dark:bg-slate-800/80 text-slate-950 dark:text-slate-200 text-[11px] font-black border border-white/90 dark:border-slate-700 shadow-xs backdrop-blur-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Card Action */}
              <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <div className="w-full py-3 px-5 rounded-2xl skeuo-btn-primary text-white font-black text-xs sm:text-sm flex items-center justify-between shadow-md group-hover:scale-[1.01] active:scale-[0.99] transition-all">
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/domains"
            className="inline-flex items-center gap-2.5 px-8 py-4 skeuo-btn-primary text-white font-extrabold rounded-2xl text-base"
          >
            <span>Compare All 12+ Career Tracks</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  )
}

export default ServicesPremium
