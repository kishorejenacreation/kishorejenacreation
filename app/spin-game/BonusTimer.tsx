// /app/spin-game/BonusTimer.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  duration: number; // in seconds
  onFinish: () => void;
};

export default function BonusTimer({ duration, onFinish }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, onFinish]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="text-center mt-4 p-4 border border-dashed border-yellow-500 rounded-xl bg-yellow-100/10 text-yellow-300">
      <p className="text-sm">⏳ Try Again Bonus in</p>
      <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
      <p className="text-xs mt-1 italic">Do not leave this page or timer will reset</p>
    </div>
  );
}
