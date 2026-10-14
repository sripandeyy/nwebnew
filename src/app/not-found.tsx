import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100">
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
      <div className="relative text-center max-w-md">
        <h1 className="text-8xl sm:text-9xl font-black text-slate-900 dark:text-white tracking-tight animate-fade-in">
          404
        </h1>
        <p className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          The page you are looking for might have been moved or no longer exists.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md border border-slate-700/50 hover-lift transition-all"
          >
            Return to Homepage
          </Link>
        </div>
        <p className="mt-8 text-xs text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} Nyeras Edutech. All rights reserved.
        </p>
      </div>
    </div>
  )
}

