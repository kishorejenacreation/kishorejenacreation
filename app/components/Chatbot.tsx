// ======= FRONTEND: Chatbot.tsx =======
"use client"

import { useState, useRef, useEffect } from "react"
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import { useAuth } from "./AuthProvider"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  mediaUrl?: string
  mediaDownload?: string
}

function getBotReplyOrMedia(input: string):
  | { type: "media"; platform: string; embedUrl: string; downloadUrl: string }
  | { type: "text"; reply: string }
  | null {
  const message = input.toLowerCase().trim()

  if (message.includes("today") && message.includes("date")) {
    return {
      type: "text",
      reply: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }
  }

  if (message.includes("time")) {
    return {
      type: "text",
      reply: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  if (message.includes("your name")) {
    return {
      type: "text",
      reply: "I’m CAYA, your AI assistant from Kishore Jena Creation!",
    }
  }

  if (message.includes("amazon gift")) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    const amount = [100, 200, 500, 1000][Math.floor(Math.random() * 4)]
    return {
      type: "text",
      reply: `🎁 Here's your Amazon gift card code: **${code}-${code.slice(0, 4)}**\n💰 Value: ₹${amount}/-\n✅ Valid & Generated for you!`,
    }
  }

  const ytMatch = input.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)\S+|youtu\.be\/\S+)/)
  if (ytMatch) {
    const id = ytMatch[0].split("/").pop()?.split("?")[0] || ""
    return {
      type: "media",
      platform: "YouTube",
      embedUrl: `https://www.youtube.com/embed/${id}`,
      downloadUrl: `/api/download/youtube/${id}`,
    }
  }

  const instaMatch = input.match(/(?:instagram\.com\/(?:reel|p|tv)\/)([\w-]+)/)
  if (instaMatch) {
    const code = instaMatch[1]
    return {
      type: "media",
      platform: "Instagram",
      embedUrl: `https://www.instagram.com/reel/${code}/embed/`,
      downloadUrl: `/api/download/instagram?url=https://www.instagram.com/reel/${code}/`,
    }
  }

  const teraMatch = input.match(/terabox\.com\/s\/([\w-]+)/)
  if (teraMatch) {
    return {
      type: "media",
      platform: "Terabox",
      embedUrl: "",
      downloadUrl: `/api/download/terabox/${teraMatch[1]}`,
    }
  }

  const threadsMatch = input.match(/threads\.net\/@[\w.-]+\/post\/([\w-]+)/)
  if (threadsMatch) {
    return {
      type: "media",
      platform: "Threads",
      embedUrl: "",
      downloadUrl: `/api/download/threads?url=${input}`,
    }
  }

  const pinMatch = input.match(/pinterest\.(?:com|in)\/pin\/(\d+)/)
  if (pinMatch) {
    return {
      type: "media",
      platform: "Pinterest",
      embedUrl: "",
      downloadUrl: `/api/download/pinterest?url=${input}`,
    }
  }

  return null
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
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
    if (!inputText.trim()) {
      alert("Type a message here✍️")
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    const result = getBotReplyOrMedia(inputText)

    if (result) {
      if (result.type === "media") {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: `Here is your ${result.platform} video:`,
              isBot: true,
              timestamp: new Date(),
              mediaUrl: result.embedUrl,
              mediaDownload: result.downloadUrl,
            },
          ])
          setIsTyping(false)
        }, 1000)
        return
      }

      if (result.type === "text") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: result.reply,
            isBot: true,
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)
        return
      }
    }

    try {
      const res = await fetch("/api/ask-caya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText }),
      })

      const data = await res.json()
      const reply = data.reply

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: reply || "🤖 Sorry, I couldn't find an answer.",
          isBot: true,
          timestamp: new Date(),
        },
      ])
    } catch (err) {
      console.error("Ask-Caya error:", err)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "⚠️ Failed to get a response. Please try again later.",
          isBot: true,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 relative"
          onClick={() => setIsOpen(true)}
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
          <div className="absolute top-0 right-0 flex items-center gap-1 pr-1 pt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[10px] text-white font-bold">LIVE</span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 left-4 w-96 bg-white border rounded-xl shadow-lg p-4 z-50 relative">
          <button
            className="absolute top-2 right-2 text-lg hover:text-red-600"
            onClick={() => setIsOpen(false)}
          >
            ❌
          </button>

          <div className="h-96 overflow-y-auto space-y-2 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`text-sm font-semibold p-3 rounded-lg leading-relaxed shadow-sm ${
                  msg.isBot ? 'bg-pink-100 text-black' : 'bg-blue-600 text-white text-right'
                }`}
              >
                {msg.text}
                {msg.mediaUrl && (
                  <div className="mt-2">
                    <iframe
                      src={msg.mediaUrl}
                      className="w-full aspect-video rounded border"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                    <a
                      href={msg.mediaDownload || msg.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline block mt-1"
                    >
                      ⬇️ Download Now
                    </a>
                  </div>
                )}
                <div className="text-[10px] text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-gray-400 text-sm italic">CAYA is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-full text-sm"
            />
            <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
