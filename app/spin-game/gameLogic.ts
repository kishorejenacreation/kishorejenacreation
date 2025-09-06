"use client";

import { useState, useEffect } from "react";

export default function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // ❌ Player 1 / AI turn control
  const [winner, setWinner] = useState<string | null>(null);
  const [mode, setMode] = useState<"AI" | "2P" | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [totalGames, setTotalGames] = useState(0);

  const checkWinner = (b: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, bIndex, c] of lines) {
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];

    if (mode === "AI") {
      if (!xIsNext) return; // Only player moves on X
      newBoard[index] = "❌";
      setBoard(newBoard);
      const win = checkWinner(newBoard);
      if (win) {
        setWinner(win);
        setScores((prev) => ({ ...prev, [win]: prev[win] + 1 }));
        setTotalGames((prev) => prev + 1);
      }
      setXIsNext(false);
    } else {
      newBoard[index] = xIsNext ? "❌" : "⭕";
      setBoard(newBoard);
      const win = checkWinner(newBoard);
      if (win) {
        setWinner(win);
        setScores((prev) => ({ ...prev, [win]: prev[win] + 1 }));
        setTotalGames((prev) => prev + 1);
      }
      setXIsNext(!xIsNext);
    }
  };

  // Computer random move
  useEffect(() => {
    if (mode === "AI" && !xIsNext && !winner) {
      const emptyIndexes = board
        .map((v, i) => (v === null ? i : null))
        .filter((i) => i !== null) as number[];
      if (emptyIndexes.length === 0) return;
      const move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const timer = setTimeout(() => {
        const newBoard = [...board];
        newBoard[move] = "⭕";
        setBoard(newBoard);
        const win = checkWinner(newBoard);
        if (win) {
          setWinner(win);
          setScores((prev) => ({ ...prev, [win]: prev[win] + 1 }));
          setTotalGames((prev) => prev + 1);
        }
        setXIsNext(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, xIsNext, winner, mode]);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  if (!mode)
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-white mb-4">Select Mode</h1>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
          onClick={() => setMode("AI")}
        >
          ❌ Player vs Computer ⭕
        </button>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
          onClick={() => setMode("2P")}
        >
          ❌ Player vs Player ⭕
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-indigo-800 p-4 gap-4">
      <h1 className="text-4xl font-bold text-yellow-400">Tic-Tac-Toe 🎮</h1>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 text-4xl font-bold bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center"
          >
            {cell}
          </button>
        ))}
      </div>

      <p className={`mt-2 text-2xl font-bold ${winner ? "text-green-400" : "text-white"}`}>
        {winner
          ? `🏆 Winner: ${winner}`
          : board.every((cell) => cell)
          ? "🤝 It's a Tie!"
          : mode === "AI"
          ? `Next: ${xIsNext ? "❌ You" : "⭕ Computer"}`
          : `Next: ${xIsNext ? "❌ Player 1" : "⭕ Player 2"}`}
      </p>

      <div className="flex gap-6 text-white font-bold text-lg mt-2">
        <p>❌: {scores.X}</p>
        <p>⭕: {scores.O}</p>
        <p>Total Games: {totalGames}</p>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={restartGame}
          className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-400"
        >
          🔄 Restart Game
        </button>

        <button
          onClick={() => setMode(null)}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-400"
        >
          🔙 Back to Mode Selection
        </button>
      </div>
    </div>
  );
}
