"use client"

import { ShoppingBag } from "lucide-react"
import LoginModal from "../components/LoginModal"

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8e1e7] to-[#d0e8f2] px-6 text-center">
      {/* Logo and Title */}
      <ShoppingBag className="h-16 w-16 text-[#1E3A8A] mb-4" /> 
      <h1 className="text-5xl font-extrabold text-[#0F172A]">ShareKart</h1> 
      <p className="text-lg text-[#1E3A8A] mt-2 font-medium">
        Buy, sell, and donate second-hand items with ease.
      </p>

      {/* Welcome Text */}
      <h2 className="text-3xl font-semibold text-[#0F172A] mt-8">Welcome to ShareKart</h2>
      <p className="text-[#1E40AF] max-w-xl mt-4 leading-relaxed font-medium">
        Join our community of buyers and sellers to find great deals or donate items you no longer need.
      </p>

      {/* Login Button */}
      <div className="mt-6">
        <LoginModal />
      </div>

      {/* Terms and Conditions */}
      <p className="text-sm text-[#0F172A] mt-6">
        By continuing, you agree to ShareKart's{" "}
        <span className="text-[#0D9488] font-semibold cursor-pointer hover:underline">Terms of Service</span> and{" "}
        <span className="text-[#0D9488] font-semibold cursor-pointer hover:underline">Privacy Policy</span>.
      </p>
    </div>
  )
}

export default Login
