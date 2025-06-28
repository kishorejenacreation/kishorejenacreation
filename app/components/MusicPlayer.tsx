"use client"

import type React from "react"

import { motion } from "framer-motion"
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid"
import { useMusic } from "./MusicContext"

export default function MusicPlayer() {
  const { currentSong, isPlaying, currentTime, duration, volume, togglePlay, nextSong, prevSong, setVolume, seekTo } =
    useMusic()

  if (!currentSong) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (Number.parseFloat(e.target.value) / 100) * duration
    seekTo(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value) / 100
    setVolume(newVolume)
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{currentSong.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
          </div>

          <div className="flex items-center gap-4 mx-4">
            <button onClick={prevSong} className="text-foreground hover:text-primary transition-colors">
              <BackwardIcon className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
            </button>
            <button onClick={nextSong} className="text-foreground hover:text-primary transition-colors">
              <ForwardIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <SpeakerWaveIcon className="h-4 w-4 text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-secondary rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </motion.div>
  )
}
