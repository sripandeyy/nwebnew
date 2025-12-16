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
      duration: 1000,  // Animation duration in milliseconds
      easing: 'ease-in-out',
      once: true,  // Only animate once
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
        setEmail(''); // Clear the input field
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
    <section className="relative w-full py-12 bg-white/40">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4" data-aos="zoom-in">
        {/* Image in the left corner */}
        <div className="absolute left-4 top-4 hidden md:block" data-aos="fade-right" data-aos-delay="150">
          <Image
            src="/subscribeEmail.png"
            alt="Subscribe to our newsletter"
            width={300}
            height={240}
            className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto object-contain"
          />
        </div>
        
        <div className="relative w-full">

          <div className="w-full flex justify-center">
            <div className="w-full max-w-xl">
              <div className="w-full max-w-xl rounded-2xl bg-white/90 shadow-lg px-4 py-14 md:px-8 text-center">
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-black">
                    Subscribe to our newsletter
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Stay up to date with the roadmap progress, announcements, and exclusive discounts. Feel free to sign up with your email.
                  </p>
                </div>
                <div className="mt-6" data-aos="fade-up" data-aos-delay="200">
                  <form
                    onSubmit={handleSubscribe}
                    className="flex items-center justify-center bg-white rounded-lg p-1 sm:max-w-md sm:mx-auto"
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-gray-500 w-full p-2 outline-none"
                    />
                    <button
                      type="submit"
                      className="p-2 px-3 rounded-lg font-medium text-white bg-[#6600cc] hover:bg-[#6600cc]/90 active:bg-[#6600cc]/80 duration-150 outline-none shadow-md focus:shadow-none sm:px-4"
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </form>
                  <p className="text-gray-700 text-center mt-2">{message}</p>
                  <p className="mt-3 max-w-lg text-[15px] text-gray-600 sm:mx-auto">
                    No spam ever, we care about the protection of your data.
                    Read our <a className="underline text-[#6600cc] hover:text-[#4d0099]" href="#"> Privacy Policy </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}
      ></div>
    </section>
  );
}

export default Newsletter;
