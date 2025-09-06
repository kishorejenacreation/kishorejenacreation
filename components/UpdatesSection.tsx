"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeartIcon, ShareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import { useAuth } from "./AuthProvider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Update {
  id: string
  title: string
  content: string
  media?: string
  likes: number
  shares: number
  timestamp: string
  likedBy: string[]
}

export default function UpdatesSection() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUpdate, setNewUpdate] = useState({ title: "", content: "", media: "" })
  const { user } = useAuth()

  useEffect(() => {
    try {
      const savedUpdates = localStorage.getItem("kjc_updates")
      if (savedUpdates) {
        setUpdates(JSON.parse(savedUpdates))
      } else {
        const defaultUpdates: Update[] = [
          {
            id: "color-update",
            title: "🎨 New Purple Color Scheme! ✨",
            content:
              "We've updated our entire platform with a beautiful new purple color scheme! Experience the fresh new look across all our services and music platform.",
            likes: 127,
            shares: 45,
            timestamp: new Date().toISOString(),
            likedBy: [],
          },
          {
            id: "1",
            title: "New Music Collection Added! 🎵",
            content: "We've added 10,000+ new English songs to our platform. Discover the latest hits and classics!",
            likes: 45,
            shares: 12,
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            likedBy: [],
          },
          {
            id: "2",
            title: "Professional Video Editing Services 🎬",
            content:
              "Transform your raw footage into cinematic masterpieces. Our expert team delivers Hollywood-quality results.",
            media: "https://i.postimg.cc/R0H3KwYk/Whats-App-Image-2025-06-28-at-23-56-26-4275df7b.jpg?height=300&width=500",
            likes: 78,
            shares: 23,
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            likedBy: [],
          },
        ]
        setUpdates(defaultUpdates)
        localStorage.setItem("kjc_updates", JSON.stringify(defaultUpdates))
      }
    } catch (error) {
      console.error("Error loading updates:", error)
      setUpdates([])
    }
  }, [])

  const handleAddUpdate = () => {
    if (!newUpdate.title || !newUpdate.content) return

    try {
      const update: Update = {
        id: Date.now().toString(),
        title: newUpdate.title,
        content: newUpdate.content,
        media: newUpdate.media || undefined,
        likes: Math.floor(Math.random() * 50) + 10,
        shares: Math.floor(Math.random() * 20) + 5,
        timestamp: new Date().toISOString(),
        likedBy: [],
      }

      const updatedUpdates = [update, ...updates]
      setUpdates(updatedUpdates)
      localStorage.setItem("kjc_updates", JSON.stringify(updatedUpdates))
      setNewUpdate({ title: "", content: "", media: "" })
      setShowAddForm(false)
    } catch (error) {
      console.error("Error adding update:", error)
    }
  }

  const handleDeleteUpdate = (id: string) => {
    const updatedUpdates = updates.filter((update) => update.id !== id)
    setUpdates(updatedUpdates)
    localStorage.setItem("kjc_updates", JSON.stringify(updatedUpdates))
  }

  const handleLikeUpdate = (id: string) => {
    if (!user) {
      alert("Please login to like updates!")
      return
    }

    const updatedUpdates = updates.map((update) => {
      if (update.id === id) {
        const hasLiked = update.likedBy.includes(user.id)
        return {
          ...update,
          likes: hasLiked ? update.likes - 1 : update.likes + 1,
          likedBy: hasLiked ? update.likedBy.filter((userId) => userId !== user.id) : [...update.likedBy, user.id],
        }
      }
      return update
    })

    setUpdates(updatedUpdates)
    localStorage.setItem("kjc_updates", JSON.stringify(updatedUpdates))

    try {
      const profileKey = `kjc_profile_${user.id}`
      const savedProfile = localStorage.getItem(profileKey)
      if (savedProfile) {
        const profile = JSON.parse(savedProfile)
        const hasLiked = updates.find((u) => u.id === id)?.likedBy.includes(user.id)
        profile.stats.postsLiked += hasLiked ? -1 : 1
        localStorage.setItem(profileKey, JSON.stringify(profile))
      }
    } catch (error) {
      console.error("Error updating user stats:", error)
    }
  }

  const handleShare = (update: Update) => {
    if (navigator.share) {
      navigator.share({
        title: update.title,
        text: update.content,
        url: window.location.href,
      })
    } else {
      const shareText = `${update.title}\n\n${update.content}\n\nCheck out Kishore Jena Creation: ${window.location.href}`
      navigator.clipboard.writeText(shareText)
      alert("Update copied to clipboard!")
    }

    const updatedUpdates = updates.map((u) => (u.id === update.id ? { ...u, shares: u.shares + 1 } : u))
    setUpdates(updatedUpdates)
    localStorage.setItem("kjc_updates", JSON.stringify(updatedUpdates))
  }

  return (
    <section id="updates" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Recent Updates</h2>
          <p className="text-lg text-muted-foreground">Stay updated with our latest news and announcements</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            ✨ New purple theme is live! Everyone can see these updates
          </div>
        </motion.div>

        {user?.isAdmin && (
          <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {showAddForm ? (
              <div className="bg-background border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Update</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Update title"
                    value={newUpdate.title}
                    onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Update content"
                    value={newUpdate.content}
                    onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                  />
                  <Input
                    placeholder="Media URL (optional)"
                    value={newUpdate.media}
                    onChange={(e) => setNewUpdate({ ...newUpdate, media: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddUpdate}>Post Update</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full bg-primary/10 text-primary border-2 border-dashed border-primary/30 rounded-2xl p-6 hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Add New Update
              </button>
            )}
          </motion.div>
        )}

        <div className="space-y-6">
          <AnimatePresence>
            {updates.map((update, index) => (
              <motion.div
                key={update.id}
                className="bg-background border border-border rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{update.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(update.timestamp).toLocaleDateString()} •{" "}
                      {new Date(update.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {user?.isAdmin && (
                    <button
                      onClick={() => handleDeleteUpdate(update.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <p className="text-muted-foreground mb-4">{update.content}</p>

                {update.media && (
                  <div className="mb-4">
                    <img
                      src={update.media}
                      alt="Update media"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLikeUpdate(update.id)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      {user && update.likedBy.includes(user.id) ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5" />
                      )}
                      <span className="text-sm">{update.likes}</span>
                    </button>
                    <button
                      onClick={() => handleShare(update)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-purple-500 transition-colors"
                    >
                      <ShareIcon className="h-5 w-5" />
                      <span className="text-sm">{update.shares}</span>
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Posted by <span className="font-medium">Kishore Jena Creation</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {updates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📢</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Updates Yet</h3>
            <p className="text-muted-foreground">Check back soon for the latest news and announcements!</p>
          </div>
        )}

        <motion.div
          className="mt-8 bg-purple-50 border border-purple-200 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-purple-600 mb-2">🌟 Public Updates</div>
          <p className="text-purple-800 text-sm">
            All updates are visible to everyone visiting our website. Login to like and interact with posts!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
