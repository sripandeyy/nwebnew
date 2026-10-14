'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Show when user is in the last part of the page (near bottom / last ~35% of page or within 900px of end)
      if (maxScroll > 300) {
        const isNearBottom = scrollY >= maxScroll * 0.65 || (scrollHeight - (scrollY + clientHeight)) <= 800;
        setIsVisible(isNearBottom);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`pointer-events-auto group flex items-center justify-center w-12 h-12 rounded-full skeuo-btn-primary text-white shadow-2xl backdrop-blur-xl border border-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer ${
          !isVisible ? 'pointer-events-none' : ''
        }`}
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5] text-white group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
