"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "./AuthProvider"
import {
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface UserActivity {
  id: string
  type: "follow" | "like" | "chat" | "project"
  description: string
  timestamp: string
}

interface UserProfileData {
  name: string
  bio: string
  location: string
  joinDate: string
  activities: UserActivity[]
  stats: {
    following: boolean
    postsLiked: number
    chatMessages: number
    projectsSubmitted: number
  }
}

export default function UserProfile() {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", bio: "", location: "" })

  useEffect(() => {
    if (user) {
      try {
        // Load user profile data
        const savedProfile = localStorage.getItem(`kjc_profile_${user.id}`)
        if (savedProfile) {
          setProfileData(JSON.parse(savedProfile))
        } else {
          // Create default profile
          const defaultProfile: UserProfileData = {
            name: user.email?.split("@")[0] || "User",
            bio: "Music lover and creative enthusiast",
            location: "India",
            joinDate: new Date().toISOString(),
            activities: [
              {
                id: "1",
                type: "follow",
                description: "Started following Kishore Jena Creation",
                timestamp: new Date().toISOString(),
              },
            ],
            stats: {
              //following: false,
              postsLiked: 0,
              chatMessages: 0,
              projectsSubmitted: 0,
            },
          }
          setProfileData(defaultProfile)
          localStorage.setItem(`kjc_profile_${user.id}`, JSON.stringify(defaultProfile))
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }
  }, [user])

  const handleSaveProfile = () => {
    if (profileData && user) {
      try {
        const updatedProfile = {
          ...profileData,
          name: editForm.name,
          bio: editForm.bio,
          location: editForm.location,
        }
        setProfileData(updatedProfile)
        localStorage.setItem(`kjc_profile_${user.id}`, JSON.stringify(updatedProfile))
        setIsEditing(false)
      } catch (error) {
        console.error("Error saving profile:", error)
        alert("Error saving profile. Please try again.")
      }
    }
  }

  const handleEditClick = () => {
    if (profileData) {
      setEditForm({
        name: profileData.name,
        bio: profileData.bio,
        location: profileData.location,
      })
      setIsEditing(true)
    }
  }

  if (!user || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Please login to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          className="bg-background border border-border rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-white" />
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Your name"
                      className="text-lg font-bold"
                    />
                    <Input
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      placeholder="Your bio"
                    />
                    <Input
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="Your location"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-foreground">{profileData.name}</h1>
                    <p className="text-muted-foreground mt-1">{profileData.bio}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <EnvelopeIcon className="h-4 w-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        Joined {new Date(profileData.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSaveProfile} size="sm">
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    <XMarkIcon className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={handleEditClick} variant="outline" size="sm">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <HeartIcon className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{profileData.stats.postsLiked}</div>
              <div className="text-sm text-muted-foreground">Posts Liked</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <ChatBubbleLeftIcon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{profileData.stats.chatMessages}</div>
              <div className="text-sm text-muted-foreground">Chat Messages</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{profileData.stats.projectsSubmitted}</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <UserIcon className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{profileData.stats.following ? "1" : "0"}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-background border border-border rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {profileData.activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  {activity.type === "follow" && <UserIcon className="h-5 w-5 text-primary" />}
                  {activity.type === "like" && <HeartIcon className="h-5 w-5 text-red-500" />}
                  {activity.type === "chat" && <ChatBubbleLeftIcon className="h-5 w-5 text-blue-500" />}
                  {activity.type === "project" && <DocumentTextIcon className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-foreground">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">{new Date(activity.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
