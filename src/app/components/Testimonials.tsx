'use client'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TestimonialsGrid() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  const testimonials = 
    [
     
      {
        "avatar": "/placeholder.png",
        "name": "Aditya Varma",
        "title": "Software Engineer, Microsoft",
        "quote": "Nyeras Edutech’s curriculum in AI and data science empowered me to excel in my career and solve real-world problems effectively."
      },
      {
        "avatar": "/placeholder.png",
        "name": "Priya Nair",
        "title": "UI/UX Designer",
        "quote": "The hands-on approach at Nyeras Edutech helped me master advanced design principles and land my dream job in a top tech company."
      },
      {
        "avatar": "/placeholder.png",
        "name": "Ankit Deshmukh",
        "title": "Full Stack Developer",
        "quote": "The coding bootcamps at Nyeras Edutech were intense yet rewarding. I learned industry-relevant skills that gave me a competitive edge."
      },
      {
        "avatar": "/placeholder.png",
        "name": "Rohith Kumar",
        "title": "Cloud Engineer, Deloitte",
        "quote": "Thanks to Nyeras Edutech’s certifications in cloud computing, I secured a job at deloitte and gained confidence in my skills."
      },
      {
        "avatar": "/placeholder.png",
        "name": "V Vikas",
        "title": "Employee at a Startup",
        "quote": "The java full stack course at Nyeras Edutech was comprehensive and practical. It is very relevant to the current industry standards."
      },
      {
        "avatar": "/placeholder.png",
        "name": "Vijay Sathya Prakash",
        "title": "Founder of Rentify",
        "quote": "The guidance and personalized mentorship at Nyeras Edutech have been transformational. I built a scalable startup thanks to their courses."
      },
      {
        "avatar": "/placeholder.png",
        "name": "Meera Singh",
        "title": "AI Researcher",
        "quote": "Nyeras Edutech opened doors to groundbreaking opportunities in AI research, and I couldn't have asked for better mentors."
      },
      {
        "avatar": "/placeholder.png",
        "name": "Arjun Kumar",
        "title": "Software Developer at PayPal",
        "quote": "The startup incubation program at Nyeras Edutech gave me the confidence to pitch my idea to investors and turn it into reality."
      },
      {
        "avatar": "/placeholder.png",
        "name": "Pooja Das",
        "title": "Machine Learning Engineer",
        "quote": "I owe my success in machine learning to the in-depth projects and tutorials offered by Nyeras Edutech. They’re truly industry leaders."
      }
    ];

  return (
    <section className="relative py-14 bg-white/40">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl sm:text-center md:mx-auto">
          <h3 className="text-black text-3xl font-semibold sm:text-4xl">Hear from our Alumni</h3>
          <p className="mt-3 text-black">
            Here are some of the testimonials from our alumni who have successfully completed the course and are now working in top companies.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
              <li key={idx} className="bg-white rounded-xl border shadow-md" data-aos="fade-up" >
                <div className="p-6">
                  <svg className="w-9 h-9 text-indigo-300 mb-4" viewBox="0 0 35 35" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.47895 14.5833C9.15374 14.5833 8.84166 14.6329 8.53103 14.6781C8.63166 14.3398 8.7352 13.9956 8.90145 13.6865C9.0677 13.2373 9.32728 12.8479 9.58541 12.4556C9.80124 12.0312 10.1819 11.7439 10.4619 11.3808C10.755 11.0279 11.1546 10.7931 11.471 10.5C11.7817 10.1937 12.1885 10.0406 12.5123 9.82478C12.8506 9.63082 13.1452 9.41645 13.4602 9.31437L14.2462 8.99062L14.9375 8.70332L14.2302 5.87708L13.3596 6.08707C13.081 6.15707 12.7412 6.23874 12.3548 6.33645C11.9596 6.40937 11.5381 6.60916 11.0685 6.79145C10.6048 6.99853 10.0681 7.13853 9.56937 7.47103C9.0677 7.78895 8.48874 8.05437 7.97833 8.4802C7.48395 8.91916 6.88749 9.29978 6.44708 9.85833C5.96583 10.3804 5.49041 10.9287 5.12145 11.5529C4.69416 12.1479 4.40395 12.8012 4.0977 13.4473C3.82062 14.0933 3.59749 14.754 3.4152 15.3956C3.06958 16.6819 2.91499 17.904 2.8552 18.9496C2.80562 19.9967 2.83478 20.8673 2.89603 21.4973C2.91791 21.7948 2.95874 22.0835 2.98791 22.2833L3.02437 22.5283L3.06228 22.5196C3.32167 23.7312 3.91877 24.8446 4.78452 25.7311C5.65028 26.6175 6.7493 27.2408 7.95447 27.5287C9.15963 27.8166 10.4217 27.7575 11.5946 27.3581C12.7676 26.9587 13.8035 26.2354 14.5825 25.2719C15.3616 24.3083 15.8519 23.1439 15.9969 21.9133C16.1418 20.6828 15.9353 19.4363 15.4014 18.3181C14.8675 17.2 14.028 16.2558 12.9799 15.5949C11.9318 14.934 10.718 14.5832 9.47895 14.5833Z" />
                  </svg>
                  <blockquote className="text-gray-700">
                    <p className="text-lg">{item.quote}</p>
                  </blockquote>
                </div>
                <figure>
                  <div className="flex items-center gap-x-4 p-4 bg-white/80 rounded-b-xl">
                    <img src={item.avatar} alt={item.name} className="w-14 h-14 rounded-full border-2 border-indigo-400" />
                    <div>
                      <span className="block text-gray-900 font-semibold">{item.name}</span>
                      <span className="block text-indigo-600 text-sm">{item.title}</span>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
