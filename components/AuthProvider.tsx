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
const AuthContext = createContext<AuthContextType | null>(null);

// 🏗️ AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error parsing stored user data:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    // Admin login check
    if (emailOrUsername === "kjcadmin" && password === "kjc2005") {
      const user: User = {
        id: "1",
        email: emailOrUsername,
        username: "Admin",
        isAdmin: true,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    const user: User = {
      id: "2",
      email,
      username: "User",
      isAdmin: false,
    };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to access auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
