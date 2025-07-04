"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/AuthProvider"
import Select from "react-select"
import countryList from "react-select-country-list"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const formatOptionLabel = ({ label, value }: { label: string; value: string }) => {
  const codePoints = value
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))
  const flag = String.fromCodePoint(...codePoints)

  return (
    <div className="flex items-center gap-2">
      <span>{flag}</span>
      <span>{label}</span>
    </div>
  )
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(true)

  const { login } = useAuth()
  const options = countryList().getData()

  useEffect(() => {
    const canceledAt = localStorage.getItem("popup_cancel_time")
    if (canceledAt) {
      const diff = Date.now() - Number(canceledAt)
      if (diff < 3 * 60 * 1000) {
        setVisible(false)
        const timeout = setTimeout(() => {
          setVisible(true)
          localStorage.removeItem("popup_cancel_time")
        }, 3 * 60 * 1000 - diff)
        return () => clearTimeout(timeout)
      }
    }
  }, [])

  const handleClose = () => {
    onClose()
    setVisible(false)
    localStorage.setItem("popup_cancel_time", Date.now().toString())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!emailOrUsername || !password) {
      setError("Please enter email/username and password.")
      setLoading(false)
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const success = await login(emailOrUsername, password)

      if (success) {
        localStorage.removeItem("popup_cancel_time")
        onClose()
      } else {
        setError("Invalid credentials.")
      }
    } catch (err) {
      setError("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50" />

          <motion.div
            className="relative z-10 bg-background rounded-2xl p-6 w-full max-w-md overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isLogin ? "🔐 Login" : "🎉 Register"}
              </h2>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email or Username</label>
                <Input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <Button type="submit" className="w-full bg-purple-600 text-white rounded-lg">
                {loading ? "Please wait..." : isLogin ? "🔐 Login" : "🎉 Register"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline text-sm"
              >
                {isLogin ? "New user? Sign up here." : "Already have an account? Login here."}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
