"use client"

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react"

interface Song {
  id: number
  title: string
  artist: string
  duration: string
  category: string
  year: number
  mood: string
  youtubeId: string
}

interface MusicContextType {
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  playlist: Song[]
  playingSongId: number | null
  playSong: (song: Song) => void
  togglePlay: () => void
  nextSong: () => void
  prevSong: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const playerRef = useRef<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        console.log("YouTube API loaded")
      }
    }
  }, [])

  const createPlayer = (videoId: string) => {
    if (window.YT && window.YT.Player) {
      // Remove existing player
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume)
            setDuration(event.target.getDuration())
            setIsPlaying(true)
            startTimeTracking()
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              startTimeTracking()
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
              stopTimeTracking()
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false)
              stopTimeTracking()
              nextSong()
            }
          },
        },
      })
    }
  }

  const startTimeTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime())
      }
    }, 1000)
  }

  const stopTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const playSong = (song: Song) => {
    setCurrentSong(song)

    // Create player container if it doesn't exist
    if (!document.getElementById("youtube-player")) {
      const playerDiv = document.createElement("div")
      playerDiv.id = "youtube-player"
      playerDiv.style.display = "none"
      document.body.appendChild(playerDiv)
    }

    if (window.YT && window.YT.Player) {
      createPlayer(song.youtubeId)
    } else {
      // Fallback: open YouTube in new tab
      window.open(`https://www.youtube.com/watch?v=${song.youtubeId}`, "_blank")
    }
  }

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    }
  }

  const nextSong = () => {
    if (!currentSong || playlist.length === 0) return

    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    playSong(playlist[nextIndex])
  }

  const prevSong = () => {
    if (!currentSong || playlist.length === 0) return

    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
    playSong(playlist[prevIndex])
  }

  const handleSetVolume = (newVolume: number) => {
    setVolume(newVolume)
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVolume)
    }
  }

  const seekTo = (time: number) => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(time, true)
      setCurrentTime(time)
    }
  }

  // Cleanup
  useEffect(() => {
    return () => {
      stopTimeTracking()
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        playlist,
        playingSongId: currentSong?.id || null,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        setVolume: handleSetVolume,
        seekTo,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
