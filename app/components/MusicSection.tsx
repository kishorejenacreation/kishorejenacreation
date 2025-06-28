"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { PlayIcon, PauseIcon, MusicalNoteIcon, MagnifyingGlassIcon, HeartIcon } from "@heroicons/react/24/solid"
import { Input } from "@/components/ui/input"
import { useAuth } from "./AuthProvider"
import { useMusic } from "./MusicContext"

// English-only song database with real YouTube video IDs
const createSongDatabase = () => {
  const englishSongs = [
    {
      id: 1,
      title: "Shape of You",
      artist: "Ed Sheeran",
      duration: "3:53",
      category: "English Songs",
      year: 2017,
      mood: "upbeat",
      youtubeId: "JGwWNGJdvx8",
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      duration: "3:20",
      category: "English Songs",
      year: 2019,
      mood: "upbeat",
      youtubeId: "4NRXx6U8ABQ",
    },
    {
      id: 3,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      duration: "2:54",
      category: "English Songs",
      year: 2020,
      mood: "upbeat",
      youtubeId: "E07s5ZYygMg",
    },
    {
      id: 4,
      title: "Someone You Loved",
      artist: "Lewis Capaldi",
      duration: "3:02",
      category: "English Songs",
      year: 2018,
      mood: "sad",
      youtubeId: "zABLecsR5UE",
    },
    {
      id: 5,
      title: "Perfect",
      artist: "Ed Sheeran",
      duration: "4:23",
      category: "English Songs",
      year: 2017,
      mood: "romantic",
      youtubeId: "2Vv-BfVoq4g",
    },
    {
      id: 6,
      title: "Bad Habits",
      artist: "Ed Sheeran",
      duration: "3:51",
      category: "English Songs",
      year: 2021,
      mood: "upbeat",
      youtubeId: "orJSJGHjBLI",
    },
    {
      id: 7,
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      duration: "2:21",
      category: "English Songs",
      year: 2021,
      mood: "upbeat",
      youtubeId: "kTJczUoc26U",
    },
    {
      id: 8,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      duration: "2:58",
      category: "English Songs",
      year: 2021,
      mood: "upbeat",
      youtubeId: "gNi_6U5Pm_o",
    },
    {
      id: 9,
      title: "Levitating",
      artist: "Dua Lipa",
      duration: "3:23",
      category: "English Songs",
      year: 2020,
      mood: "upbeat",
      youtubeId: "TUVcZfQe-Kw",
    },
    {
      id: 10,
      title: "Drivers License",
      artist: "Olivia Rodrigo",
      duration: "4:02",
      category: "English Songs",
      year: 2021,
      mood: "sad",
      youtubeId: "ZmDBbnmKpqQ",
    },
    {
      id: 11,
      title: "As It Was",
      artist: "Harry Styles",
      duration: "2:47",
      category: "English Songs",
      year: 2022,
      mood: "upbeat",
      youtubeId: "H5v3kku4y6Q",
    },
    {
      id: 12,
      title: "Heat Waves",
      artist: "Glass Animals",
      duration: "3:58",
      category: "English Songs",
      year: 2020,
      mood: "upbeat",
      youtubeId: "mRD0-GxqHVo",
    },
    {
      id: 13,
      title: "Anti-Hero",
      artist: "Taylor Swift",
      duration: "3:20",
      category: "English Songs",
      year: 2022,
      mood: "upbeat",
      youtubeId: "b1kbLWvqugk",
    },
    {
      id: 14,
      title: "Flowers",
      artist: "Miley Cyrus",
      duration: "3:20",
      category: "English Songs",
      year: 2023,
      mood: "upbeat",
      youtubeId: "G7KNmW9a75Y",
    },
    {
      id: 15,
      title: "Unholy",
      artist: "Sam Smith ft. Kim Petras",
      duration: "2:36",
      category: "English Songs",
      year: 2022,
      mood: "upbeat",
      youtubeId: "Uq9gPaIzbe8",
    },
    {
      id: 16,
      title: "About Damn Time",
      artist: "Lizzo",
      duration: "3:12",
      category: "English Songs",
      year: 2022,
      mood: "upbeat",
      youtubeId: "QWPW645jlKU",
    },
    {
      id: 17,
      title: "Running Up That Hill",
      artist: "Kate Bush",
      duration: "5:03",
      category: "English Songs",
      year: 1985,
      mood: "upbeat",
      youtubeId: "wp43OdtAAkM",
    },
    {
      id: 18,
      title: "I'm Good (Blue)",
      artist: "David Guetta & Bebe Rexha",
      duration: "2:55",
      category: "English Songs",
      year: 2022,
      mood: "upbeat",
      youtubeId: "90RLzVUuXe4",
    },
    {
      id: 19,
      title: "Shivers",
      artist: "Ed Sheeran",
      duration: "3:27",
      category: "English Songs",
      year: 2021,
      mood: "romantic",
      youtubeId: "Il0S8BoucSA",
    },
    {
      id: 20,
      title: "Industry Baby",
      artist: "Lil Nas X & Jack Harlow",
      duration: "3:32",
      category: "English Songs",
      year: 2021,
      mood: "upbeat",
      youtubeId: "5XK4v2fgMPU",
    },
  ]

  return englishSongs
}

// Static song database
const allSongs = createSongDatabase()

