"use client"

import { useState, useRef } from "react"
import { CameraIcon } from "@heroicons/react/24/outline"

export default function DualCameraWithFilters() {
  const [image, setImage] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("none")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" }, // "environment" for back cam
      audio: false,
    })
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const context = canvasRef.current.getContext("2d")
    if (!context) return

    const width = videoRef.current.videoWidth
    const height = videoRef.current.videoHeight

    canvasRef.current.width = width
    canvasRef.current.height = height

    context.filter = filter
    context.drawImage(videoRef.current, 0, 0, width, height)

    const dataUrl = canvasRef.current.toDataURL("image/png")
    setImage(dataUrl)
  }

  const saveImage = () => {
    if (!image) return
    const a = document.createElement("a")
    a.href = image
    a.download = "selfie.png"
    a.click()
  }

  const reset = () => {
    setImage(null)
    setFilter("none")
  }

  const filters = [
    "none",
    "grayscale(1)",
    "sepia(1)",
    "blur(2px)",
    "contrast(1.5)",
    "brightness(1.2)",
    "saturate(2)",
  ]

  return (
    <div className="text-center space-y-4">
      {!image ? (
        <>
          <video
            ref={videoRef}
            className="rounded-xl mx-auto border shadow-md"
            style={{ filter }}
            autoPlay
            playsInline
            width={300}
            height={225}
          />

          {/* 🎨 Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
              >
                {f === "none" ? "Normal" : f}
              </button>
            ))}
          </div>

          {/* 📷 Controls */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={startCamera}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 flex items-center gap-2"
            >
              <CameraIcon className="h-5 w-5" />
              Start Camera
            </button>
            <button
              onClick={takePhoto}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
            >
              📸 Take Photo
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            src={image}
            alt="Captured"
            className="rounded-lg border shadow-lg mx-auto w-[300px]"
          />
          <div className="flex justify-center gap-4 mt-3">
            <button
              onClick={reset}
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              🔄 Retake
            </button>
            <button
              onClick={saveImage}
              className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
            >
              💾 Save
            </button>
          </div>
        </>
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  )
}
