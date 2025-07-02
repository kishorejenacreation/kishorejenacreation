"use client"

import { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"

export default function SignupDashboard() {
  const [visible, setVisible] = useState(false)
  const [signupData, setSignupData] = useState<any | null>(null)
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem("kjc_signup_form")
    if (data) {
      setSignupData(JSON.parse(data))
    }

    const hideBtn = localStorage.getItem("hide_signup_button")
    if (hideBtn === "true") {
      setShowButton(false)
    }
  }, [])

  const handleHideButton = () => {
    setShowButton(false)
    localStorage.setItem("hide_signup_button", "true")
  }

  if (!signupData || !showButton) return null

  if (!visible) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700"
          onClick={() => setVisible(true)}
        >
          📋 View Signups
        </button>

        {/* ❌ Cancel Button to hide it permanently */}
        <button
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          onClick={handleHideButton}
          title="Cancel / Hide this panel"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 max-w-lg w-full relative shadow-xl">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-purple-600 text-center">👤 Signup Info</h2>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <Info label="Full Name" value={signupData.name} />
          <Info label="Email" value={signupData.email || "Not stored"} />
          <Info label="DOB" value={signupData.dob} />
          <Info label="Age" value={signupData.age} />
          <Info label="Gender" value={signupData.gender} />
          <Info label="Mobile" value={signupData.mobile} />
          <Info label="Country" value={signupData.country} />
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-gray-600 dark:text-gray-300">{label}</span>
      <span className="font-medium text-right text-gray-900 dark:text-white">{value}</span>
    </div>
  )
}
