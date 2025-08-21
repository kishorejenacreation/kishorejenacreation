// /app/spin-game/layout.tsx
"use client"

import { AuthProvider } from "@/components/AuthProvider"

export default function SpinGameLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
