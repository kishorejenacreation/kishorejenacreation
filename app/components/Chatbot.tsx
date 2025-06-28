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
}

const getRandomResponse = (responses: string[]) => {
  return responses[Math.floor(Math.random() * responses.length)]
}

const createPlayer = (videoId: string) => {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
}

const playSong = (song: any) => {
  window.open(`https://www.youtube.com/watch?v=${song.youtubeId}`, "_blank")
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

function isMediaLink(text: string): string | null {
  const ytMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  const instaMatch = text.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/(reel|p)\/([\w-]+)/)

  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`
  } else if (instaMatch) {
    return `https://www.instagram.com/${instaMatch[1]}/${instaMatch[2]}/embed/`
  }

  return null
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

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

    const mediaUrl = isMediaLink(inputText)

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    if (mediaUrl) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Here is your media preview. You can download or share it:",
            isBot: true,
            timestamp: new Date(),
            mediaUrl,
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
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isBot ? "bg-secondary/20 text-foreground" : "bg-primary text-primary-foreground ml-auto"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              {message.mediaUrl && (
                <div className="mt-2 space-y-2">
                  <iframe
                    src={message.mediaUrl}
                    className="w-full aspect-video rounded-md border"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                  <div className="flex gap-2">
                    <a
                      href={message.mediaUrl.replace("/embed/", "/watch?v=")}
                      target="_blank"
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      download
                    >
                      Download
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(message.mediaUrl)}`}
                      target="_blank"
                      className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Share
                    </a>
                  </div>
                </div>
              )}
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary/20 text-foreground p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </>
  )
}
