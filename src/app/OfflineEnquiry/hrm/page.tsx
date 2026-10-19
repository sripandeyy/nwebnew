"use client"

import type React from "react"

import { Clock, MapPin, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Header from "../../components/Header"
import Topbar from "../../components/Topbar"
import Footer from "../../components/Footer"
// Animation styles
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-orange-100 opacity-80"></div>

      {/* Animated circles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 150 + 50
        const left = Math.random() * 100
        const top = Math.random() * 100
        const animationDuration = Math.random() * 20 + 15
        const delay = Math.random() * 10
        const opacity = Math.random() * 0.15 + 0.05

        return (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity: opacity,
              animation: `float ${animationDuration}s infinite ease-in-out ${delay}s`,
            }}
          />
        )
      })}

      {/* Animated lines */}
      {Array.from({ length: 15 }).map((_, i) => {
        const width = Math.random() * 150 + 100
        const height = Math.random() * 3 + 1
        const left = Math.random() * 100
        const top = Math.random() * 100
        const rotate = Math.random() * 360
        const animationDuration = Math.random() * 25 + 20
        const delay = Math.random() * 10
        const opacity = Math.random() * 0.1 + 0.05

        return (
          <div
            key={`line-${i}`}
            className="absolute bg-orange-300"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity: opacity,
              transform: `rotate(${rotate}deg)`,
              animation: `floatSlow ${animationDuration}s infinite ease-in-out ${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}

// Scroll animation hook
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll(".animate-on-scroll")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])
}

export default function HrCoursePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Use the scroll animation hook
  useScrollAnimation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/offline/hrm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setFormSubmitted(true)
        setFormData({ name: "", email: "", phone: "" })
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-15px, 15px) rotate(5deg); }
          50% { transform: translate(15px, -15px) rotate(-5deg); }
          75% { transform: translate(-15px, -15px) rotate(3deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes floatSlow {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .shimmer-bg {
          background: linear-gradient(90deg, 
            rgba(255,237,213,0.5) 0%, 
            rgba(255,247,237,0.8) 25%, 
            rgba(255,237,213,0.5) 50%, 
            rgba(255,247,237,0.8) 75%, 
            rgba(255,237,213,0.5) 100%);
          background-size: 200% 100%;
          animation: shimmer 8s infinite linear;
        }
        
        .pulse-on-hover:hover {
          animation: pulse 2s infinite ease-in-out;
        }
        
        .section-container {
          padding: 3rem 2rem;
          margin: 2.5rem 0;
          border-radius: 1.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .section-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.15);
        }
        
        @media (min-width: 768px) {
          .section-container {
            padding: 4.5rem 3.5rem;
            margin: 3.5rem 0;
          }
        }
      `}</style>

      <div className="min-h-screen relative">
        <AnimatedBackground />
        <Topbar />
        <Header />

        <div className="relative px-4 md:px-8 lg:px-12 z-10 mt-24">
          {/* Hero Section */}
          <section id="hero" className="section-container shimmer-bg animate-on-scroll mt-12 md:py-12">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Human Resource Management Training & Internship
              </h1>
              <p className="mt-4 text-gray-600">
                Kickstart your HR career with our comprehensive training and internship program. Gain practical skills
                and industry insights to excel in the field of Human Resources.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-600">90 Days</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-600">Nyeras Corporate Office, Bangalore</span>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="#enroll"
                  className="inline-block rounded-md bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600 transition-all hover:shadow-lg pulse-on-hover"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="section-container shimmer-bg animate-on-scroll">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">About the Program</h2>
              <p className="mt-4 text-gray-600">
                Our 90-day Human Resource Management Training & Internship program offers a comprehensive, hands-on
                learning experience that combines theoretical knowledge with practical skills. The program is structured
                in two phases: 45 days of instructor-led classroom training followed by 45 days of practical internship
                in a real HR department. Whether you&apos;re looking to start a career in HR or enhance your existing skills,
                this program provides you with both the knowledge and practical experience needed to excel in the HR
                field.
              </p>
            </div>
          </section>

          {/* CEO Section */}
          <section id="ceo" className="section-container shimmer-bg animate-on-scroll">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-orange-200 shadow-xl">
                    <img
                      src="/pavan.jpeg"
                      alt="CEO Portrait"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Meet Your Instructor</h2>
                  <h3 className="text-xl font-semibold text-orange-500 mt-2">Vajrala Pavan Samudra, Founder & CEO - Nyeras Edutech and Innovations Pvt. Ltd.</h3>
                  <p className="mt-4 text-gray-600">
                    With an MBA in Human Resources and currently pursuing a Ph.D. in HR, Pavan secured State Rank 95 in the Research Entrance Exam 2024.
                  </p>
                  <p className="mt-4 text-gray-600">
                    With over 9 years of experience in Human Resources and Leadership Development, he has guided numerous HR professionals in shaping their careers and implementing strategic HR solutions across various industries.
                  </p>
                  <p className="mt-4 text-gray-600">
                    His hands-on approach and industry insights go beyond theoretical knowledge, equipping you with practical skills to navigate the complexities of modern HR management.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section id="roadmap" className="section-container shimmer-bg animate-on-scroll">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">90-Day Program Structure</h2>
              <p className="mt-4 text-gray-600">
                Our comprehensive program combines classroom training with practical internship experience to provide
                you with both theoretical knowledge and hands-on skills.
              </p>
            </div>
            <div className="mt-12 space-y-8">
              <div className="relative">
                <div className="absolute left-0 top-0 ml-4 h-full w-0.5 bg-orange-200 md:ml-6" />
                <div className="space-y-8 md:space-y-12">
                  {/* Phase 1 */}
                  <div className="relative">
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white md:ml-2 animate-pulse">
                      1
                    </div>
                    <div className="ml-12 md:ml-16">
                      <h3 className="text-xl font-bold text-orange-500">Phase 1: Classroom Training (Day 1-45)</h3>
                      <p className="mt-2 text-gray-600">Instructor-Led by Industry Experts</p>
                      <div className="mt-3 rounded-lg border border-orange-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 pulse-on-hover">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-orange-600">
                              Module 1: Introduction to HR & Organizational Behavior
                            </h4>
                            <ul className="mt-2 list-inside space-y-1 text-gray-600">
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Introduction to HRM, organizational behavior, and employee lifecycle</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>HR policies, compliance, and case studies on HR strategies</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-orange-600">
                              Module 2: Talent Acquisition & Workforce Planning
                            </h4>
                            <ul className="mt-2 list-inside space-y-1 text-gray-600">
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Manpower planning, strategic recruitment, and behavioral interviewing</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Applicant tracking systems, HR analytics, and resume screening</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-orange-600">Module 3-5: Performance, Compensation & L&D</h4>
                            <ul className="mt-2 list-inside space-y-1 text-gray-600">
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>KPIs, performance appraisals, and employee engagement strategies</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Compensation structures, payroll processing, and benefits management</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Training needs analysis and L&D strategies for organizations</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-orange-600">Module 6-9: Advanced HR & Capstone Project</h4>
                            <ul className="mt-2 list-inside space-y-1 text-gray-600">
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>HR analytics, AI in HR, and HR tech platforms</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Industrial relations, labor laws, and HR compliance</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Strategic HRM, digital transformation, and change management</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Capstone project, certification exam, and networking event</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="relative">
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white md:ml-2 animate-pulse">
                      2
                    </div>
                    <div className="ml-12 md:ml-16">
                      <h3 className="text-xl font-bold text-orange-500">
                        Phase 2: Practical Internship & Industry Project (Day 46-90)
                      </h3>
                      <p className="mt-2 text-gray-600">Hands-on Experience in HR Department</p>
                      <div className="mt-3 rounded-lg border border-orange-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 pulse-on-hover">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-orange-600">
                              Week 1-2: Talent Acquisition & Employee Engagement
                            </h4>
                            <ul className="mt-2 list-inside space-y-1 text-gray-600">
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Assist with job postings, resume screenings, and interview processes</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Support onboarding programs and employee engagement activities</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-orange-600">Week 3-4: Payroll & HR Analytics</h4>
                            <ul className="mt-2 list-inside space-y-1 text-gray-600">
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Assist in processing payroll and managing benefits</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Develop HR dashboards using tools like Excel/PowerBI</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-orange-600">Week 5-6: Compliance & Strategy</h4>
                            <ul className="mt-2 list-inside space-y-1 text-gray-600">
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Draft HR policies and assist in legal compliance audits</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Work on HR transformation projects and strategic HR plans</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-orange-600">Week 7: Final Project & Certification</h4>
                            <ul className="mt-2 list-inside space-y-1 text-gray-600">
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Present your internship project to HR mentors and peers</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="mr-2 mt-1 h-4 w-4 flex-none text-orange-500" />
                                <span>Receive final evaluation, feedback, and certification</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enrollment Form Section */}
          <section id="enroll" className="section-container shimmer-bg animate-on-scroll bg-orange-50 rounded-lg">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Enroll Now</h2>
              <p className="mt-4 text-gray-600">
                Fill out the form below to secure your spot in our upcoming HR Management Training & Internship program.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-md">
              {formSubmitted ? (
                <div className="rounded-lg bg-white p-8 shadow-lg text-center">
                  <h3 className="text-xl font-medium text-orange-500 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your application has been submitted successfully. Our team will contact you shortly with more
                    details.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 inline-block rounded-md bg-orange-500 px-6 py-2 font-medium text-white hover:bg-orange-600 transition-all hover:shadow-lg pulse-on-hover"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70 transition-all duration-300 hover:shadow-lg pulse-on-hover"
                      >
                        {isLoading ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="section-container shimmer-bg animate-on-scroll">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-4 text-gray-600">
                Find answers to common questions about our Human Resource Management Training & Internship program.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              {[
                {
                  question: "What are the prerequisites for joining the program?",
                  answer:
                    "The program is open to graduates and professionals with a keen interest in Human Resources. No prior HR experience is required.",
                },
                {
                  question: "What skills will I gain from this program?",
                  answer:
                    "You will gain expertise in talent acquisition, employee engagement, performance management, compensation and benefits, HR analytics, and HR compliance.",
                },
                {
                  question: "Will I receive a certificate after completing the program?",
                  answer:
                    "Yes, you will receive a certificate of completion upon successfully completing the training and internship program.",
                },
                {
                  question: "How long is the program?",
                  answer:
                    "The program runs for 90 days in a hybrid mode. It includes 45 days of classroom training followed by 45 days of practical internship, allowing you to gain both theoretical knowledge and hands-on experience.",
                },
                {
                  question: "What is the program structure?",
                  answer:
                    "The program is divided into two phases: Phase 1 consists of 45 days of classroom training with 9 comprehensive modules covering all aspects of HR. Phase 2 is a 45-day practical internship where you'll work in an actual HR department applying what you've learned.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 pulse-on-hover"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section-container shimmer-bg animate-on-scroll">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Contact Us</h2>
              <p className="mt-4 text-gray-600">
                Have more questions? Reach out to our team for more information about the program.
              </p>
              <div className="mt-8">
                <a
                  href="#enroll"
                  className="inline-block rounded-md bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600 transition-all duration-300 hover:shadow-lg pulse-on-hover"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}
