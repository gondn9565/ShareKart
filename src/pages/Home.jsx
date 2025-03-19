import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Recycle, DollarSign, Heart } from "lucide-react";

function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/ecommerce-bg.svg')] bg-cover bg-center"></div>
      
      <section className="relative z-10 py-16 md:py-24 lg:py-32 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
            Welcome to ShareKart
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
            Buy, sell, and donate second-hand items in a seamless e-commerce experience.
          </p>
          <div className="mt-6 space-x-4">
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-400 shadow-lg shadow-blue-500/50 text-white">
              <Link to="/shop">
                <ShoppingBag className="mr-2 h-5 w-5" /> Browse Items
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-500 hover:text-blue-400 hover:border-blue-400">
              <Link to="/dashboard">
                <DollarSign className="mr-2 h-5 w-5" /> Sell Items
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6 grid gap-8 md:grid-cols-3">
          {[{
            icon: <Recycle className="h-10 w-10 text-green-500" />, title: "Sustainable Shopping",
            desc: "Reduce waste by giving items a second life through our marketplace."
          }, {
            icon: <DollarSign className="h-10 w-10 text-blue-500" />, title: "Save Money",
            desc: "Find quality second-hand items at a fraction of the original price."
          }, {
            icon: <Heart className="h-10 w-10 text-red-500" />, title: "Support Community",
            desc: "Donate items to those in need or find free items from generous donors."
          }].map((item, index) => (
            <div key={index} className="p-6 rounded-lg shadow-xl bg-white backdrop-blur-lg border border-gray-300 hover:scale-105 transition-transform">
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section id="about" className="relative z-10 py-16">
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-blue-500">About ShareKart</h2>
            <p className="mt-4 text-gray-700">
              ShareKart was founded with a mission to create a seamless and sustainable e-commerce marketplace where people can easily buy, sell, and donate second-hand items.
            </p>
            <p className="mt-4 text-gray-700">
              We aim to reduce waste, promote reuse, and foster community connections through our secure and user-friendly platform.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-lg">
              <img src="/ecommerce-illustration.svg" alt="About ShareKart" className="object-cover w-full h-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;



