"use client"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ShoppingBag, Recycle, DollarSign, Heart, Store, Package, Tag, TrendingUp } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { hasFeature } from "../lib/flagsmith"

function Home() {
  const { userType } = useAuth()
  const [showSellerFeatures, setShowSellerFeatures] = useState(false)

  useEffect(() => {
    const sellerFeaturesEnabled = hasFeature("seller_features")
    setShowSellerFeatures(userType === "seller" && sellerFeaturesEnabled)
  }, [userType])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAE2FF] to-[#B8E0D2] text-gray-900">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 text-center">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl text-gray-900">
            {userType === "seller" ? "Sell Smarter on ShareKart" : "Welcome to ShareKart"}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl mt-4">
            {userType === "seller"
              ? "List your items, attract buyers, and track sales effortlessly."
              : "Discover great deals, buy pre-loved items, and contribute to sustainability."}
          </p>
          <div className="flex flex-wrap justify-center mt-6 space-x-4">
            {userType === "seller" ? (
              <>
                <Button asChild size="lg" className="bg-[#6C63FF] text-white hover:bg-[#554FC3] rounded-full shadow-md">
                  <Link to="/dashboard">
                    <Store className="mr-2 h-4 w-4" />
                    Manage Listings
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-900 hover:bg-gray-200 rounded-full shadow-md"
                >
                  <Link to="/dashboard?tab=add">
                    <Tag className="mr-2 h-4 w-4" />
                    Add New Listing
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="bg-[#6C63FF] text-white hover:bg-[#554FC3] rounded-full shadow-md">
                  <Link to="/shop">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Browse Items
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-12">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userType === "seller" ? (
            <>
              <FeatureCard icon={<Package className="h-6 w-6 text-[#6C63FF]" />} title="Easy Listing">
                List your products effortlessly with our simple interface.
              </FeatureCard>
              <FeatureCard icon={<TrendingUp className="h-6 w-6 text-[#6C63FF]" />} title="Sales Insights">
                Get detailed analytics to improve your sales strategy.
              </FeatureCard>
              <FeatureCard icon={<Heart className="h-6 w-6 text-[#6C63FF]" />} title="Secure Transactions">
                Ensure smooth and secure payments with integrated options.
              </FeatureCard>
            </>
          ) : (
            <>
              <FeatureCard icon={<Recycle className="h-6 w-6 text-[#6C63FF]" />} title="Sustainable Shopping">
                Buy second-hand and support a greener future.
              </FeatureCard>
              <FeatureCard icon={<DollarSign className="h-6 w-6 text-[#6C63FF]" />} title="Affordable Deals">
                Find high-quality items at unbeatable prices.
              </FeatureCard>
              <FeatureCard icon={<Heart className="h-6 w-6 text-[#6C63FF]" />} title="Community Support">
                Help others by donating items you no longer need.
              </FeatureCard>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-24">
        <div className="container px-4 md:px-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-4 text-gray-900">ShareKart – A Platform for Selling and Donating Second-Hand Items</h2>
            <p className="text-gray-700 mb-4">
            ShareKart is an innovative online platform that enables users to both sell and donate second-hand items, making essential products more accessible to those in need. Whether you want to give away unused items for a good cause or sell them at an affordable price, ShareKart provides a seamless and user-friendly experience
            </p>
            <p className="text-gray-700">
              Join our growing community and contribute to a more sustainable way of shopping.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="src/assets/images/second-hand-business-removebg-preview.png"
              alt="People exchanging second-hand items"
              className="object-cover w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="mt-12 py-4 text-center text-sm text-gray-600 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 border-t border-gray-400"></div>
        &copy; {new Date().getFullYear()} ShareKart | Buy. Sell. Sustain.
      </footer>


    </div>
  )
}

/* Feature Card Component */
function FeatureCard({ icon, title, children }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center space-y-4 
      transition-all duration-300 hover:shadow-2xl hover:bg-[#f7f7ff] hover:scale-105">
      <div className="rounded-full bg-[#EAE2FF] p-4 shadow-md">{icon}</div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-700">{children}</p>
      </div>
    </div>
  )
}


export default Home
