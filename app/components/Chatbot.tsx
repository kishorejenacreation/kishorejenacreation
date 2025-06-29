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
  | { type: "media", platform: string, embedUrl: string, downloadUrl: string }
  | { type: "text", reply: string }
  | null {
  const message = input.toLowerCase().trim();

  if (message.includes("today") && message.includes("date")) {
    return { type: "text", reply: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) };
  }

  if (message.includes("time")) {
    return { type: "text", reply: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) };
  }

  if (message.includes("your name")) {
    return { type: "text", reply: "I’m CAYA, your AI assistant from Kishore Jena Creation!" };
  }

  const ytMatch = input.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^?&\n]+)/);
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      type: "media",
      platform: "YouTube",
      embedUrl: `https://www.youtube.com/embed/${id}`,
      downloadUrl: `https://www.y2mate.com/youtube/${id}`,
    };
  }

  const instaMatch = url.match(/(?:instagram\.com\/(?:reel|p|tv)\/)([\w-]+)/);
  if (instaMatch) {
    const code = instaMatch[1];
    return {
      platform: "Instagram",
      downloadUrl: `https://on4t.com/instagram-video-downloader?url=https://www.instagram.com/reel/${code}/`,
    };
  }

  return null;
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

  const handleContactAdmin = () => {
    const subject = "CAYA Chatbot Issue - User Report"
    const body = `Hello Kishore,\n\nI'm facing an issue with the chatbot.\n\nChat History:\n${messages.map(
      (msg) => `${msg.isBot ? "CAYA" : "User"}: ${msg.text}`
    ).join("\n")}\n\nPlease look into it.\n\nThanks,\n${user?.email || "Website Visitor"}`

    window.open(`mailto:jenakishore2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank")
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      alert("Please type a message ✍️")
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
              text: "Here is your media preview. You can download or share it:",
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
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are CAYA, a helpful assistant for Kishore Jena Creation." },
            { role: "user", content: inputText },
          ],
        }),
      })

      const data = await res.json()
      const botReply = data.choices[0]?.message?.content

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botReply || "🤖 Sorry, no reply generated.",
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
          text: "❌ Sorry, I’m having trouble responding right now. You can contact admin below 👇",
          isBot: true,
          timestamp: new Date(),
        },
      ])
      setTimeout(() => {
        const confirmContact = confirm("Chatbot failed. Do you want to contact Kishore Jena (Admin)?");
        if (confirmContact) {
          handleContactAdmin();
        }
      }, 500)
    }
    setIsTyping(false)
  }

  return (
    <>
      {!isOpen && (
        <button
          className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 left-4 w-96 bg-white border rounded-xl shadow-lg p-4 z-50">
          <div className="h-96 overflow-y-auto space-y-2 mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`text-sm p-2 rounded-md ${msg.isBot ? 'bg-gray-100 text-black' : 'bg-blue-600 text-white text-right'}`}>
                {msg.text}
                {msg.mediaUrl && (
                  <div className="mt-2">
                    <iframe src={msg.mediaUrl} className="w-full aspect-video rounded border" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    <a href={msg.mediaDownload || msg.mediaUrl} target="_blank" className="text-xs text-blue-600 underline">Download</a>
                  </div>
                )}
                <div className="text-[10px] text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-gray-400">CAYA is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-full text-sm"
            />
            <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="text-center mt-2">
            <button
              className="text-xs text-blue-600 underline"
              onClick={handleContactAdmin}
            >
              📧 Contact Admin (Kishore)
            </button>
          </div>
        </div>
      )}
    </>
  )
}
