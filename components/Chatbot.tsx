"use client";

import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 transition"
        aria-label="Toggle Chatbot"
      >
        {open ? <FaTimes /> : <FaRobot />}
      </button>

      {open && (
        <div className="mt-4 p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-72 max-h-[400px] overflow-auto">
          <h3 className="text-lg font-semibold mb-2">🤖 Chatbot</h3>
          <div className="text-sm text-muted-foreground mb-4">
            Hi! Ask me anything or say "Hi CAYA".
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full p-2 rounded border text-black dark:text-white bg-zinc-100 dark:bg-zinc-700"
          />
        </div>
      )}
    </div>
  );
}
