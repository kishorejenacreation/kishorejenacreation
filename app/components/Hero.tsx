"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const [currentTime, setCurrentTime] = useState(new Date())

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
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          {/* Time-based Greeting */}
          <motion.div
            className="mb-4 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-4 py-2">
              <div className="text-2xl">
                {getGreeting() === "Good Morning" && "🌅"}
                {getGreeting() === "Good Afternoon" && "☀️"}
                {getGreeting() === "Good Evening" && "🌃"}
                {getGreeting() === "Good Night" && "🌙"}
              </div>
              <div>
                <div className="text-sm font-medium text-primary">{getGreeting()}!</div>
                <div className="text-xs text-muted-foreground">
                  {formatTime(currentTime)} • {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </motion.div>

              {/* 🎉 Festival/National Holiday Banner Section */}


           { /* 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
            🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄🪄  */ }


        <div className="w-full bg-black rounded-xl shadow-xl overflow-hidden mb-2">
          <div className="relative w-full h-28">
            <Image
              src="https://i.postimg.cc/mD6467MK/doctors-day-68622b5d8b314.webp"
              alt="Festival Banner"
              layout="fill"
              objectFit="cover"
              className="opacity-80"
            />
          </div>
          <div className="text-center py-2 px-4">
            <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-red-600 animate-pulse drop-shadow-lg">
  🌟 HAPPY DOCTOR'S DAY 🌟
</h1>
<br />
<h4 className="mt-1 text-sm sm:text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-red-500 animate-pulse drop-shadow-md">
  ✨ To the hands that heal, the hearts that comfort, and the minds that inspire—Happy Doctors' Day 2025! 🩺
</h4>

          </div>
        </div>
          

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
            Professional editing services and online music streaming platform. From video editing to photo manipulation,
            wedding invitations to thumbnail designs - we bring your creative vision to life with 50M+ English songs.
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
        <motion.div
          className="mx-auto mt-16 lg:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative">
            <div className="w-[500px] h-[400px] rounded-2xl shadow-xl ring-1 ring-gray-900/10 bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-8 text-6xl">
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
  )
}
