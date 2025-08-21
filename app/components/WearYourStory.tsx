"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/AuthProvider"
import { useProjectForm } from "./ProjectFormContext"
import { sendProjectRequest, sendEmailFallback } from "./EmailService"

export default function WearYourStory() {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    description: "",
    deadline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { showProjectForm, openProjectForm, closeProjectForm } = useProjectForm()

  const handleStartProject = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    openProjectForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Try to send email via API first
      const result = await sendProjectRequest(formData)

      if (result.success) {
        alert(
          "Thank you! Your project request has been sent successfully. We'll contact you within 24 hours. If technically issue, you can contact with creator email id.(i.e. mentioned on the creator's about section)",
        )

        // Update user stats
        if (user) {
          const profileKey = `kjc_profile_${user.id}`
          const savedProfile = localStorage.getItem(profileKey)
          if (savedProfile) {
            const profile = JSON.parse(savedProfile)
            profile.stats.projectsSubmitted += 1
            profile.activities.unshift({
              id: Date.now().toString(),
              type: "project",
              description: `Submitted project request for ${formData.service}`,
              timestamp: new Date().toISOString(),
            })
            localStorage.setItem(profileKey, JSON.stringify(profile))
          }
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          description: "",
          deadline: "",
        })
        closeProjectForm()
      } else {
        // Fallback to mailto
        const fallbackResult = sendEmailFallback(formData)
        alert(fallbackResult.message)
        closeProjectForm()
      }
    } catch (error) {
      console.error("Error sending project request:", error)
      // Use mailto as fallback
      const fallbackResult = sendEmailFallback(formData)
      alert(fallbackResult.message)
      closeProjectForm()
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    "Video Editing",
    "Photo Editing",
    "Thumbnail Design",
    "Promotional Video",
    "Wedding Invitations",
    "Graphic Design",
    "Audio Editing",
    "Logo Design",
    "Social Media Graphics",
    "Other",
  ]

  return (
    <>
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">Create Your Vision</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Every project at Kishore Jena Creation is a canvas for innovation. Our designs blend cutting-edge
              technology with creative artistry, bringing your unique vision to life.
            </p>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button onClick={handleStartProject} className="apple-button inline-flex items-center">
                Start Your Project
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Request Form Modal */}
      <AnimatePresence>
        {showProjectForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectForm}
          >
            <motion.div
              className="bg-background rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Start Your Project</h2>
                <button onClick={closeProjectForm} className="text-muted-foreground hover:text-foreground">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Required *</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="">Select budget range</option>
                      <option value="₹500 - ₹2,000">₹500 - ₹2,000</option>
                      <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                      <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                      <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                      <option value="₹25,000+">₹25,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline</label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Please describe your project requirements in detail..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    📧 <strong>Email Delivery:</strong> Your project request will be sent directly to{" "}
                    <span className="font-mono">jenakishore2006@gmail.com</span>. If the automatic email fails, your
                    email client will open to send the request manually.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Sending Request..." : "Send Project Request"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Prompt Modal */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              className="bg-background rounded-2xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-4">Login Required</h3>
              <p className="text-muted-foreground mb-6">
                Please login or register to start your project and access our editing services.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  Login / Register
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
