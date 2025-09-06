"use client";

import { useState, useEffect } from "react";

export default function TicTacToePage() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [mode, setMode] = useState<"AI" | "2P" | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [totalGames, setTotalGames] = useState(0);

  const checkWinner = (newBoard: string[]) => {
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
    for (let line of lines) {
      const [a, b, c] = line;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];

    if (mode === "AI") {
      if (!isXTurn) return; // Player's turn only
      newBoard[index] = "❌";
      setBoard(newBoard);
      const win = checkWinner(newBoard);
      if (win) {
        setWinner(win);
        setScores((prev) => ({ ...prev, [win]: prev[win] + 1 }));
        setTotalGames((prev) => prev + 1);
      }
      setIsXTurn(false); // Computer next
    } else {
      // 2 Players
      newBoard[index] = isXTurn ? "❌" : "⭕";
      setBoard(newBoard);
      const win = checkWinner(newBoard);
      if (win) {
        setWinner(win);
        setScores((prev) => ({ ...prev, [win]: prev[win] + 1 }));
        setTotalGames((prev) => prev + 1);
      }
      setIsXTurn(!isXTurn);
    }
  };

  // Computer random move for AI mode
  useEffect(() => {
    if (mode === "AI" && !isXTurn && !winner) {
      const emptyIndexes = board.map((v, i) => (v === "" ? i : null)).filter((i) => i !== null) as number[];
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
        setIsXTurn(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, isXTurn, winner, mode]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setWinner(null);
  };

  if (!mode)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Select Game Mode</h1>
        <button
          onClick={() => setMode("AI")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400"
        >
          ❌ Player vs Computer ⭕
        </button>
        <button
          onClick={() => setMode("2P")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
        >
          ❌ Player vs Player ⭕
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-b from-purple-900 to-indigo-800 p-4">
      <h1 className="text-3xl font-bold text-yellow-400">Tic-Tac-Toe 🎮</h1>

      <div className="grid grid-cols-3 gap-2 w-[300px]">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 text-4xl font-bold text-white bg-purple-700 rounded-lg hover:bg-purple-600"
          >
            {cell}
          </button>
        ))}
      </div>

      <p className={`mt-2 text-2xl font-bold ${winner ? "text-green-400" : "text-white"}`}>
        {winner
          ? `${winner} Wins! 🎉`
          : board.every((cell) => cell !== "")
          ? "It's a Tie! 🤝"
          : mode === "AI"
          ? `Turn: ${isXTurn ? "❌ You" : "⭕ Computer"}`
          : `Turn: ${isXTurn ? "❌ Player 1" : "⭕ Player 2"}`}
      </p>

      <div className="flex gap-6 mt-2 text-white text-lg font-bold">
        <p>❌: {scores.X}</p>
        <p>⭕: {scores.O}</p>
        <p>Total Games: {totalGames}</p>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-yellow-400 text-purple-900 font-bold rounded-lg hover:bg-yellow-300"
        >
          Restart Game
        </button>

        <button
          onClick={() => setMode(null)}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400"
        >
          🔙 Back to Mode Selection
        </button>
      </div>
    </div>
  );
}
