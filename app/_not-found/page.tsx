// app/_not-found/page.tsx
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/" className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition">
        Go Home
      </Link>
    </div>
  )
}
