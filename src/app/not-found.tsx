import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white/70 px-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 max-w-5xl mx-auto h-52 blur-[80px]"
        style={{
          background:
            'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.25) 34.2%, rgba(59, 130, 246, 0.2) 77.55%)',
        }}
      ></div>
      <div className="relative text-center">
        <h1 className="text-9xl font-extrabold text-[#6600CC] animate-bounce">
          404
        </h1>
        <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Oops! Page not found.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-block bg-[#6600CC] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#5500AA] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7700EE] focus:ring-opacity-50"
          >
            Return to Homepage
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Nyeras - The Gift of God. All rights reserved.
        </p>
      </div>
    </div>
  )
}

