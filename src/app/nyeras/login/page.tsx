"use client"

import { useState, type FormEvent, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "./toast"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
  const { addToast, ToastPortal } = useToast();

  const showError = (message: string) => {
    addToast(message, "error");
  };
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    return email.endsWith("@nyeras.com")
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        showError(data?.error || 'Invalid email or password. Please try again.')
        setIsLoading(false)
        return
      }

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }

      // Store minimal session (you can replace with cookie/JWT later)
      localStorage.setItem('crm_user', JSON.stringify(data))
      router.push("/nyeras/crm")
    } catch (error) {
      console.error("Login error:", error); 
      showError("Network error. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ToastPortal />
      <div className="min-h-screen flex flex-col sm:flex-row">
        {/* Left Section - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 xl:p-28">
          <div className="w-full max-w-[420px] space-y-8">
            {/* Title */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">NYERAS</h1>
            </div>

            {/* Welcome Text */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h2>
              <p className="text-gray-600">Please enter your credentials to access your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
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
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/20 transition-colors duration-200"
                    placeholder="hi@nyeras.com"
                  />
                  {email && !validateEmail(email) && (
                    <p className="mt-1 text-sm text-red-500">Email must be from @nyeras.com domain</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/20 transition-colors duration-200"
                      placeholder="*******"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Removed Remember me and Forgot password */}

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800/20 disabled:opacity-70 disabled:cursor-not-allowed hover-lift transition-all duration-200"
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
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section - Background Image/Pattern */}
        <div className="hidden sm:flex flex-1 relative bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
          <div className="relative w-full h-full flex items-center justify-center p-12 lg:p-20">
            <div className="max-w-2xl text-white space-y-8">
              <h2 className="text-4xl font-bold">Transform Your Lead Management</h2>
              <p className="text-lg text-orange-100">
                Streamline your sales process, boost conversion rates with Nyeras CRM.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-white/70 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-white/90">Intuitive lead tracking and management</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-white/70 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-white/90">Real-time analytics and reporting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

