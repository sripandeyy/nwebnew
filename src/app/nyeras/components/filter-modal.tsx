"use client"

import type React from "react"

import { useMemo } from "react"

import { useState } from "react"
import type { TableData } from "../types/leads"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: { course: string; action: string; myAction: string }) => void
  currentFilters: { course: string; action: string; myAction: string }
  leads: TableData[]
}

export default function FilterModal({ isOpen, onClose, onApplyFilters, currentFilters, leads }: FilterModalProps) {
  const [filters, setFilters] = useState(currentFilters)

  // Extract unique values for filter options
  const [courseOptions, actionOptions, myActionOptions] = useMemo(() => {
    const courses = new Set<string>()
    const actions = new Set<string>()
    const myActions = new Set<string>()

    leads.forEach((lead) => {
      courses.add(lead.course)
      actions.add(lead.action)
      myActions.add(lead.myaction)
    })

    return [Array.from(courses).sort(), Array.from(actions).sort(), Array.from(myActions).sort()]
  }, [leads])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setFilters({ course: "", action: "", myAction: "" })
  }

  const handleApply = () => {
    onApplyFilters(filters)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center border-b border-slate-800">
          <h3 className="font-semibold text-base">Filter Leads</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                id="course"
                name="course"
                value={filters.course}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
              >
                <option value="">All Courses</option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
                Action
              </label>
              <select
                id="action"
                name="action"
                value={filters.action}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
              >
                <option value="">All Actions</option>
                {actionOptions.map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="myAction" className="block text-sm font-medium text-gray-700 mb-1">
                My Action
              </label>
              <select
                id="myAction"
                name="myAction"
                value={filters.myAction}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
              >
                <option value="">All My Actions</option>
                {myActionOptions.map((myAction) => (
                  <option key={myAction} value={myAction}>
                    {myAction}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm transition-colors duration-200"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors duration-200 hover-lift"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

