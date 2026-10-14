import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 dark:bg-slate-950 px-6 py-24 sm:py-32 lg:px-8 text-slate-900 dark:text-slate-100">
      <div className="text-center max-w-md">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-slate-900 dark:text-white tracking-wider animate-fade-in">404</h1>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Certificate Not Found</h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">Sorry, we couldn&apos;t find the certificate you&apos;re looking for. Please verify the ID.</p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="inline-block bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md border border-slate-700/50 hover-lift transition-all"
          >
            Return to Homepage
          </Link>
        </div>
        <p className="mt-12 text-xs text-slate-500">
          © {new Date().getFullYear()} Nyeras Edutech. All rights reserved.
        </p>
      </div>
    </main>
  )
}
