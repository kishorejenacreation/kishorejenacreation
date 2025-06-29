// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved. Contact with admin.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/80 transition"
      >
        Go back to Home
      </a>
    </div>
  )
}
