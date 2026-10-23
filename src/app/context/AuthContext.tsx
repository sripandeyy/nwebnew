"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
  username: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  isLoading: boolean
  isAuthModalOpen: boolean
  authModalTab: 'signin' | 'signup'
  login: (identifier: string, password?: string) => Promise<{ success: boolean; message: string; role?: 'admin' | 'user' }>
  signup: (name: string, email: string, password?: string) => { success: boolean; message: string }
  logout: () => void
  openAuthModal: (tab?: 'signin' | 'signup') => void
  closeAuthModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'nyeras_auth_user'

const ADMIN_USER: User = {
  username: 'Administrator',
  email: 'muskanjal638@gmail.com',
  name: 'Administrator',
  role: 'admin',
  avatar: '/s2.png',
}

function looksLikeAdminId(id: string) {
  const clean = id.trim().toLowerCase()
  return (
    clean === 'muskanjal638@gmail.com' ||
    clean === 'admin' ||
    clean === 'admin@2026' ||
    clean === 'admin@nyeras2026' ||
    clean === 'admin@nyeras.com' ||
    clean === ''
  )
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin')
  const router = useRouter()

  useEffect(() => {
    let parsed: User | null = null
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) parsed = JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse auth user', e)
    }

    if (parsed?.role !== 'admin') {
      setUser(parsed)
      setIsLoading(false)
      return
    }

    // Admin rights come from the server session cookie, not from localStorage.
    fetch('/api/admin/session', { cache: 'no-store', credentials: 'same-origin' })
      .then((res) => {
        if (res.ok) {
          setUser(parsed)
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY)
          setUser(null)
        }
      })
      .catch(() => setUser(parsed))
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (identifier: string, password = '') => {
    const cleanId = identifier.trim()
    const cleanPass = password.trim()

    if (looksLikeAdminId(cleanId)) {
      const effectiveId = cleanId || 'muskanjal638@gmail.com'
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ identifier: effectiveId, password: cleanPass }),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          return { success: false, message: body?.error || 'Incorrect admin password.' }
        }
      } catch {
        return { success: false, message: 'Could not reach the server. Please check your connection and try again.' }
      }

      setUser(ADMIN_USER)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(ADMIN_USER))
      setIsAuthModalOpen(false)
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
        router.push('/admin')
      }
      return { success: true, message: 'Welcome back, Administrator!', role: 'admin' as const }
    }

    // Regular User Login: Any other username/email and password
    if (!cleanId) {
      return { success: false, message: 'Please enter your username or email address.' }
    }

    const regularUser: User = {
      username: cleanId,
      email: cleanId.includes('@') ? cleanId : `${cleanId.toLowerCase()}@student.nyeras.com`,
      name: cleanId.includes('@') ? cleanId.split('@')[0] : cleanId,
      role: 'user',
      avatar: '/avatar-placeholder.png',
    }

    setUser(regularUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(regularUser))
    setIsAuthModalOpen(false)
    return { success: true, message: `Signed in successfully as ${regularUser.name}!`, role: 'user' as const }
  }

  const signup = (name: string, email: string, password = '') => {
    const cleanName = name.trim()
    const cleanEmail = email.trim()

    if (!cleanName || !cleanEmail) {
      return { success: false, message: 'Please provide both your name and email address.' }
    }

    // Check if trying to sign up as admin
    if (looksLikeAdminId(cleanEmail)) {
      return { success: false, message: 'This is a reserved administrative credential. Please use Sign In.' }
    }

    const newUser: User = {
      username: cleanEmail.split('@')[0] || cleanName,
      email: cleanEmail,
      name: cleanName,
      role: 'user',
    }

    setUser(newUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    setIsAuthModalOpen(false)
    return { success: true, message: `Account created! Welcome to Nyeras, ${cleanName}!` }
  }

  const logout = () => {
    if (user?.role === 'admin') {
      fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {})
    }
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    router.push('/')
  }

  const openAuthModal = (tab: 'signin' | 'signup' = 'signin') => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        isAuthModalOpen,
        authModalTab,
        login,
        signup,
        logout,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
