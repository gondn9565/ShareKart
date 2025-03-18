import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 text-center">
      <h1 className="text-9xl font-extrabold tracking-tighter text-primary">404</h1>
      <h2 className="text-3xl font-bold tracking-tight mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  )
}

export default NotFound

