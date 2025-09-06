"use client";

import { useState, useEffect } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // true: Player X / Player1, false: Computer O / Player2
  const [winner, setWinner] = useState<string | null>(null);
  const [mode, setMode] = useState<"AI" | "2P" | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [totalGames, setTotalGames] = useState(0);

  const checkWinner = (board: (string | null)[]) => {
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
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    if (!board.includes(null)) return "Tie";
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];

    if (mode === "AI") {
      if (!isPlayerTurn) return;
      newBoard[index] = "X";
      setBoard(newBoard);
      const win = checkWinner(newBoard);
      if (win) {
        setWinner(win);
        if (win !== "Tie") setScores(prev => ({ ...prev, [win]: prev[win] + 1 }));
        setTotalGames(prev => prev + 1);
      }
      setIsPlayerTurn(false);
    } else {
      newBoard[index] = isPlayerTurn ? "X" : "O";
      setBoard(newBoard);
      const win = checkWinner(newBoard);
      if (win) {
        setWinner(win);
        if (win !== "Tie") setScores(prev => ({ ...prev, [win]: prev[win] + 1 }));
        setTotalGames(prev => prev + 1);
      }
      setIsPlayerTurn(!isPlayerTurn);
    }
  };

  const computerMove = () => {
    const emptyIndexes = board.map((v, i) => v === null ? i : null).filter(i => i !== null) as number[];
    if (!emptyIndexes.length) return;
    const move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const newBoard = [...board];
    newBoard[move] = "O";
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      if (win !== "Tie") setScores(prev => ({ ...prev, [win]: prev[win] + 1 }));
      setTotalGames(prev => prev + 1);
    }
    setIsPlayerTurn(true);
  };

  useEffect(() => {
    if (mode === "AI" && !isPlayerTurn && !winner) {
      const timer = setTimeout(computerMove, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board, mode]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  if (!mode)
    return (
      <div className="flex flex-col items-center gap-6 min-h-screen justify-center bg-indigo-900 p-4 text-white">
        <h1 className="text-3xl font-bold">Select Game Mode</h1>
        <button
          className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-400"
          onClick={() => setMode("AI")}
        >
          ❌ Player vs Computer ⭕
        </button>
        <button
          className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-400"
          onClick={() => setMode("2P")}
        >
          ❌ Player vs Player ⭕
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-indigo-900 p-4 text-white">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>

      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="w-20 h-20 text-3xl font-bold bg-indigo-700 rounded shadow hover:bg-indigo-600 transition-colors"
          >
            {cell}
          </button>
        ))}
      </div>

      <p className="mt-4 text-2xl font-semibold">
        {winner
          ? winner === "Tie"
            ? "🤝 It's a Tie!"
            : `🏆 Winner: ${winner}`
          : mode === "AI"
          ? `Next: ${isPlayerTurn ? "❌ You" : "⭕ Computer"}`
          : `Next: ${isPlayerTurn ? "❌ Player 1" : "⭕ Player 2"}`}
      </p>

      <div className="flex gap-6 mt-2 font-bold text-lg">
        <p>❌: {scores.X}</p>
        <p>⭕: {scores.O}</p>
        <p>Total Games: {totalGames}</p>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-yellow-500 text-indigo-900 rounded hover:bg-yellow-400"
        >
          🔄 Restart Game
        </button>

        <button
          onClick={() => setMode(null)}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-400"
        >
          🔙 Back to Mode Selection
        </button>
      </div>
    </div>
  );
}
