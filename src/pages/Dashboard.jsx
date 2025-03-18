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

// Mock user listings
const mockListings = [
  {
    id: 1,
    name: "Vintage Camera",
    description: "Film camera from the 1980s in working condition.",
    price: 65.0,
    condition: "Good",
    category: "Electronics",
    image: "/placeholder.svg?height=100&width=100",
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
    image: "/placeholder.svg?height=100&width=100",
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
    image: "/placeholder.svg?height=100&width=100",
    isDonation: true,
    status: "active",
  },
]

function Dashboard() {
  const [listings, setListings] = useState([])
  const [activeTab, setActiveTab] = useState("listings")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    condition: "Used",
    category: "Clothing",
    isDonation: false,
  })

  useEffect(() => {
    // In a real app, this would be an API call
    setListings(mockListings)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (checked) => {
    setFormData({
      ...formData,
      isDonation: checked,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would be an API call to create a new listing
    const newListing = {
      id: listings.length + 1,
      ...formData,
      price: formData.isDonation ? 0 : Number.parseFloat(formData.price),
      image: "/placeholder.svg?height=100&width=100",
      status: "active",
    }

    setListings([newListing, ...listings])
    setActiveTab("listings")

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      condition: "Used",
      category: "Clothing",
      isDonation: false,
    })
  }

  const handleDelete = (id) => {
    // In a real app, this would be an API call to delete a listing
    setListings(listings.filter((listing) => listing.id !== id))
  }

  const activeListings = listings.filter((listing) => listing.status === "active")
  const soldListings = listings.filter((listing) => listing.status === "sold")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeListings.length}</div>
            <p className="text-xs text-muted-foreground">Items currently for sale</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sold Items</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soldListings.length}</div>
            <p className="text-xs text-muted-foreground">Items you've sold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listings.filter((item) => item.isDonation).length}</div>
            <p className="text-xs text-muted-foreground">Items you're donating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="add">Add New Listing</TabsTrigger>
        </TabsList>

        <TabsContent value="listings">
          {listings.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h2 className="text-xl font-semibold mb-2">No listings yet</h2>
              <p className="text-muted-foreground mb-4">Create your first listing to start selling or donating</p>
              <Button onClick={() => setActiveTab("add")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Listing
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Item</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {listings.map((listing) => (
                      <tr key={listing.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <div>
                              <div className="font-medium">{listing.name}</div>
                              <div className="text-xs text-muted-foreground">{listing.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          {listing.isDonation ? (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                              Donation
                            </span>
                          ) : (
                            `$${listing.price.toFixed(2)}`
                          )}
                        </td>
                        <td className="p-4 align-middle">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                              listing.status === "active"
                                ? "border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900 dark:text-green-200"
                                : "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            }`}
                          >
                            {listing.status === "active" ? "Active" : "Sold"}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(listing.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Listing</CardTitle>
              <CardDescription>Create a new listing to sell or donate an item</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Item Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                          <SelectItem value="Books">Books</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Home">Home</SelectItem>
                          <SelectItem value="Games">Games</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => handleSelectChange("condition", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Used">Used</SelectItem>
                          <SelectItem value="For Parts">For Parts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isDonation">Donate this item</Label>
                      <Switch id="isDonation" checked={formData.isDonation} onCheckedChange={handleSwitchChange} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Toggle this if you want to donate this item instead of selling it
                    </p>
                  </div>

                  {!formData.isDonation && (
                    <div className="grid gap-3">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        required={!formData.isDonation}
                      />
                    </div>
                  )}

                  <div className="grid gap-3">
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" name="image" type="file" accept="image/*" />
                    <p className="text-sm text-muted-foreground">Upload a clear image of your item</p>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button type="button" variant="outline" className="mr-2" onClick={() => setActiveTab("listings")}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Listing</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard

