"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, CheckCircle, ArrowRight, BarChart2, Database, Code, PieChart, Layers, Award, Cpu, BookOpen, Users, FileText, Briefcase, MapPin, Clock, Calendar, Star } from 'lucide-react'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import Topbar from "@/app/components/Topbar"

export default function DataAnalyticsCourse() {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [expandedCurriculum, setExpandedCurriculum] = useState<number[]>([1])

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    roadmap: useRef<HTMLDivElement>(null),
    curriculum: useRef<HTMLDivElement>(null),
    tools: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (
          ref.current &&
          scrollPosition >= ref.current.offsetTop &&
          scrollPosition < ref.current.offsetTop + ref.current.offsetHeight
        ) {
          setActiveSection(section)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section: string) => {
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: "smooth",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      errors.phone = "Phone number must be 10 digits"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/offline/da", {
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

  const toggleCurriculum = (index: number) => {
    setExpandedCurriculum((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  }

  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  }

  const rotateAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: "linear" },
    },
  }

  return (
    <>
    <Topbar/>
    <Header/>
    <div className="min-h-screen bg-white overflow-hidden mt-24">
      {/* Quick Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col space-y-4">
          {Object.keys(sectionRefs).map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="group relative"
              aria-label={`Navigate to ${section} section`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section ? "bg-orange-600 scale-125" : "bg-gray-300 hover:bg-orange-400"
                }`}
              ></div>
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap capitalize">
                {section}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section ref={sectionRefs.hero} className="pt-20 pb-20 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-orange-200 opacity-20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-orange-300 opacity-20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6 inline-block"
            >
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium text-sm">
                <MapPin className="w-4 h-4 mr-2" /> 100% Offline Program
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeInUp} 
              className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
            >
              Welcome to <span className="text-orange-600">Nyeras</span> – your passport to
              <span className="relative ml-2">
                <span className="relative z-10"> Data Analytics </span>
                <motion.span 
                  className="absolute bottom-1 left-0 w-full h-4 bg-orange-200 -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                ></motion.span>
              </span>
              expertise!
            </motion.h1>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 mt-10"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-lg flex items-center border-l-4 border-orange-500 w-full md:w-auto"
              >
                <Calendar className="w-8 h-8 text-orange-500 mr-3" />
                <div className="text-left">
                  <p className="text-gray-600 text-sm">Starting Soon</p>
                  <p className="font-bold">New Batch: May 25th</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-lg flex items-center border-l-4 border-orange-500 w-full md:w-auto"
              >
                <Clock className="w-8 h-8 text-orange-500 mr-3" />
                <div className="text-left">
                  <p className="text-gray-600 text-sm">Duration</p>
                  <p className="font-bold">4 Months</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-lg flex items-center border-l-4 border-orange-500 w-full md:w-auto"
              >
                <MapPin className="w-8 h-8 text-orange-500 mr-3" />
                <div className="text-left">
                  <p className="text-gray-600 text-sm">Location</p>
                  <p className="font-bold">In-Person Classes</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="bg-orange-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-orange-700 inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll in Offline Program <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-16 flex justify-center space-x-6">
              <div className="text-center">
                <p className="text-orange-600 font-bold">nyeras_app</p>
              </div>
              <div className="text-center">
                <p className="text-orange-600 font-bold">www.nyeras.com</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section ref={sectionRefs.features} className="py-20 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-orange-100 opacity-50"
          animate={rotateAnimation.animate}
          initial={rotateAnimation.initial}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-orange-200 max-w-[100px] mx-auto mb-4"
            ></motion.div>
            <h2 className="inline-block text-4xl font-bold text-gray-800 relative">
              Key <span className="text-orange-600">Features</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-200"></span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
              Our offline Data Analytics course offers hands-on learning with industry experts
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: <BookOpen className="h-10 w-10 text-orange-600" />,
                title: "Exclusive Access to LMS Portal",
                description: "Get 24/7 access to our comprehensive Learning Management System",
              },
              {
                icon: <Users className="h-10 w-10 text-orange-600" />,
                title: "Live Interactive Classes",
                description: "Engage with instructors in real-time interactive sessions",
              },
              {
                icon: <Award className="h-10 w-10 text-orange-600" />,
                title: "7+ Years Industrial Expert Trainers",
                description: "Learn from professionals with extensive industry experience",
              },
              {
                icon: <FileText className="h-10 w-10 text-orange-600" />,
                title: "Dedicated Course Materials",
                description: "Access comprehensive study materials designed for optimal learning",
              },
              {
                icon: <Briefcase className="h-10 w-10 text-orange-600" />,
                title: "2 - Realtime Projects with Internship",
                description: "Apply your skills in real-world projects with internship opportunities",
              },
              {
                icon: <Users className="h-10 w-10 text-orange-600" />,
                title: "Mentorship till Placement",
                description: "Receive guidance and support until you secure your desired position",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-orange-200 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full -mt-10 -mr-10 opacity-50"></div>
                <div className="relative z-10">
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mb-4 text-orange-600"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section ref={sectionRefs.roadmap} className="py-20 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-40 left-10 w-40 h-40 rounded-full bg-orange-200 opacity-30"
          animate={floatAnimation.animate}
          initial={floatAnimation.initial}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-60 h-60 rounded-full bg-orange-100 opacity-40"
          animate={pulseAnimation.animate}
          initial={pulseAnimation.initial}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-orange-200 max-w-[100px] mx-auto mb-4"
            ></motion.div>
            <h2 className="inline-block text-4xl font-bold text-gray-800 relative">
              The <span className="text-orange-600">Roadmap</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-200"></span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
              Your journey to becoming a Data Analytics professional starts here
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {[
              "Introduction to Data Analytics",
              "Data Visualization and Dashboards with Excel and MS POWER BI",
              "Python Project for Data Science",
              "Excel Basics for Data Analysis",
              "Python for Data Science, AI & Development",
              "Databases and SQL for Data Science with Python",
            ].map((step, index) => (
              <motion.div 
                key={index} 
                variants={fadeInLeft} 
                custom={index}
                whileHover={{ x: 10 }}
                className="relative pl-10 pb-10"
              >
                {index < 5 && (
                  <motion.div 
                    className="absolute left-4 top-4 w-0.5 h-full bg-orange-300"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    viewport={{ once: true }}
                  ></motion.div>
                )}
                <motion.div 
                  className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {index + 1}
                </motion.div>
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h3 className="text-xl font-semibold text-gray-800">{step}</h3>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-orange-600 font-bold">nyeras_app | www.nyeras.com | The Nyeras Groups</p>
          </motion.div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section ref={sectionRefs.curriculum} className="py-20 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-50 opacity-70"
          animate={rotateAnimation.animate}
          initial={rotateAnimation.initial}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-orange-200 max-w-[100px] mx-auto mb-4"
            ></motion.div>
            <h2 className="inline-block text-4xl font-bold text-gray-800 relative">
              Course <span className="text-orange-600">Curriculum</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-200"></span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
              Comprehensive offline training with hands-on projects and expert guidance
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {[
              {
                title: "Introduction to Data Analytics",
                topics: ["Data Analytics process", "Different data roles", "Different types", "Data analysis process"],
              },
              {
                title: "Excel Basics",
                topics: [
                  "Working knowledge of Excel for Data Analysis",
                  "Spreadsheet tasks",
                  "Employ data quality techniques",
                  "Analyze data in spreadsheets",
                ],
              },
              {
                title: "Data Visualization and Dashboards with Excel and MS POWER BI",
                topics: [
                  "Create basic visualizations",
                  "Important role charts",
                  "Construct Advanced Charts and Visualizations",
                  "Build and Share Interactive Dashboards",
                ],
              },
              {
                title: "Python for Data Science, AI & Development",
                topics: [
                  "Basics of Python",
                  "Apply Python Programming",
                  "Demonstrate proficiency in using Python libraries",
                ],
              },
              {
                title: "Python Project for Data Science",
                topics: [
                  "Role of a Data Scientist / Data Analyst working on a real project",
                  "Demonstrate your Skills in Python",
                  "Apply Functions with Data in Python",
                ],
              },
              {
                title: "Databases and SQL for Data Science with Python",
                topics: [
                  "Analyze data within a database using SQL and Python",
                  "Create a relational database and work with multiple tables using DDL commands",
                  "Construct basic to intermediate level SQL queries using DML commands",
                  "Compose more powerful queries with advanced SQL techniques like views, transactions, stored procedures, and joins",
                ],
              },
            ].map((module, index) => (
              <motion.div 
                key={index} 
                variants={fadeInRight}
                custom={index}
                className="mb-6"
              >
                <motion.button
                  onClick={() => toggleCurriculum(index + 1)}
                  className="w-full flex items-center justify-between bg-orange-100 p-5 rounded-xl hover:bg-orange-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <motion.span 
                      className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mr-4"
                      whileHover={{ rotate: 10 }}
                    >
                      {index + 1}
                    </motion.span>
                    <h3 className="text-xl font-semibold text-gray-800">{module.title}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCurriculum.includes(index + 1) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-orange-600" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {expandedCurriculum.includes(index + 1) && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white p-6 border border-orange-100 rounded-b-xl shadow-inner">
                        <ul className="space-y-3">
                          {module.topics.map((topic, topicIndex) => (
                            <motion.li 
                              key={topicIndex} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * topicIndex }}
                            >
                              <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{topic}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
          </motion.div>
        </div>
      </section>

      {/* Tools */}
      <section ref={sectionRefs.tools} className="py-20 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-orange-100 opacity-40"
          animate={floatAnimation.animate}
          initial={floatAnimation.initial}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-orange-200 max-w-[100px] mx-auto mb-4"
            ></motion.div>
            <h2 className="inline-block text-4xl font-bold text-gray-800 relative">
              <span className="text-orange-600">Tools</span> You'll Master
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-200"></span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
              Industry-standard tools taught in our offline classroom sessions
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: <BarChart2 />, name: "Excel" },
              { icon: <PieChart />, name: "Power BI" },
              { icon: <Code />, name: "Python" },
              { icon: <Database />, name: "SQL" },
              { icon: <Layers />, name: "Pandas" },
              { icon: <Cpu />, name: "NumPy" },
              { icon: <BarChart2 />, name: "Matplotlib" },
              { icon: <PieChart />, name: "Tableau" },
            ].map((tool, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -15, 
                  boxShadow: "0 15px 30px -10px rgba(249, 115, 22, 0.3)",
                  backgroundColor: "rgba(255, 237, 213, 0.5)" 
                }}
                className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 group transition-all duration-300"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <motion.div 
                    className="text-orange-600"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {tool.icon}
                  </motion.div>
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={sectionRefs.contact} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 p-8 md:p-12 text-white"
              >
                <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h2>
                <p className="mb-8">
                  Enroll in our <span className="font-bold underline">offline Data Analytics course</span> today and take the first step towards becoming a data professional. Fill out the form and our team will get back to you shortly.
                </p>

                <div className="space-y-4">
                  {[
                    "Flexible batch timings for working professionals",
                    "Limited seats to ensure personalized attention",
                    "Placement assistance with top companies",
                    "Certificate upon successful completion"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="h-5 w-5 mr-2 mt-1" />
                      </motion.div>
                      <p>{item}</p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-10 p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-300 mr-1" />
                    <Star className="h-5 w-5 text-yellow-300 mr-1" />
                    <Star className="h-5 w-5 text-yellow-300 mr-1" />
                    <Star className="h-5 w-5 text-yellow-300 mr-1" />
                    <Star className="h-5 w-5 text-yellow-300 mr-1" />
                  </div>
                  <p className="mt-2 italic text-sm">
                    "The offline classroom experience at Nyeras was exceptional. The hands-on training and personal attention from instructors made all the difference in my learning journey."
                  </p>
                  <p className="mt-2 font-semibold">- Recent Graduate</p>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 bg-white p-8 md:p-12 relative overflow-hidden"
              >
                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full -mt-20 -mr-20 opacity-50"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative z-10">
                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="h-full flex flex-col items-center justify-center text-center py-10"
                    >
                      <motion.div 
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          backgroundColor: ["#dcfce7", "#bbf7d0", "#dcfce7"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
                      <p className="text-gray-600 mb-8">
                        Your application has been successfully submitted. Our team will contact you shortly about our <span className="font-bold">offline Data Analytics course</span>.
                      </p>
                      <motion.button
                        onClick={() => setFormSubmitted(false)}
                        className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Submit Another Application
                      </motion.button>
                    </motion.div>
                  ) : (
                    <>
                      <motion.h3 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold text-gray-800 mb-6"
                      >
                        Enroll in Offline Program
                      </motion.h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-md border ${
                              formErrors.name ? "border-red-500" : "border-gray-300"
                            } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                            placeholder="Enter your full name"
                          />
                          <AnimatePresence>
                            {formErrors.name && (
                              <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-1 text-sm text-red-600"
                              >
                                {formErrors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-md border ${
                              formErrors.email ? "border-red-500" : "border-gray-300"
                            } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                            placeholder="Enter your email address"
                          />
                          <AnimatePresence>
                            {formErrors.email && (
                              <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-1 text-sm text-red-600"
                              >
                                {formErrors.email}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-md border ${
                              formErrors.phone ? "border-red-500" : "border-gray-300"
                            } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                            placeholder="Enter your phone number"
                          />
                          <AnimatePresence>
                            {formErrors.phone && (
                              <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-1 text-sm text-red-600"
                              >
                                {formErrors.phone}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          className={`w-full bg-orange-600 text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-orange-700 transition-colors flex items-center justify-center ${
                            isLoading ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors z-10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
    <Footer/>
    </>
  )
}
