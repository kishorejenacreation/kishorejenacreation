"use client"

import { useState, useEffect } from "react"
import Hero from "./components/Hero"
import Services from "./components/Services"
import AboutSection from "./components/AboutSection"
import MusicSection from "./components/MusicSection"
import ReviewSection from "./components/ReviewSection"
import Timeline from "./components/Timeline"
import Marquee from "./components/Marquee"
import WearYourStory from "./components/WearYourStory"
import UpdatesSection from "./components/UpdatesSection"
import FollowButton from "./components/FollowButton"
import SignupDashboard from "./components/SignupDashboard"
import LoginModal from "./components/LoginModal"

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const cancelTime = localStorage.getItem("popup_cancel_time")

    if (!cancelTime) {
      // No cancel, show modal
      setShowPopup(true)
    } else {
      const timePassed = Date.now() - parseInt(cancelTime, 10)
      const waitTime = 3 * 60 * 1000 // 3 minutes in milliseconds

      if (timePassed >= waitTime) {
        setShowPopup(true)
        localStorage.removeItem("popup_cancel_time")
      } else {
        const remaining = waitTime - timePassed
        const timeout = setTimeout(() => {
          setShowPopup(true)
          localStorage.removeItem("popup_cancel_time")
        }, remaining)

        return () => clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <>
      {/* 🔐 Signup/Login Modal */}
      <LoginModal isOpen={showPopup} onClose={() => setShowPopup(false)} />

      <Hero />
      <Services />
      <AboutSection />
      <MusicSection />
      <ReviewSection />
      <Timeline />
      <Marquee />
      <WearYourStory />
      <UpdatesSection />

      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-md">
          <FollowButton />
        </div>
      </div>

      {/* 📋 Admin Signup Data Viewer */}
      <SignupDashboard />
    </>
  )
}
