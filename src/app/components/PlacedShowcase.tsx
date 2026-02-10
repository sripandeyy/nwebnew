"use client"
import React, { useEffect, useMemo, useState } from 'react'

const PlacedShowcase = () => {
  const profiles = useMemo(
    () => [
      {
        name: 'S Sneha',
        title: 'Development Analyst',
        image: '/sneha s.jpeg',
        paragraphs: [
          `My learning journey in Data Science and Data Analytics at Nyeras Edutech and Innovation Pvt. Ltd. gave me strong practical exposure and clarity on real-world problem solving. The hands-on training and guidance helped me build confidence and industry-ready skills.`,
          'I\'m glad to share that I\'m now working as a Development Analyst at Accenture. Grateful to Nyeras for the support that shaped my career path.',
        ],
        status: 'Successfully Placed • ACCENTURE',
        linkedin: 'https://www.linkedin.com/in/s-sneha-58a539213',
      },
      {
        name: 'Malothu Balram',
        title: 'Analytics Engineer',
        image: '/12.jpg',
        paragraphs: [
          `I completed the Data Analytics and Data Science course at Nyeras Edutech and Innovation Pvt. Ltd., where I gained strong practical exposure to analytics tools, real-time projects, and problem-solving techniques.`,
          'The structured training and hands-on learning helped me build the right skill set and confidence. I\'m happy to share that I\'m now working as an Analytics Engineer at DAZN. I\'m grateful to Nyeras for the guidance and support that helped me reach this milestone.',
        ],
        status: 'Successfully Placed • DAZN',
        linkedin: 'https://www.linkedin.com/in/malothu-balram-39211519b',
      },
      {
        name: 'Ganesh Sai Katta',
        title: 'Software Engineer',
        image: '/ganesh nyeras.jpeg',
        paragraphs: [
          `My journey into data analytics and data science truly took shape at Nyeras Edutech and Innovation Pvt. Ltd. The practical learning approach and real-world problem solving prepared me well for industry expectations. I\'m glad to have taken this path and am excited to be working as a Software Engineer at Impetus today.`,
          'Thankful to the Nyeras team for the right direction and support',
        ],
        status: 'Successfully Placed • IMPETUS',
        linkedin: 'https://www.linkedin.com/in/ganesh-sai-katta-824097189',
      },
      {
        name: 'Harsha Vardhan Reddy Kovvuru',
        title: 'Technical Consulting Engineer',
        image: '/harsha.jpeg',
        paragraphs: [
          `Training in Cyber Security at Nyeras Edutech and Innovation Pvt. Ltd. gave me strong hands-on exposure and a clear understanding of real-world security challenges. The practical approach and mentorship helped me build confidence and industry-ready skills.`,
          'I\'m proud to share that I\'m now working as a Technical Consulting Engineer at Cisco. Grateful to Nyeras for shaping this journey and supporting my career growth.',
        ],
        status: 'Successfully Placed • CISCO',
        linkedin: 'https://www.linkedin.com/in/harsha-vardhan-reddy-kovvuru-763a7623a',
      },
      {
        name: 'Harsha Vardhan Kesanapalli',
        title: 'DevOps Engineer',
        image: '/harsha new nyeras.jpeg',
        paragraphs: [
          `The DevOps training at Nyeras Edutech and Innovation Pvt. Ltd. gave me hands-on experience with real-world tools and workflows. The practical learning approach helped me understand industry practices and build strong confidence. I\'m happy to share that I\'m now working as a DevOps Engineer at DXC Technology.`,
          'Thankful to the Nyeras team for the right direction and support',
        ],
        status: 'Successfully Placed • DXC Technology',
        linkedin: 'https://www.linkedin.com/in/khvs',
      },
      {
        name: 'PhaniBhushan Rao Kallamari',
        title: 'SAP BW Consultant',
        image: '/phanibhu.jpeg',
        paragraphs: [
          `I completed the SAP course at Nyeras Edutech and Innovation Pvt. Ltd., where I gained strong practical knowledge and hands-on experience. The structured training helped me build confidence and industry-ready skills.`,
          'I\'m happy to share that I\'m now working as a SAP BW Consultant at LTI Mindtree. Grateful to Nyeras for the guidance and support throughout my journey.',
        ],
        status: 'Successfully Placed • LTI Mindtree',
        linkedin: 'https://www.linkedin.com/in/phanibhushan-rao-kallamari-054ab623a',
      },
      {
        name: 'Swathi',
        title: 'HRM Graduate at Nyeras',
        image: '/image1.jpeg',
        paragraphs: [
          `I joined Nyeras for the HRM course in June and completed my internship there. With clear guidance, structured training, real-time projects, and mock interviews, I gradually built strong confidence. I'm happy to share that I've been successfully placed. I'm truly grateful to the Nyeras team for their continuous support and mentorship throughout my journey.`,
          `Thank you, Nyeras team, for all the support and guidance!`,
        ],
        status: 'Successfully Placed • VEDUPSKILLING',
        linkedin: 'https://www.linkedin.com/in/pg-swathi-gowda-184a3428a/',
      },
      {
        name: 'Rithika B',
        title: 'Business Development Associate • HRM Graduate',
        image: '/rithika.jpg',
        paragraphs: [
          `Excited to share that I’ve taken a significant step in my professional journey by joining Nyeras Edutech and Innovation Pvt. Ltd. Through my training and hands-on experience, I developed strong skills in communication, client handling, business growth, and Human Resource Management. These experiences helped me grow professionally and confidently transition into this role. I’m grateful to Nyeras for the guidance and support throughout my journey.`,
        ],
        status: 'Successfully Placed • NYERAS',
        linkedin: 'https://www.linkedin.com/in/rithikaboopathi05/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Karthiban L',
        title: 'BPS Trainee • HRM Graduate',
        image: '/karthiban.jpg',
        paragraphs: [
          `I joined the HRM course in June and completed my internship with structured guidance and continuous mentorship. The practical training and real-time projects helped me build strong skills and confidence. I’m happy to share that I’ve successfully secured a position as an HR Executive.`,
          `I’m truly grateful for the support, motivation, and professional learning environment that made this journey impactful.`,
        ],
        status: 'Successfully Placed • TCS',
        linkedin: 'https://www.linkedin.com/in/karthiban-l-a17093364/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Marglin Raja',
        title: 'Business Development • SKYRA TECHSCAPE',
        image: '/marglin.jpg',
        paragraphs: [
          `I’m excited to share that I’ve joined Skyra Techscape Pvt. Ltd. This new role marks an important milestone in my career. During my time at Nyeras Edutech and Innovation Pvt. Ltd., I gained valuable experience and also pursued a course in Human Resource Management, which strengthened my skills in recruitment, people management, and organizational processes.`,
          `These experiences helped me grow professionally and prepared me for this next step. I’m truly grateful to Nyeras for the support and opportunities that shaped my journey. Looking forward to embracing this exciting new chapter!`,
        ],
        status: 'Successfully Placed • Skyra Techscape Pvt. Ltd.',
        linkedin: 'https://www.linkedin.com/in/marglin-raja-106473299/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [dir, setDir] = useState<1 | -1>(1)
  const active = profiles[index]

  const animateTo = (nextIndex: number, direction: 1 | -1) => {
    setDir(direction)
    setIsFading(true)
    window.setTimeout(() => {
      setIndex(nextIndex)
      setIsFading(false)
    }, 350)
  }

  const prev = () => animateTo((index - 1 + profiles.length) % profiles.length, -1)
  const next = () => animateTo((index + 1) % profiles.length, 1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  return (
    <section className="relative overflow-hidden bg-white/40">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-10 sm:mb-12 text-center">
          <span className="inline-block text-[#6600CC] tracking-widest text-xs sm:text-sm uppercase">Success Stories</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">Students who got placed</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Real journeys, real outcomes.</p>
        </div>
        <div className="relative">
          <div className="relative bg-[#6600CC] rounded-2xl shadow-2xl shadow-purple-900/30">
            <div className="p-4 sm:p-6 lg:p-8 transition-all duration-500 min-h-[500px] sm:min-h-[550px] lg:h-[450px]">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 h-full">
                {/* Compact Profile Image Section */}
                <div className="flex-shrink-0 w-full lg:w-1/3">
                  <div className={`relative transition-all duration-700 ease-out ${isFading ? (dir === 1 ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0') : 'translate-x-0 opacity-100'}`}>
                    {/* Image Container with Premium Frame */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
                      <img 
                        src={active.image} 
                        alt={`${active.name} - Successfully placed student profile`} 
                        className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                      />
                      
                      {/* Verification Badge */}
                      <div className="absolute top-3 right-3 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      {/* Subtle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Compact Content Section */}
                <div className="w-full lg:w-2/3 text-white h-full overflow-hidden">
                  <div className={`h-full flex flex-col justify-between transition-all duration-700 ease-out ${isFading ? (dir === 1 ? '-translate-x-4 opacity-0' : 'translate-x-4 opacity-0') : 'translate-x-0 opacity-100'}`}>
                    
                    {/* Profile Header */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="text-2xl sm:text-3xl font-light text-white/80 leading-none">"</span>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1 leading-tight">
                            {active.name}
                          </h3>
                          <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
                            {active.title}
                          </p>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="text-xs text-white/90 font-medium">{active.status}</span>
                      </div>
                    </div>

                    {/* Story Content - Compact */}
                    <div className="flex-1 overflow-hidden py-2 sm:py-3">
                      <div className="space-y-1 sm:space-y-2">
                        {active.paragraphs.map((paragraph, i) => (
                          <p key={i} className="text-white/85 leading-relaxed text-xs sm:text-sm font-light line-clamp-3 sm:line-clamp-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Footer with Quote and LinkedIn */}
                    <div className="space-y-2 sm:space-y-3">
                      {/* Closing Quote */}
                      <div className="flex justify-end">
                        <span className="text-2xl sm:text-3xl font-light text-white/80 leading-none">"</span>
                      </div>

                      {/* LinkedIn Connection */}
                      <div className="pt-2 border-t border-white/20">
                        <a
                          href={active.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white text-[#6600CC] rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                          <span className="hidden sm:inline">Connect on LinkedIn</span>
                          <span className="sm:hidden">LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous profile"
            className="group absolute -left-2 xs:-left-3 sm:-left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10 inline-flex h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/10 hover:ring-white/30 transition-all duration-300 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 animate-pulse hover:animate-none"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:-translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next profile"
            className="group absolute -right-2 xs:-right-3 sm:-right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10 inline-flex h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/10 hover:ring-white/30 transition-all duration-300 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 animate-pulse hover:animate-none"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default PlacedShowcase


