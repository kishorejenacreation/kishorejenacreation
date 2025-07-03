"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "./AuthProvider"
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
  const [visible, setVisible] = useState(true)

  const { login, signup } = useAuth()
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

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (!isLogin && (!emailOrUsername || !password || !name || !dob || !age || !gender || !mobile || !country)) {
      setError("Please fill out all fields")
      setLoading(false)
      return
    }

    try {
      const success = isLogin
        ? await login(emailOrUsername, password)
        : await signup(emailOrUsername, password)

      if (success) {
        if (!isLogin) {
          const signupData = {
            username: name,
            email: emailOrUsername,
            dob,
            age,
            gender,
            mobile,
            country: country.label,
          }

          localStorage.setItem("kjc_signup_form", JSON.stringify(signupData))

          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signupData),
          })
        }

        setEmailOrUsername("")
        setPassword("")
        setConfirmPassword("")
        setName("")
        setDob("")
        setAge("")
        setGender("")
        setMobile("")
        setCountry(null)
        onClose()
        localStorage.removeItem("popup_cancel_time")
      } else {
        setError(isLogin ? "Invalid admin credentials. Contact developer." : "Signup failed. Please try again.")
      }
    } catch {
      setError("An error occurred")
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
          {/* Transparent background without close on click */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Actual Modal */}
          <motion.div
            className="relative z-10 bg-background rounded-2xl p-6 w-full max-w-md overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing from inside
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isLogin ? "🔐 Login (Admin Only)" : "🎉 Sign Up"}
              </h2>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {isLogin ? "Email or Username" : "Email Address"}
                </label>
                <Input
                  type="email"
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
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date Of Birth</label>
                      <Input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Age</label>
                      <Input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2 rounded-md border border-input text-sm bg-yellow-400 text-black"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male 👦</option>
                        <option value="Female">Female 👧</option>
                        <option value="Other">Other 🧑‍🎤</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Mobile</label>
                      <Input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <Select
                      options={options}
                      value={country}
                      onChange={setCountry}
                      className="text-sm"
                      formatOptionLabel={formatOptionLabel}
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "yellow",
                          borderColor: "#ccc",
                          color: "black",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused ? "#facc15" : "yellow",
                          color: "black",
                          cursor: "pointer",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "yellow",
                        }),
                      }}
                    />
                  </div>
                </>
              )}

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <Button type="submit" className="w-full bg-purple-600 text-white rounded-lg">
                {loading ? "Please wait..." : isLogin ? "🔐 Login" : "🎉 Sign Up"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline text-sm"
              >
                {isLogin ? "New user? Sign up here." : "If you're admin, login here."}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
