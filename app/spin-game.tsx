// /app/spin-game/page.tsx
"use client";

import { useAuth } from "@/components/AuthProvider";
import SpinWheel from "./SpinWheel";
import TicTacToe from "./TicTacToe"; // Updated TicTacToe component with AI & 2P mode
import { useState } from "react";

export default function SpinGamePage() {
  const { user } = useAuth();
  const [selectedGame, setSelectedGame] = useState<"spin" | "tictactoe" | null>(null);

  const handleWin = (reward: string) => {
    alert(`🎉 Congratulations!\nYou won: ${reward}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="text-lg font-semibold text-red-600">
          Please <span className="text-primary underline">login</span> to play games.
        </div>
      </div>
    );
  }

  if (!selectedGame)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background p-4">
        <h1 className="text-3xl font-bold text-yellow-400">🎮 Select a Game</h1>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-400"
          onClick={() => setSelectedGame("spin")}
        >
          🎯 Spin & Win
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-400"
          onClick={() => setSelectedGame("tictactoe")}
        >
          ❌ Tic-Tac-Toe
        </button>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 gap-6">
      {selectedGame === "spin" && <SpinWheel userId={user.id} onWin={handleWin} />}
      {selectedGame === "tictactoe" && <TicTacToe />}
      <button
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-400"
        onClick={() => setSelectedGame(null)}
      >
        🔙 Back to Game Selection
      </button>
    </div>
  );
}
