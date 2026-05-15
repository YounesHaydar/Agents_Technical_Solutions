'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Something went wrong!</h2>
      <p className="text-zinc-500">We couldn't load the requested data.</p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-sky-600 px-6 py-2 text-white hover:bg-sky-700"
      >
        Try again
      </button>
    </div>
  );
}