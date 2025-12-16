"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app, auth } from "../firebase/config"
import Header from "../components/header"
import Footer from "../components/footer"
import ChatSupport from "../components/chat-support"

type SalesPerson = {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
}

type Sale = {
  salesPersonId: number
  salesPersonName: string
  amount: number
  date: string
  customerName: string
  customerPhone: string
  status: "pending" | "verified" | "rejected"
  createdAt: string
}

// Move Toast component outside of the main component
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${type === "success" ? "bg-green-100 border-l-4 border-green-500" : "bg-red-100 border-l-4 border-red-500"}`}
    >
      <div className="flex items-center">
        <div className={`text-sm font-medium ${type === "success" ? "text-green-800" : "text-red-800"}`}>{message}</div>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-500">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function SalesDashboard() {
  const router = useRouter()
  const [auth, setAuth] = useState<ReturnType<typeof getAuth> | null>(null)
  const [salesTeam, setSalesTeam] = useState<SalesPerson[]>([])
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("")
  const [amount, setAmount] = useState("")
  const [saleDate, setSaleDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [sales, setSales] = useState<Sale[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [salesTeamLoading, setSalesTeamLoading] = useState(true)
  const [leaderboardLoading, setLeaderboardLoading] = useState(true)
  const [formErrors, setFormErrors] = useState({
    salesPerson: false,
    amount: false,
    customerName: false,
    customerPhone: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  })

  // Set auth from the imported instance
  useEffect(() => {
    if (auth) {
      setAuth(auth);
    }
  }, [auth]);

  // Handle auth state changes
  useEffect(() => {
    if (!auth) return;
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/nyeras/login")
      } else {
        setIsLoading(false)
      }
    })

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [auth, router])

  useEffect(() => {
    const fetchSalesEmployees = async () => {
      setSalesTeamLoading(true)
      try {
        const response = await fetch("/api/bdasales/salesemp")
        if (!response.ok) {
          throw new Error("Failed to fetch sales employees data")
        }
        const data = await response.json()
        const salesEmployees = Array.isArray(data) ? data : []
        setSalesTeam(salesEmployees)
      } catch (error) {
        console.error("Error fetching sales employees:", error)
        setSalesTeam([])
      } finally {
        setSalesTeamLoading(false)
      }
    }

    fetchSalesEmployees()
  }, [])

  const fetchSalesAttachment = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/bdasales/sales")
      if (!response.ok) {
        throw new Error("Failed to fetch sales data")
      }
      const data = await response.json()
      const processSales = (salesData: any[]): Sale[] => {
        return salesData.map((sale) => ({
          ...sale,
          amount: Number(sale.amount) || 0,
          date: new Date(sale.date).toLocaleDateString("en-CA"),
          createdAt: sale.createdAt || new Date().toISOString(),
        }))
      }
      if (data && data.sales && Array.isArray(data.sales)) {
        setSales(processSales(data.sales))
      } else if (Array.isArray(data)) {
        setSales(processSales(data))
      } else {
        console.error("Unexpected data format:", data)
        setSales([])
      }
    } catch (error) {
      console.error("Error fetching sales:", error)
      setSales([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSalesAttachment().finally(() => {
      setLeaderboardLoading(false)
    })
  }, [])

  const leaderboard = useMemo(() => {
    if (!Array.isArray(sales)) {
      console.error("sales is not an array:", sales)
      return []
    }

    const today = new Date().toISOString().split("T")[0]
    const todaySales = sales.filter((sale) => sale.date === today && sale.status !== "rejected")
    const salesByPerson = new Map()

    todaySales.forEach((sale) => {
      if (!salesByPerson.has(sale.salesPersonName)) {
        salesByPerson.set(sale.salesPersonName, {
          name: sale.salesPersonName,
          totalAmount: 0,
          salesCount: 0,
        })
      }

      const personData = salesByPerson.get(sale.salesPersonName)
      personData.totalAmount += sale.amount
      personData.salesCount += 1
      salesByPerson.set(sale.salesPersonName, personData)
    })

    return Array.from(salesByPerson.values())
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 5)
  }, [sales])

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit is called")
    e.preventDefault()

    const errors = {
      salesPerson: selectedSalesPerson === "",
      amount: amount === "" || isNaN(Number(amount)) || Number(amount) <= 0,
      customerName: customerName.trim() === "",
      customerPhone: customerPhone.trim() === "",
    }

    console.log("Form validation errors:", errors)

    setFormErrors(errors)
    if (Object.values(errors).some((error) => error)) {
      console.log("Form has errors, submission stopped.")
      return
    }

    setIsSubmitting(true)
    console.log("Form is valid, proceeding with submission.")

    const salesPerson = selectedSalesPerson
    console.log("Selected salesPerson:", salesPerson)

    if (!salesPerson) {
      console.log("Salesperson not found, stopping submission.")
      setIsSubmitting(false)
      return
    }

    try {
      let formattedDate: string
      try {
        const dateObj = new Date(saleDate)
        if (isNaN(dateObj.getTime())) {
          throw new Error("Invalid date")
        }
        formattedDate = dateObj.toISOString().split("T")[0]
      } catch (error) {
        console.error("Date parsing error:", error)
        setToast({
          show: true,
          message: "Invalid date format. Please select a valid date.",
          type: "error",
        })
        setIsSubmitting(false)
        return
      }

      console.log("Formatted sale date:", formattedDate)

      const saleData = {
        salesPersonId: selectedSalesPerson,
        salesPersonName: selectedSalesPerson,
        amount: Number(amount),
        date: saleDate,
        customerName,
        customerPhone,
        status: "pending",
      }

      console.log("Sale data to be sent:", saleData)

      const response = await fetch("/api/bdasales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        throw new Error("Failed to submit sale")
      }

      const responseData = await response.json()
      console.log("Response data:", responseData)

      // Reset form fields
      setSelectedSalesPerson("")
      setAmount("")
      setCustomerName("")
      setCustomerPhone("")

      setToast({
        show: true,
        message: "Sale submitted successfully!",
        type: "success",
      })

      // Fetch updated sales data
      fetchSalesAttachment()
    } catch (error) {
      console.error("Error submitting sale:", error)
      setToast({
        show: true,
        message: `Error submitting sale: ${error instanceof Error ? error.message : "Unknown error"}`,
        type: "error",
      })
    } finally {
      console.log("Submission process finished.")
      setIsSubmitting(false)
    }
  }

  // Early return for loading state
  if (isLoading && salesTeamLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header companyName="NYERAS" userName="Challa Sai" userRole="IT Team" />
      <main className="flex-grow">
        <div className="bg-white shadow-md">
          <div className="px-4 sm:px-6 py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Sales Dashboard</h1>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Entry Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Daily Sales</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="salesPerson" className="block text-sm font-medium text-gray-700 mb-1">
                          Sales Employee
                        </label>
                        {salesTeamLoading ? (
                          <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md"></div>
                        ) : (
                          <select
                            id="salesPerson"
                            value={selectedSalesPerson}
                            onChange={(e) => setSelectedSalesPerson(e.target.value)}
                            className={`w-full rounded-md border ${formErrors.salesPerson ? "border-red-500" : "border-gray-300"} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          >
                            <option value="">Select Employee</option>
                            {salesTeam.map((person) => (
                              <option key={person.id} value={person.id}>
                                {person.name}
                              </option>
                            ))}
                          </select>
                        )}
                        {formErrors.salesPerson && (
                          <p className="mt-1 text-sm text-red-600">Please select a sales person</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                          Sale Amount
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500">₹</span>
                          </div>
                          <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className={`w-full rounded-md border ${formErrors.amount ? "border-red-500" : "border-gray-300"} pl-7 pr-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.amount && <p className="mt-1 text-sm text-red-600">Please enter a valid amount</p>}
                      </div>

                      <div>
                        <label htmlFor="saleDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Sale Date
                        </label>
                        <input
                          type="date"
                          id="saleDate"
                          value={saleDate}
                          onChange={(e) => setSaleDate(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                          Customer Name
                        </label>
                        <input
                          type="text"
                          id="customerName"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Customer name"
                          className={`w-full rounded-md border ${formErrors.customerName ? "border-red-500" : "border-gray-300"} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        {formErrors.customerName && (
                          <p className="mt-1 text-sm text-red-600">Please enter customer name</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                          Customer Phone
                        </label>
                        <input
                          type="tel"
                          id="customerPhone"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="555-123-4567"
                          className={`w-full rounded-md border ${formErrors.customerPhone ? "border-red-500" : "border-gray-300"} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        {formErrors.customerPhone && (
                          <p className="mt-1 text-sm text-red-600">Please enter customer phone</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                      >
                        {isSubmitting ? (
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
                          "Submit Sale"
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Previous Sales</h2>

                  <div className="overflow-x-auto">
                    {isLoading ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Loading...</p>
                      </div>
                    ) : sales.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No sales data available</p>
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Sales Person
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Customer
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
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sales.map((sale, index) => (
                            <tr key={`${sale.salesPersonId}-${sale.date}-${index}`}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{sale.salesPersonName}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{sale.customerName}</div>
                                <div className="text-sm text-gray-500">{sale.customerPhone}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  ₹
                                  {(typeof sale.amount === "number"
                                    ? sale.amount
                                    : Number(sale.amount) || 0
                                  ).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{sale.date}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  sale.status === "verified"
                                    ? "bg-green-100 text-green-800"
                                    : sale.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                                >
                                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Daily Leaderboard</h2>
                    <button
                      onClick={() => {
                        fetchSalesAttachment()
                      }}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                      title="Refresh Leaderboard"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  </div>

                  {leaderboardLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-center p-3 rounded-lg border border-gray-100 bg-gray-50">
                          <div className="flex-shrink-0 mr-3">
                            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-200 animate-pulse rounded w-16"></div>
                          </div>
                          <div className="h-5 bg-gray-200 animate-pulse rounded w-16"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {leaderboard.map((person, index) => (
                        <div
                          key={person.name}
                          className="flex items-center p-3 rounded-lg border border-gray-100 bg-gray-50"
                        >
                          <div className="flex-shrink-0 mr-3">
                            <div className="relative">
                              <div
                                className={`absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold text-white
                              ${
                                index === 0
                                  ? "bg-yellow-500"
                                  : index === 1
                                    ? "bg-gray-400"
                                    : index === 2
                                      ? "bg-amber-700"
                                      : "bg-blue-500"
                              }`}
                              >
                                {index + 1}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                            <p className="text-sm text-gray-500">{person.salesCount} sales today</p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            ₹
                            {(typeof person.totalAmount === "number"
                              ? person.totalAmount
                              : Number(person.totalAmount) || 0
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                      ))}

                      {leaderboard.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <p>No sales today yet</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-6">
                    <h3 className="text-md font-medium text-gray-800 mb-3">Team Stats Today</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {isLoading ? (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 mb-1">Total Sales</p>
                            <div className="h-7 bg-blue-100 animate-pulse rounded w-20"></div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-green-800 mb-1">Deals Closed</p>
                            <div className="h-7 bg-green-100 animate-pulse rounded w-10"></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 mb-1">Total Sales</p>
                            <p className="text-xl font-bold text-blue-900">
                              ₹
                              {sales
                                .filter((sale) => sale.date === new Date().toISOString().split("T")[0])
                                .reduce(
                                  (sum, sale) =>
                                    sum + (typeof sale.amount === "number" ? sale.amount : Number(sale.amount) || 0),
                                  0,
                                )
                                .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-green-800 mb-1">Deals Closed</p>
                            <p className="text-xl font-bold text-green-900">
                              {sales.filter((sale) => sale.date === new Date().toISOString().split("T")[0]).length}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-800 mb-3">Verification Status</h3>
                    {isLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-8"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Pending</span>
                          <span className="text-sm font-medium text-yellow-600">
                            {sales.filter((sale) => sale.status === "pending").length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Verified</span>
                          <span className="text-sm font-medium text-green-600">
                            {sales.filter((sale) => sale.status === "verified").length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Rejected</span>
                          <span className="text-sm font-medium text-red-600">
                            {sales.filter((sale) => sale.status === "rejected").length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatSupport />
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}
    </div>
  )
}

