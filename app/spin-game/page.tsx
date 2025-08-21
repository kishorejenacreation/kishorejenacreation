// /app/spin-game/page.tsx
"use client"

import SpinWheel from "./SpinWheel"

export default function SpinGamePage() {
  return (
    <div className="min-h-screen py-20 px-4 bg-background text-center">
      <h1 className="text-3xl font-extrabold mb-6 text-primary">🎯 Spin & Win</h1>
      <p className="text-muted-foreground mb-10 text-sm">
        Tap the wheel and test your luck! Win real rewards 🎁
      </p>
      <SpinWheel />
    </div>
  )
}
