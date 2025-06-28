"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email?: string
  username?: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (emailOrUsername: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (email: string, password: string) => Promise<boolean>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("kjc_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    try {
      // Admin login with specific credentials
      if (emailOrUsername === "kjcadmin" && password === "kjc2005") {
        const adminUser = {
          id: "admin",
          username: "kjcadmin",
          email: "jenakishore2006@gmail.com",
          isAdmin: true,
        }
        setUser(adminUser)
        localStorage.setItem("kjc_user", JSON.stringify(adminUser))

        // Track admin login
        const loginData = JSON.parse(localStorage.getItem("kjc_user_logins") || "[]")
        loginData.push({
          email: adminUser.email,
          timestamp: new Date().toISOString(),
          type: "admin",
        })
        localStorage.setItem("kjc_user_logins", JSON.stringify(loginData))

        return true
      }

      // Regular user login with Gmail
      if (emailOrUsername.includes("@gmail.com") && password.length >= 6) {
        const regularUser = {
          id: Date.now().toString(),
          email: emailOrUsername,
          isAdmin: false,
        }
        setUser(regularUser)
        localStorage.setItem("kjc_user", JSON.stringify(regularUser))

        // Track user login
        const loginData = JSON.parse(localStorage.getItem("kjc_user_logins") || "[]")
        loginData.push({
          email: regularUser.email,
          timestamp: new Date().toISOString(),
          type: "user",
        })
        localStorage.setItem("kjc_user_logins", JSON.stringify(loginData))

        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (email: string, password: string): Promise<boolean> => {
    if (email.includes("@gmail.com") && password.length >= 6) {
      const newUser = {
        id: Date.now().toString(),
        email,
        isAdmin: false,
      }
      setUser(newUser)
      localStorage.setItem("kjc_user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("kjc_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
