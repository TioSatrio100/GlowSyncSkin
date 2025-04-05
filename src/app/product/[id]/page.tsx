import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

const product = {
  name: "Advanced Hydration Serum",
  price: 89.99,
  rating: 4.8,
  reviews: 128,
  description:
    "Our advanced hydration serum is formulated with hyaluronic acid and niacinamide to provide deep hydration and improve skin barrier function. Perfect for all skin types, this lightweight serum absorbs quickly and leaves your skin feeling plump and refreshed.",
  benefits: ["Deeply hydrates and plumps skin", "Improves skin barrier function", "Reduces appearance of fine lines", "Non-comedogenic", "Suitable for all skin types"],
  ingredients: ["Hyaluronic Acid", "Niacinamide", "Peptide Complex", "Vitamin E", "Panthenol"],
  images: ["/product-detail-1.jpg", "/product-detail-2.jpg", "/product-detail-3.jpg"],
};

export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                  <Image src={image} alt={`${product.name} view ${index + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
                <button className="text-gray-400 hover:text-primary-600">
                  <HeartIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold text-primary-600">${product.price}</p>
              <p className="mt-2 text-sm text-gray-500">Free shipping on orders over $50</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Key Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Key Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <select id="quantity" className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
