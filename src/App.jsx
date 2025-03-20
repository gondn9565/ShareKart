"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Dashboard from "./pages/Dashboard"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import { CartProvider } from "./context/CartContext"
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuthStatus = () => {
      const userLoggedIn = localStorage.getItem("sharekart-user")
      const sessionExpiry = localStorage.getItem("sharekart-session-expiry")

      if (userLoggedIn && sessionExpiry) {
        // Check if session has expired
        const expiryDate = new Date(sessionExpiry)
        const now = new Date()

        if (now < expiryDate) {
          setIsLoggedIn(true)
        } else {
          // Session expired, clear localStorage
          localStorage.removeItem("sharekart-user")
          localStorage.removeItem("sharekart-session-expiry")
          setIsLoggedIn(false)
        }
      } else {
        setIsLoggedIn(false)
      }

      setIsCheckingAuth(false)
    }

    checkAuthStatus()
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("sharekart-user")
    localStorage.removeItem("sharekart-session-expiry")
    setIsLoggedIn(false)
  }

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <CartProvider>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
      <Toaster />
    </CartProvider>
  )
}

export default App

