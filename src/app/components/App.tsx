'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';


const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: 'ease-in-out',
      once: true, // Animate only once
    });
  }, []);
  
  return (
    <section 
      className="w-full py-16 bg-white/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center" data-aos="zoom-in">
          {/* <div className="inline-flex rounded-full border-2 border-black px-6 py-2 mb-6 transition-transform hover:scale-105">
            <span className="text-lg font-semibold text-black">
              Download Our App
            </span>
          </div> */}
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mt-4">
            Download Our App Now!
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Enjoy our services on the go with our mobile app!
          </p>
        </div>

        <div
          className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Link href="https://play.google.com/store/apps/details?id=co.lily.lfjjz" className="w-48 h-auto">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
              alt="Get it on Google Play"
              width={168}
              height={50}
              className="w-full h-auto"
            />
          </Link>

          <Link href="https://Web.classplusapp.com" className="w-48 h-auto">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/1200px-Download_on_the_App_Store_RGB_blk.svg.png"
              alt="Download on the App Store"
              width={168}
              height={50}
              className="w-full h-auto"
            />
          </Link>
        </div>
      </div>

      <div className="hidden md:block absolute right-24 lg:right-32 bottom-0" data-aos="fade-left" data-aos-delay="300">
        <Image
          src="/downloadApp.png"
          alt="Download Nyeras App"
          width={260}
          height={260}
          className="w-40 sm:w-52 lg:w-64 h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default App;
