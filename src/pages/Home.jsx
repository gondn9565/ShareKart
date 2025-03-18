import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ShoppingBag, Recycle, DollarSign, Heart } from "lucide-react"

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to ShareKart
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Buy, sell, and donate second-hand items in your community.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link to="/shop">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Items
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/dashboard">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Sell Items
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50 rounded-lg">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Recycle className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Sustainable Shopping</h3>
                <p className="text-muted-foreground">
                  Reduce waste by giving items a second life through our marketplace.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Save Money</h3>
                <p className="text-muted-foreground">
                  Find quality second-hand items at a fraction of the original price.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Support Community</h3>
                <p className="text-muted-foreground">
                  Donate items to those in need or find free items from generous donors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">About ShareKart</h2>
              <p className="text-muted-foreground mb-4">
                ShareKart was founded with a simple mission: to create a sustainable marketplace where people can buy,
                sell, and donate second-hand items easily.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe in reducing waste, promoting reuse, and building community connections through our platform.
                Every item that finds a new home through ShareKart is one less item in a landfill.
              </p>
              <p className="text-muted-foreground">
                Our platform is designed to be simple, secure, and accessible to everyone. Whether you're looking to
                declutter your home, find a bargain, or donate items to those in need, ShareKart is here to help.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="About ShareKart"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

