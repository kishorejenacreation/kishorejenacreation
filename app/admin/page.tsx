"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "../components/AuthProvider"
import {
  PencilIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface PageContent {
  id: string
  title: string
  description: string
  content: string
  lastModified: string
}

const initialContent: PageContent[] = [
  {
    id: "hero",
    title: "🎯 Hero Section",
    description: "Main landing page content",
    content: "Welcome to Kishore Jena Creation – Your hub for editing and music!",
    lastModified: new Date().toISOString(),
  },
  {
    id: "services",
    title: "🛠️ Services Section",
    description: "What we offer",
    content: "Video Editing, Photo Editing, Thumbnails, Wedding Cards, Graphics, Audio Work",
    lastModified: new Date().toISOString(),
  },
  {
    id: "about",
    title: "👤 About Section",
    description: "About Kishore Jena",
    content: "Kishore Jena is a digital creator with 5+ years experience in editing and music...",
    lastModified: new Date().toISOString(),
  },
  {
    id: "music",
    title: "🎵 Music Platform",
    description: "Streaming features",
    content: "Enjoy 50M+ English songs, trending hits, romance, pop, classics and more!",
    lastModified: new Date().toISOString(),
  },
]

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [content, setContent] = useState<PageContent[]>(initialContent)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<PageContent | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      router.push("/")
      return
    }

    try {
      const saved = localStorage.getItem("kjc_admin_content")
      if (saved) setContent(JSON.parse(saved))
    } catch (err) {
      console.error("LocalStorage Parse Error:", err)
    }
  }, [isAuthenticated, user, router])

  const handleEdit = (section: PageContent) => {
    setEditingId(section.id)
    setEditForm({ ...section })
  }

  const handleSave = () => {
    if (!editForm) return

    const updated = content.map((section) =>
      section.id === editForm.id ? { ...editForm, lastModified: new Date().toISOString() } : section
    )

    setContent(updated)
    localStorage.setItem("kjc_admin_content", JSON.stringify(updated))
    setEditingId(null)
    setEditForm(null)

    alert("✅ Content saved!")
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handlePublish = () => {
    alert("🚀 Website published successfully!")
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-red-500 font-semibold">🚫 Access Denied</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">⚙️ Admin Dashboard</h1>

      {content.map((section) => (
        <div key={section.id} className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {editingId === section.id ? (
              <div className="space-x-2">
                <Button onClick={handleSave}><ArrowDownTrayIcon className="w-4 h-4 mr-1" /> Save</Button>
                <Button variant="destructive" onClick={handleCancel}><XMarkIcon className="w-4 h-4 mr-1" /> Cancel</Button>
              </div>
            ) : (
              <Button onClick={() => handleEdit(section)}><PencilIcon className="w-4 h-4 mr-1" /> Edit</Button>
            )}
          </div>

          {editingId === section.id ? (
            <div className="space-y-2">
              <Input
                value={editForm?.title || ""}
                onChange={(e) => setEditForm((prev) => prev ? { ...prev, title: e.target.value } : null)}
              />
              <Textarea
                value={editForm?.content || ""}
                onChange={(e) => setEditForm((prev) => prev ? { ...prev, content: e.target.value } : null)}
              />
            </div>
          ) : (
            <p className="text-muted-foreground whitespace-pre-wrap">{section.content}</p>
          )}
        </div>
      ))}

      <div className="text-center mt-10">
        <Button size="lg" onClick={handlePublish}><EyeIcon className="w-5 h-5 mr-1" /> Publish Website</Button>
      </div>
    </div>
  )
}
