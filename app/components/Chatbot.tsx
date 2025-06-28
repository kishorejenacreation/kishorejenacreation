"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, EnvelopeIcon } from "@heroicons/react/24/outline"
import { useAuth } from "./AuthProvider"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  mediaUrl?: string
  mediaDownload?: string
}

const getRandomResponse = (responses: string[]) => {
  return responses[Math.floor(Math.random() * responses.length)]
}

function isSimpleQuery(message: string) {
  const lower = message.toLowerCase()
  if (lower.includes("today") && lower.includes("date")) {
    return new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
  }
  if (lower.includes("time")) {
    return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  }
  if (lower.includes("your name")) {
    return "I’m CAYA, your AI assistant from Kishore Jena Creation!"
  }
  return null
}

function isMediaLink(text: string): { embedUrl: string, downloadUrl: string, fileName: string } | null {
  const ytMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  const instaMatch = text.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/(reel|p)\/([\w-]+)/)

  if (ytMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}`,
      downloadUrl: `https://www.youtube.com/watch?v=${ytMatch[1]}`,
      fileName: `youtube_video_${ytMatch[1]}.mp4`
    }
  } else if (instaMatch) {
    return {
      embedUrl: `https://www.instagram.com/${instaMatch[1]}/${instaMatch[2]}/embed/`,
      downloadUrl: `/api/download?url=https://ddinstagram.com/${instaMatch[1]}/${instaMatch[2]}&filename=instagram_video_${instaMatch[2]}.mp4`,
      fileName: `instagram_video_${instaMatch[2]}.mp4`
    }
  }
  return null
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTime, setActiveTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    let interval: NodeJS.Timer
    if (isOpen) {
      interval = setInterval(() => {
        setActiveTime((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: "Hello! I'm CAYA, your 24/7 assistant from Kishore Jena Creation. How can I help you today?",
          isBot: true,
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const media = isMediaLink(inputText)

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    if (media) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Here is your media preview. You can download or share it:",
            isBot: true,
            timestamp: new Date(),
            mediaUrl: media.embedUrl,
            mediaDownload: media.downloadUrl,
          },
        ])
        setIsTyping(false)
      }, 1000)
      return
    }

    const simpleAnswer = isSimpleQuery(inputText)
    if (simpleAnswer) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: simpleAnswer,
          isBot: true,
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
      return
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are CAYA, a helpful assistant for Kishore Jena Creation. Respond accurately and helpfully." },
            { role: "user", content: inputText },
          ],
        }),
      })

      const data = await res.json()
      const botReply = data.choices[0].message.content

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botReply,
          isBot: true,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("AI Chat Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I’m having trouble responding right now. Please try again later.",
          isBot: true,
          timestamp: new Date(),
        },
      ])
    }
    setIsTyping(false)
  }

  const handleContactAdmin = () => {
    const subject = "Chat Support Request"
    const body = `Hello Kishore,\n\nI was chatting with CAYA and need to speak with you directly.\n\nChat History:\n${messages.map((msg) => `${msg.isBot ? "CAYA" : "User"}: ${msg.text}`).join("\n")}\n\nBest regards,\n${user?.email || "Website Visitor"}`
    const mailtoLink = `mailto:jenakishore2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, "_blank")
  }

  return (
    <>
      <motion.button
        className="fixed bottom-6 left-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg z-40 hover:bg-primary/90 transition-colors relative"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        <div className="absolute -top-2 -right-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
        </div>
      </motion.button>

      {/* Rest of the chat component remains unchanged */}
    </>
  )
}
