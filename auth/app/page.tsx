import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <div className="max-w-xl text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          un<span className="text-zinc-500">-</span>Blog
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          An uncensored blog platform, handmade for developers.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/signin"
            className="rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
