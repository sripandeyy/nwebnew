import React from 'react'
import { ExternalLink } from 'lucide-react'

const HeroB = () => {
  const logos = [
    { src: "/microsoft.png", alt: "Microsoft", url: "https://www.microsoft.com" },
    { src: "/salesforce.png", alt: "Salesforce", url: "https://www.salesforce.com" },
    { src: "/deloitte.png", alt: "Deloitte", url: "https://www.deloitte.com" },
    { src: "/tcs.png", alt: "TCS", url: "https://www.tcs.com" },
    { src: "/accenture.png", alt: "Accenture", url: "https://www.accenture.com" },
    { src: "/247.png", alt: "24/7.ai", url: "https://www.247.ai" },
    { src: "/wipro.png", alt: "Wipro", url: "https://www.wipro.com" },
    { src: "/paypal.png", alt: "PayPal", url: "https://www.paypal.com" },
    { src: "/cognizant.png", alt: "Cognizant", url: "https://www.cognizant.com" },
  ]

  return (
    <section className="w-full py-16 sm:py-24 border-y border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 via-slate-100/30 to-slate-50 dark:from-[#070913] dark:via-slate-900/40 dark:to-[#070913] overflow-hidden relative">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
            <span>100+ Hiring Partners</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Our Alumni Are Hired By{" "}
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            From Fortune 500 tech giants to high-growth innovators, Nyeras graduates are shaping engineering teams worldwide. Click any partner to visit their official portal.
          </p>
        </div>
        
        {/* Infinite Seamless Logo Carousel Container with Edge Fades */}
        <div className="relative w-full overflow-hidden">
          {/* Left and Right Gradient Fade Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-slate-50 dark:from-[#070913] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-slate-50 dark:from-[#070913] to-transparent z-20" />

          <div className="animate-marquee-smooth flex items-center gap-8 sm:gap-10 py-6">
            {/* Duplicated for smooth infinite loop */}
            {[...logos, ...logos].map((logo, idx) => (
              <a 
                key={idx}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${logo.alt} Official Website`}
                className="flex-shrink-0 flex items-center justify-center px-10 sm:px-14 py-6 sm:py-8 rounded-3xl bg-white dark:bg-slate-900 glossy-black-card border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-slate-400 dark:hover:border-slate-600 hover:-translate-y-2 active:translate-y-0 transition-all duration-300 min-w-[280px] sm:min-w-[340px] md:min-w-[380px] h-36 sm:h-44 md:h-48 backdrop-blur-xl group relative cursor-pointer"
              >
                {/* Subtle external link chip on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>

                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain max-w-[220px] sm:max-w-[270px] md:max-w-[310px] transition-all duration-300 group-hover:scale-110 filter dark:brightness-110 dark:contrast-105" 
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroB
