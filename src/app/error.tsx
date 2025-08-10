'use client';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }){
  return (
    <html>
      <body className="min-h-screen bg-bgd text-slate-100">
        <div className="max-w-xl mx-auto py-24 text-center space-y-4">
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="text-slate-400">{error?.message || 'An unexpected error occurred.'}</p>
          <button onClick={reset} className="bg-accent text-ink px-4 py-2 rounded-xl font-semibold">Try again</button>
        </div>
      </body>
    </html>
  );
}
