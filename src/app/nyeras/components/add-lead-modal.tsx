"use client"

import type React from "react"
import { useState } from "react"
import { Loader2, UserPlus, Copy, X, User, Mail, Phone, BookOpen } from "lucide-react"

interface AddLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onAddLead: (lead: {
    name: string
    email: string
    phone: string
    course: string
    action: string
    date: string
    myaction: string
    timestamp: string
    notes: string
    assignedTo: string
  }) => void
  userEmail?: string
}

export default function AddLeadModal({ isOpen, onClose, onAddLead, userEmail = '' }: AddLeadModalProps) {
  if (!isOpen) return null
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/crm/add-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          assignedTo: userEmail,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add lead")
      }

      const now = new Date()
      const newLead: {
        name: string
        email: string
        phone: string
        course: string
        action: string
        date: string
        myaction: string
        timestamp: string
        notes: string
        assignedTo: string
      } = {
        ...formData,
        action: "Added Lead by User",
        date: now.toLocaleDateString() + ", " + now.toLocaleTimeString(),
        myaction: "Not Reviewed",
        timestamp: now.toISOString(),
        notes: "No notes",
        assignedTo: userEmail,
      }

      onAddLead(newLead)
      onClose()
    } catch (error) {
      console.error("Error adding lead:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const courseOptions = [
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
    "Java Full Stack Development (Offline)",
    "Other",
  ]

  const copyFormLink = () => {
    navigator.clipboard.writeText("https://nyeras.com/nyeras/form/7f3a9c2d-1e64-4b8f-92f1-5a6d8e3b7c4e")
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-slate-300" />
            <h3 className="font-semibold text-lg">Add New Lead</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyFormLink}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white flex items-center gap-1.5 transition-colors duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 focus:outline-none"
              title="Copy Form Link"
              disabled={isLoading}
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Form Link</span>
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-full hover:bg-white/20 focus:ring-2 focus:ring-white/30 focus:outline-none"
              disabled={isLoading}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <User className="h-4 w-4 text-gray-500" />
                <span>
                  Full Name <span className="text-slate-900 font-bold">*</span>
                </span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-all duration-200 placeholder:text-gray-400"
                placeholder="Enter full name"
                required
                disabled={isLoading}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>
                  Email Address <span className="text-slate-900 font-bold">*</span>
                </span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-all duration-200 placeholder:text-gray-400"
                placeholder="example@email.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>
                  Phone Number <span className="text-slate-900 font-bold">*</span>
                </span>
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-all duration-200 placeholder:text-gray-400"
                placeholder="Enter phone number"
                required
                disabled={isLoading}
              />
            </div>

            {/* Course Field */}
            <div className="space-y-1.5">
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <span>
                  Interested Course <span className="text-slate-900 font-bold">*</span>
                </span>
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-all duration-200 appearance-none bg-white"
                required
                disabled={isLoading}
              >
                <option value="">Select a course</option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center min-w-[120px] focus:ring-2 focus:ring-slate-800 focus:ring-offset-1 focus:outline-none hover-lift"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span>Add Lead</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
