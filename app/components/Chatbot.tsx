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
}

const botResponses = {
  greeting: [
    "Hello! I'm CAYA, your 24/7 assistant from Kishore Jena Creation. How can I help you today?",
    "Hi there! Welcome to Kishore Jena Creation. I'm CAYA, here to assist you anytime!",
    "Greetings! I'm CAYA from Kishore Jena Creation. What can I help you with?",
  ],
  services: [
    "We offer professional video editing, photo editing, thumbnail design, wedding invitations, graphic design, and audio editing services. Which service interests you?",
    "Our services include: Video Editing, Photo Editing, Thumbnail Design, Wedding Invitations, Graphic Design, and Audio Editing. All delivered with professional quality!",
  ],
  pricing: [
    "Our pricing varies based on the complexity and requirements of your project. Please use the 'Start Your Project' button to get a personalized quote!",
    "Pricing depends on your specific needs. I recommend filling out our project form for an accurate quote tailored to your requirements.",
  ],
  music: [
    "Our music platform features over 50 million English songs with YouTube integration for full song streaming. You can search by artist, mood, or genre!",
    "We have an amazing collection of English music - from latest hits to classic tracks. All songs are streamed directly from YouTube for the best quality!",
  ],
  contact: [
    "You can reach Kishore Jena at jenakishore2006@gmail.com or use our project request form. If you need immediate assistance, I'm here 24/7!",
    "For direct contact, email jenakishore2006@gmail.com. You can also submit project requests through our website. I'm always here to help too!",
  ],
  admin: [
    "I'm CAYA, your AI assistant from Kishore Jena Creation. I'm here to help with any questions about our services, music platform, or general inquiries!",
    "I represent Kishore Jena Creation and I'm here to assist you 24/7. How can I help you today?",
  ],
  default: [
    "I understand you're asking about that. Let me help you with information about Kishore Jena Creation's services. What specifically would you like to know?",
    "That's an interesting question! I'm here to help with anything related to our editing services, music platform, or general inquiries. What can I assist you with?",
    "I'm here to help! Could you please be more specific about what you'd like to know about Kishore Jena Creation?",
  ],
  fallback: [
    "I'm not sure about that specific question, but I can connect you with Kishore Jena directly. Would you like me to send him an email notification about your inquiry?",
    "That's beyond my current knowledge. I can notify Kishore Jena about your question via email. Would you like me to do that?",
  ],
}

// Remove the YouTube API integration for now to avoid runtime errors
// Replace the createPlayer function with a simple fallback

const createPlayer = (videoId: string) => {
  // For now, just open YouTube in a new tab as fallback
  window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
}

const playSong = (song: any) => {
  //setCurrentSong(song)
  // Simple fallback - open YouTube
  window.open(`https://www.youtube.com/watch?v=${song.youtubeId}`, "_blank")
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
      // Welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! I'm CAYA, your 24/7 assistant from Kishore Jena Creation. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return getRandomResponse(botResponses.greeting)
    }
    if (message.includes("service") || message.includes("edit") || message.includes("design")) {
      return getRandomResponse(botResponses.services)
    }
    if (message.includes("price") || message.includes("cost") || message.includes("budget")) {
      return getRandomResponse(botResponses.pricing)
    }
    if (message.includes("music") || message.includes("song") || message.includes("play")) {
      return getRandomResponse(botResponses.music)
    }
    if (message.includes("contact") || message.includes("email") || message.includes("reach")) {
      return getRandomResponse(botResponses.contact)
    }
    if (message.includes("who are you") || message.includes("what are you") || message.includes("admin")) {
      return getRandomResponse(botResponses.admin)
    }
    if (message.includes("help") || message.includes("support")) {
      return getRandomResponse(botResponses.default)
    }

    // Fallback for complex questions
    return getRandomResponse(botResponses.fallback)
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse = getBotResponse(inputText)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          isBot: true,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)

        // Update user stats
        if (user) {
          const profileKey = `kjc_profile_${user.id}`
          const savedProfile = localStorage.getItem(profileKey)
          if (savedProfile) {
            const profile = JSON.parse(savedProfile)
            profile.stats.chatMessages += 1
            localStorage.setItem(profileKey, JSON.stringify(profile))
          }
        }
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleContactAdmin = () => {
    const subject = "Chat Support Request"
    const body = `Hello Kishore,

I was chatting with CAYA and need to speak with you directly.

Chat History:
${messages.map((msg) => `${msg.isBot ? "CAYA" : "User"}: ${msg.text}`).join("\n")}

Please get back to me when you have a moment.

Best regards,
${user?.email || "Website Visitor"}`

    const mailtoLink = `mailto:jenakishore2006@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, "_blank")
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 left-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg z-40 hover:bg-primary/90 transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">LIVE</div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 left-6 w-96 h-[500px] bg-background border border-border rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">C</span>
                </div>
                <div>
                  <h3 className="font-semibold">CAYA</h3>
                  <p className="text-xs opacity-90">AI Assistant • Online 24/7</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot ? "bg-secondary/20 text-foreground" : "bg-primary text-primary-foreground ml-auto"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
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
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleContactAdmin}
                  className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors flex items-center gap-1"
                >
                  <EnvelopeIcon className="h-3 w-3" />
                  Contact Admin
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-border rounded-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
