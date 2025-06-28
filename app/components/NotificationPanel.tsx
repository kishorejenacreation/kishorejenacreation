"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate sending notification
    setTimeout(() => {
      alert("Notification sent to all users!")
      setTitle("")
      setMessage("")
      setLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-20 right-4 bg-background border border-border rounded-2xl p-6 w-80 shadow-xl z-40"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Send Notification</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSendNotification} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Notification message"
                className="min-h-[80px]"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <PaperAirplaneIcon className="h-4 w-4 mr-2" />
              {loading ? "Sending..." : "Send Notification"}
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
