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

function getSocialMediaLinks(url: string) {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/)
  const instaMatch = url.match(/(?:instagram\.com\/(?:reel|p|tv)\/)([\w-]+)/)
  const fbMatch = url.match(/(?:facebook\.com\/.*\/videos\/|fb\.watch\/)([\w-]+)/)
  const tiktokMatch = url.match(/(?:tiktok\.com\/@[\w.-]+\/video\/)(\d+)/)
  const teraboxMatch = url.match(/(?:teraboxapp\.com\/s\/)([\w]+)/)
  const snapMatch = url.match(/(?:snapchat\.com\/add\/)([\w]+)/)
  const pinMatch = url.match(/(?:pinterest\.com\/pin\/)(\d+)/)
  const threadsMatch = url.match(/(?:threads\.net\/@[\w.-]+\/post\/)(\d+)/)

  if (ytMatch) {
    const code = ytMatch[1]
    return {
      platform: "YouTube",
      embedUrl: `https://www.youtube.com/embed/${code}`,
      snapsaveUrl: `https://snapsave.app/youtube?url=https://www.youtube.com/watch?v=${code}`,
      downloadUrl: `https://on4t.com/youtube-video-downloader?url=https://www.youtube.com/watch?v=${code}`
    }
  }

  if (instaMatch) {
    const code = instaMatch[1]
    return {
      platform: "Instagram",
      embedUrl: `https://www.instagram.com/reel/${code}/embed`,
      snapsaveUrl: `https://snapsave.app/instagram?url=https://www.instagram.com/reel/${code}/`,
      downloadUrl: `https://on4t.com/instagram-video-downloader?url=https://www.instagram.com/reel/${code}/`
    }
  }

  if (fbMatch) {
    const code = fbMatch[1]
    return {
      platform: "Facebook",
      downloadUrl: `https://snapsave.app/facebook?url=https://www.facebook.com/watch?v=${code}`
    }
  }

  if (tiktokMatch) {
    const code = tiktokMatch[1]
    return {
      platform: "TikTok",
      downloadUrl: `https://on4t.com/tiktok-video-downloader?url=https://www.tiktok.com/@user/video/${code}`
    }
  }

  if (teraboxMatch) {
    return {
      platform: "Terabox",
      downloadUrl: `https://teraboxapp.com/s/${teraboxMatch[1]}`
    }
  }

  if (snapMatch) {
    return {
      platform: "Snapchat",
      downloadUrl: `https://snapsave.app/snapchat?url=https://www.snapchat.com/add/${snapMatch[1]}`
    }
  }

  if (pinMatch) {
    return {
      platform: "Pinterest",
      downloadUrl: `https://pinterestvideodownloader.com/?url=https://www.pinterest.com/pin/${pinMatch[1]}/`
    }
  }

  else if (threadsMatch) {
    return {
      platform: "Threads",
      downloadUrl: `https://snapsave.app/threads?url=https://www.threads.net/@user/post/${threadsMatch[1]}`
    }
  }

  return null
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
  if (lower.includes("instagram") || lower.includes("insta")) {
    return "Click this link to download Instagram media: https://savegram.app/en/instagram-video-downloader"
  }
  if (lower.includes("youtube") || lower.includes("you")) {
    return "Click this link to download YouTube media: https://snapany.com/youtube"
  }
  if (lower.includes("facebook") || lower.includes("face")) {
    return "Click this link to download Facebook media: https://snapany.com/facebook"
  }
  if (lower.includes("pinterest") || lower.includes("pint")) {
    return "Click this link to download Pinterest media: https://snapany.com/pinterest"
  }
  else if (lower.includes("threads") || lower.includes("thread")) {
    return "Click this link to download Threads media: https://snapany.com/threads"
  }
  return null
}

export { getSocialMediaLinks, isSimpleQuery }
