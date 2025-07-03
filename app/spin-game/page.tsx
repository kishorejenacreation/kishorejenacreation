"use client"

import { useAuth } from "../../components/AuthProvider"
import SpinWheel from "./SpinWheel"

export default function SpinGamePage() {
  const { user } = useAuth()

  const handleWin = (reward: string) => {
    // ✅ Show winning result with emoji and code (if any)
    alert(`🎉 Congratulations!\nYou won: ${reward}`)

    // Optional: Store result or send to backend
    // localStorage.setItem('lastSpinReward', reward)
  }

  // 🔐 Block access if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="text-lg font-semibold text-red-600">
          Please <span className="text-primary underline">login</span> to spin the wheel.
        </div>
      </div>
    )
  }

  // ✅ Show the game if user is logged in
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SpinWheel userId={user.id} onWin={handleWin} />
    </div>
  )
}
