"use client"

import { useAuth } from "app/components/AuthProvider"
 // or use "../../components/AuthProvider" if alias isn't working
import SpinWheel from "./SpinWheel"

export default function SpinGamePage() {
  const { user } = useAuth()

  const handleWin = (reward: string) => {
    // ✅ Display reward in a dialog or alert
    alert(`🎉 Congratulations!\nYou won: ${reward}`)
    
    // You can optionally:
    // - Save this result in localStorage
    // - Send it to your backend
    // - Show a modal instead of alert
  }

  // 🔒 If not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="text-lg font-semibold text-red-600">
          Please <span className="text-primary underline">login</span> to spin the wheel.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SpinWheel userId={user.id} onWin={handleWin} />
    </div>
  )
}
