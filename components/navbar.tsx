"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  onNavClick: (section: string) => void
}

export function Navbar({ onNavClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = ["HOME", "UPDATES", "EVENTS", "EDM NIGHT", "SPONSORS", "TEAMS", "ABOUT"]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-effect-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          <div className="relative">
  <img
    src="https://image2url.com/r2/bucket2/images/1767931459065-e9acd32f-c041-4e87-acad-68fbfd3127c2.png"
    alt="SAKSHAM Logo"
    className="
      w-32 h-auto
      drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]
      drop-shadow-[0_8px_18px_rgba(0,0,0,1)]
      drop-shadow-[0_0_24px_rgba(168,85,247,0.9)]
    "
  />
</div>


          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onNavClick(item.toLowerCase().replace(" ", "-"))}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 pb-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onNavClick(item.toLowerCase().replace(" ", "-"))
                  setIsOpen(false)
                }}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors py-2"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
