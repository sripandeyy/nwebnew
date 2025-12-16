"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

export type ToastType = "success" | "error" | "warning" | "info"

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

export const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  }

  return (
    <div
      className={`${bgColor[type]} text-white p-4 rounded-lg shadow-lg flex items-center justify-between max-w-md animate-slide-in`}
    >
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <X size={18} />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  children: React.ReactNode
}

export const ToastContainer = ({ children }: ToastContainerProps) => {
  return <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">{children}</div>
}

interface ToastData {
  id: string
  message: string
  type: ToastType
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const ToastPortal = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
    }, [])

    if (!mounted) return null

    return createPortal(
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </ToastContainer>,
      document.body,
    )
  }

  return {
    addToast,
    removeToast,
    ToastPortal,
  }
}

