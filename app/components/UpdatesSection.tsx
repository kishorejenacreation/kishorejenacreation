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
      const saved = localStorage.getItem("kjc_updates")
      if (saved) {
        setUpdates(JSON.parse(saved))
      } else {
        const defaultUpdates: Update[] = [
          {
            id: "color-update",
            title: "🎨 New Purple Color Scheme! ✨",
            content: "Fresh theme launched to reflect creativity and innovation.",
            likes: 127,
            shares: 45,
            timestamp: new Date().toISOString(),
            likedBy: [],
          },
          {
            id: "2",
            title: "Video Editing Services 🎬",
            content: "High-quality cinematic editing by our expert team.",
            media: "https://i.postimg.cc/R0H3KwYk/Whats-App-Image-2025-06-28-at-23-56-26-4275df7b.jpg",
            likes: 78,
            shares: 23,
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            likedBy: [],
          },
        ]
        setUpdates(defaultUpdates)
        localStorage.setItem("kjc_updates", JSON.stringify(defaultUpdates))
      }
    } catch (err) {
      console.error("Error loading updates:", err)
    }
  }, [])

  const handleAddUpdate = () => {
    if (!newUpdate.title || !newUpdate.content) return alert("Title and content are required.")

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

    const updated = [update, ...updates]
    setUpdates(updated)
    localStorage.setItem("kjc_updates", JSON.stringify(updated))
    setNewUpdate({ title: "", content: "", media: "" })
    setShowAddForm(false)
  }

  const handleDeleteUpdate = (id: string) => {
    const updated = updates.filter((u) => u.id !== id)
    setUpdates(updated)
    localStorage.setItem("kjc_updates", JSON.stringify(updated))
  }

  const handleLikeUpdate = (id: string) => {
    if (!user) return alert("Login to like updates.")

    const updated = updates.map((u) => {
      if (u.id === id) {
        const liked = u.likedBy.includes(user.id)
        return {
          ...u,
          likes: liked ? u.likes - 1 : u.likes + 1,
          likedBy: liked ? u.likedBy.filter((id) => id !== user.id) : [...u.likedBy, user.id],
        }
      }
      return u
    })

    setUpdates(updated)
    localStorage.setItem("kjc_updates", JSON.stringify(updated))
  }

  const handleShare = (update: Update) => {
    if (navigator.share) {
      navigator.share({
        title: update.title,
        text: update.content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${update.title}\n${update.content}\n${window.location.href}`)
      alert("Copied to clipboard!")
    }

    const updated = updates.map((u) => (u.id === update.id ? { ...u, shares: u.shares + 1 } : u))
    setUpdates(updated)
    localStorage.setItem("kjc_updates", JSON.stringify(updated))
  }

  return (
    <section id="updates" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-2">Recent Updates</h2>
          <p className="text-muted-foreground text-lg">Stay updated with our latest news</p>
        </motion.div>

        {/* Add New Update */}
        {user?.isAdmin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            {showAddForm ? (
              <div className="border border-border bg-background p-6 rounded-xl space-y-4">
                <Input
                  placeholder="Title"
                  value={newUpdate.title}
                  onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={newUpdate.content}
                  onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                />
                <Input
                  placeholder="Media URL (optional)"
                  value={newUpdate.media}
                  onChange={(e) => setNewUpdate({ ...newUpdate, media: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddUpdate}>Post</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-center bg-primary/10 border-dashed border-2"
                onClick={() => setShowAddForm(true)}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Update
              </Button>
            )}
          </motion.div>
        )}

        {/* Updates List */}
        <AnimatePresence>
          {updates.map((update) => (
            <motion.div
              key={update.id}
              className="bg-background border border-border p-6 rounded-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{update.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(update.timestamp).toLocaleString()}
                  </p>
                </div>
                {user?.isAdmin && (
                  <button onClick={() => handleDeleteUpdate(update.id)} className="text-red-500">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{update.content}</p>

              {update.media && (
                <div className="mb-4">
                  <img
                    src={update.media}
                    alt="Media"
                    className="w-full h-auto max-h-[300px] object-cover rounded-lg"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-border mt-4">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <button onClick={() => handleLikeUpdate(update.id)} className="flex items-center gap-1">
                    {user && update.likedBy.includes(user.id) ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                    {update.likes}
                  </button>
                  <button onClick={() => handleShare(update)} className="flex items-center gap-1">
                    <ShareIcon className="h-5 w-5" />
                    {update.shares}
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Posted by <strong>Kishore Jena Creation</strong>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Fallback */}
        {updates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">📢 No updates available yet.</div>
        )}
      </div>
    </section>
  )
}
