import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-[#f5f0ff] to-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold text-[#6600CC] tracking-wider animate-gentle-bounce">404</h1>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Certificate Not Found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn't find the certificate you're looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="mt-8 inline-block bg-[#6600CC] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#5500AA] transition-transform transform hover:scale-105"
          >
            Return to Homepage
          </Link>
        </div>
         <p className="mt-16 text-sm text-gray-500">
          Nyeras - The Gift of God. All rights reserved.
        </p>
      </div>
    </main>
  )
}
