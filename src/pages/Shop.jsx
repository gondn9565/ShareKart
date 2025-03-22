// ... (keep all imports and mock data the same)

"use client"

import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const mockProducts=[
  {
    id: 1,
    name: "Vintage Leather Jacket",
    description: "Genuine leather jacket in excellent condition. Size M.",
    price: 89.99,
    condition: "Like New",
    category: "Clothing",
    image: "src/assets/images/jacket.jpg",
    isDonation: false,
  },
  {
    id: 2,
    name: "coffe mug",
    description: "Solid oak coffee table with minimal wear.",
    price: 120.0,
    condition: "Good",
    category: "steal",
    image: "src/assets/images/coffee mug.jpg",
    isDonation: false,
  },
  {
    id: 3,
    name: "Children's Books Collection",
    description: "Set of 10 children's books in good condition.",
    price: 0,
    condition: "Good",
    category: "Books",
    image: "src/assets/images/childern books.jpg",
    isDonation: true,
  },
  {
    id: 4,
    name: "Mountain Bike",
    description: "21-speed mountain bike, recently serviced.",
    price: 175.5,
    condition: "Used",
    category: "Sports",
    image: "src/assets/images/bicycle.jpg",
    isDonation: false,
  },
  {
    id: 5,
    name: "Smartphone",
    description: "2-year old smartphone in working condition.",
    price: 150.0,
    condition: "Used",
    category: "Electronics",
    image: "src/assets/images/smart phones.jpg",
    isDonation: false,
  },
  {
    id: 6,
    name: "Winter Clothes",
    description: "Assorted winter clothes for children aged 5-8.",
    price: 0,
    condition: "Good",
    category: "Clothing",
    image: "src/assets/images/winter clothes.jpg",
    isDonation: true,
  },
  {
    id: 7,
    name: "Desk Lamp",
    description: "Adjustable desk lamp with LED bulb.",
    price: 25.99,
    condition: "Like New",
    category: "Home",
    image:"src/assets/images/lamp.jpg",
    isDonation: false,
  },
  {
    id: 8,
    name: "Board Games Bundle",
    description: "Collection of 5 popular board games.",
    price: 45.0,
    condition: "Good",
    category: "Games",
    image: "src/assets/images/board games.jpg",
    isDonation: false,
  },
  {
    id: 9,
    name: "Smartwatch",
    description: "smartwatch.",
    price: 45.0,
    condition: "Good",
    category: "Games",
    image: "src/assets/images/smart watch.jpg",
    isDonation: false,
  },
  {
    id: 10,
    name: "Bedsheet",
    description: "Collection of bedsheet.",
    price: 45.0,
    condition: "Good",
    category: "Games",
    image: "src/assets/images/bedsheet.jpg",
    isDonation: false,
  },
  {
    id: 11,
    name: "Penholders",
    description: "Collection of penholder.",
    price: 45.0,
    condition: "Good",
    category: "Games",
    image: "src/assets/images/penholder.jpg",
    isDonation: false,
  },
  {
    id: 12,
    name: "stationary stuff",
    description: "Collection of stationary stuff.",
    price: 45.0,
    condition: "Good",
    category: "Games",
    image: "src/assets/images/stationary stuff.jpg",
    isDonation: false,
  },


]




