// /app/spin-game/SpinWheel.tsx

"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { rewards, getRandomReward } from "./gameLogic"

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [reward, setReward] = useState<string | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spin = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setReward(null)

    const segmentAngle = 360 / rewards.length
    const rewardIndex = Math.floor(Math.random() * rewards.length)
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
      <h1 className="text-3xl font-bold text-white">🎯 Spin & Win</h1>
      <p className="text-sm text-muted-foreground">Tap the wheel and test your luck! Win real rewards 🎁</p>

      <div className="relative w-72 h-72">
        {/* Arrow */}
        <div className="absolute top-1/2 left-[calc(100%-10px)] -translate-y-1/2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-red-500 rotate-90"></div>
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-gray-300 relative"
          style={{ transformOrigin: "center center" }}
        >
          {rewards.map((text, index) => {
            const angle = (360 / rewards.length) * index
            return (
              <div
                key={index}
                className="absolute w-full h-full flex justify-center items-start"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="text-xs text-white text-center origin-center"
                  style={{ transform: `rotate(-${angle}deg)`, width: "100px" }}
                >
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
        {isSpinning ? "Spinning..." : "🍀 Tap to Spin"}
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
