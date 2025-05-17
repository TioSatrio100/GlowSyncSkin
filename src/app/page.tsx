"use client";

import Link from "next/link";
import Image from "next/image";
import { BeakerIcon, SparklesIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Discover Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Skincare Routine</span>
              </h1>
              <p className="text-lg text-gray-600">Experience personalized skincare recommendations powered by AI technology. Find products that work for your unique skin type and concerns.</p>
              <div className="flex space-x-4">
                <Link href="/catalog" className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors">
                  Shop Now
                </Link>
                <Link href="/analyze" className="bg-white text-pink-500 border border-pink-500 px-6 py-3 rounded-lg font-medium hover:bg-pink-100 transition-colors">
                  Analyze My Skin
                </Link>
              </div>
            </div>
            <div className="relative h-96 lg:h-[600px]">
              <Image src="/img/hero-image.png" alt="Skincare products" fill className="object-cover rounded-2xl" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose GlowSync?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 bg-pink-100 text-pink-500 rounded-xl flex items-center justify-center">
                <BeakerIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Science-Backed Formulas</h3>
              <p className="text-gray-600">All our products are carefully formulated with proven ingredients that deliver real results.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 bg-pink-100 text-pink-500 rounded-xl flex items-center justify-center">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Matching</h3>
              <p className="text-gray-600">Get personalized product recommendations based on your unique skin profile.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 bg-pink-100 text-pink-500 rounded-xl flex items-center justify-center">
                <HeartIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Clean Beauty</h3>
              <p className="text-gray-600">Cruelty-free, sustainable products that are good for you and the planet.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
