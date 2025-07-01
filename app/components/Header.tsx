"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { BellIcon, UserIcon, CogIcon } from "@heroicons/react/24/outline"
import { useAuth } from "./AuthProvider"
import { useNotifications } from "./NotificationContext"
import LoginModal from "./LoginModal"
import NotificationPanel from "./NotificationPanel"
import LiveClock from "./LiveClock"
import UserNotificationPanel from "./UserNotificationPanel"
import Image from "next/image"

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="rounded-full p-2 bg-primary/10 w-9 h-9 animate-pulse"></div>
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  const [showLogin, setShowLogin] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserNotifications, setShowUserNotifications] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { unreadCount } = useNotifications()

  return (
    <>
      <motion.header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 items-center gap-4">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold text-primary">KJC</span>
            </Link>
            <LiveClock />
          </div>

          <div className="flex gap-x-8">
            <Link href="#services" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">Services</Link>
            <Link href="#about" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#music" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">Music</Link>
            <Link href="#reviews" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">Reviews</Link>
            {user?.isAdmin && (
              <Link href="/admin" className="text-sm font-semibold leading-6 text-orange-600 hover:text-orange-500 transition-colors flex items-center gap-1">
                <CogIcon className="h-4 w-4" />
                Admin
              </Link>
            )}
          </div>

          <div className="flex flex-1 justify-end items-center gap-4">
            {user?.isAdmin && (
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <BellIcon className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
            )}
            <ThemeToggle />
            {!user?.isAdmin && isAuthenticated && (
              <button onClick={() => setShowUserNotifications(!showUserNotifications)} className="relative rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {user?.username || user?.email}
                  {user?.isAdmin && <span className="ml-1 text-orange-500">(Admin)</span>}
                </Link>
                <button onClick={logout} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                <UserIcon className="h-5 w-5" />
                Login
              </button>
            )}
          </div>
        </nav>
      </motion.header>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      {user?.isAdmin && <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />}
      {!user?.isAdmin && <UserNotificationPanel isOpen={showUserNotifications} onClose={() => setShowUserNotifications(false)} />}
    </>
  )
}
