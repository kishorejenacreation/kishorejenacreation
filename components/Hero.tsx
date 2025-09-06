"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Head from "next/head"

export default function Hero() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    if (hour < 21) return "Good Evening"
    return "Good Night"
  }

  return (
    <>
      <Head>
        <title>Kishore Jena Creation - Video Editing, Photo Design & Music</title>
        <meta
          name="description"
          content="Top creative services from Kishore Jena Creation including video editing, thumbnail design, wedding invitation, music streaming, and more."
        />
        <meta
          name="keywords"
          content="Kishore Jena, video editing, music streaming, wedding invite, Odisha editor, creative studio, kishorejenacreation"
        />
        <meta property="og:title" content="Kishore Jena Creation - Your Creative Studio" />
        <meta property="og:description" content="Explore editing, design, and music services by Kishore Jena Creation. Trusted by creators in Odisha and beyond." />
        <meta property="og:image" content="/images/hero.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative isolate overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          {/* Left Text Section */}
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
            <motion.h1
              className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gradient">KISHORE JENA CREATION</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {isMobile
                ? "Video Editing, Thumbnail Design & Music - Kishore Jena Creation"
                : "Top creative services including video editing, thumbnail design, wedding invitations, and 50M+ English music streaming."}
            </motion.p>

            <motion.div
              className="mt-10 flex items-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="#services" className="apple-button">
                Explore Services
              </a>
              <a href="#music" className="text-sm font-semibold leading-6 text-foreground hover:underline">
                Listen Music <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>

          {/* Right Animated Section */}
          <motion.div
            className="mx-auto mt-16 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative">
              <div
                className="w-[300px] md:w-[500px] h-[250px] md:h-[400px] rounded-2xl shadow-xl ring-1 ring-gray-900/10 bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center"
                aria-label="Creative icons"
              >
                <div className="grid grid-cols-3 gap-6 md:gap-8 text-4xl md:text-6xl">
                  <div className="text-purple-500">🎬</div>
                  <div className="text-purple-500">📸</div>
                  <div className="text-green-500">🎵</div>
                  <div className="text-orange-500">🎨</div>
                  <div className="text-red-500">📹</div>
                  <div className="text-yellow-500">✨</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
