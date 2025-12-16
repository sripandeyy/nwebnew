"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, Briefcase, X, Sparkles, Rocket } from "lucide-react"
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isOpen])

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl my-8"
              style={{
                perspective: "1000px",
              }}
            >
              {/* Animated Background with Parallax */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                animate={{
                  x: mousePosition.x,
                  y: mousePosition.y,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />

              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  animate={{
                    x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                    y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}

              {/* Main Modal Content */}
              <motion.div
                className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-gray-900/10 hover:bg-gray-900/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.button>

                {/* Content */}
                <div className="p-8 md:p-12">
                  {!selectedRole && !showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Header */}
                      <div className="text-center mb-12">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="inline-block mb-4"
                        >
                          <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
                            <Rocket className="w-12 h-12 text-white" />
                          </div>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                          Want to Work With Us?
                        </h2>
                        <p className="text-gray-600 text-lg">
                          Choose your path and join our growing EdTech family
                        </p>
                      </div>

                      {/* Role Selection Cards */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Campus Ambassador Card */}
                        <motion.div
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: 5,
                            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedRole("campus")}
                          className="relative cursor-pointer group"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                          <div className="relative bg-white rounded-2xl p-8 border-2 border-transparent hover:border-blue-500 transition-all">
                            <div className="flex flex-col items-center text-center space-y-4">
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg"
                              >
                                <GraduationCap className="w-12 h-12 text-white" />
                              </motion.div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                Campus Ambassador
                              </h3>
                              <p className="text-gray-600">
                                Represent Nyeras in your college and help fellow students grow
                              </p>
                              <motion.div
                                className="flex items-center gap-2 text-blue-600 font-semibold"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <span>Apply Now</span>
                                <Sparkles className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Business Development Card */}
                        <motion.div
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: -5,
                            boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.5)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedRole("bd")}
                          className="relative cursor-pointer group"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                          <div className="relative bg-white rounded-2xl p-8 border-2 border-transparent hover:border-purple-500 transition-all">
                            <div className="flex flex-col items-center text-center space-y-4">
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg"
                              >
                                <Briefcase className="w-12 h-12 text-white" />
                              </motion.div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                Business Development
                              </h3>
                              <p className="text-gray-600">
                                Drive growth through sales and marketing excellence
                              </p>
                              <motion.div
                                className="flex items-center gap-2 text-purple-600 font-semibold"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <span>Apply Now</span>
                                <Sparkles className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Footer Text */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-8"
                      >
                        <p className="text-gray-600 relative inline-block">
                          <span className="relative z-10">Be a part of our growing EdTech family 🚀</span>
                          <motion.span
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                          />
                        </p>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Campus Ambassador Form */}
                  {selectedRole === "campus" && !showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ type: "spring", damping: 20 }}
                    >
                      <button
                        onClick={() => setSelectedRole(null)}
                        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
                      >
                        ← Back
                      </button>

                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                          Campus Ambassador Application
                        </h3>
                        <p className="text-gray-600">Fill in your details to join our team</p>
                      </div>

                      <form onSubmit={handleCampusSubmit} className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={campusForm.name}
                            onChange={(e) => setCampusForm({ ...campusForm, name: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            placeholder="Enter your full name"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            College Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={campusForm.college}
                            onChange={(e) => setCampusForm({ ...campusForm, college: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            placeholder="Enter your college name"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Department *
                          </label>
                          <input
                            type="text"
                            required
                            value={campusForm.department}
                            onChange={(e) => setCampusForm({ ...campusForm, department: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            placeholder="e.g., Computer Science"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={campusForm.phone_number}
                            onChange={(e) => setCampusForm({ ...campusForm, phone_number: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            placeholder="10-digit phone number"
                          />
                        </motion.div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="relative z-10">
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                          </span>
                        </motion.button>
                      </form>
                    </motion.div>
                  )}

                  {/* Business Development Form */}
                  {selectedRole === "bd" && !showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ type: "spring", damping: 20 }}
                    >
                      <button
                        onClick={() => setSelectedRole(null)}
                        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
                      >
                        ← Back
                      </button>

                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                          Business Development Application
                        </h3>
                        <p className="text-gray-600">Fill in your details to join our team</p>
                      </div>

                      <form onSubmit={handleBdSubmit} className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={bdForm.name}
                            onChange={(e) => setBdForm({ ...bdForm, name: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                            placeholder="Enter your full name"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={bdForm.email}
                            onChange={(e) => setBdForm({ ...bdForm, email: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                            placeholder="your.email@example.com"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={bdForm.phone_number}
                            onChange={(e) => setBdForm({ ...bdForm, phone_number: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                            placeholder="10-digit phone number"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white"
                          >
                            <option value="Fresher">Fresher</option>
                            <option value="Experienced">Experienced</option>
                          </select>
                        </motion.div>

                        <AnimatePresence>
                          {bdForm.experience_level === "Experienced" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                                placeholder="e.g., 2.5"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="relative z-10">
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                          </span>
                        </motion.button>
                      </form>
                    </motion.div>
                  )}

                  {/* Success Animation */}
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-block mb-6"
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                          <motion.svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <motion.path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        </div>
                      </motion.div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
                      <p className="text-gray-600 text-lg mb-8">
                        Thank you for your interest. We'll get back to you soon! 🎉
                      </p>
                      {/* Confetti particles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 rounded-full"
                          style={{
                            left: "50%",
                            top: "50%",
                            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 400,
                            y: (Math.random() - 0.5) * 400,
                            opacity: [1, 0],
                            scale: [1, 0],
                          }}
                          transition={{ duration: 1, delay: i * 0.05 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
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
