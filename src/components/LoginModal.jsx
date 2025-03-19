"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import { ShoppingBag } from "lucide-react"

function LoginModal({ onLogin }) {
  const [open, setOpen] = useState(false)

  const handleSuccessfulAuth = () => {
    onLogin()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="px-10 py-6 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Login / Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none shadow-xl">
        <div className="bg-primary text-primary-foreground p-6 flex flex-col items-center">
          <ShoppingBag className="h-10 w-10 mb-2" />
          <DialogTitle className="text-center text-2xl font-bold">Welcome to ShareKart</DialogTitle>
          <p className="text-primary-foreground/80 text-center mt-2">Your marketplace for second-hand treasures</p>
        </div>

        <div className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 text-base"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 text-base"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onLogin={handleSuccessfulAuth} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm onSignUp={handleSuccessfulAuth} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal

