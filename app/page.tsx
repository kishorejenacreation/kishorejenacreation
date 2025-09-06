"use client"

import { useState, useEffect } from "react"

// UI Components
import LiveClock from "@/components/LiveClock"
import Chatbot from "@/components/Chatbot"
import FollowButton from "@/components/FollowButton"
import SignupDashboard from "@/components/SignupDashboard"
import LoginModal from "@/components/LoginModal"

// Contexts
import { ProjectFormProvider } from "@/components/ProjectFormContext"
import { NotificationProvider } from "@/components/NotificationContext"

// Sections
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import AboutSection from "@/components/AboutSection"
import MusicSection from "@/components/MusicSection"
import ReviewSection from "@/components/ReviewSection"
import Timeline from "@/components/Timeline"
import Marquee from "@/components/Marquee"
import WearYourStory from "@/components/WearYourStory"
import UpdatesSection from "@/components/UpdatesSection"
import Contact from "@/components/Contact"

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const checkAndShowPopup = () => {
      const cancelTime = localStorage.getItem("popup_cancel_time")
      const waitTime = 3 * 60 * 1000 // 3 minutes

      if (!cancelTime) {
        setShowPopup(true)
      } else {
        const timePassed = Date.now() - parseInt(cancelTime, 10)
        if (timePassed >= waitTime) {
          setShowPopup(true)
          localStorage.removeItem("popup_cancel_time")
        } else {
          const remaining = waitTime - timePassed
          setTimeout(() => {
            setShowPopup(true)
            localStorage.removeItem("popup_cancel_time")
          }, remaining)
        }
      }
    }

    checkAndShowPopup()

    const interval = setInterval(() => {
      checkAndShowPopup()
    }, 3 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationProvider>
      <ProjectFormProvider>
        <main className="bg-[#1c012e] text-white min-h-screen">
          {/* Login Popup */}
          <LoginModal
            isOpen={showPopup}
            onClose={() => {
              localStorage.setItem("popup_cancel_time", Date.now().toString())
              setShowPopup(false)
            }}
          />

          {/* Clock */}
          <div className="flex justify-center py-4">
            <LiveClock />
          </div>

          {/* Main Sections */}
          <Hero />
          <Services />
          <AboutSection />
          <MusicSection />
          <ReviewSection />
          <Timeline />
          <Marquee />
          <WearYourStory />
          <UpdatesSection />
          <Contact />

          {/* Follow Button */}
          <div className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-md">
              <FollowButton />
            </div>
          </div>

          {/* Chatbot & Signup */}
          <Chatbot />
          <SignupDashboard />
        </main>
      </ProjectFormProvider>
    </NotificationProvider>
  )
}
