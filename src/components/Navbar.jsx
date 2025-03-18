"use client"

import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Home, ShoppingBag, LayoutDashboard, LogOut, ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { Badge } from "@/components/ui/badge"

function Navbar({ onLogout }) {
  const location = useLocation()
  const { cartCount } = useCart()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">ShareKart</span>
        </Link>
        <nav className="flex flex-1 items-center justify-between space-x-1 md:space-x-2">
          <div className="flex items-center space-x-1 md:space-x-2">
            <Button variant={isActive("/") ? "default" : "ghost"} size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant={isActive("/shop") ? "default" : "ghost"} size="sm" asChild>
              <Link to="/shop">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop
              </Link>
            </Button>
            <Button variant={isActive("/dashboard") ? "default" : "ghost"} size="sm" asChild>
              <Link to="/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant={isActive("/cart") ? "default" : "ghost"} size="sm" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
            <ModeToggle />
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

