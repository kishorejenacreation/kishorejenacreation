"use client"

import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon, BellIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useNotifications } from "./NotificationContext"
// Remove this import
// import { formatDistanceToNow } from "date-fns"

// Add this helper function at the top of the component
const formatTimeAgo = (timestamp: string) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "just now"
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
  return `${Math.floor(diffInMinutes / 1440)} days ago`
}

interface UserNotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserNotificationPanel({ isOpen, onClose }: UserNotificationPanelProps) {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } = useNotifications()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅"
      case "warning":
        return "⚠️"
      case "error":
        return "❌"
      default:
        return "ℹ️"
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-20 right-4 bg-background border border-border rounded-2xl w-96 max-h-[80vh] shadow-xl z-40 overflow-hidden"
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
        >
          <div className="flex justify-between items-center p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <BellIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Notifications</h3>
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {notifications.length > 0 && (
            <div className="flex gap-2 p-4 border-b border-border">
              <button
                onClick={markAllAsRead}
                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                <CheckIcon className="h-3 w-3 inline mr-1" />
                Mark All Read
              </button>
              <button
                onClick={clearAllNotifications}
                className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition-colors"
              >
                <TrashIcon className="h-3 w-3 inline mr-1" />
                Clear All
              </button>
            </div>
          )}

          <div className="overflow-y-auto max-h-96">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <BellIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No notifications yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  You'll receive updates from Kishore Jena Creation here
                </p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    className={`p-3 mb-2 rounded-lg border cursor-pointer transition-all ${
                      notification.read ? "opacity-60" : ""
                    } ${getNotificationColor(notification.type)}`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {notification.fromAdmin && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Admin</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{formatTimeAgo(notification.timestamp)}</p>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
