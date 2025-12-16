"use client"
import React, { useEffect, useMemo, useState } from 'react'

const PlacedShowcase = () => {
  const profiles = useMemo(
    () => [
      {
        name: 'Swathi',
        title: 'HRM Graduate at Nyeras',
        image: '/image1.jpeg',
        paragraphs: [
          `I’m Swathi. I joined Nyeras for my HRM course in June and completed an internship at Nyeras. At first, I didn’t know what to expect or how things would go, but Pavan Sir guided me in detail and made everything easy to understand.`,
          `I’m really happy to share that I’ve been placed successfully. It’s been an amazing journey with Nyeras. Nyeras provided proper training, real-time projects, and conducted mock interviews. After joining this organization, I built my confidence and was able to attend interviews confidently. That confidence was built thanks to the one and only CEO & Founder of Nyeras, Mr. K.S. Pavan Sai. Thank you, Sir, for your guidance, and a big thanks to the entire Nyeras team. Everyone treated me like a friend. I’m proud to say they provide 100% placement opportunities for students.`,
          `Thank you, Nyeras team, for all the support and guidance!`,
        ],
        status: 'Successfully Placed • HR Management',
        linkedin: 'https://www.linkedin.com/in/pg-swathi-gowda-184a3428a/',
      },
      {
        name: 'Rithika B',
        title: 'Business Development Associate • HRM Graduate',
        image: '/rithika.jpg',
        paragraphs: [
          `Excited to share that I’ve taken a significant step in my professional journey by joining Skyra Techscape Pvt. Ltd. This opportunity came after my enriching experience at Nyeras Edutech and Innovation Pvt. Ltd., where I developed essential skills in communication, client handling, and business growth strategies. During my time there, I also pursued a course in Human Resource Management, which strengthened my abilities in recruitment, people management, and organizational processes.`,
          `The combination of these experiences helped me grow both personally and professionally, ultimately enabling me to secure this role at Skyra Techscape. I am grateful to Nyeras for the platform and support in helping me transition confidently to this new chapter.`,
        ],
        status: 'Successfully Placed • Business Development & HRM',
        linkedin: 'https://www.linkedin.com/in/rithikaboopathi05/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Karthiban L',
        title: 'HR Executive • HRM Graduate',
        image: '/karthiban.jpg',
        paragraphs: [
          `I’m Karthiban. I joined the HRM course in June and successfully completed my internship as part of this journey. At the beginning, I was unsure of what to expect, but with the clear guidance and constant support of Pavan Sir, the learning process became structured and easy to understand.`,
          `I’m delighted to share that I have successfully secured a position as an HR Executive.`,
          `The practical training and real-time project exposure gave me the knowledge, skills, and confidence to face interviews effectively. The motivation and mentorship from Pavan Sir played a key role in building my self-belief. The team’s friendly and encouraging environment made the entire learning experience truly impactful.`,
          `I’m proud to say that the high-quality training and dedicated support I received have helped me achieve my career goal.`,
          `A heartfelt thank you to Pavan Sir and the entire team for their continuous support and guidance throughout my journey.`,
        ],
        status: 'Successfully Placed • HR Executive',
        linkedin: 'https://www.linkedin.com/in/karthiban-l-a17093364/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Marglin Raja',
        title: 'Business Development • HRM Graduate',
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
            <div className="p-4 sm:p-6 lg:p-8 transition-all duration-500 h-[460px] sm:h-[520px] lg:h-[480px]">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 h-full">
                <div className="flex-shrink-0 w-full lg:w-1/3">
                  <div className={`aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-white/20 shadow-lg flex items-center justify-center bg-white/5 transition-all duration-300 ${isFading ? (dir === 1 ? 'translate-x-2 opacity-0' : '-translate-x-2 opacity-0') : 'translate-x-0 opacity-100'}`}>
                    <img src={active.image} alt={`Placed Student ${active.name}`} className="h-full w-full object-cover object-center transition-transform duration-500" />
                  </div>
                </div>
                <div className="w-full lg:w-2/3 text-white h-full overflow-y-auto pr-1 sm:pr-2 break-words">
                  <div className={`flex items-start gap-3 transition-all duration-300 ${isFading ? (dir === 1 ? '-translate-x-2 opacity-0' : 'translate-x-2 opacity-0') : 'translate-x-0 opacity-100'}`}>
                    <span className="text-3xl leading-none">“</span>
                    <div className="transition-opacity duration-300" key={active.name}>
                      <h3 className="text-xl sm:text-2xl font-semibold">
                        {active.name} — {active.title}
                      </h3>
                      {active.paragraphs.map((p, i) => (
                        <p key={i} className="mt-3 text-white/90 leading-relaxed">
                          {p}
                        </p>
                      ))}
                      <span className="mt-4 inline-block text-3xl leading-none">”</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-white/80">
                    <div className="h-2 w-2 rounded-full bg-emerald-300" />
                    <span className="text-sm">{active.status}</span>
                    <a
                      href={active.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center text-sm font-medium text-white hover:text-white/90 underline underline-offset-4"
                    >
                      Connect with me on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous profile"
            className="group absolute -left-3 xs:-left-4 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/10 hover:ring-white/30 transition-all duration-300 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 animate-pulse hover:animate-none"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:-translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next profile"
            className="group absolute -right-3 xs:-right-4 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/10 hover:ring-white/30 transition-all duration-300 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 animate-pulse hover:animate-none"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default PlacedShowcase


