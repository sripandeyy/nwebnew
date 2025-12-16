"use client"

import type React from "react"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { AlertTriangle, CheckCircle, X, XCircle } from "lucide-react"

/* ============================================================
   Custom Alert Component
   ------------------------------------------------------------
   Displays alert messages with dynamic styling based on type.
============================================================ */
interface AlertProps {
  message: string
  type: "success" | "error" | "warning"
  onClose: () => void
}

const CustomAlert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const alertConfig = {
    success: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    error: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-800",
      icon: <XCircle className="h-5 w-5 text-red-500" />,
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-800",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    },
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
      <div
        className={`${alertConfig[type].bg} ${alertConfig[type].text} border-l-4 ${alertConfig[type].border} p-4 rounded-lg shadow-lg flex items-center space-x-3`}
      >
        <div className="flex-shrink-0">{alertConfig[type].icon}</div>
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition" aria-label="Close alert">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

/* ============================================================
   Confirmation Dialog Component
   ------------------------------------------------------------
   Confirms user actions before proceeding.
============================================================ */
interface ConfirmationDialogProps {
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Confirm Leave Application</h2>
        <p className="mb-6 text-gray-700">Are you sure you want to apply for this leave?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Leave Summary Component
   ------------------------------------------------------------
   Displays total, used, and remaining leave counts.
============================================================ */
/* ============================================================
   Main LeaveForm Component
   ------------------------------------------------------------
   Handles the leave application form, submission,
   leave list, and associated state management.
============================================================ */
export default function LeaveForm() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [leaveType, setLeaveType] = useState("planned")
  const [reason, setReason] = useState("")
  const [appliedLeaves, setAppliedLeaves] = useState([
    {
      id: 1,
      from: "2023-06-01",
      to: "2023-06-03",
      type: "Planned",
      reason: "Family function",
      status: "Pending",
    },
    {
      id: 2,
      from: "2023-06-10",
      to: "2023-06-10",
      type: "Sick",
      reason: "Fever",
      status: "Approved",
    },
    {
      id: 3,
      from: "2023-06-15",
      to: "2023-06-15",
      type: "Emergency",
      reason: "Personal",
      status: "Rejected",
    },
  ])
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">("success")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [totalLeaves] = useState(12) // 12 leaves per year
  const [usedLeaves, setUsedLeaves] = useState(0)
  const [remainingLeaves, setRemainingLeaves] = useState(12)
  const [activeTab, setActiveTab] = useState<"apply" | "applied">("apply")

  /* ----------------------------------------------------------
     Form Submission Handler
     - Validates input and triggers confirmation dialog.
  ---------------------------------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  /* ----------------------------------------------------------
     Confirm Leave Application Handler
     - Validates planned leave date requirement.
     - Submits the leave application and updates state.
  ---------------------------------------------------------- */
  const confirmLeaveApplication = async () => {
    if (leaveType === "planned") {
      const today = new Date()
      const fromDateObj = new Date(fromDate)
      // Create a new date object for two days from now without mutating "today"
      const twoDaysFromNow = new Date()
      twoDaysFromNow.setDate(today.getDate() + 2)

      if (fromDateObj < twoDaysFromNow) {
        setAlertMessage("Planned leave must be applied at least 2 days in advance.")
        setAlertType("error")
        setShowAlert(true)
        setShowConfirmation(false)
        return
      }
    }

    const newLeave = {
      from: fromDate,
      to: toDate,
      type: leaveType.charAt(0).toUpperCase() + leaveType.slice(1),
      reason,
      status: "Pending",
    }

    try {
      const response = await fetch("/api/emp_requests/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeave),
      })

      if (!response.ok) throw new Error("Failed to submit leave request")

      setAppliedLeaves((prev) => [...prev, { id: prev.length + 1, ...newLeave }])

      // Calculate leave days (inclusive)
      const leaveDays = (new Date(toDate).getTime() - new Date(fromDate).getTime()) / (1000 * 3600 * 24) + 1
      setUsedLeaves((prev) => prev + leaveDays)
      setRemainingLeaves((prev) => prev - leaveDays)

      // Reset form
      setFromDate("")
      setToDate("")
      setLeaveType("planned")
      setReason("")

      setAlertMessage("Leave application submitted successfully!")
      setAlertType("success")
      setShowAlert(true)
      setShowConfirmation(false)
    } catch (error) {
      setAlertMessage("Error submitting leave application. Please try again.")
      setAlertType("error")
      setShowAlert(true)
    }
  }

  /* ----------------------------------------------------------
     Handle Withdraw Action
     - Removes a leave from the applied list.
  ---------------------------------------------------------- */
  const handleWithdraw = (id: number) => {
    setAppliedLeaves((prev) => prev.filter((leave) => leave.id !== id))
    setAlertMessage("Leave application withdrawn successfully!")
    setAlertType("success")
    setShowAlert(true)
  }

  return (
    <main className="flex-1 p-6 lg:ml-64 mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Leave Summary Section */}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("apply")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "apply"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Apply for Leave
            </button>
            <button
              onClick={() => setActiveTab("applied")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "applied"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Applied Leaves
            </button>
          </div>
        </div>

        {activeTab === "apply" ? (
          /* Leave Application Form */
          <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Apply for a Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">
                    From Date
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="fromDate"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">
                    To Date
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="toDate"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Leave
                </label>
                <select
                  id="leaveType"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                >
                  <option value="planned">Planned</option>
                  <option value="sick">Sick</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Leave
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  rows={4}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </section>
        ) : (
          /* Applied Leaves List */
          <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Applied Leaves</h2>
            <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              {appliedLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="border border-gray-200 p-4 rounded-md flex flex-col md:flex-row justify-between md:items-center gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          leave.status === "Approved"
                            ? "bg-green-500"
                            : leave.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      ></span>
                      <p className="font-semibold text-gray-900">{leave.type} Leave</p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : leave.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span> {leave.from} to {leave.to}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Reason:</span> {leave.reason}
                    </p>
                  </div>
                  <div>
                    {leave.status === "Pending" && (
                      <button
                        onClick={() => handleWithdraw(leave.id)}
                        className="text-sm bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 rounded transition-colors"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {appliedLeaves.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No leaves applied yet.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Alert & Confirmation Overlays */}
      {showAlert && <CustomAlert message={alertMessage} type={alertType} onClose={() => setShowAlert(false)} />}
      {showConfirmation && (
        <ConfirmationDialog onConfirm={confirmLeaveApplication} onCancel={() => setShowConfirmation(false)} />
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  )
}

