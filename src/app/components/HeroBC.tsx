'use client';
import React,{useEffect} from 'react';
import { Clock, Briefcase, GraduationCap } from 'lucide-react'
import AOS from 'aos';
import 'aos/dist/aos.css';



const HeroBC = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    });
  const features = [
    {
      icon: (
        <Clock />
      ),
      title: "Learn at Your Own Pace",
      desc: "Access courses anytime, anywhere, and tailor your learning journey to fit your schedule."
    },
    {
      icon: (
        <Briefcase />
      ),
      title: "Industry-Ready Skills",
      desc: "Gain hands-on experience with real-world projects designed by industry experts."
    },
    {
      icon: (
        <GraduationCap />
      ),
      title: "Expert Instructors",
      desc: "Learn from seasoned professionals and mentors who guide you every step of the way."
    }
  ];

  return (
    <section className="relative py-16 bg-white/40">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-gray-300 justify-between gap-24 lg:flex md:px-8">
        <div className="max-w-xl" data-aos="fade-right" data-aos-duration="1000">
          <h3 className="text-[#6600CC] text-3xl font-semibold sm:text-4xl">Bring Out the Best in You</h3>
          <p className="mt-3 text-black">
            Talent is not enough. You need to be equipped with the right skills to succeed in your career. Our courses are designed to help you grow professionally and personally.
          </p>
        </div>
        <div className="mt-12 lg:mt-0" data-aos="fade-up" data-aos-duration="1000">
          <ul className="grid gap-8 sm:grid-cols-2">
            {features.map((item, idx) => (
              <li key={idx} className="flex gap-x-4" data-aos="zoom-in" data-aos-duration="1000">
                <div className="flex-none w-12 h-12 bg-gray-700 text-cyan-400 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg text-[#6600CC] font-semibold">{item.title}</h4>
                  <p className="mt-3 text-black">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
        style={{
          background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)"
        }}
      ></div>
    </section>
  );
};

export default HeroBC;
