"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "./AuthProvider"
import countryList from "react-select-country-list"
import Select from "react-select"
import flags from "country-flag-icons/react/3x2"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(false)
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [mobile, setMobile] = useState("")
  const [country, setCountry] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, signup } = useAuth()

  const countryOptions = countryList().getData().map((c) => ({
    label: c.label,
    value: c.value,
    icon: flags[c.value as keyof typeof flags] || undefined
  }))

  const notifyAdmin = async (type: "login" | "signup", user: string) => {
    try {
      await fetch("https://formsubmit.co/ajax/jenakishore2006@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject: `New ${type} attempt`,
          message: `User: ${user} has attempted to ${type}.
Name: ${name}
DOB: ${dob}
Age: ${age}
Gender: ${gender}
Mobile: ${mobile}
Country: ${country?.label}`
        })
      })
    } catch (error) {
      console.error("Admin notification failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const isAdmin = emailOrUsername === "kjcadmin" || emailOrUsername === "jenakishore2006@gmail.com"

      if (!isLogin) {
        if (!name || !dob || !age || !gender || !mobile || !country || !emailOrUsername || !password || !confirmPassword) {
          setError("Please fill out all fields.")
          setLoading(false)
          return
        }
      }

      const success = isLogin
        ? await login(emailOrUsername, password)
        : await signup(emailOrUsername, password)

      await notifyAdmin(isLogin ? "login" : "signup", emailOrUsername)

      onClose()
      setEmailOrUsername("")
      setPassword("")
      setConfirmPassword("")
      setName("")
      setDob("")
      setAge("")
      setGender("")
      setMobile("")
      setCountry(null)

    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-background rounded-2xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isLogin ? "Admin Login" : "User Sign Up"}</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
                  <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
                  <Input placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
                  <Input type="tel" placeholder="Mobile Number (+countrycode)" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                  <Select
                    options={countryOptions}
                    value={country}
                    onChange={setCountry}
                    placeholder="Select your country"
                    className="text-sm"
                  />
                </>
              )}
              <Input
                type={isLogin ? "text" : "email"}
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder={isLogin ? "Admin ID (kjcadmin)" : "your@email.com"}
                required
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              {!isLogin && (
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-purple-600 text-white rounded-lg text-lg py-2 hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? "Please wait..." : isLogin ? "🔐 Admin Login" : "🎉 Sign Up"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              {isLogin ? (
                <p className="text-sm">
                  Not an admin?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:underline"
                  >
                    Sign up here
                  </button>
                </p>
              ) : (
                <p className="text-sm">
                  Already an admin?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline"
                  >
                    Login here
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
