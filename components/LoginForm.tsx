"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy login logic
    if (email === "test@example.com" && password === "123456") {
      alert("✅ Login Successful!");
      setError(null);
      // You can redirect or update user state here
    } else {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-purple-900 p-6 rounded-lg shadow-md flex flex-col gap-4 text-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      />

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-yellow-400 text-purple-900 font-bold rounded hover:bg-yellow-300 transition-colors"
      >
        Login
      </button>
    </form>
  );
}
