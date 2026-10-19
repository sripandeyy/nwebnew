"use client"

import { Code2, Brain, Cloud, Shield, Cpu, BarChart3, ArrowRight, TrendingUp, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ServicesPremium = () => {
  const tracks = [
    {
      id: "fs",
      href: "/domains/web-development-fullstack",
      icon: <Code2 className="w-5 h-5 text-white" />,
      title: "Full Stack Web Engineering",
      subtitle: "MERN • Next.js 15 • PostgreSQL • Cloud Deployments",
      badge: "Most Popular",
      badgeDot: "bg-blue-400",
      image: "/vectors/fullstack-engineering.svg",
      glow: "bg-blue-500",
      accent: "from-blue-600/30 via-indigo-500/15 to-transparent",
      highlight: "Full Stack Capstones",
      salary: "₹6.5 - ₹18 LPA",
      duration: "16 Weeks",
      projects: "12 Live Capstones",
      stack: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      id: "ds",
      href: "/domains/data-science",
      icon: <Brain className="w-5 h-5 text-white" />,
      title: "Data Science & Generative AI",
      subtitle: "Machine Learning • Deep Learning • LLMs • BigQuery",
      badge: "High Salary Growth",
      badgeDot: "bg-purple-400",
      image: "/vectors/data-science-ai.svg",
      glow: "bg-purple-500",
      accent: "from-purple-600/30 via-pink-500/15 to-transparent",
      highlight: "Gen AI & LLM Labs",
      salary: "₹8.0 - ₹24 LPA",
      duration: "20 Weeks",
      projects: "10 AI Models Deployed",
      stack: ["Python", "PyTorch", "LangChain", "BigQuery", "Pandas", "Scikit-Learn"],
    },
    {
      id: "cloud",
      href: "/domains/cloud-computing",
      icon: <Cloud className="w-5 h-5 text-white" />,
      title: "DevOps & Cloud Architecture",
      subtitle: "AWS Solutions • Kubernetes • Terraform • CI/CD",
      badge: "High MNC Demand",
      badgeDot: "bg-sky-400",
      image: "/vectors/devops-cloud.svg",
      glow: "bg-sky-500",
      accent: "from-sky-600/30 via-blue-500/15 to-transparent",
      highlight: "Multi-Cloud Deployments",
      salary: "₹7.5 - ₹22 LPA",
      duration: "16 Weeks",
      projects: "8 Enterprise Pipelines",
      stack: ["AWS Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Linux"],
    },
    {
      id: "sec",
      href: "/domains/cyber-security",
      icon: <Shield className="w-5 h-5 text-white" />,
      title: "Cyber Security & Defense",
      subtitle: "Ethical Hacking • SOC Analysis • SIEM • Network Defense",
      badge: "Global Cert Track",
      badgeDot: "bg-emerald-400",
      image: "/vectors/cyber-security.svg",
      glow: "bg-emerald-500",
      accent: "from-emerald-600/30 via-teal-500/15 to-transparent",
      highlight: "SOC Red/Blue Teaming",
      salary: "₹6.0 - ₹19 LPA",
      duration: "16 Weeks",
      projects: "15 Red/Blue Labs",
      stack: ["Wireshark", "Burp Suite", "Kali Linux", "Metasploit", "Splunk", "Python"],
    },
    {
      id: "vlsi",
      href: "/domains/vlsi",
      icon: <Cpu className="w-5 h-5 text-white" />,
      title: "VLSI & Embedded Systems",
      subtitle: "RTL Design • Verilog • FPGA • RTOS Firmware",
      badge: "Core Engineering",
      badgeDot: "bg-amber-400",
      image: "/vectors/vlsi-embedded.svg",
      glow: "bg-amber-500",
      accent: "from-amber-600/30 via-orange-500/15 to-transparent",
      highlight: "Silicon & RTL Prototypes",
      salary: "₹6.5 - ₹20 LPA",
      duration: "18 Weeks",
      projects: "6 Silicon Prototypes",
      stack: ["Verilog", "SystemVerilog", "ModelSim", "FPGA", "C/C++", "ARM Cortex"],
    },
    {
      id: "analytics",
      href: "/domains/data-analytics",
      icon: <BarChart3 className="w-5 h-5 text-white" />,
      title: "Data Analytics & BI",
      subtitle: "SQL • Tableau • Power BI • Business Metrics",
      badge: "Zero-Coding Option",
      badgeDot: "bg-indigo-400",
      image: "/vectors/data-analytics.svg",
      glow: "bg-indigo-500",
      accent: "from-indigo-600/30 via-violet-500/15 to-transparent",
      highlight: "Live BI Dashboards",
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
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl skeuo-card hover:-translate-y-2.5 transition-all duration-300 cursor-pointer overflow-hidden border border-white/80 dark:border-slate-800 shadow-lg hover:shadow-2xl"
            >
              {/* Interactive Ambient Radial Glow */}
              <div
                className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-25 dark:group-hover:opacity-35 transition-opacity duration-500 pointer-events-none ${track.glow}`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Premium Image Showcase with Overlaid Badges */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-slate-950 mb-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md group/img">
                  <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    priority={track.id === "fs" || track.id === "ds"}
                  />
                  
                  {/* Subtle modern cinematic vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${track.accent} mix-blend-overlay pointer-events-none`} />

                  {/* Top Floating Glass Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white shadow-md group-hover:scale-110 group-hover:border-white/40 transition-all duration-300">
                      {track.icon}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black backdrop-blur-md bg-slate-950/80 text-white border border-white/20 shadow-md">
                      <span className={`w-1.5 h-1.5 rounded-full ${track.badgeDot} animate-pulse`} />
                      {track.badge}
                    </span>
                  </div>

                  {/* Bottom Floating Info Pill inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold text-slate-200 border border-white/10 shadow-sm">
                      {track.highlight}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/25 backdrop-blur-md text-[10px] font-mono font-black text-emerald-300 border border-emerald-400/30 shadow-sm">
                      {track.salary}
                    </span>
                  </div>
                </div>

                {/* Track Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                  {track.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-4 line-clamp-1 leading-relaxed">
                  {track.subtitle}
                </p>

                {/* Meta details (Duration + Capstones + CTC) */}
                <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-slate-100/80 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/90 dark:border-slate-700/60 mb-4 text-xs shadow-2xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Duration</span>
                    <span className="font-black text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{track.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Capstones</span>
                    <span className="font-black text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{track.projects}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      Avg. CTC
                    </span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
                      {track.salary}
                    </span>
                  </div>
                </div>

                {/* Stack Pills */}
                <div className="mb-6 flex-grow">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-slate-400" />
                    Tech Stack Covered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.stack.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 text-[11px] font-bold border border-slate-200/90 dark:border-slate-700 shadow-2xs group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="relative z-10 pt-3 border-t border-slate-200/80 dark:border-slate-800 mt-auto">
                  <div className="w-full py-3 px-5 rounded-2xl skeuo-btn-primary text-white font-black text-xs sm:text-sm flex items-center justify-between shadow-md group-hover:shadow-lg group-hover:brightness-110 active:scale-[0.99] transition-all">
                    <span>Explore Curriculum</span>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/domains"
            className="inline-flex items-center gap-2.5 px-8 py-4 skeuo-btn-primary text-white font-extrabold rounded-2xl text-base group"
          >
            <span>Compare All 12+ Career Tracks</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}

export default ServicesPremium
