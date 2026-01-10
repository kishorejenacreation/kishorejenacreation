import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SAKSHAM ~ The Fourth Edition",
  description: "A premium technical event experience with cutting-edge innovations",
  generator: "v0.app",
  icons: {
    icon: "https://image2url.com/r2/bucket2/images/1768065567268-cc462617-428d-4213-af07-c21f9788b3da.png",
    apple: "https://image2url.com/r2/bucket2/images/1768065567268-cc462617-428d-4213-af07-c21f9788b3da.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
