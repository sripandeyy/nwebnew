'use client';
import { useState } from 'react'
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/Chatbot';
import Alert, { AlertProvider } from '../utils/Alert';
import axios from 'axios'
export default function HireFromUsForm() {
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    recruiterName: '',
    recruiterEmail: '',
    recruiterPhone: '',
    companyName: '',
    companyWebsite: '',
    jobTitle: '',
    jobDescription: '',
    jobType: 'full-time',
    experienceLevel: 'entry',
    location: '',
    salary: '',
    skills: '',
    additionalInfo: '',
  })
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.post('/api/Hiring', formData)
      console.log('Server response:', response.data)

      Alert('Form submitted successfully! We will review your request and get back to you soon.')
      setFormData({
        recruiterName: '',
        recruiterEmail: '',
        recruiterPhone: '',
        companyName: '',
        companyWebsite: '',
        jobTitle: '',
        jobDescription: '',
        jobType: 'full-time',
        experienceLevel: 'entry',
        location: '',
        salary: '',
        skills: '',
        additionalInfo: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      Alert('An error occurred while submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
     <AlertProvider>
   <Topbar />
    <Header />
   
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-28">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#6600CC] mb-6 text-center">Hire Our Students</h1>
      <p className="text-gray-600 text-lg text-center mb-6">
        Fill out the form below to submit a job posting for our students.
      </p>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="recruiterName" className="block text-gray-700 text-sm font-bold mb-2">
            Recruiter Name
          </label>
          <input
            type="text"
            id="recruiterName"
            name="recruiterName"
            value={formData.recruiterName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="recruiterEmail" className="block text-gray-700 text-sm font-bold mb-2">
            Recruiter Email
          </label>
          <input
            type="email"
            id="recruiterEmail"
            name="recruiterEmail"
            value={formData.recruiterEmail}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="abcd@nyeras.com"
            required
          />
        </div>
        <div>
          <label htmlFor="recruiterPhone" className="block text-gray-700 text-sm font-bold mb-2">
            Recruiter Phone
          </label>
          <input
            type="tel"
            id="recruiterPhone"
            name="recruiterPhone"
            value={formData.recruiterPhone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
        <div>
          <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nyeras"
            required
          />
        </div>
        <div>
          <label htmlFor="companyWebsite" className="block text-gray-700 text-sm font-bold mb-2">
            Company Website
          </label>
          <input
            type="url"
            id="companyWebsite"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="https://www.example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-gray-700 text-sm font-bold mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Software Engineer"
            required
          />
        </div>
        <div>
          <label htmlFor="jobType" className="block text-gray-700 text-sm font-bold mb-2">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <div>
          <label htmlFor="experienceLevel" className="block text-gray-700 text-sm font-bold mb-2">
            Experience Level
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="entry">Entry Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="New York, NY (or Remote)"
            required
          />
        </div>
        <div>
          <label htmlFor="salary" className="block text-gray-700 text-sm font-bold mb-2">
            Salary Range (Optional)
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="eg. 6LPA-10LPA"
          />
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="jobDescription" className="block text-gray-700 text-sm font-bold mb-2">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          placeholder="Describe the job role, responsibilities, and requirements..."
          required
        ></textarea>
      </div>
      <div className="mt-6">
        <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
          Required Skills
        </label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., JavaScript, React, Node.js"
          required
        />
        <p className="text-gray-600 text-xs italic mt-1">Enter skills separated by commas</p>
      </div>
      <div className="mt-6">
        <label htmlFor="additionalInfo" className="block text-gray-700 text-sm font-bold mb-2">
          Additional Information (Optional)
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          placeholder="Any other details you&apos;d like to share..."
        ></textarea>
      </div>
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#6600CC] hover:bg-[#4d0099] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6600CC] transition duration-150 ease-in-out w-full ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
        </button>
      </div>
    </form>
    </div>
    </div>
    <ChatBot />
  
    <Footer />
    </AlertProvider>
    </>
    )
}

