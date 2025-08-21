"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/components/AuthProvider"

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

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuth()

  // Load notifications from localStorage
  useEffect(() => {
    if (user) {
      try {
        const savedNotifications = localStorage.getItem(`kjc_notifications_${user.id}`)
        if (savedNotifications) {
          const parsed = JSON.parse(savedNotifications)
          setNotifications(Array.isArray(parsed) ? parsed : [])
        }
      } catch (error) {
        console.error("Error loading notifications:", error)
        setNotifications([])
      }
    } else {
      // Clear notifications when user logs out
      setNotifications([])
    }
  }, [user])

  // Save notifications to localStorage
  useEffect(() => {
    if (user && notifications.length >= 0) {
      try {
        localStorage.setItem(`kjc_notifications_${user.id}`, JSON.stringify(notifications))
      } catch (error) {
        console.error("Error saving notifications:", error)
      }
    }
  }, [notifications, user])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    if (user) {
      try {
        localStorage.removeItem(`kjc_notifications_${user.id}`)
      } catch (error) {
        console.error("Error clearing notifications:", error)
      }
    }
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

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
