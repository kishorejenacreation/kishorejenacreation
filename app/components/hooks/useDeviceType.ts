"use client"
import { useEffect, useState } from "react"

export default function useDeviceType() {
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop")

  useEffect(() => {
    const checkDevice = () => {
      if (typeof window !== "undefined") {
        setDevice(window.innerWidth <= 768 ? "mobile" : "desktop")
      }
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return device
}
