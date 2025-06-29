// ✅ Combined and Fixed version of 1st and 2nd code

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "./AuthProvider"; // make sure AuthProvider exists

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  mediaUrl?: string;
  mediaDownload?: string;
}

function isSimpleQuery(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("today") && lower.includes("date")) {
    return new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  if (lower.includes("time")) {
    return new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (lower.includes("your name")) {
    return "I’m CAYA, your AI assistant from Kishore Jena Creation!";
  }
  
  return null;
}

function isMediaLink(url: string): { embedUrl: string; downloadUrl: string; platform: string } | null {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)\b|youtu\.be\/)([^?&\n]+)/);
  const instaMatch = url.match(/instagram\.com\/(reel|p|tv)\/([^/?#]+)/);
  const fbMatch = url.match(/facebook\.com\/.*\/videos\/(\d+)/);
  const teraboxMatch = url.match(/terabox\.com\/s\/([a-zA-Z0-9]+)/);
  const snapMatch = url.match(/snapchat\.com\/add\/([a-zA-Z0-9._]+)/);
  const pinMatch = url.match(/pinterest\.com\/pin\/(\d+)/);
  const threadsMatch = url.match(/threads\.net\/@[^\/]+\/post\/(\d+)/);

  if (ytMatch) {
    const id = ytMatch[1];
    return {
      platform: "YouTube",
      embedUrl: `https://www.youtube.com/embed/${id}`,
      downloadUrl: `https://www.y2mate.com/youtube/${id}`,
    };
  }

  if (instaMatch) {
    return {
      platform: "Instagram",
      embedUrl: `https://www.instagram.com/${instaMatch[1]}/${instaMatch[2]}/embed/`,
      downloadUrl: `https://ddinstagram.com/${instaMatch[1]}/${instaMatch[2]}`,
    };
  }

  if (fbMatch) {
    const videoId = fbMatch[1];
    return {
      platform: "Facebook",
      embedUrl: `https://www.facebook.com/video/embed?video_id=${videoId}`,
      downloadUrl: `https://fdown.net/`,
    };
  }

  if (teraboxMatch) {
    return {
      platform: "Terabox",
      embedUrl: "",
      downloadUrl: `https://teraboxapp.com/s/${teraboxMatch[1]}`,
    };
  }

  if (snapMatch) {
    return {
      platform: "Snapchat",
      embedUrl: "",
      downloadUrl: `https://snapsave.app/`,
    };
  }

  if (pinMatch) {
    return {
      platform: "Pinterest",
      embedUrl: "",
      downloadUrl: `https://pinterestvideodownloader.com/`,
    };
  }

  if (threadsMatch) {
    return {
      platform: "Threads",
      embedUrl: "",
      downloadUrl: `https://snapsave.app/threads`,
    };
  }

  return null;
}

export { isSimpleQuery, isMediaLink };
