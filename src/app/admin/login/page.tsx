"use client"

import React, { Suspense } from "react"
import AdminHeroLogin from "../../components/AdminHeroLogin"

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-white">
          <div className="w-10 h-10 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin" />
        </div>
      }
    >
      <AdminHeroLogin redirectPath="/lms" />
    </Suspense>
  )
}
