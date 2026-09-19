"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-2 text-sm text-gray-600">
            {error?.message || "An unexpected error occurred. Please try again."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-md bg-[#6600CC] px-4 py-2 text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
