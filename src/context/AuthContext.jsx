"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { identifyUser, setTrait, initFlagsmith } from "../lib/flagsmith"
import { toast } from "sonner" 

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [flagsmithReady, setFlagsmithReady] = useState(false)

  // Initialize Flagsmith
  useEffect(() => {
    const setupFlagsmith = async () => {
      await initFlagsmith()
      setFlagsmithReady(true)
    }

    setupFlagsmith()
  }, [])

  // Check for existing user session on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("sharekart-user")
      const sessionExpiry = localStorage.getItem("sharekart-session-expiry")
      const storedUserType = localStorage.getItem("sharekart-user-type")

      if (storedUser && sessionExpiry) {
        const expiryDate = new Date(sessionExpiry)
        const now = new Date()

        if (now < expiryDate) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          setUserType(storedUserType || "buyer")

          if (flagsmithReady) {
            identifyUser(parsedUser.id.toString(), { userType: storedUserType || "buyer" })
          }
        } else {
          handleLogout()
        }
      }

      setIsLoading(false)
    }

    if (flagsmithReady) {
      checkAuthStatus()
    }
  }, [flagsmithReady])

  // Login function
  const login = async (userData) => {
    try {
      localStorage.setItem("sharekart-user", JSON.stringify(userData))
      localStorage.setItem("sharekart-session-expiry", new Date(Date.now() + 24 * 60 * 60 * 1000).toString())

      const storedUserType = localStorage.getItem("sharekart-user-type") || "buyer"

      setUser(userData)
      setUserType(storedUserType)

      if (flagsmithReady) {
        await identifyUser(userData.id.toString(), { userType: storedUserType })
      }

      toast.success(`Welcome back, ${userData.name}!`, {
        description: `You have successfully logged in as a ${storedUserType}.`,
        duration: 4000
      })

      return true
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed", { description: "There was a problem logging in. Please try again." })
      return false
    }
  }

  // Signup function
  const signup = async (userData, type) => {
    try {
      localStorage.setItem("sharekart-user", JSON.stringify(userData))
      localStorage.setItem("sharekart-user-type", type)
      localStorage.setItem("sharekart-session-expiry", new Date(Date.now() + 24 * 60 * 60 * 1000).toString())

      setUser(userData)
      setUserType(type)

      if (flagsmithReady) {
        await identifyUser(userData.id.toString())
        await setTrait("userType", type)
      }

      toast.success(`Welcome to ShareKart, ${userData.name}!`, {
        description: `You have successfully signed up as a ${type}.`,
        duration: 4000
      })

      return true
    } catch (error) {
      console.error("Signup error:", error)
      toast.error("Signup failed", { description: "There was a problem creating your account." })
      return false
    }
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("sharekart-user")
    localStorage.removeItem("sharekart-session-expiry")
    setUser(null)
    setUserType(null)
  }

  return (
    <AuthContext.Provider value={{ user, userType, isLoading, flagsmithReady, login, signup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
