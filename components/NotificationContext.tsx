"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./AuthProvider"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
  fromAdmin?: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
}

// ✅ CREATE CONTEXT
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// ✅ EXPORT HOOK
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

// ✅ EXPORT PROVIDER
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      try {
        const saved = localStorage.getItem(`kjc_notifications_${user.id}`)
        if (saved) setNotifications(JSON.parse(saved))
      } catch (err) {
        console.error("⚠️ Failed to load notifications:", err)
      }
    } else {
      setNotifications([])
    }
  }, [user])

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(`kjc_notifications_${user.id}`, JSON.stringify(notifications))
      } catch (err) {
        console.error("⚠️ Failed to save notifications:", err)
      }
    }
  }, [notifications, user])

  const addNotification = (n: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...n,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

  const deleteNotification = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id))

  const clearAllNotifications = () => {
    setNotifications([])
    if (user) localStorage.removeItem(`kjc_notifications_${user.id}`)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
