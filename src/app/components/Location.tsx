import React from 'react'
import { MapPin, Navigation, Building2, PhoneCall } from 'lucide-react';

const Location = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Corporate Headquarters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Visit Our Bengaluru Office
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
            Centrally located in AECS Layout, easily accessible across major transit corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Google Maps Embed */}
          <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.982316230066!2d77.64066557518507!3d12.908858016250493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158ac2a58ebb%3A0x8aeef3a21b734303!2sNyeras%20Corporate%20Office!5e0!3m2!1sen!2sin!4v1732007632082!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              aria-hidden="false"
              className="w-full h-[320px] sm:h-[400px] grayscale-[20%] dark:invert-[90%] dark:hue-rotate-180 transition-all duration-300 hover:grayscale-0 dark:hover:invert-0"
            />
          </div>
    
          {/* Location Details */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Nyera Educational Organisation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-4">
                NYERAS Edu-tech & Innovations
              </h3>
              
              <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                <MapPin className="h-5 w-5 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5" />
                <p>
                  Floor No. 2, #1161, AECS Layout Main Rd, AECS Layout - A Block, Singasandra, Kudlu, Bengaluru, Karnataka 560068
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Floor%20No.2%2C%201161%2C%20AECS%20Layout%20Main%20Rd%2C%20AECS%20Layout%20-%20A%20Block%2C%20AECS%20Layout%2C%20Singasandra%2C%20Kudlu%2C%20Bengaluru%2C%20Karnataka%20560068"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-sm font-semibold shadow-md border border-slate-700/60 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href="tel:+918000000000"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-100 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                <PhoneCall className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>Call Front Desk</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Location
