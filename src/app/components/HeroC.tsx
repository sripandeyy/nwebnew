'use client';
import React, { useEffect } from 'react';
import { Boxes, MonitorPlay, Brain, MessagesSquare, Briefcase, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroC = () => {
  const highlights = [
    {
      icon: Boxes,
      title: "Structured, industry-vetted curriculum",
      bgColor: "bg-blue-500",
    },
    {
      icon: MonitorPlay,
      title: "Live Sessions by faculty who have been there, done that",
      bgColor: "bg-rose-400",
    },
    {
      icon: Brain,
      title: "Practical experience through real-life projects",
      bgColor: "bg-green-500",
    },
    {
      icon: Users,
      title: "Aspirational peer group of 2,000+ Nyeras students",
      bgColor: "bg-purple-500",
    },
    {
      icon: MessagesSquare,
      title: "Regular 1:1 mentorship from industry veterans",
      bgColor: "bg-blue-400",
    },
    {
      icon: Briefcase,
      title: "Career support via a dedicated recruitment team, alumni network, etc",
      bgColor: "bg-purple-400",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section className="w-full bg-white/40 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Become the Top 1%
          </h2>
          <p className="text-lg text-black max-w-3xl mx-auto">
            Discover our curated selection of courses designed to help you grow professionally and personally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`${highlight.bgColor} rounded-xl p-8 text-white transition-transform duration-300 hover:scale-105`}
              data-aos="fade-up" // AOS animation attribute
              data-aos-delay={`${index * 100}`} // Delay for staggered animations
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <highlight.icon className="w-12 h-12" />
                <h3 className="text-xl font-semibold leading-tight">
                  {highlight.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroC;
