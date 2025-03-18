import { ShoppingBag } from "lucide-react"
import LoginForm from "../components/LoginForm"

function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/40">
      <div className="flex flex-col items-center mb-8">
        <ShoppingBag className="h-12 w-12 text-primary mb-2" />
        <h1 className="text-3xl font-bold">ShareKart</h1>
        <p className="text-muted-foreground">Buy, sell, and donate second-hand items</p>
      </div>
      <LoginForm onLogin={onLogin} />
    </div>
  )
}

export default Login