function Shop() {


  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "all",
    condition: "all",
    isDonation: false,
  })
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(mockProducts)
  }, [])

  const filteredProducts = products
    .filter((product) => {
      // Search filter
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false
      }

      // Condition filter
      if (filters.condition !== "all" && product.condition !== filters.condition) {
        return false
      }

      // Donation filter
      if (filters.isDonation && !product.isDonation) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort products
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
        default:
          return b.id - a.id
      }
    })

  const categories = ["all", ...new Set(products.map((product) => product.category))]
  const conditions = ["all", ...new Set(products.map((product) => product.condition))]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-500 ">Shop</h1>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your search results</SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Category</h3>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => setFilters({ ...filters, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Condition</h3>
                    <Select
                      value={filters.condition}
                      onValueChange={(value) => setFilters({ ...filters, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition === "all" ? "All Conditions" : condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="donation"
                      checked={filters.isDonation}
                      onCheckedChange={(checked) => setFilters({ ...filters, isDonation: checked })}
                    />
                    <Label htmlFor="donation">Show donations only</Label>
                  </div>

                  <Button
                    onClick={() =>
                      setFilters({
                        category: "all",
                        condition: "all",
                        isDonation: false,
                      })
                    }
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )




  // ... (keep all state and logic the same)

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-[#f5f4ff] to-[#eceaff] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#554bc3] to-[#8579ff] bg-clip-text text-transparent">
          Community Marketplace
        </h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#554bc3]" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 rounded-xl bg-white shadow-sm transition-all 
                focus:ring-2 focus:ring-[#554bc3]/30 focus:border-[#554bc3]
                hover:shadow-md hover:border-[#554bc3]/50 text-[#554bc3]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sorting and Filters */}
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded-xl bg-white shadow-sm border-[#554bc3]/20
                hover:border-[#554bc3]/50 focus:ring-2 focus:ring-[#554bc3]/20 text-[#554bc3]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#554bc3]/10 shadow-lg bg-white">
                {["newest", "price-low", "price-high"].map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="hover:bg-[#554bc3]/10 focus:bg-[#554bc3]/10 text-[#554bc3]"
                  >
                    {option.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-xl border-[#554bc3]/20 hover:bg-[#554bc3]/10 hover:border-[#554bc3]/50 
                    shadow-sm hover:shadow-md transition-all text-[#554bc3]"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-l-[#554bc3]/10 bg-white/95 backdrop-blur-sm">
                <SheetHeader>
                  <SheetTitle className="text-[#554bc3]">Filters</SheetTitle>
                  <SheetDescription className="text-[#554bc3]/70">
                    Narrow down your search results
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[#554bc3]">Category</h3>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => setFilters({ ...filters, category: value })}
                    >
                      <SelectTrigger className="rounded-lg border-[#554bc3]/20 bg-[#554bc3]/10 text-[#554bc3]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-[#554bc3]/10 bg-white shadow-lg">
                        {categories.map((category) => (
                          <SelectItem 
                            key={category} 
                            value={category}
                            className="hover:bg-[#554bc3]/10 text-[#554bc3]"
                          >
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition Filter */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[#554bc3]">Condition</h3>
                    <Select
                      value={filters.condition}
                      onValueChange={(value) => setFilters({ ...filters, condition: value })}
                    >
                      <SelectTrigger className="rounded-lg border-[#554bc3]/20 bg-[#554bc3]/10 text-[#554bc3]">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-[#554bc3]/10 bg-white shadow-lg">
                        {conditions.map((condition) => (
                          <SelectItem 
                            key={condition} 
                            value={condition}
                            className="hover:bg-[#554bc3]/10 text-[#554bc3]"
                          >
                            {condition === "all" ? "All Conditions" : condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Donation Filter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="donation"
                      checked={filters.isDonation}
                      onCheckedChange={(checked) => setFilters({ ...filters, isDonation: checked })}
                      className="text-[#554bc3] border-[#554bc3]/30"
                    />
                    <Label htmlFor="donation" className="text-[#554bc3]/90">Show donations only</Label>
                  </div>

                  {/* Reset Button */}
                  <Button
                    onClick={() => setFilters({
                      category: "all",
                      condition: "all",
                      isDonation: false,
                    })}
                    variant="outline"
                    className="border-[#554bc3]/20 text-[#554bc3] hover:bg-[#554bc3]/10 hover:border-[#554bc3]/50"
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2 text-[#554bc3]">No products found</h2>
          <p className="text-[#554bc3]/70">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className="hover:shadow-lg hover:shadow-[#554bc3]/20 transition-all 
                duration-300 hover:-translate-y-1 bg-white border border-[#554bc3]/10
                rounded-xl overflow-hidden group relative text-[#554bc3]"
            />
          ))}
        </div>
      )}

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#554bc3]/10 rounded-full -top-48 -left-48 
          opacity-20 mix-blend-soft-light animate-blob"></div>
        <div className="absolute w-96 h-96 bg-[#8579ff]/10 rounded-full -top-48 -right-48 
          opacity-20 mix-blend-soft-light animate-blob animation-delay-2000"></div>
      </div>
    </div>
  )
}

export default Shop
