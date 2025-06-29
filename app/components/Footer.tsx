"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import Webcam from "react-webcam"
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const webcamRef = useRef<Webcam>(null)
  const [selfie, setSelfie] = useState<string | null>(null)

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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    setSelfie(imageSrc || null)
  }, [webcamRef])

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
            <a
              href="upi://pay?pa=kishorejenacreation@axl&pn=Kishore%20Jena&cu=INR"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full transition inline-block mb-4"
            >
              Pay with Digital Method
            </a>
            <div className="flex justify-center mt-2">
              <Image
                src="https://i.postimg.cc/Gt8s5cy8/Screenshot-2025-02-01-192815.png"
                alt="Scan to Pay"
                width={150}
                height={150}
                className="rounded-lg border border-gray-300"
              />
            </div>
            <p className="text-xs mt-2 text-muted-foreground">Scan the QR using any UPI app   Powered By Kishore Jena Creation</p>
          </div>
        </motion.div>

        {/* Selfie Camera Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-6 max-w-md mx-auto shadow-md">
            <h2 className="text-xl font-semibold mb-4">📸 Take a Selfie</h2>
            {!selfie ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-xl w-full"
                />
                <button
                  onClick={capture}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Capture Selfie
                </button>
              </>
            ) : (
              <>
                <img src={selfie} alt="Your Selfie" className="rounded-xl w-full" />
                <div className="flex justify-between mt-4">
                  <a
                    href={selfie}
                    download="selfie.jpg"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => setSelfie(null)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Retake
                  </button>
                </div>
              </>
            )}
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

        {/* Social Media Links */}
        <div className="mt-10 text-center">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center space-x-6 text-2xl">
            <a href="https://instagram.com/kishore_jena_creation" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-600 transition" />
            </a>
            <a href="https://www.facebook.com/share/1CD39BMcpt/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-blue-600 transition" />
            </a>
            <a href="https://www.youtube.com/@kishore_jena_creation" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="hover:text-red-600 transition" />
            </a>
          </div>
        </div>

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
