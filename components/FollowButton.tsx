"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { UserPlusIcon, UserMinusIcon, EnvelopeIcon } from "@heroicons/react/24/outline"
import { useAuth } from "./AuthProvider"
import { useNotifications } from "./NotificationContext"

export default function FollowButton() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(5862)
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (user) {
      try {
        const followStatus = localStorage.getItem(`kjc_follow_${user.id}`)
        if (followStatus === "true") setIsFollowing(true)

        const savedCount = localStorage.getItem("kjc_follower_count")
        if (savedCount) setFollowerCount(parseInt(savedCount))
      } catch (err) {
        console.error("Follow data load error:", err)
      }
    }

    // Daily increment logic
    try {
      const lastUpdate = localStorage.getItem("kjc_last_follower_update")
      const today = new Date().toDateString()
      if (lastUpdate !== today) {
        const newCount = followerCount + 15
        setFollowerCount(newCount)
        localStorage.setItem("kjc_follower_count", newCount.toString())
        localStorage.setItem("kjc_last_follower_update", today)
      }
    } catch (err) {
      console.error("Follower count update error:", err)
    }
  }, [user, followerCount])

  const handleFollow = () => {
    if (!user) {
      alert("Please login to follow Kishore Jena Creation")
      return
    }

    try {
      const newFollow = !isFollowing
      setIsFollowing(newFollow)
      localStorage.setItem(`kjc_follow_${user.id}`, newFollow.toString())

      let newCount = followerCount
      if (newFollow) {
        newCount++
        addNotification?.({
          title: "Following Kishore Jena Creation! 🎉",
          message: "You're now following Kishore Jena Creation. You'll receive updates on music and services!",
          type: "success",
          fromAdmin: true,
        })
      } else {
        newCount = Math.max(5906, followerCount - 1)
      }

      setFollowerCount(newCount)
      localStorage.setItem("kjc_follower_count", newCount.toString())

      const profileKey = `kjc_profile_${user.id}`
      const savedProfile = localStorage.getItem(profileKey)
      if (savedProfile) {
        const profile = JSON.parse(savedProfile)
        profile.stats.following = newFollow
        if (newFollow) {
          profile.activities.unshift({
            id: Date.now().toString(),
            type: "follow",
            description: "Started following Kishore Jena Creation",
            timestamp: new Date().toISOString(),
          })
        }
        localStorage.setItem(profileKey, JSON.stringify(profile))
      }
    } catch (err) {
      console.error("Follow update error:", err)
      alert("Error updating follow status.")
    }
  }

  const handleDirectMessage = () => {
    const subject = "Direct Message from Follower"
    const body = `Hello Kishore,\n\nI'm following your work at Kishore Jena Creation and would like to connect directly.\n\nBest,\n${user?.email || "A follower"}`
    window.open(
      `mailto:jenakishore2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
    )
  }

  return (
    <motion.div
      className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-4">
        <div className="text-3xl font-bold text-primary">{followerCount.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Followers</div>
      </div>

      <div className="space-y-3">
        <motion.button
          onClick={handleFollow}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
            isFollowing
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!user}
        >
          {isFollowing ? (
            <>
              <UserMinusIcon className="h-4 w-4" />
              Following
            </>
          ) : (
            <>
              <UserPlusIcon className="h-4 w-4" />
              Follow
            </>
          )}
        </motion.button>

        <motion.button
          onClick={handleDirectMessage}
          className="w-full flex items-center justify-center gap-2 px-6 py-2 border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <EnvelopeIcon className="h-4 w-4" />
          Direct Message
        </motion.button>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Follow for updates on new services, music releases, and creative content!
      </p>
    </motion.div>
  )
}
