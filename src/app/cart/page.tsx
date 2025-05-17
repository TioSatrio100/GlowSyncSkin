/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CartService } from "@/services/cart";
import Image from "next/image";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await CartService.getCart(user.id);
      setItems(data || []);
      setLoading(false);
    };
    loadCart();
  }, []);

  const removeItem = async (itemId: string) => {
    await CartService.removeItem(itemId);
    setItems(items.filter((item) => item.id !== itemId));
    document.dispatchEvent(new CustomEvent("cartUpdate"));
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-[calc(100vh-160px)]">
      {" "}
      {/* Sesuaikan dengan tinggi footer */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading your cart...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty</p>
            <a href="/catalog" className="mt-4 inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="flex items-center py-4">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="rounded-lg object-cover" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium text-lg">{item.product.name}</h3>
                    <p className="text-gray-600">
                      Rp{item.product.price.toLocaleString("id-ID")} × {item.quantity}
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold text-lg">Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Shipping:</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-xl">Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <button className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg transition-colors font-medium">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
