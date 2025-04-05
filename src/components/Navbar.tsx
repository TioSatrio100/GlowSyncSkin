import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <div className="absolute inset-0 bg-pink-500 rounded-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-200"></div>
                <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-pink-500">G</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-pink-500">GLOWSYNC</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link href="/" className="text-pink-500 hover:text-pink-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/catalog" className="text-pink-500 hover:text-pink-600 px-3 py-2 text-sm font-medium">
              Catalog
            </Link>
            <Link href="/analyze" className="text-pink-500 hover:text-pink-600 px-3 py-2 text-sm font-medium">
              Skin Analysis
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative group">
              <ShoppingBagIcon className="h-6 w-6 text-pink-500 group-hover:text-pink-600" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </Link>
            <Link href="/signin" className="text-pink-500 hover:text-pink-600 px-3 py-2 text-sm font-medium">
              Sign in
            </Link>
            <Link href="/signup" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 text-sm font-medium rounded-xl transform transition-all duration-150 hover:scale-[1.02]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
