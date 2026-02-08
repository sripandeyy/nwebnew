"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { CheckCircle2, ArrowLeft, Award, BookOpen, Clock, Users, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import FloatingParticles from "./FloatingParticles"

const certificates = [
  { title: "Course Completion", pdf: "/internships/course.pdf" },
  { title: "Internship", pdf: "/internships/internship.pdf" },
  { title: "Project", pdf: "/internships/project.pdf" },
];

interface CurriculumModule {
  title: string
  topics: string[]
}

interface Course {
  title: string
  summary: string
  image?: string
  curriculum: CurriculumModule[]
  jobGuarantee?: boolean
}

interface PremiumCoursePageProps {
  course: Course
  domainName: string
}

const PremiumCoursePage = ({ course, domainName }: PremiumCoursePageProps) => {
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function submitCallback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    if (!name || !phone || !email) {
      setMessage("Please fill all fields")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/callback-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone_number: phone, email, course: course.title }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({} as any))
        throw new Error((j as any).error || "Failed to submit")
      }
      setMessage("Request submitted. We'll contact you soon.")
      setName("")
      setPhone("")
      setEmail("")
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  const premiumAddOns = [
    { title: "Advanced Projects", topics: ["Capstone with real client brief", "Code reviews", "Performance & optimization", "Documentation & handoff"] },
    { title: "Industry Tools & Best Practices", topics: ["Version control workflows", "CI/CD basics", "Issue tracking & Agile rituals", "Quality & testing standards"] },
    { title: "Career & Portfolio", topics: ["Portfolio polish", "ATS-ready resume", "LinkedIn & branding", "Mock interviews & feedback"] },
  ]
  const displayedCurriculum = [...course.curriculum, ...premiumAddOns]

  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <FloatingParticles count={10} color="purple" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/domains"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold group mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Domains
            </Link>
          </motion.div>

          {/* Course Image */}
          {course.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[28rem] rounded-3xl overflow-hidden shadow-2xl mb-12 group"
            >
              <motion.img
                src={course.image.startsWith('/') ? course.image : `/${course.image}`}
                alt={course.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Floating Badge on Image */}
              {course.jobGuarantee && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6"
                >
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl shadow-2xl backdrop-blur-sm">
                    <Award className="w-5 h-5" />
                    <span className="font-bold">Job Guarantee Program</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Course Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
              {course.title}
            </h1>

            {/* Summary */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {course.summary}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pb-20 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Curriculum Section */}
            <div className="lg:col-span-8 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">
                    Course Curriculum
                  </h2>
                </div>

                <div className="space-y-4">
                  {displayedCurriculum.map((module, index) => (
                    <motion.div
                      key={module.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="group relative"
                    >
                      {/* Glow Effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                      {/* Module Card */}
                      <div className="relative bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg group-hover:shadow-2xl group-hover:border-purple-200 transition-all duration-500">
                        {/* Module Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg"
                          >
                            {index + 1}
                          </motion.div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                            {module.title}
                          </h3>
                        </div>

                        {/* Topics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-16">
                          {module.topics.map((topic, topicIndex) => (
                            <motion.div
                              key={topic}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 + topicIndex * 0.05 }}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                                {topic}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certificates Section */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">Sample Certificates</h2>
                </div>

                <div className="relative">
                  <div className="relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-lg">
                    <iframe
                      key={currentCertIndex}
                      title={certificates[currentCertIndex].title}
                      src={certificates[currentCertIndex].pdf}
                      className="w-full h-96"
                    />
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                      <button
                        onClick={() => setCurrentCertIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1))}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="Previous certificate"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                      </button>
                      <p className="text-sm font-semibold text-gray-700">
                        {certificates[currentCertIndex].title} Certificate {currentCertIndex + 1} of {certificates.length}
                      </p>
                      <button
                        onClick={() => setCurrentCertIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1))}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="Next certificate"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 space-x-2">
                    {certificates.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCertIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentCertIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`View certificate ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="sticky top-24 space-y-6"
              >
                {/* Enroll Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-white/95 rounded-3xl p-8 shadow-2xl border border-gray-100">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">
                      Ready to Start?
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Speak with our counselor, get the detailed brochure, and claim placement assistance.
                    </p>
                    
                    <motion.a
                      href="/plans"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                    >
                      <span>Enroll Now</span>
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                {/* Request a Callback Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Request a Callback</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">Leave your details and our counselor will call you back.</p>
                    <form onSubmit={submitCallback} className="space-y-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        maxLength={100}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        maxLength={15}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        maxLength={150}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-60"
                      >
                        {submitting ? "Submitting..." : "Request a Callback"}
                      </button>
                      {message && (
                        <div className="text-sm text-center text-gray-700">{message}</div>
                      )}
                    </form>
                  </div>
                </div>

                {/* Course Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4"
                >
                  <h4 className="font-bold text-gray-900 text-lg mb-4">Course Highlights</h4>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Duration</p>
                      <p className="text-xs text-gray-500">6-12 months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Batch Size</p>
                      <p className="text-xs text-gray-500">20-30 students</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Certification</p>
                      <p className="text-xs text-gray-500">Industry Recognized</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PremiumCoursePage
