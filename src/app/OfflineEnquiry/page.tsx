"use client"

import { useState} from "react"

import { Briefcase, Code, Database, Globe, Laptop, MapPin, Phone, Server} from "lucide-react"
import Header from "../components/Header"
import Topbar from "../components/Topbar"
import Footer from "../components/Footer"
import Chat from "../components/Chatbot"
import Head from "next/head"
export default function HomePage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [successMessage, setSuccessMessage] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/offline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSuccessMessage("Form submitted successfully!")
        setFormData({ name: "", email: "", phone: "" })
      }
    } catch (error) {
      console.error("Error submitting form", error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <>
      <Head>
        <title>Java Full Stack Developer Bootcamp</title>
        <meta
          name="description"
          content="Join our intensive offline program in Hyderabad and become a Java Full Stack Developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="follow, index" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <Topbar />
        <Header />

        <main className="container mx-auto px-4 py-12 mt-24">
          <section className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-4 animate-fade-in-down">
              Your Journey to Becoming a Java Full Stack Developer
            </h2>
            <p className="text-xl text-orange-700 mb-8 animate-fade-in-up">
              Join our intensive offline program in Hyderabad
            </p>
            <a
              href="#enroll"
              className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-orange-700 transition duration-300 inline-block animate-pulse"
            >
              Start Your Journey
            </a>
          </section>

          <section id="roadmap" className="relative mb-24">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-300 z-0"></div>

            <div className="relative z-10">
              {[
                { icon: Laptop, title: "Java Fundamentals", description: "Master the basics of Java programming" },
                { icon: Code, title: "Advanced Java", description: "Dive deep into Java SE and Java EE" },
                { icon: Database, title: "Databases & SQL", description: "Learn database management and SQL" },
                { icon: Server, title: "Backend Development", description: "Build robust server-side applications" },
                { icon: Globe, title: "Frontend Technologies", description: "Create responsive user interfaces" },
                {
                  icon: Briefcase,
                  title: "Full Stack Integration",
                  description: "Combine all skills for complete applications",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <h3 className="text-2xl font-semibold text-orange-700 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center z-20 shadow-lg transform hover:scale-110 transition duration-300">
                    <step.icon className="text-white" size={32} />
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </section>

          <section id="enroll" className="mb-24">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition duration-300">
              <h3 className="text-3xl font-bold text-orange-600 mb-6">Enroll Now</h3>
              {successMessage && <p className="text-green-600 text-center mb-4 animate-fade-in">{successMessage}</p>}
              <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Your Email Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter Your Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              />
            </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-orange-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-700 transition duration-300 transform hover:scale-105 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
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
                        Submitting...
                      </span>
                    ) : (
                      "Submit Enquiry"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>


          <section id="location" className="text-center">
            <h3 className="text-3xl font-bold text-orange-800 mb-6">Our Location</h3>
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition duration-300">
              <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4 animate-bounce" />
              <p className="text-xl text-gray-700 mb-2">Nyeras, Sri Towers, Flat no.601</p>
              <p className="text-gray-600">ROAD NO.1, KPHB colony, Kukatpally, Beside Holistic hospital</p>
              <p className="text-gray-600">Hyderabad, 500072</p>
              <p className="text-gray-600 mt-4">
                <Phone className="inline-block w-5 h-5 mr-2 text-orange-600" />
                <a href="tel:+917899232512" className="hover:text-orange-600 transition duration-300">
                  +91 7899232512
                </a>
              </p>
            </div>
          </section>
        </main>
        <Chat />
        <Footer />
      </div>
    </>
  )
}

