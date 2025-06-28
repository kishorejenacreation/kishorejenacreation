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

  // Add new state for user analytics
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

    // Load content from localStorage
    const savedContent = localStorage.getItem("kjc_admin_content")
    if (savedContent) {
      setContent(JSON.parse(savedContent))
    }
  }, [isAuthenticated, user, router])

  // Add useEffect to load user analytics
  useEffect(() => {
    if (user?.isAdmin) {
      // Load user login data
      const loginData = JSON.parse(localStorage.getItem("kjc_user_logins") || "[]")
      const followerData = JSON.parse(localStorage.getItem("kjc_admin_notifications") || "[]").filter((notif) =>
        notif.title.includes("New Follower"),
      )

      setUserAnalytics({
        totalLogins: loginData.length,
        loggedInUsers: loginData,
        followers: followerData,
        recentActivity: [...loginData, ...followerData]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10),
      })
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

    // Show success message
    alert("Content updated successfully!")
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handlePublish = () => {
    // Simulate publishing
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
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.username}</p>
            </div>
            <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
              <SaveIcon className="h-4 w-4 mr-2" />
              Publish Changes
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center">
              <MusicalNoteIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Songs</p>
                <p className="text-2xl font-bold text-foreground">{(stats.totalSongs / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </div>
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center">
              <PhotoIcon className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Projects</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalProjects}</p>
              </div>
            </div>
          </div>
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Monthly Views</p>
                <p className="text-2xl font-bold text-foreground">{stats.monthlyViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Management */}
        <motion.div
          className="bg-background border border-border rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5" />
              Content Management
            </h2>
            <p className="text-muted-foreground">Edit and manage website content</p>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {content.map((item) => (
                <div key={item.id} className="border border-border rounded-lg p-4">
                  {editingId === item.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input
                          value={editForm?.title || ""}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, title: e.target.value } : null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Input
                          value={editForm?.description || ""}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, description: e.target.value } : null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Content</label>
                        <Textarea
                          value={editForm?.content || ""}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, content: e.target.value } : null)}
                          className="min-h-[120px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} size="sm">
                          <SaveIcon className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <XMarkIcon className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleEdit(item)} size="sm" variant="outline">
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground bg-secondary/20 p-3 rounded">{item.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Last modified: {new Date(item.lastModified).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* User Analytics Section */}
        <motion.div
          className="mt-8 bg-background border border-border rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5" />
              User Analytics
            </h2>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Logged In Users ({userAnalytics.loggedInUsers.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {userAnalytics.loggedInUsers.map((user, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-secondary/10 rounded">
                      <span className="text-sm">{user.email}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(user.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Recent Followers ({userAnalytics.followers.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {userAnalytics.followers.map((follower, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-secondary/10 rounded">
                      <span className="text-sm">{follower.followerEmail}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(follower.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MusicalNoteIcon className="h-4 w-4 mr-2" />
                Add Songs
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CogIcon className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">New user registered</span>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Content updated</span>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project submitted</span>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Website</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Music Player</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Database</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Connected</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