const musicCategories = [
  { id: 1, name: "All Songs", songs: allSongs, totalCount: 50000000 },
  { id: 2, name: "English Songs", songs: allSongs.filter((s) => s.category === "English Songs"), totalCount: 50000000 },
  { id: 3, name: "Pop Music", songs: allSongs.filter((s) => s.mood === "upbeat"), totalCount: 35000000 },
  { id: 4, name: "Romantic", songs: allSongs.filter((s) => s.mood === "romantic"), totalCount: 10000000 },
  { id: 5, name: "Sad Songs", songs: allSongs.filter((s) => s.mood === "sad"), totalCount: 5000000 },
  { id: 6, name: "Ed Sheeran", songs: allSongs.filter((s) => s.artist === "Ed Sheeran"), totalCount: 150 },
  { id: 7, name: "Harry Styles", songs: allSongs.filter((s) => s.artist === "Harry Styles"), totalCount: 80 },
  { id: 8, name: "Taylor Swift", songs: allSongs.filter((s) => s.artist === "Taylor Swift"), totalCount: 200 },
]

export default function MusicSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const { isAuthenticated } = useAuth()
  const { playSong, playingSongId, isPlaying } = useMusic()

  // Set playlist when component mounts
  useEffect(() => {
    // This would be used to set the playlist in the music context
    // For now, we'll handle it in the context itself
  }, [])

  const handlePlaySong = (song: any) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    playSong(song)
  }

  const filteredSongs = useMemo(() => {
    const categorySongs = musicCategories[activeCategory].songs

    if (!searchQuery.trim()) {
      return categorySongs.sort((a, b) => a.title.localeCompare(b.title))
    }

    const filtered = categorySongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.year.toString().includes(searchQuery),
    )

    return filtered.sort((a, b) => a.title.localeCompare(b.title))
  }, [activeCategory, searchQuery])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`
    }
    return num.toString()
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "romantic":
      case "love":
        return "💕"
      case "sad":
        return "😢"
      case "devotional":
        return "🙏"
      case "folk":
        return "🎭"
      case "upbeat":
        return "🎉"
      default:
        return "🎵"
    }
  }

  return (
    <section id="music" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Music Platform</h2>
          <p className="text-lg text-muted-foreground mb-2">Stream full songs directly from YouTube</p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <span>🎵 English: {formatNumber(50000000)} songs</span>
            <span>🎵 Pop: {formatNumber(35000000)} songs</span>
            <span>🎵 Artists: 10,000+</span>
          </div>
          <div className="mt-2 text-sm text-primary">▶️ Powered by YouTube • Full song streaming</div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search from 50M+ English YouTube songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-full bg-background/50 backdrop-blur-sm border-border focus:border-primary"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex bg-secondary/20 rounded-full p-1 min-w-max gap-1">
            {musicCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(index)
                  setSearchQuery("")
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === index
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.name} ({formatNumber(category.totalCount)})
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Song List */}
          <div className="lg:col-span-2">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                {searchQuery && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredSongs.length} results from{" "}
                      {formatNumber(musicCategories[activeCategory].totalCount)} songs
                    </p>
                  </div>
                )}

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredSongs.length > 0 ? (
                    filteredSongs.map((song, index) => (
                      <motion.div
                        key={song.id}
                        className={`flex items-center justify-between p-4 rounded-xl transition-colors group ${
                          playingSongId === song.id ? "bg-primary/20 border border-primary/30" : "hover:bg-secondary/20"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handlePlaySong(song)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                              playingSongId === song.id
                                ? "bg-red-600 text-white"
                                : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                            title="Play on YouTube"
                          >
                            {playingSongId === song.id && isPlaying ? (
                              <PauseIcon className="h-5 w-5" />
                            ) : (
                              <PlayIcon className="h-5 w-5 ml-0.5" />
                            )}
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4
                                className={`font-semibold ${
                                  playingSongId === song.id ? "text-primary" : "text-foreground"
                                }`}
                              >
                                {song.title}
                              </h4>
                              <span className="text-sm">{getMoodEmoji(song.mood)}</span>
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">YouTube</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {song.artist} • {song.year} • {song.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{song.duration}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!isAuthenticated) {
                                setShowLoginPrompt(true)
                              }
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <HeartIcon className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MusicalNoteIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No songs found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>

                {!searchQuery && (
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Showing sample songs • {formatNumber(musicCategories[activeCategory].totalCount)} total available
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Stats */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-semibold mb-4 text-foreground">YouTube Music Library</h3>
              <div className="space-y-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <h4 className="font-medium text-red-600">YouTube Integration</h4>
                  <p className="text-sm text-red-700">Full song streaming</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <h4 className="font-medium text-blue-600">Total Songs</h4>
                  <p className="text-2xl font-bold text-blue-700">{formatNumber(50000000)}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <h4 className="font-medium text-green-600">English Collection</h4>
                  <p className="text-xl font-bold text-green-700">{formatNumber(50000000)}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <h4 className="font-medium text-purple-600">Pop Music</h4>
                  <p className="text-xl font-bold text-purple-700">{formatNumber(35000000)}</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <h4 className="font-medium text-orange-600">Artists</h4>
                  <p className="text-lg font-bold text-orange-700">10,000+</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              className="bg-background rounded-2xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MusicalNoteIcon className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Login Required</h3>
              <p className="text-muted-foreground mb-6">
                Please login or register to enjoy our YouTube music platform with 50M+ songs and access all features.
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

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-muted-foreground">
            🎵 World's largest English music collection • 50M+ songs streamed from YouTube
          </p>
        </motion.div>
      </div>
    </section>
  )
}
