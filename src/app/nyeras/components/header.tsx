"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
interface HeaderProps {
  companyName: string
  userName: string
  userRole: string
}

export default function Header({ companyName, userName, userRole }: HeaderProps) {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = localStorage.getItem('crm_user')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setUserEmail(parsed?.email || null)
      } catch {
        setUserEmail(null)
      }
    }
  }, [])
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      localStorage.removeItem('crm_user')
      router.push("/nyeras/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Still redirect to login even if sign out fails
      router.push('/nyeras/login');
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">NYERAS</h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-4 focus:outline-none"
            >
              <div className="text-right mr-2 hidden sm:block">
              <p className="font-medium text-white">{userEmail || "Auth -1"}</p>
                <p className="text-sm text-white">Sales</p>
              </div>
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200">
                <Image src="/placeholder.png" alt="Profile" fill className="object-cover" />
              </div>
              <svg
                className={`w-5 h-5 text-white transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b sm:hidden">
                <p className="font-medium text-black truncate max-w-[10rem]">{userEmail || "Auth -1"}</p>
                  <p className="text-sm text-gray-500">Sales</p>
                </div>
                <Link
                  href="/nyeras/crm"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  CRM
                </Link>
                <Link
                  href="/nyeras/salesdashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Sales & Leaderboard
                </Link>
                <Link
                  href="/nyeras/taskmanagement"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Task Tracker
                </Link>
                <Link
                  href="/nyeras/paymentreminder"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Payment Reminder
                </Link>
                {/* <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Settings
                </Link> */}
                <div className="border-t">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

