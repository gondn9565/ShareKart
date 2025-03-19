"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { isValidEmail } from "@/lib/utils"

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulating a successful login (Replace with real API call)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store user in localStorage
      const user = {
        id: 1,
        name: "User",
        email: email,
        rememberMe: rememberMe,
      }

      localStorage.setItem("sharekart-user", JSON.stringify(user))

      // If "Remember Me" is checked, set a longer expiration
      const expiryTime = rememberMe
        ? Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
        : Date.now() + 24 * 60 * 60 * 1000 // 24 hours

      localStorage.setItem("sharekart-session-expiry", expiryTime.toString())

      toast.success("Login successful! Welcome back to ShareKart!")

      onLogin()
    } catch (error) {
      toast.error("Login failed! Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-2">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errors.email) setErrors({ ...errors, email: "" })
          }}
          disabled={isLoading}
          className="h-11 px-4 text-base"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-base font-medium">
            Password
          </Label>
          <Button variant="link" className="p-0 h-auto text-sm" type="button">
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (errors.password) setErrors({ ...errors, password: "" })
          }}
          disabled={isLoading}
          className="h-11 px-4 text-base"
        />
        {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
      </div>

      <div className="flex items-center space-x-2 py-1">
        <Checkbox
          id="remember"
          checked={rememberMe}
          onCheckedChange={setRememberMe}
          disabled={isLoading}
          className="h-5 w-5 rounded-sm border-2"
        />
        <Label htmlFor="remember" className="text-sm font-normal">
          Remember me for 30 days
        </Label>
      </div>

      <Button className="w-full h-11 text-base font-medium mt-2" type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  )
}

export default LoginForm
