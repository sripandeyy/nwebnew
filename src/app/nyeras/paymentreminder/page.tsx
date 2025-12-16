"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { Loader2 } from "lucide-react"
import ChatSupport from "../components/chat-support"

const PaymentReminder = () => {
  interface Reminder {
    id: number
    name: string
    email: string
    dueDate: string
    amount: number
    status: string
  }

  const [reminders, setReminders] = useState<Reminder[]>([])
  const [editingReminderId, setEditingReminderId] = useState<number | null>(null)
  const [updatedStatus, setUpdatedStatus] = useState<string>("Pending")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dueDate: "",
    amount: "",
  })
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        setLoading((prevLoading) => ({ ...prevLoading, send: true }))
        const response = await fetch("/api/crm/reminder/allreminders")
        if (!response.ok) throw new Error("Failed to fetch reminders")
        const data = await response.json()
        setReminders(data) // Assuming API returns an array of reminders
      } catch (error) {
        console.error("Error fetching reminders:", error)
      } finally {
        setLoading((prevLoading) => ({ ...prevLoading, send: false, edit: null, delete: null, sendReminder: null }))
      }
    }

    fetchReminders()
  }, [])
  const [loading, setLoading] = useState<{
    send: boolean
    edit: number | null
    delete: number | null
    sendReminder: number | null
  }>({
    send: false,
    edit: null,
    delete: null,
    sendReminder: null,
  })

  const handleEdit = (id: number, currentStatus: string) => {
    setEditingReminderId(id)
    setUpdatedStatus(currentStatus)
  }

  const handleUpdateStatus = async (id: number) => {
    setLoading({ ...loading, edit: id })
    try {
      const response = await fetch("/api/crm/reminder/updatereminder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: updatedStatus }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      setReminders((prevReminders) =>
        prevReminders.map((reminder) => (reminder.id === id ? { ...reminder, status: updatedStatus } : reminder)),
      )

      setEditingReminderId(null)
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setLoading({ ...loading, edit: null })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading({ ...loading, send: true })
    try {
      const response = await fetch("/api/crm/reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create reminder")
      console.log("Reminder created successfully")
      setFormData({ name: "", email: "", dueDate: "", amount: "" })
    } catch (error) {
      console.error("Error creating reminder:", error)
    } finally {
      setLoading({ ...loading, send: false })
    }
  }

  const handleAction = async (action: string, id: number) => {
    if (action === "edit") {
      const reminder = reminders.find((r) => r.id === id)
      if (reminder) {
        handleEdit(id, reminder.status)
      }
    } else if (action === "delete") {
      setLoading({ ...loading, delete: id })
      try {
        const response = await fetch("/api/crm/reminder/deletereminder", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })

        if (!response.ok) throw new Error("Failed to delete reminder")

        // Remove the deleted reminder from the state
        setReminders(reminders.filter((reminder) => reminder.id !== id))
        console.log(`Deleted reminder ID: ${id}`)
      } catch (error) {
        console.error(`Error in delete action:`, error)
      } finally {
        setLoading({ ...loading, delete: null })
      }
    }
  }

  const handleSendReminder = async (id: number) => {
    setLoading({ ...loading, sendReminder: id })

    const reminder = reminders.find((r) => r.id === id)
    if (!reminder) {
      console.error("Reminder not found")
      setLoading({ ...loading, sendReminder: null })
      return
    }

    try {
      const response = await fetch("/api/crm/reminder/sendreminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reminder.name,
          email: reminder.email,
          dueDate: reminder.dueDate,
          amount: reminder.amount,
        }),
      })

      if (!response.ok) throw new Error("Failed to send reminder")

      console.log(`Reminder sent successfully for ID: ${id}`)
    } catch (error) {
      console.error("Error sending reminder:", error)
    } finally {
      setLoading({ ...loading, sendReminder: null })
    }
  }

  const formatRupees = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header companyName="Nyeras" userName="John Doe" userRole="Admin" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Payment Reminder</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter recipient name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter recipient email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount in rupees"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading.send}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 flex items-center"
              >
                {loading.send ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Reminder"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Reminders</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reminders.map((reminder) => (
                  <tr key={reminder.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reminder.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reminder.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(reminder.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatRupees(reminder.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingReminderId === reminder.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={updatedStatus}
                            onChange={(e) => setUpdatedStatus(e.target.value)}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                          </select>
                          <button
                            onClick={() => handleUpdateStatus(reminder.id)}
                            disabled={loading.edit === reminder.id}
                            className="text-green-600 hover:text-green-900 px-2 py-1 rounded border border-green-200 hover:bg-green-50 disabled:opacity-50 text-xs"
                          >
                            {loading.edit === reminder.id ? (
                              <span className="flex items-center">
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                Saving
                              </span>
                            ) : (
                              "Save"
                            )}
                          </button>
                          <button
                            onClick={() => setEditingReminderId(null)}
                            className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
      ${reminder.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : reminder.status === "Overdue"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                        >
                          {reminder.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 disabled:opacity-50"
                        onClick={() => handleAction("edit", reminder.id)}
                        disabled={loading.edit === reminder.id || editingReminderId !== null}
                      >
                        {loading.edit === reminder.id ? (
                          <span className="flex items-center">
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Editing...
                          </span>
                        ) : (
                          "Edit"
                        )}
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 px-3 py-1 rounded border border-red-200 hover:bg-red-50 disabled:opacity-50"
                        onClick={() => handleAction("delete", reminder.id)}
                        disabled={loading.delete === reminder.id}
                      >
                        {loading.delete === reminder.id ? (
                          <span className="flex items-center">
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Deleting...
                          </span>
                        ) : (
                          "Delete"
                        )}
                      </button>
                      {(reminder.status === "Pending" || reminder.status === "Overdue") && (
                        <button
                          className="text-yellow-600 hover:text-yellow-900 px-3 py-1 rounded border border-yellow-200 hover:bg-yellow-50 disabled:opacity-50"
                          onClick={() => handleSendReminder(reminder.id)}
                          disabled={loading.sendReminder === reminder.id}
                        >
                          {loading.sendReminder === reminder.id ? (
                            <span className="flex items-center">
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              Sending...
                            </span>
                          ) : (
                            "Send Reminder"
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reminders.length === 0 && <p className="text-center text-gray-500 py-4">No reminders found</p>}
        </div>
      </main>
      <ChatSupport />

      <Footer />
    </div>
  )
}

export default PaymentReminder

