"use client"

import { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"

export default function SignupDashboard() {
  const [visible, setVisible] = useState(false)
  const [signupData, setSignupData] = useState<any | null>(null)
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    try {
      const data = localStorage.getItem("kjc_signup_form")
      if (data) {
        setSignupData(JSON.parse(data))
      }

      const hideBtn = localStorage.getItem("hide_signup_button")
      if (hideBtn === "true") {
        setShowButton(false)
      }
    } catch (error) {
      console.error("Failed to load signup data:", error)
    }
  }, [])

  const handleHideButton = () => {
    setShowButton(false)
    localStorage.setItem("hide_signup_button", "true")
  }

  if (!signupData || !showButton) return null

  if (!visible) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex gap-2 items-center">
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
          onClick={() => setVisible(true)}
        >
          📋 View Signups
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          onClick={handleHideButton}
          title="Hide this panel"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-background text-foreground rounded-xl p-6 shadow-2xl">
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-red-500"
          onClick={() => setVisible(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">👤 Signup Info</h2>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <Info label="Full Name" value={signupData.name || "N/A"} />
          <Info label="Email" value={signupData.email || "Not Provided"} />
          <Info label="Date of Birth" value={signupData.dob || "N/A"} />
          <Info label="Age" value={signupData.age || "N/A"} />
          <Info label="Gender" value={signupData.gender || "N/A"} />
          <Info label="Mobile" value={signupData.mobile || "N/A"} />
          <Info label="Country" value={signupData.country || "N/A"} />
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
