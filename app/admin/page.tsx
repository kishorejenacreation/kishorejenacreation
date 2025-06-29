"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "../components/AuthProvider"
import {
  PencilIcon,
  EyeIcon,
  SaveIcon,
  XMarkIcon,
  DocumentTextIcon,
  PhotoIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
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
    title: "Hero Section",
    description: "Main landing page content",
    content: "Kishore Jena Creation - Professional editing services and online music streaming platform",
    lastModified: new Date().toISOString(),
  },
  {
    id: "services",
    title: "Services Section",
    description: "List of services offered",
    content: "Video Editing, Photo Editing, Thumbnail Design, Wedding Invitations, Graphic Design, Audio Editing",
    lastModified: new Date().toISOString(),
  },
  {
    id: "about",
    title: "About Section",
    description: "About Kishore Jena and the company",
    content: "Kishore Jena is a passionate digital content creator with 5+ years of experience...",
    lastModified: new Date().toISOString(),
  },
  {
    id: "music",
    title: "Music Platform",
    description: "Music streaming platform details",
    content: "50M+ English songs including latest hits, pop music, romantic songs, and classic tracks",
    lastModified: new Date().toISOString(),
  },
]

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [content, setContent] = useState<PageContent[]>(initialContent)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<PageContent | null>(null)
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalSongs: 50000000,
    totalProjects: 156,
    monthlyViews: 45230,
  })

  const [userAnalytics, setUserAnalytics] = useState({
    totalLogins: 0,
    loggedInUsers: [],
    followers: [],
    recentActivity: [],
  })

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      router.push("/")
      return
    }

    try {
      const savedContent = localStorage.getItem("kjc_admin_content")
      if (savedContent) {
        setContent(JSON.parse(savedContent))
      }
    } catch (err) {
      console.error("Failed to parse admin content from localStorage:", err)
    }
  }, [isAuthenticated, user, router])

  useEffect(() => {
    if (user?.isAdmin) {
      try {
        const loginData = JSON.parse(localStorage.getItem("kjc_user_logins") || "[]")
        const followerData = JSON.parse(localStorage.getItem("kjc_admin_notifications") || "[]")
          .filter((notif) => notif.title?.includes("New Follower"))

        setUserAnalytics({
          totalLogins: loginData.length,
          loggedInUsers: loginData,
          followers: followerData,
          recentActivity: [...loginData, ...followerData]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10),
        })
      } catch (err) {
        console.error("Failed to load analytics from localStorage:", err)
      }
    }
  }, [user])

  const handleEdit = (item: PageContent) => {
    setEditingId(item.id)
    setEditForm({ ...item })
  }

  const handleSave = () => {
    if (!editForm) return

    const updatedContent = content.map((item) =>
      item.id === editForm.id ? { ...editForm, lastModified: new Date().toISOString() } : item,
    )

    setContent(updatedContent)
    localStorage.setItem("kjc_admin_content", JSON.stringify(updatedContent))
    setEditingId(null)
    setEditForm(null)

    alert("Content updated successfully!")
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handlePublish = () => {
    alert("Website published successfully! Changes are now live.")
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Add your admin dashboard layout and stats here */}
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        {content.map((section) => (
          <div key={section.id} className="mb-6 p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              {editingId === section.id ? (
                <div className="space-x-2">
                  <Button onClick={handleSave}><SaveIcon className="w-5 h-5 inline mr-1" /> Save</Button>
                  <Button variant="destructive" onClick={handleCancel}><XMarkIcon className="w-5 h-5 inline mr-1" /> Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => handleEdit(section)}><PencilIcon className="w-5 h-5 inline mr-1" /> Edit</Button>
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
              <p className="text-muted-foreground">{section.content}</p>
            )}
          </div>
        ))}
        <div className="mt-8">
          <Button onClick={handlePublish}><EyeIcon className="w-5 h-5 inline mr-1" /> Publish Website</Button>
        </div>
      </div>
    </div>
  )
}
