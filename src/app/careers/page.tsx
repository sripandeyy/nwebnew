"use client"

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRightIcon, Rocket, TrendingUp, Globe, Users, Briefcase, Scale } from 'lucide-react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Topbar from '../components/Topbar'
import WorkWithUs from '../components/WorkWithUs'

const jobPostings = [
  {
    title: "Campus Ambassador",
    description: "Represent Nyeras on your campus and help us grow our community of learners.",
    responsibilities: [
      "Promote Nyeras services and events on campus",
      "Organize and lead study groups using our platform",
      "Provide feedback on student needs and preferences",
      "Assist in creating campus-specific content"
    ],
    requirements: [
      "Currently enrolled student with good academic standing",
      "Strong communication and leadership skills",
      "Passion for education and technology",
      "Active on social media platforms"
    ]
  },
  {
    title: "Business Development Associate",
    description: "Drive growth and forge partnerships to expand Nyeras reach and impact.",
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Develop and maintain relationships with key stakeholders",
      "Collaborate with cross-functional teams to create tailored solutions",
      "Analyze market trends and competitor activities"
    ],
    requirements: [
      "Bachelors degree in Business, Marketing, or related field",
      "2+ years of experience in business development or sales",
      "Strong negotiation and presentation skills",
      "Familiarity with the education or technology sector"
    ]
  }
]

const perks = [
  { title: "Innovation", description: "Be at the forefront of educational technology", Icon: Rocket },
  { title: "Growth", description: "Opportunities for personal and professional development", Icon: TrendingUp },
  { title: "Impact", description: "Make a difference in students' lives globally", Icon: Globe },
  { title: "Culture", description: "Collaborative and inclusive work environment", Icon: Users },
  { title: "Benefits", description: "Competitive salary and comprehensive benefits package", Icon: Briefcase },
  { title: "Work-Life Balance", description: "Flexible work arrangements to suit your lifestyle", Icon: Scale }
]

export default function CareersPage() {
  const [isWorkWithUsOpen, setIsWorkWithUsOpen] = useState(false)
  const [initialRole, setInitialRole] = useState<null | 'campus' | 'bd'>(null)

  const openApplication = (title: string) => {
    const role = title === 'Campus Ambassador' ? 'campus' : title === 'Business Development Associate' ? 'bd' : null
    if (role) {
      setInitialRole(role)
      setIsWorkWithUsOpen(true)
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pt-20">
      <Topbar />
      <Header />
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-slate-900 border-b border-slate-800">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Careers</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Become part of a dynamic team that is shaping the future of education.
        </p>
      </section>
      <main className="flex-grow container mx-auto px-4 py-16 sm:py-24">
  

        <section className="mb-20">
          <div className="space-y-10">
            {jobPostings.map((job, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-slate-200 dark:border-slate-800 hover:-translate-y-1">
                <div className="bg-slate-50 dark:bg-slate-850 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">{job.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-xl">Responsibilities:</h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="text-lg">{resp}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-8">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-xl">Requirements:</h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="text-lg">{req}</li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => openApplication(job.title)}
                    className="inline-flex items-center bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white py-3 px-8 rounded-xl text-base font-semibold shadow-md border border-slate-700/50 hover-lift transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-10 text-center">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-800 dark:text-slate-200 mb-4">
                  <perk.Icon size={44} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{perk.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-base">{perk.description}</p>
              </div>
            ))}
          </div>
        </section>

        
      </main>
      <Footer />
      <WorkWithUs isOpen={isWorkWithUsOpen} onClose={() => setIsWorkWithUsOpen(false)} initialRole={initialRole ?? undefined} />
    </div>
  )
}

