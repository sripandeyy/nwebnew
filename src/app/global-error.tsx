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
      <body className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4 text-slate-900 dark:text-slate-100">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Something went wrong</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {error?.message || "An unexpected error occurred. Please try again."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-5 py-2.5 text-white font-medium hover-lift transition-all"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
