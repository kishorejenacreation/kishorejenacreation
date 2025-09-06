"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

  const getEmoji = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return "🌞 Good Morning!";
    if (hour >= 12 && hour < 17) return "🌤️ Good Afternoon!";
    if (hour >= 17 && hour < 20) return "🌅 Good Evening!";
    return "🌙 Good Night!";
  };

  // 🎉 Festival data (currently commented out)
  // const festival = {
  //   image: "https://link-to-your-festival-image.com/festival.png",
  //   title: "Happy Diwali!",
  //   subtitle: "May your life be full of lights and joy 🪔✨",
  // };

  return (
    <motion.div
      className="bg-background/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-center shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-lg font-bold text-primary tabular-nums drop-shadow-lg glow">
        {formatTime(currentTime)}
      </div>
      <div className="text-sm text-yellow-400 font-semibold drop-shadow-md">{getEmoji()}</div>
      <div className="text-xs text-muted-foreground">{formatDate(currentTime)}</div>
      <div className="text-xs text-muted-foreground opacity-75">{getTimeZone()}</div>

      {/* Festival Box (currently commented out)
      <div className="mt-4 bg-yellow-400/20 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-yellow-300">
        <img src={festival.image} alt="festival" className="w-20 h-20 mx-auto mb-2" />
        <h2 className="text-lg font-bold text-yellow-300 drop-shadow-md">{festival.title}</h2>
        <p className="text-sm text-orange-200 drop-shadow-sm">{festival.subtitle}</p>
      </div>
      */}
    </motion.div>
  );
}
