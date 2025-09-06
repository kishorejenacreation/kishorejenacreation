"use client";

import { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // User message
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Show typing indicator
    setTyping(true);

    try {
      // Simulate API call (replace with your backend AI API)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const botReply = {
        sender: "bot",
        text: `🌐 Here's an AI-powered answer to: "${newMessage.text}"`,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Network issue, please try again." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-full shadow-lg transition 
                   bg-gradient-to-r from-blue-400 to-purple-500 text-white"
        aria-label="Toggle Chatbot"
      >
        {open ? <FaTimes /> : <FaRobot />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="mt-4 p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-lg w-80 max-h-[450px] flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">
            🌍 CAYA AI
          </h3>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto mb-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 dark:bg-zinc-700 text-black dark:text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded border text-black dark:text-white 
                         bg-zinc-100 dark:bg-zinc-800"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
