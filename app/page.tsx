"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ThemeToggle } from "@/components/theme-toggle"
import { HomeSection } from "@/components/home-section"
import { UpdatesSection } from "@/components/updates-section"
import { EventsSection } from "@/components/events-section"
import { EDMSection } from "@/components/edm-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { TeamsSection } from "@/components/teams-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <main className="text-foreground">
      <ThemeToggle />
      <Navbar onNavClick={handleNavClick} />

      <HomeSection />
      <UpdatesSection />
      <EventsSection />
      <EDMSection />
      <SponsorsSection />
      <TeamsSection />
      <AboutSection />

      <Footer />
    </main>
  )
}
