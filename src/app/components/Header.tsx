"use client"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import WorkWithUs from "./WorkWithUs"
 

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDomainsOpen, setIsDomainsOpen] = useState(false)
  const [isWorkWithUsOpen, setIsWorkWithUsOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const handleDomainsEnter = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setIsDomainsOpen(true)
  }
  const handleDomainsLeave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setIsDomainsOpen(false), 150)
  }
  

  return (
    <>
      <header className="fixed top-8 left-0 right-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="glass-effect bg-gradient-to-r from-[#f4e9ff] via-white to-[#f4e9ff] border border-[#e2ccff] shadow-lg rounded-full px-3 sm:px-5 md:px-6 flex items-center justify-between h-16 gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                height={44}
                width={140}
                className="h-auto w-[110px] sm:w-[130px] md:w-[150px]"
                src="/logo.png"
                alt="Nyeras Logo"
              />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm lg:text-base font-semibold">
              <Link
                href="/"
                className="flex items-center text-gray-800 hover:text-black transition-colors"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-gray-700 hover:text-black transition-colors"
              >
                About
              </Link>
              {/* Domains Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleDomainsEnter}
                onMouseLeave={handleDomainsLeave}
              >
                <Link
                  href="/domains"
                  className="inline-flex items-center gap-1 text-gray-700 hover:text-black transition-colors"
                >
                  Domains
                  <svg
                    className={`w-4 h-4 transition-transform ${isDomainsOpen ? "rotate-180" : "rotate-0"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </Link>
                {isDomainsOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[360px] bg-white/95 backdrop-blur-xl shadow-xl ring-1 ring-black/5 rounded-2xl p-3 z-50">
                    <ul className="divide-y">
                      <li>
                        <Link
                          href="/domains/departments"
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-900">Departments</span>
                          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 011.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.08 0z" clipRule="evenodd"/></svg>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/domains/job-guarantee"
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-900">Job Guarantee</span>
                          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 011.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.08 0z" clipRule="evenodd"/></svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <Link
                href="/plans"
                className="text-gray-700 hover:text-black transition-colors"
              >
                Our Plans
              </Link>
              <button
                onClick={() => setIsWorkWithUsOpen(true)}
                className="text-gray-700 hover:text-black transition-colors"
              >
                Want to Work With Us
              </button>
            </nav>
            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 ml-4 pl-4 border-l border-gray-200">
              <div className="relative">
                <Link
                  href="/plans"
                  className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#6600CC] px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#6600CC]/40 hover:shadow-[#6600CC]/60 hover:translate-y-[1px] transition-all"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="pointer-events-none absolute -top-2 -right-1 hidden md:inline-flex items-center rounded-full bg-white/90 px-2 py-[2px] text-[10px] font-semibold text-sky-600 shadow-sm">
                  Limited Seats
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleSidebar} className="md:hidden text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 overflow-y-auto`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Nyeras Logo" width={80} height={80} className="rounded-full w-[80px] h-auto" />
          </div>
          <button onClick={toggleSidebar} className="text-black">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-4 space-y-1">
          <Link href="/" className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg">
            Home
          </Link>
          <Link href="/about" className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg">
            About
          </Link>
          <Link href="/domains" className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg">
            Domains
          </Link>
          <Link href="/plans" className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg">
            Our Plans
          </Link>
          <button
            onClick={() => setIsWorkWithUsOpen(true)}
            className="block w-full text-left py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            Want to Work With Us
          </button>
          <div className="pt-3 mt-2 border-t border-gray-100">
            <Link
              href="/plans"
              className="block w-full text-center rounded-full bg-[#6600CC] px-4 py-2 text-sm font-semibold text-white shadow-md"
            >
              Enroll Now
            </Link>
          </div>
        </nav>
      </div>

      {/* Work With Us Modal */}
      <WorkWithUs isOpen={isWorkWithUsOpen} onClose={() => setIsWorkWithUsOpen(false)} />
    </>
  )
}

export default Header
