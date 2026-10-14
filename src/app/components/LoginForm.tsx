'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to display error toast notification
  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to handle form submission
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        notifyError(data?.error || 'Login failed')
        setIsLoading(false)
        return
      }
      // success: you can route based on role or store in localStorage
      // localStorage.setItem('crm_user', JSON.stringify(data))
      toast.success('Login successful', { autoClose: 1500 })
      setIsLoading(false)
    } catch (e) {
      notifyError('Network error')
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Employee Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-1 block w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm shadow-xs placeholder-slate-400
                      focus:outline-none focus:border-slate-800 dark:focus:border-slate-400 focus:ring-1 focus:ring-slate-800"
            placeholder="abcd@nyeras.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="*******"
            className="mt-1 block w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm shadow-xs placeholder-slate-400
                      focus:outline-none focus:border-slate-800 dark:focus:border-slate-400 focus:ring-1 focus:ring-slate-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 border border-slate-700/50 rounded-xl shadow-md text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover-lift transition-all"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* React Toastify Container for showing toasts */}
      <ToastContainer />
    </div>
  );
}
