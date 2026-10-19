"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, Briefcase, X, ArrowRight, Rocket } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"

interface WorkWithUsProps {
  isOpen: boolean
  onClose: () => void
  initialRole?: RoleType
}

type RoleType = null | "campus" | "bd"
type ExperienceLevel = "Fresher" | "Experienced"

const WorkWithUs = ({ isOpen, onClose, initialRole }: WorkWithUsProps) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Campus Ambassador Form State
  const [campusForm, setCampusForm] = useState({
    name: "",
    college: "",
    department: "",
    phone_number: "",
  })

  // Business Development Form State
  const [bdForm, setBdForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    experience_level: "Fresher" as ExperienceLevel,
    years_of_experience: "",
  })

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedRole(null)
        setShowSuccess(false)
        setCampusForm({ name: "", college: "", department: "", phone_number: "" })
        setBdForm({ name: "", email: "", phone_number: "", experience_level: "Fresher", years_of_experience: "" })
      }, 300)
    }
  }, [isOpen])

  // Preselect role when opening, if provided
  useEffect(() => {
    if (isOpen && initialRole) {
      setSelectedRole(initialRole)
    }
  }, [isOpen, initialRole])

  const handleCampusSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.post("/api/campus-ambassador", campusForm)
      
      if (response.status === 200) {
        setShowSuccess(true)
        toast.success("Application submitted successfully! 🎉")
        setTimeout(() => {
          onClose()
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting campus ambassador form:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBdSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...bdForm,
        years_of_experience: bdForm.experience_level === "Experienced" ? parseFloat(bdForm.years_of_experience) : null,
      }

      const response = await axios.post("/api/bd-application", payload)
      
      if (response.status === 200) {
        setShowSuccess(true)
        toast.success("Application submitted successfully! 🎉")
        setTimeout(() => {
          onClose()
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting BD form:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/45 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl my-8"
            >
              {/* Main Modal Content */}
              <div className="relative rounded-3xl overflow-hidden glass-clear-card shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white bg-white/30 hover:bg-white/60 dark:bg-slate-800/30 dark:hover:bg-slate-800/60 border border-white/60 dark:border-white/20 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-6 sm:p-10">
                  {!selectedRole && !showSuccess && (
                    <div className="animate-fade-in">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="p-3.5 bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/80 dark:border-white/20 text-slate-950 dark:text-slate-100 rounded-2xl inline-flex mb-3 shadow-xs">
                          <Rocket className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mb-2 tracking-tight">
                          Want to Work With Us?
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                          Choose your path and join our growing EdTech family
                        </p>
                      </div>

                      {/* Role Selection Cards */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Campus Ambassador Card */}
                        <div
                          onClick={() => setSelectedRole("campus")}
                          className="cursor-pointer rounded-2xl p-6 glass-clear-card hover:scale-[1.02] transition-all flex flex-col justify-between group shadow-lg"
                        >
                          <div className="space-y-3">
                            <div className="p-3 bg-white/50 dark:bg-slate-700/50 backdrop-blur-md border border-white/80 dark:border-white/20 rounded-xl w-fit text-slate-950 dark:text-slate-100 shadow-xs">
                              <GraduationCap className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-black text-slate-950 dark:text-white">
                              Campus Ambassador
                            </h3>
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                              Represent Nyeras in your college and help fellow students grow.
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-300/60 dark:border-slate-700/60 text-xs font-black text-slate-950 dark:text-white flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                            <span>Apply Now</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Business Development Card */}
                        <div
                          onClick={() => setSelectedRole("bd")}
                          className="cursor-pointer rounded-2xl p-6 glass-clear-card hover:scale-[1.02] transition-all flex flex-col justify-between group shadow-lg"
                        >
                          <div className="space-y-3">
                            <div className="p-3 bg-white/50 dark:bg-slate-700/50 backdrop-blur-md border border-white/80 dark:border-white/20 rounded-xl w-fit text-slate-950 dark:text-slate-100 shadow-xs">
                              <Briefcase className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-black text-slate-950 dark:text-white">
                              Business Development
                            </h3>
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                              Drive institutional growth through sales, operations, and marketing.
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-300/60 dark:border-slate-700/60 text-xs font-black text-slate-950 dark:text-white flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                            <span>Apply Now</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Campus Ambassador Form */}
                  {selectedRole === "campus" && !showSuccess && (
                    <div className="animate-fade-in">
                      <button
                        onClick={() => setSelectedRole(null)}
                        className="mb-4 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        ← Back to Roles
                      </button>

                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                          Campus Ambassador Application
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Fill in your details to join our team</p>
                      </div>

                      <form onSubmit={handleCampusSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={campusForm.name}
                            onChange={(e) => setCampusForm({ ...campusForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            College Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={campusForm.college}
                            onChange={(e) => setCampusForm({ ...campusForm, college: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                            placeholder="Enter your college name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Department *
                          </label>
                          <input
                            type="text"
                            required
                            value={campusForm.department}
                            onChange={(e) => setCampusForm({ ...campusForm, department: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                            placeholder="e.g., Computer Science"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={campusForm.phone_number}
                            onChange={(e) => setCampusForm({ ...campusForm, phone_number: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                            placeholder="10-digit phone number"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 px-6 rounded-xl skeuo-btn-primary text-white font-extrabold text-sm disabled:opacity-50"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Business Development Form */}
                  {selectedRole === "bd" && !showSuccess && (
                    <div className="animate-fade-in">
                      <button
                        onClick={() => setSelectedRole(null)}
                        className="mb-4 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        ← Back to Roles
                      </button>

                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                          Business Development Application
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Fill in your details to join our team</p>
                      </div>

                      <form onSubmit={handleBdSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={bdForm.name}
                            onChange={(e) => setBdForm({ ...bdForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={bdForm.email}
                            onChange={(e) => setBdForm({ ...bdForm, email: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={bdForm.phone_number}
                            onChange={(e) => setBdForm({ ...bdForm, phone_number: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                            placeholder="10-digit phone number"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Experience Level *
                          </label>
                          <select
                            required
                            value={bdForm.experience_level}
                            onChange={(e) =>
                              setBdForm({
                                ...bdForm,
                                experience_level: e.target.value as ExperienceLevel,
                                years_of_experience: e.target.value === "Fresher" ? "" : bdForm.years_of_experience,
                              })
                            }
                            className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                          >
                            <option value="Fresher">Fresher</option>
                            <option value="Experienced">Experienced</option>
                          </select>
                        </div>

                        {bdForm.experience_level === "Experienced" && (
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                              Years of Experience *
                            </label>
                            <input
                              type="number"
                              required
                              step="0.1"
                              min="0"
                              max="50"
                              value={bdForm.years_of_experience}
                              onChange={(e) =>
                                setBdForm({ ...bdForm, years_of_experience: e.target.value })
                              }
                              className="w-full px-4 py-2.5 text-sm skeuo-input text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none"
                              placeholder="e.g., 2.5"
                            />
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 px-6 rounded-xl skeuo-btn-primary text-white font-extrabold text-sm disabled:opacity-50"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Success Screen */}
                  {showSuccess && (
                    <div className="text-center py-12 animate-fade-in">
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Rocket className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Application Submitted!</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Thank you for your interest. We&apos;ll get back to you soon! 🎉
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AnimatePresence>
  )
}

export default WorkWithUs
