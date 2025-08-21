// Inside /app/spin-game/page.tsx

"use client"

import { useAuth } from "@/components/AuthProvider"
import SpinWheel from "./SpinWheel"

export default function SpinGamePage() {
  const { user } = useAuth()

  const handleWin = (reward: string) => {
    alert(`🎉 Congratulations!\nYou won: ${reward}`)
  }

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
