"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Edit, Trash2, ShoppingBag, DollarSign, Heart } from "lucide-react"

const mockListings = [
  {
    id: 1,
    name: "Vintage Camera",
    description: "Film camera from the 1980s in working condition.",
    price: 65.0,
    condition: "Good",
    category: "Electronics",
    image: "src/assets/images/vintagecamera.jpeg",
    isDonation: false,
    status: "active",
  },
  {
    id: 2,
    name: "Desk Chair",
    description: "Ergonomic office chair with adjustable height.",
    price: 45.0,
    condition: "Used",
    category: "Furniture",
    image: "src/assets/images/desh chair.jpg",
    isDonation: false,
    status: "sold",
  },
  {
    id: 3,
    name: "Baby Clothes",
    description: "Gently used baby clothes for 0-6 months.",
    price: 0,
    condition: "Good",
    category: "Clothing",
    image: "src/assets/images/clothes.jpg",
    isDonation: true,
    status: "active",
  },
]

function Dashboard() {
  const [listings, setListings] = useState([])
  const [activeTab, setActiveTab] = useState("listings")

  useEffect(() => {
    setListings(mockListings)
  }, [])

  return (
    <div className="container mx-auto px-6 py-10 bg-gradient-to-r from-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <Card className="bg-white shadow-lg rounded-lg p-6">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Active Listings</CardTitle>
            <ShoppingBag className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{listings.filter(l => l.status === "active").length}</div>
            <p className="text-gray-500 text-sm">Items currently for sale</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg p-6">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Sold Items</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{listings.filter(l => l.status === "sold").length}</div>
            <p className="text-gray-500 text-sm">Items you've sold</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg p-6">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Donations</CardTitle>
            <Heart className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{listings.filter(l => l.isDonation).length}</div>
            <p className="text-gray-500 text-sm">Items you're donating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white shadow-lg rounded-lg p-6">
        <TabsList className="flex justify-center space-x-4 border-b pb-4">
          <TabsTrigger value="listings" className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-500">My Listings</TabsTrigger>
          <TabsTrigger value="add" className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-500">Add New Listing</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6">
          <div className="grid gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src={listing.image} alt={listing.name} className="w-16 h-16 rounded-md object-cover" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{listing.name}</h2>
                    <p className="text-sm text-gray-500">{listing.category}</p>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-700">{listing.isDonation ? "Donation" : `$${listing.price}`}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard;
