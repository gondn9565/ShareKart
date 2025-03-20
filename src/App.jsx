"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Dashboard from "./pages/Dashboard"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import { CartProvider } from "./context/CartContext"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { Toaster } from "@/components/ui/sonner"

// Protected route component
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Main App component
function AppContent() {
  const { user, logout } = useAuth()

  return (
    <CartProvider>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route element={<Layout onLogout={logout} />}>
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

// Wrapper App component with providers
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

