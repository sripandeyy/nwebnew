"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900">Page error</h1>
        <p className="mt-2 text-sm text-gray-600">
          {error?.message || "This page failed to load. Please try again."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-md bg-[#6600CC] px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
