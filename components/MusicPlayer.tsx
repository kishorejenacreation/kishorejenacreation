"use client";

import { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const musicUrl = "/music/sample.mp3"; // ✅ Replace with your actual music file path

export default function MusicPlayer() {
  const [audio] = useState(new Audio(musicUrl));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const togglePlayback = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3 z-50">
      <button onClick={togglePlayback}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <span className="text-sm">{isPlaying ? "Playing..." : "Paused"}</span>
    </div>
  );
}
