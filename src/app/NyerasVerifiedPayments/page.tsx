"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, Download, AlertCircle, ShieldAlert } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"


interface Payment {
  id: string
  paymentId: string
  amount: number
  currency: string
  status: string
  method: string
  email: string
  contact: string
  vpa?: string
  createdAt: string
  orderCreatedAt: string
}

// Inner component that uses useSearchParams
function PaymentDashboardInner() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [payments, setPayments] = useState<Payment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [methodFilter, setMethodFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "desc" })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isUnauthorized, setIsUnauthorized] = useState(false)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      // If no token is provided, set unauthorized state
      if (!token) {
        setIsUnauthorized(true)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        // Pass the token from URL to the API
        const response = await fetch(`/api/payments/getpayments?token=${token}`)

        if (!response.ok) {
          if (response.status === 401) {
            setIsUnauthorized(true)
            throw new Error("Unauthorized: Invalid token")
          }
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

        // Check if data is empty or invalid
        if (!data || data.length === 0) {
          throw new Error("No data received")
        }

        // Parse the JSON string in payload
        const parsedData = data
          .map((item: { id: string; payload: string; createdAt: string }) => {
            try {
              const parsedPayload = JSON.parse(item.payload)
              const paymentEntity = parsedPayload.payload.payment.entity

              return {
                id: item.id,
                paymentId: paymentEntity.id,
                amount: paymentEntity.amount / 100, // Convert to correct format
                currency: paymentEntity.currency,
                status: paymentEntity.status,
                method: paymentEntity.method,
                email: paymentEntity.email,
                contact: paymentEntity.contact,
                vpa: paymentEntity.vpa,
                createdAt: new Date(paymentEntity.created_at * 1000).toLocaleString(),
                orderCreatedAt: new Date(item.createdAt).toLocaleString(),
              }
            } catch (err) {
              console.error("Error parsing payment data:", err)
              return null
            }
          })
          .filter(Boolean) // Remove any null entries from parsing errors

        setPayments(parsedData)
        setFilteredPayments(parsedData)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [token])

  // Apply filters when any filter changes
  useEffect(() => {
    let result = payments

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (payment) =>
          payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.contact.includes(searchTerm),
      )
    }

    // Apply method filter
    if (methodFilter) {
      result = result.filter((payment) => payment.method === methodFilter)
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((payment) => payment.status === statusFilter)
    }

    // Apply sorting
    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        if ((a[sortConfig.key as keyof Payment] ?? "") < (b[sortConfig.key as keyof Payment] ?? "")) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if ((a[sortConfig.key as keyof Payment] ?? "") > (b[sortConfig.key as keyof Payment] ?? "")) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredPayments(result)
  }, [searchTerm, methodFilter, statusFilter, sortConfig, payments])

  // Handle sorting
  const requestSort = (key: keyof Payment) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Get unique methods for filter dropdown
  const methods = [...new Set(payments.map((payment) => payment.method))]

  // Get unique statuses for filter dropdown
  const statuses = [...new Set(payments.map((payment) => payment.status))]

  // Function to download data as CSV
  const downloadCSV = () => {
    // Define CSV headers
    const headers = ["ID", "Payment ID", "Amount", "Currency", "Status", "Method", "Email", "Contact", "Created At"]

    // Convert data to CSV format
    const csvData = filteredPayments.map((payment) => [
      payment.id,
      payment.paymentId,
      payment.amount.toFixed(2),
      payment.currency,
      payment.status,
      payment.method,
      payment.email,
      payment.contact,
      payment.createdAt,
    ])

    // Combine headers and data
    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    // Create a download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `payment_data_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Render unauthorized state
  if (isUnauthorized) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-orange-500 text-white p-6 shadow-md">
          <h1 className="text-2xl font-bold">Verified Payments</h1>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-red-500 mb-4">
              <ShieldAlert className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unauthorized Access</h2>
            <p className="text-lg text-gray-600 mb-6">
              You don't have permission to view this dashboard. Please provide a valid authentication token.
            </p>
            <p className="text-sm text-gray-500">If you believe this is an error, please contact the administrator.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-orange-500 text-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Verified Payments</h1>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by ID, email or phone"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Method filter */}
            <div className="w-full md:w-48">
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
              >
                <option value="">All Methods</option>
                {methods.map((method) => (
                  <option key={method} value={method}>
                    {method.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Status filter */}
            <div className="w-full md:w-48">
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset filters */}
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              onClick={() => {
                setSearchTerm("")
                setMethodFilter("")
                setStatusFilter("")
              }}
            >
              Reset Filters
            </button>

            {/* Download button */}
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2"
              onClick={downloadCSV}
              disabled={filteredPayments.length === 0}
            >
              <Download className="h-4 w-4" />
              Download CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <div className="text-red-500 mb-2">
                <AlertCircle className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-lg font-medium text-gray-900">{error}</p>
              <p className="mt-2 text-gray-600">Please check your connection and try again.</p>
              <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-orange-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("id")}
                    >
                      <div className="flex items-center">
                        ID
                        {sortConfig.key === "id" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("paymentId")}
                    >
                      <div className="flex items-center">
                        Payment ID
                        {sortConfig.key === "paymentId" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("amount")}
                    >
                      <div className="flex items-center">
                        Amount
                        {sortConfig.key === "amount" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        {sortConfig.key === "status" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("method")}
                    >
                      <div className="flex items-center">
                        Method
                        {sortConfig.key === "method" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("email")}
                    >
                      <div className="flex items-center">
                        Email
                        {sortConfig.key === "email" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("createdAt")}
                    >
                      <div className="flex items-center">
                        Created At
                        {sortConfig.key === "createdAt" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-orange-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.currency} {payment.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === "captured"
                                ? "bg-green-100 text-green-800"
                                : payment.status === "failed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.method.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.createdAt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                        No payments found matching your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-700">Total Payments</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">{filteredPayments.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-700">Total Amount</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {filteredPayments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)} INR
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-700">Average Amount</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {filteredPayments.length > 0
                ? (
                    filteredPayments.reduce((sum, payment) => sum + payment.amount, 0) / filteredPayments.length
                  ).toFixed(2)
                : "0.00"}{" "}
              INR
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

// Create a loading skeleton component for the Suspense fallback
function PaymentDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-orange-500 text-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Verified Payments</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>
      </main>
    </div>
  )
}

// Main component that wraps the inner component with Suspense
export default function PaymentDashboardClient() {
  return (
    <Suspense fallback={<PaymentDashboardSkeleton />}>
      <PaymentDashboardInner />
    </Suspense>
  )
}
