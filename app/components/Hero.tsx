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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
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
          content="Kishore Jena, video editing, photo editing, music streaming, wedding invite, YouTube thumbnail, Odisha editor, creative studio, Kishore Jena Creation, online editor India, worlds no 1 editor. world no 1 editor, kishorejenacreation, kishore_jena_creation, kishore jena website, kishore jena creation website, caya, youtube, chatgpt, gmail, weather, facebook, editor, instagram, world top editor list, google, balasore editor, balasore editor photo, balasore editor video, balasore editor content creator, most famous editor in the instagram, most famous editor in the world, most viral editor in the instagram, most top editor in the instagram"
        />
        <meta property="og:title" content="Kishore Jena Creation - Your Creative Studio" />
        <meta property="og:description" content="Explore editing, design, and music services by Kishore Jena Creation. Trusted by creators in Odisha and beyond." />
        <meta property="og:image" content="/images/hero.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative isolate overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
            {/* 🍫 Chocolate Wafer Day Banner */}
            <div className="w-full bg-purple-900/80 rounded-xl shadow-2xl ring-2 ring-purple-500 overflow-hidden mb-6 animate-pulse">
              <div className="relative w-full h-28">
                <Image
                  src="https://i.postimg.cc/zfDwZ3p6/Whats-App-Image-2025-07-03-at-13-14-05-04e05e90.jpg"
                  alt="Chocolate Wafer Day Banner"
                  fill
                  className="object-cover opacity-70"
                />
              </div>
              <div className="text-center py-2 px-4 bg-purple-800/60 backdrop-blur-sm">
                <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 drop-shadow-xl">
                  🍫 Happy Chocolate Wafer Day!
                </h1>
                <p className="mt-1 text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-400 to-purple-500 drop-shadow-lg">
                  Take a sweet break and celebrate the crisp, chocolatey joy! 🧇🍫
                </p>
              </div>
            </div>

            {/* Main Title and Info */}
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
                : "Top creative services from Kishore Jena Creation including video editing, thumbnail design, wedding invitation, and 50M+ English music streaming."}
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
              <a href="#music" className="text-sm font-semibold leading-6 text-foreground">
                Listen Music <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>

          {/* Animated Icon Area */}
          <motion.div
            className="mx-auto mt-16 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative">
              <div className="w-[300px] md:w-[500px] h-[250px] md:h-[400px] rounded-2xl shadow-xl ring-1 ring-gray-900/10 bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
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
