import { ShoppingBag } from "lucide-react"
import LoginModal from "../components/LoginModal"

function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/40">
      <div className="flex flex-col items-center mb-8">
        <ShoppingBag className="h-12 w-12 text-primary mb-2" />
        <h1 className="text-3xl font-bold">ShareKart</h1>
        <p className="text-muted-foreground mb-8">Buy, sell, and donate second-hand items</p>
      </div>

      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Welcome to ShareKart</h2>
        <p className="text-muted-foreground mb-8">
          Join our community of buyers and sellers to find great deals on second-hand items or donate items you no
          longer need.
        </p>

        <LoginModal onLogin={onLogin} />

        <p className="mt-8 text-sm text-muted-foreground">
          By continuing, you agree to ShareKart's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Login

