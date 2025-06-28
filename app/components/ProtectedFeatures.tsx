"use client"

import { useEffect } from "react"
import { useAuth } from "./AuthProvider"

export default function ProtectedFeatures() {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Add click listeners to protected elements
    const protectedElements = document.querySelectorAll('[data-protected="true"]')

    const handleProtectedClick = (e: Event) => {
      if (!isAuthenticated) {
        e.preventDefault()
        e.stopPropagation()
        // Show login prompt
        const event = new CustomEvent("showLoginPrompt")
        window.dispatchEvent(event)
      }
    }

    protectedElements.forEach((element) => {
      element.addEventListener("click", handleProtectedClick)
    })

    return () => {
      protectedElements.forEach((element) => {
        element.removeEventListener("click", handleProtectedClick)
      })
    }
  }, [isAuthenticated])

  return null
}
