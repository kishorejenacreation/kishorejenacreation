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



function getSocialMediaLinks(url: string) {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/);
  const instaMatch = url.match(/(?:instagram\.com\/(?:reel|p|tv)\/)([\w-]+)/);
  const fbMatch = url.match(/(?:facebook\.com\/.*\/videos\/|fb\.watch\/)([\w-]+)/);
  const tiktokMatch = url.match(/(?:tiktok\.com\/@[\w.-]+\/video\/)(\d+)/);
  const teraboxMatch = url.match(/(?:teraboxapp\.com\/s\/)([\w]+)/);
  const snapMatch = url.match(/(?:snapchat\.com\/add\/)([\w]+)/);
  const pinMatch = url.match(/(?:pinterest\.com\/pin\/)(\d+)/);
  const threadsMatch = url.match(/(?:threads\.net\/@[\w.-]+\/post\/)(\d+)/);

  if (ytMatch) {
    const code = ytMatch[1];
    return {
      platform: "YouTube",
      embedUrl: `https://www.youtube.com/embed/${code}`,
      snapsaveUrl: `https://snapsave.app/youtube?url=https://www.youtube.com/watch?v=${code}`,
      on4tUrl: `https://on4t.com/youtube-video-downloader?url=https://www.youtube.com/watch?v=${code}`
    };
  }

  if (instaMatch) {
    const code = instaMatch[1];
    return {
      platform: "Instagram",
      embedUrl: `https://www.instagram.com/reel/${code}/embed`,
      snapsaveUrl: `https://snapsave.app/instagram?url=https://www.instagram.com/reel/${code}/`,
      on4tUrl: `https://on4t.com/instagram-video-downloader?url=https://www.instagram.com/reel/${code}/`
    };
  }

  if (fbMatch) {
    const code = fbMatch[1];
    return {
      platform: "Facebook",
      snapsaveUrl: `https://snapsave.app/facebook?url=https://www.facebook.com/watch?v=${code}`,
      on4tUrl: `https://on4t.com/facebook-video-downloader?url=https://www.facebook.com/watch?v=${code}`
    };
  }

  if (tiktokMatch) {
    const code = tiktokMatch[1];
    return {
      platform: "TikTok",
      snapsaveUrl: `https://snapsave.app/tiktok?url=https://www.tiktok.com/@user/video/${code}`,
      on4tUrl: `https://on4t.com/tiktok-video-downloader?url=https://www.tiktok.com/@user/video/${code}`
    };
  }

  if (teraboxMatch) {
    return {
      platform: "Terabox",
      embedUrl: "",
      downloadUrl: `https://teraboxapp.com/s/${teraboxMatch[1]}`
    };
  }

  if (snapMatch) {
    return {
      platform: "Snapchat",
      embedUrl: "",
      downloadUrl: `https://snapsave.app/snapchat?url=https://www.snapchat.com/add/${snapMatch[1]}`
    };
  }

  if (pinMatch) {
    return {
      platform: "Pinterest",
      embedUrl: "",
      downloadUrl: `https://pinterestvideodownloader.com/?url=https://www.pinterest.com/pin/${pinMatch[1]}/`
    };
  }

  if (threadsMatch) {
    return {
      platform: "Threads",
      embedUrl: "",
      downloadUrl: `https://snapsave.app/threads?url=https://www.threads.net/@user/post/${threadsMatch[1]}`
    };
  }

  return null;
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
  if (lower.includes("instagram") | ("insta")) {
    return "click the link an paste your link to download media !! ENJOY🎉🍾😊 !! \n https://savegram.app/en/instagram-video-downloader"
  }
  if (lower.includes("youtube") | ("you")) {
    return "click the link an paste your link to download media !! ENJOY🎉🍾😊 !! \n https://snapany.com/youtube"
  }
  if (lower.includes("facebook") | ("face")) {
    return "click the link an paste your link to download media !! ENJOY🎉🍾😊 !! \n https://snapany.com/facebook"
  }
  if (lower.includes("pint") | ("pinterest")) {
    return "click the link an paste your link to download media !! ENJOY🎉🍾😊 !! \n\n https://snapany.com/pinterest"
  }
  if (lower.includes("threads") | ("thread")) {
    return "click the link an paste your link to download media !! ENJOY🎉🍾😊 !! \n https://snapany.com/threads"
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
        className="fixed bottom-6 left-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg z-40 hover:bg-primary/90 transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">LIVE</div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 left-6 w-96 h-[500px] bg-background border border-border rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
          >
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

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                            href={message.mediaDownload || message.mediaUrl}
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
