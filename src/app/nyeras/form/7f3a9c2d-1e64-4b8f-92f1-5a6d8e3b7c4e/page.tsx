"use client"

import type React from "react"
import { useState } from "react"

export default function CourseRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    course: "",
    description: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/nyerasform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit form")
      setFormData({
        name: "",
        email: "",
        phone: "",

        website: "",
        course: "",
        description: "",
      })
      console.log("Form submitted successfully:", formData)
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = {
    "Select Domain": [
      "Java FullStack Development",
      "AI & ML",
      "Data Science",
      "Data Analytics",
      "AWS + DevOps",
      "Automation Testing",
      "Very Large Scale Integration",
      "Cyber Security",
      "Digital Marketing",
      "Human Resources",
      "Java Full Stack Development-Offline",
    ],
  }

  return (
    <>
      <title>Course Registration Form | Nyeras</title>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
          {/* Google Form-like header with orange accent */}
          <div className="h-3 w-full bg-orange-500"></div>

          {/* Header section */}
          <div className="p-8 pb-0 bg-orange-50 border-b border-orange-200">
            <h1 className="text-3xl font-medium text-gray-800">Transform Your Career with Nyeras</h1>
            <p className="text-gray-600 mt-3">
              Ready to boost your career? Our industry-recognized courses have helped 10,000+ students land their dream
              jobs with average salary increases of 45%. Limited-time scholarships available!
            </p>
            <div className="text-sm text-red-600 mt-4">* Required</div>
          </div>

          {submitted ? (
            <div className="py-16 px-8 flex flex-col items-center justify-center bg-white">
              <div className="text-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-green-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-medium text-gray-800">Thank you for your response!</h3>
                <p className="text-gray-600 mt-2">
                  Your response has been recorded. Our career advisor will contact you within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-orange-600 hover:text-orange-800 font-medium"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white">
              {/* Form fields - Google Form style */}
              <div className="py-6">
                {/* Name Field */}
                <div className="p-6 border-b border-gray-200">
                  <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your answer"
                    required
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="p-6 border-b border-gray-200">
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your answer"
                    required
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Field */}
                <div className="p-6 border-b border-gray-200">
                  <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your answer"
                    required
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>
                <div className="p-6 border-b border-gray-200">
                  <label className="block text-base font-medium text-gray-700 mb-4">
                    Interested Domain <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {Object.entries(categories).map(([category, courses]) => (
                      <div key={category} className="space-y-2">
                        {courses.map((course) => (
                          <div key={course} className="flex items-center">
                            <input
                              type="radio"
                              id={course}
                              name="course-radio"
                              value={course}
                              checked={formData.course === course}
                              onChange={() => setFormData((prev) => ({ ...prev, course }))}
                              required
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                            />
                            <label htmlFor={course} className="ml-3 block text-sm text-gray-700">
                              {course}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Website Field */}
                <div className="p-6 border-b border-gray-200">
                  <label htmlFor="website" className="block text-base font-medium text-gray-700 mb-2">
                    Website/Portfolio URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Your answer"
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Course Dropdown - Google Form style radio buttons */}

                {/* Description Field */}
                <div className="p-6 border-b border-gray-200">
                  <label htmlFor="description" className="block text-base font-medium text-gray-700 mb-2">
                    Tell us about your learning goals
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Your answer"
                    rows={4}
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors resize-y"
                  />
                </div>
              </div>

              {/* Footer with submit button - Google Forms style */}
              <div className="p-6 flex justify-between items-center bg-white">
                {/* <div className="text-sm text-gray-500">Your response will be recorded to improve our services</div> */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        website: "",
                        course: "",
                        description: "",
                      })
                    }}
                    className="text-orange-600 font-medium px-4 py-2 rounded-md hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear form
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>

              {/* Google Forms progress footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <div className="text-sm text-gray-500">
                  By submitting this form, you&apos;ll get exclusive access to course materials, free workshops, and
                  scholarship opportunities.
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

