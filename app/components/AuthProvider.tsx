"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email?: string
  username?: string
  isAdmin: boolean
  name?: string
  dob?: string
  age?: string
  gender?: string
  mobile?: string
  country?: string
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
    const storedUser = localStorage.getItem("kjc_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    try {
      // Admin login
      if (emailOrUsername === "kjcadmin" && password === "kjc2005") {
        const adminUser: User = {
          id: "admin",
          username: "kjcadmin",
          email: "jenakishore2006@gmail.com",
          isAdmin: true
        }
        setUser(adminUser)
        localStorage.setItem("kjc_user", JSON.stringify(adminUser))
        return true
      }

      // Regular user login
      const existing = JSON.parse(localStorage.getItem("kjc_user") || "{}")
      const regularUser: User = {
        id: existing.id || Date.now().toString(),
        email: emailOrUsername,
        isAdmin: false,
        name: existing.name,
        dob: existing.dob,
        age: existing.age,
        gender: existing.gender,
        mobile: existing.mobile,
        country: existing.country
      }
      setUser(regularUser)
      localStorage.setItem("kjc_user", JSON.stringify(regularUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email && password.length >= 4) {
        const form = JSON.parse(localStorage.getItem("kjc_signup_form") || "{}")
        const newUser: User = {
          id: Date.now().toString(),
          email,
          isAdmin: false,
          name: form.name,
          dob: form.dob,
          age: form.age,
          gender: form.gender,
          mobile: form.mobile,
          country: form.country
        }
        setUser(newUser)
        localStorage.setItem("kjc_user", JSON.stringify(newUser))
        return true
      }
      return false
    } catch (err) {
      console.error("Signup error:", err)
      return false
    }
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
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
