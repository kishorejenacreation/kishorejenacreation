// File: components/Providers.tsx
"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/AuthProvider"
import { NotificationProvider } from "@/components/NotificationContext"
import { MusicProvider } from "@/components/MusicContext"
import { ProjectFormProvider } from "@/components/ProjectFormContext"
import { ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <NotificationProvider>
          <MusicProvider>
            <ProjectFormProvider>
              {children}
            </ProjectFormProvider>
          </MusicProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
