import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"

import Header from "@/components/Header" // ✅ added
import Footer from "@/components/Footer" // ✅ added

import { AuthProvider } from "@/components/AuthProvider"
import { NotificationProvider } from "@/components/NotificationProvider"
import { MusicProvider } from "@/components/MusicProvider"
import { ProjectFormProvider } from "@/components/ProjectFormProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kishore Jena Creation | CAYA AI",
  description: "Your personal AI assistant with media, voice, and smart logic.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <NotificationProvider>
              <MusicProvider>
                <ProjectFormProvider>
                  <Header /> {/* ✅ Now visible on all pages */}
                  <main>{children}</main>
                  <Footer /> {/* ✅ Footer always visible */}
                </ProjectFormProvider>
              </MusicProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
