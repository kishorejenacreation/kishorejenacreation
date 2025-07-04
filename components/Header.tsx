// components/Header.tsx
"use client"

import Link from "next/link"
import { useAuth } from "@/components/AuthProvider"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="w-full bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Kishore Jena Creation
      </Link>

      <nav className="space-x-4">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/services" className="hover:underline">Services</Link>
        <Link href="/spin-game" className="hover:underline">Spin & Win</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
        {user ? (
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}
