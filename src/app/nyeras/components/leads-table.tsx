"use client"

import { useState } from "react"
import type { TableData } from "../types/leads"
import ConfirmationModal from "./confirmation-modal"
import { Mail, Phone } from "lucide-react"
interface LeadsTableProps {
  data: TableData[]
  onActionChange: (id: string, value: string) => void
  onDelete: (id: string) => void
  onNotesChange: (id: string, notes: string) => void
  selectedLeads: string[]
  onSelectLead: (id: string, selected: boolean) => void
  onSelectAll: (selected: boolean) => void
}

export default function LeadsTable({
  data,
  onActionChange,
  onDelete,
  onNotesChange,
  selectedLeads,
  onSelectLead,
  onSelectAll,
}: LeadsTableProps) {
  const [editingNoteIndex, setEditingNoteIndex] = useState<string | null>(null)
  const [noteText, setNoteText] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    index: string | null
  }>({
    isOpen: false,
    index: null,
  })

  const actionOptions = ["Not Reviewed", "Call Again", "Not Interested", "Reviewed", "Enrolled"]

  const actionColors: { [key: string]: string } = {
    "Not Reviewed": "bg-gray-50",
    "Call Again": "bg-yellow-50",
    "Not Interested": "bg-red-50",
    Reviewed: "bg-blue-50",
    Enrolled: "bg-green-50",
  }

  const handleEditNotes = (id: string, currentNotes = "") => {
    setEditingNoteIndex(id)
    setNoteText(currentNotes)
  }

  const handleSaveNotes = (id: string) => {
    onNotesChange(id, noteText)
    setEditingNoteIndex(null)
    setNoteText("")
  }

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmation({
      isOpen: true,
      index: id,
    })
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.index !== null) {
      onDelete(deleteConfirmation.index)
    }
    setDeleteConfirmation({
      isOpen: false,
      index: null,
    })
  }

  return (
    <>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                      onChange={(e) => onSelectAll(e.target.checked)}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Course
                  </th>
                  <th
                    scope="col"
                    className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    My Action
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Assigned To
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Notes
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-6 py-4 text-center text-gray-500">
                      No leads found. Try adjusting your filters or add a new lead.
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr
                      key={index}
                      className={`${actionColors[row.myaction]} transition-colors duration-200 hover:bg-gray-50`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                          checked={selectedLeads.includes(row.id)}
                          onChange={(e) => onSelectLead(row.id, e.target.checked)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">{row.email}</span>
                          <a
                            href={`mailto:${row.email}`}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">{row.phone}</span>
                          <a
                            href={`tel:${row.phone}`}
                            className="text-green-600 hover:text-green-800 transition-colors duration-200"
                          >
                            <Phone className="w-5 h-5" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.course}</td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={row.myaction}
                          onChange={(e) => onActionChange(row.id, e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        >
                          {actionOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.assignedto || "None"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingNoteIndex === row.id ? (
                          <div className="flex items-center space-x-2">
                            <textarea
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                              rows={2}
                            />
                            <button
                              onClick={() => handleSaveNotes(row.id)}
                              className="bg-green-500 hover:bg-green-600 text-white rounded p-1"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm truncate max-w-[150px]">{row.notes || "No notes"}</span>
                            <button
                              onClick={() => handleEditNotes(row.id, row.notes)}
                              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteClick(row.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, index: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
      />
    </>
  )
}
