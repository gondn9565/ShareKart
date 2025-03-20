"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { ShoppingBag, ShoppingCart, Store } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginModal() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("login"); // login, signup, role-select
  const [selectedRole, setSelectedRole] = useState(null);
  const { login, signup } = useAuth();

  const handleSuccessfulLogin = (userData) => {
    login(userData).then(() => {
      setOpen(false);
    });
  };

  const handleSuccessfulSignup = (userData, role) => {
    signup(userData, role).then(() => {
      setOpen(false);
    });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setView("signup");
  };

  const resetView = () => {
    setView("login");
    setSelectedRole(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) resetView();
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="px-10 py-6 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-[#6C63FF] to-[#554FC3] text-white hover:scale-105"
        >
          Login / Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border border-gray-300 shadow-2xl rounded-xl bg-white backdrop-blur-lg">
        <div className="bg-primary text-black p-6 flex flex-col items-center rounded-t-xl">
          <ShoppingBag className="h-12 w-12 mb-2 text-black" />
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to ShareKart
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-black">
            Join as a buyer or seller and explore great deals!
          </DialogDescription>
        </div>

        <div className="p-6">
          {view === "login" && (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-primary data-[state=active]:text-black py-2.5 text-base rounded-full transition-all hover:bg-gray-300 hover:text-black"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="role-select"
                  onClick={() => setView("role-select")}
                  className="py-2.5 text-base rounded-full transition-all hover:bg-gray-300 hover:text-black"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm onLogin={handleSuccessfulLogin} />
              </TabsContent>
            </Tabs>
          )}

          {view === "role-select" && (
            <div className="py-4">
              <h3 className="text-xl font-semibold text-center mb-6">
                I want to join as a...
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleRoleSelect("buyer")}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto py-6 border border-gray-300 rounded-lg hover:border-primary hover:bg-primary/10 transition-all shadow-md hover:shadow-lg scale-100 hover:scale-105"
                >
                  <ShoppingCart className="h-12 w-12 mb-3 text-primary" />
                  <span className="text-lg font-medium">Buyer</span>
                  <p className="text-xs text-black mt-2">
                    I want to shop for items
                  </p>
                </Button>

                <Button
                  onClick={() => handleRoleSelect("seller")}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto py-6 border border-gray-300 rounded-lg hover:border-primary hover:bg-primary/10 transition-all shadow-md hover:shadow-lg scale-100 hover:scale-105"
                >
                  <Store className="h-12 w-12 mb-3 text-primary" />
                  <span className="text-lg font-medium">Seller</span>
                  <p className="text-xs text-black mt-2">
                    I want to sell my items
                  </p>
                </Button>
              </div>

              <div className="mt-6 text-center">
                <Button variant="link" onClick={resetView} className="text-gray-700 hover:underline">
                  Back to Login
                </Button>
              </div>
            </div>
          )}

          {view === "signup" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  Sign up as a {selectedRole === "buyer" ? "Buyer" : "Seller"}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setView("role-select")}>
                  Change
                </Button>
              </div>

              <SignUpForm
                onSignUp={(userData) => handleSuccessfulSignup(userData, selectedRole)}
                userType={selectedRole}
              />

              <div className="mt-4 text-center">
                <Button variant="link" onClick={resetView} className="text-gray-700 hover:underline">
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
