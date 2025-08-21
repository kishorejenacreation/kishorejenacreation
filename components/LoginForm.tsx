"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/") // Redirect to home page on successful login
      } else {
        setError("Invalid credentials. Try 'kjcadmin' with password 'kjc2005'")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-form responsive-container">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md bg-input text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md bg-input text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="apple-button w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  )
}
