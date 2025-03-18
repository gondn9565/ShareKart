"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";  // ✅ Use Sonner instead

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.isDonation) {
      addToCart(product)
      toast.success(`${product.name} has been added to your cart!`); // ✅ Corrected toast
    } else {
      toast.info("This donation has been claimed. Please check your dashboard."); // ✅ Corrected toast
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="object-cover w-full h-full transition-all hover:scale-105"
        />
        {product.isDonation && <Badge className="absolute top-2 right-2 bg-green-500">Donation</Badge>}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">{product.isDonation ? "Free" : `$${product.price.toFixed(2)}`}</p>
          <p className="text-sm text-muted-foreground">{product.condition}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.isDonation ? "Claim" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard;
