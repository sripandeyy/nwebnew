import React from 'react'
// import Image from 'next/image'
// import Marquee from "react-fast-marquee";

const HeroB = () => {
  
  return (
<section className="w-full py-10 bg-white/40">
      <div className="container mx-auto ">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 max-w-4xl mx-auto">
          Thousands of students achieved their{' '}
          <span className="text-[#6600cc]">dream job at</span>
        </h2>
        {/* Auto-scrolling logo row */}
        <div className="relative w-full overflow-hidden">
          <div className="whitespace-nowrap">
            <div className="animate-marquee inline-block">
              <div className="flex items-center gap-12">
                {/* sequence 1 */}
                <img src="/microsoft.png" alt="Microsoft" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/salesforce.png" alt="Salesforce" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/deloitte.png" alt="Deloitte" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/tcs.png" alt="TCS" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/accenture.png" alt="Accenture" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/247.png" alt="24/7" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/wipro.png" alt="Wipro" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/paypal.png" alt="PayPal" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />

                {/* sequence 2 (duplicate for seamless loop) */}
                <img src="/microsoft.png" alt="Microsoft" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/salesforce.png" alt="Salesforce" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/deloitte.png" alt="Deloitte" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/tcs.png" alt="TCS" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/accenture.png" alt="Accenture" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/247.png" alt="24/7" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/wipro.png" alt="Wipro" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
                <img src="/paypal.png" alt="PayPal" className="h-16 md:h-24 lg:h-28 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[#6600cc] mt-6 text-base">+ many more</p>
      </div>
    </section>
  )
}

export default HeroB
