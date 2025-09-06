"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from "react";

// -------------------- Auth Context & Provider --------------------
interface User {
  id: string;
  email?: string;
  username?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    if (emailOrUsername === "kjcadmin" && password === "kjc2005") {
      const admin: User = { id: "1", email: emailOrUsername, username: "Admin", isAdmin: true };
      setUser(admin);
      localStorage.setItem("user", JSON.stringify(admin));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string) => {
    const newUser: User = { id: "2", email, username: "User", isAdmin: false };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// -------------------- Login Form --------------------
const LoginForm = () => {
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(emailOrUsername, password);
    if (!success) setError("Invalid username or password!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username or Email"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500">
        Login
      </button>
    </form>
  );
};

// -------------------- Page --------------------
export default function LoginPage() {
  return (
    <AuthProvider>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black p-4">
        <LoginForm />
      </main>
    </AuthProvider>
  );
}
