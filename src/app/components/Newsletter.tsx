'use client';
import React, { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Newsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setMessage('Please enter your email.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post<{ success: boolean }>('/api/newsletters', { email });

      if (response.status === 200) {
        setMessage('Thank you for subscribing!');
        setIsLoading(false);
        setEmail('');
      } else {
        setMessage('Failed to subscribe. Please try again.');
        setIsLoading(false);
      }
    } catch {
      setMessage('Failed to subscribe. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full py-16 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4" data-aos="zoom-in">
        {/* Image in the left corner */}
        <div className="absolute left-4 top-4 hidden md:block opacity-90" data-aos="fade-right" data-aos-delay="150">
          <Image
            src="/subscribeEmail.png"
            alt="Subscribe to our newsletter"
            width={260}
            height={220}
            className="w-44 sm:w-52 md:w-56 lg:w-64 h-auto object-contain"
          />
        </div>
        
        <div className="relative w-full">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-xl">
              <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md px-6 py-12 md:px-10 text-center">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold uppercase tracking-wider mb-1 border border-slate-200 dark:border-slate-700">
                    Stay Connected
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    Stay up to date with the roadmap progress, announcements, and exclusive opportunities.
                  </p>
                </div>
                <div className="mt-6" data-aos="fade-up" data-aos-delay="200">
                  <form
                    onSubmit={handleSubscribe}
                    className="flex items-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 sm:max-w-md sm:mx-auto focus-within:border-slate-400 transition-colors"
                  >
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-slate-900 dark:text-slate-100 placeholder:text-slate-400 bg-transparent w-full px-3 py-2 text-sm outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 rounded-lg font-semibold text-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 hover-lift transition-all shadow-xs shrink-0"
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-4 w-4 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </form>
                  {message && <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 text-center mt-2.5">{message}</p>}
                  <p className="mt-4 max-w-lg text-xs text-slate-500 dark:text-slate-400 sm:mx-auto">
                    No spam ever, we respect your privacy. Read our <a className="underline text-slate-900 dark:text-slate-200 hover:text-slate-700" href="/privacy-policy">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
