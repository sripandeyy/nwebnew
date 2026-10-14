"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Page error</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error?.message || "This page failed to load. Please try again."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-5 py-2.5 text-white font-medium hover-lift transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
