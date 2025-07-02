"use client"

import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState<null | {
    name: string
    dob: string
    age: string
    gender: string
    mobile: string
    country: string
    email?: string
  }>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("kjc_signup_form")
    const emailData = localStorage.getItem("email_or_username") // Optional
    if (storedData) {
      const parsed = JSON.parse(storedData)
      setUser({ ...parsed, email: emailData || undefined })
    }
  }, [])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No profile data found.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl space-y-4 dark:bg-[#1c1c1c]">
      <h2 className="text-3xl font-bold text-center text-purple-600">👤 Your Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileItem label="Full Name" value={user.name} />
        <ProfileItem label="Email" value={user.email || "Not set"} />
        <ProfileItem label="Date of Birth" value={user.dob} />
        <ProfileItem label="Age" value={user.age} />
        <ProfileItem label="Gender" value={user.gender} />
        <ProfileItem label="Mobile" value={user.mobile} />
        <ProfileItem label="Country" value={user.country} />
      </div>
    </div>
  )
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  )
}
