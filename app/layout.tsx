import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AuthProvider from "./components/AuthProvider"
import { MusicProvider } from "./components/MusicContext"
import { ProjectFormProvider } from "./components/ProjectFormContext"
import { NotificationProvider } from "./components/NotificationContext"
import MusicPlayer from "./components/MusicPlayer"
import Chatbot from "./components/Chatbot"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kishore Jena Creation - Professional Editing Services & Music Platform",
  description: "Professional editing services and online music streaming platform ",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NotificationProvider>
              <MusicProvider>
                <ProjectFormProvider>
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <MusicPlayer />
                  <Chatbot />
                </ProjectFormProvider>
              </MusicProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
