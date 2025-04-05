import Image from "next/image";
import { FunnelIcon } from "@heroicons/react/24/outline";

const products = [
  {
    id: 1,
    name: "Hydrating Cleanser",
    category: "Cleansers",
    price: 29.99,
    image: "/img/product-1.jpg",
    description: "Gentle, non-stripping cleanser for all skin types",
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    category: "Serums",
    price: 59.99,
    image: "/img/product-2.jpg",
    description: "Brightening and antioxidant protection",
  },
  {
    id: 3,
    name: "Nourishing Moisturizer",
    category: "Moisturizers",
    price: 49.99,
    image: "/img/product-3.jpg",
    description: "Rich, hydrating formula for day and night",
  },
  // Add more products as needed
];

const categories = ["All", "Cleansers", "Toners", "Serums", "Moisturizers", "Masks", "Sunscreen"];

export default function Catalog() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
            <FunnelIcon className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="hidden lg:block space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-gray-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Min Price</label>
                  <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="0" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Max Price</label>
                  <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="1000" />
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sort By</h3>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-64">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-primary-600">${product.price}</span>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
