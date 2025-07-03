// /app/spin-game/SpinWheel.tsx

"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { getRandomReward } from "./gameLogic"

const segments = [
  "🎁 Amazon Gift Card",
  "😢 Try Again",
  "🎧 Spotify Premium",
  "🤑 ₹100 Zomato",
  "📦 Free Delivery",
  "🎉 Bonus Spin",
  "🔥 50 Points",
  "🍀 Better Luck Next Time",
  "💰 50% Cashback on Amazon"
]

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [reward, setReward] = useState<string | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spin = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setReward(null)

    const segmentAngle = 360 / segments.length
    const rewardIndex = Math.floor(Math.random() * segments.length)
    const spinDegrees = 360 * 5 + rewardIndex * segmentAngle + segmentAngle / 2

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)"
      wheelRef.current.style.transform = `rotate(-${spinDegrees}deg)`
    }

    setTimeout(() => {
      const result = getRandomReward()
      setReward(result)
      setIsSpinning(false)
    }, 4000)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-64 h-64">
        {/* Arrow */}
        <div className="absolute top-1/2 left-[calc(100%-10px)] -translate-y-1/2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-red-500 rotate-90"></div>
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-gray-300 relative"
        >
          {segments.map((text, index) => {
            const angle = (360 / segments.length) * index
            return (
              <div
                key={index}
                className="absolute w-1/2 h-1/2 origin-bottom left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateX(-50%)`,
                }}
              >
                <div className="text-center text-sm font-medium rotate-[270deg]">
                  {text}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-6 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 disabled:opacity-50"
      >
        {isSpinning ? "Spinning..." : "Tap to Spin"}
      </button>

      {reward && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center text-primary"
        >
          🎉 You won: {reward}
        </motion.div>
      )}
    </div>
  )
}

export default SpinWheel
