"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  return (
    <motion.div
      className="bg-background/50 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-lg font-bold text-primary tabular-nums">{formatTime(currentTime)}</div>
      <div className="text-xs text-muted-foreground">{formatDate(currentTime)}</div>
      <div className="text-xs text-muted-foreground opacity-75">{getTimeZone()}</div>
    </motion.div>
  )
}
