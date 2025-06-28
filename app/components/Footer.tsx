"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDateTime = (date: Date) => {
    const timeString = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })

    const dateString = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return { timeString, dateString }
  }

  const getTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  const { timeString, dateString } = formatDateTime(currentTime)

  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">

        {/* Live Time Display */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">Current Time</h3>
            <div className="text-3xl font-bold text-primary tabular-nums mb-2">{timeString}</div>
            <div className="text-sm text-muted-foreground mb-1">{dateString}</div>
            <div className="text-xs text-muted-foreground opacity-75">Timezone: {getTimeZone()}</div>
          </div>
        </motion.div>

        {/* Buy Me a Coffee Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-yellow-100 text-black rounded-2xl p-6 max-w-md mx-auto shadow-lg">
            <h3 className="text-xl font-bold mb-2">Buy Me a Coffee ☕</h3>
            <p className="text-sm mb-4">Support my work by sending a tip. Every contribution helps! 💛</p>
            
            {/* UPI Pay Button */}
            <a
              href="upi://pay?pa=kishorejenacreation@axl&pn=Kishore%20Jena%20Creation&cu=INR"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full transition inline-block mb-4"
            >
              Pay with Digital Method
            </a>

            {/* QR Code Image */}
            <div className="flex justify-center mt-2">
              <Image
                src="https://i.postimg.cc/Gt8s5cy8/Screenshot-2025-02-01-192815.png" // 🟡 Replace with your actual QR image path
                alt="Scan to Pay"
                width={150}
                height={150}
                className="rounded-lg border border-gray-300"
              />
            </div>

            <p className="text-xs mt-2 text-muted-foreground">Scan the QR using any UPI app</p>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {["About", "Work", "Services", "Contact", "Privacy", "Terms"].map((item) => (
            <div key={item} className="pb-6">
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm leading-6 text-muted-foreground hover:text-foreground"
              >
                {item}
              </Link>
            </div>
          ))}
        </nav>

        {/* Footer Bottom */}
        <div className="mt-10 text-center">
          <p className="text-sm leading-5 text-muted-foreground">© 2025 Kishore Jena Creation. All rights reserved.</p>
          <p className="text-xs leading-5 text-muted-foreground mt-2">
            Professional Editing Services & Music Platform • Serving clients worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
