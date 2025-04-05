import Image from "next/image";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";

const cartItems = [
  {
    id: 1,
    name: "Advanced Hydration Serum",
    price: 89.99,
    quantity: 2,
    image: "/img/product-1.jpg",
  },
  {
    id: 2,
    name: "Gentle Cleansing Foam",
    price: 29.99,
    quantity: 1,
    image: "/img/product-2.jpg",
  },
];

export default function Cart() {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6 flex items-center">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-lg font-medium text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <select value={item.quantity} className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <button className="text-gray-400 hover:text-red-500">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">${item.price} each</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center">
                Proceed to Checkout
              </Link>

              <div className="text-center">
                <Link href="/catalog" className="text-sm text-primary-600 hover:text-primary-700">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
