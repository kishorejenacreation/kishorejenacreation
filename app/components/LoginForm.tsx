"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Add your login logic here
  };

  return (
    <div className="auth-form responsive-container">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md bg-input text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md bg-input text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="apple-button w-full">Log In</button>
      </form>
    </div>
  );
}
