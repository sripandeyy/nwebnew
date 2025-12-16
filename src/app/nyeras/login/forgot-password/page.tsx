"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { getAuth, sendPasswordResetEmail, Auth } from "firebase/auth"
import { app } from "../../firebase/config"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [email, setEmail] = useState("")
  const [auth, setAuth] = useState<Auth | null>(null)

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const { getAuth } = require("firebase/auth")
      setAuth(getAuth(app))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!auth) {
      console.error("Authentication service is not available")
      return
    }
    
    if (!email) {
      console.error("Email is required")
      return
    }
    
    setIsLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setIsEmailSent(true)
    } catch (error) {
      console.error("Error sending password reset email: ", error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 xl:p-28">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image src="/logo.png" alt="LeadMaster CRM" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">NYERAS</h1>
          </div>

          {/* Content */}
          {isEmailSent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
              <p className="text-gray-600">
                We have sent a password reset link to your email address. Please check your inbox and follow the
                instructions.
              </p>
              <Link
                href="/login"
                className="block mt-8 text-sm font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200"
              >
                ← Back to login
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Forgot password?</h2>
                <p className="text-gray-600">No worries, we&apos;ll send you reset instructions.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>


                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "Reset password"
                  )}
                </button>

                <Link
                  href="/nyeras/login"
                  className="block text-center text-sm font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200"
                >
                  ← Back to login
                </Link>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Right Section - Background Image/Pattern */}
      <div className="hidden sm:flex flex-1 relative bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
        <div className="relative w-full h-full flex items-center justify-center p-12 lg:p-20">
          <div className="max-w-2xl text-white">
            <blockquote className="text-2xl font-medium italic">
            &quot;NYERAS - Empowering Learners Worldwide Through Innovative Online Education.&quot;
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold">K S PAVAN SAI</p>
              <p className="text-orange-200">Founder, Nyeras</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

