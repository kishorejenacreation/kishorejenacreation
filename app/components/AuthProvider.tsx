"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// 👤 User structure
interface User {
  id: string;
  email?: string;
  username?: string;
  isAdmin: boolean;
}

// 🔐 Context type
interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// 🧠 Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🏗️ AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("🧠 Loaded user from localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("❌ Error parsing stored user data:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (
    emailOrUsername: string,
    password: string
  ): Promise<boolean> => {
    console.log("🔐 Attempting login with:", emailOrUsername);
    if (emailOrUsername === "kjcadmin" && password === "kjc2005") {
      const user = {
        id: "1",
        email: emailOrUsername,
        username: "Admin",
        isAdmin: true,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("✅ Admin login successful:", user);
      return true;
    }
    console.warn("❌ Login failed");
    return false;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    const user = {
      id: "2",
      email,
      username: "User",
      isAdmin: false,
    };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("🎉 Signup successful:", user);
    return true;
  };

  const logout = () => {
    console.log("👋 Logging out user:", user);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  console.log("📦 useAuth() called. Context value:", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
