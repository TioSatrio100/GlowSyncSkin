"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: string;
  Category: {
    id: string;
    name: string;
  } | null;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("Category").select("*");
    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchProducts = async (categoryFilter?: string) => {
    setLoading(true);

    let query = supabase
      .from("Product")
      .select(
        `
        *,
        Category (
          id,
          name
        )
      `
      )
      .order("createdAt", { ascending: false });

    if (categoryFilter) {
      query = query.eq("categoryId", categoryFilter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setProducts(data as Product[]);
    }

    setLoading(false);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId ?? undefined);
  };

  const handleAddToCart = async (productId: string) => {
    setCartLoading((prev) => ({ ...prev, [productId]: true }));

    try {
      // 1. Cek session user
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError || !session) {
        router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      // 2. Cek produk ada dan stok cukup
      const product = products.find((p) => p.id === productId);
      if (!product) {
        alert("Product not found!");
        return;
      }
      if (product.stock <= 0) {
        alert("Product out of stock!");
        return;
      }

      // 3. Cek apakah item sudah ada di cart
      const { data: existingItems, error: fetchError } = await supabase.from("CartItem").select("*").eq("profileId", session.user.id).eq("productId", productId);

      if (fetchError) throw fetchError;

      // 4. Jika sudah ada, update quantity. Jika belum, insert baru
      let error;
      if (existingItems && existingItems.length > 0) {
        const newQuantity = existingItems[0].quantity + 1;
        ({ error } = await supabase.from("CartItem").update({ quantity: newQuantity }).eq("profileId", session.user.id).eq("productId", productId));
      } else {
        ({ error } = await supabase.from("CartItem").insert({
          profileId: session.user.id,
          productId,
          quantity: 1,
        }));
      }

      if (error) throw error;

      // 5. Update UI
      document.dispatchEvent(new CustomEvent("cartUpdate"));
      alert("Added to cart successfully!");
    } catch (error: any) {
      console.error("Full add to cart error:", error);
      alert(`Failed to add to cart: ${error.message || "Unknown error"}`);
    } finally {
      setCartLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Catalog</h1>

      {/* Category Filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button onClick={() => handleCategoryChange(null)} className={`px-4 py-2 rounded-full text-sm ${!selectedCategory ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
          All
        </button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => handleCategoryChange(cat.id)} className={`px-4 py-2 rounded-full text-sm ${selectedCategory === cat.id ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20 text-pink-500">Loading products...</div>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-60">
                <Image src={product.imageUrl || "/img/placeholder.jpg"} alt={product.name} fill className="object-cover rounded-t-xl" priority={product.id === products[0].id} />
              </div>
              <div className="p-4 space-y-1">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.Category?.name}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-pink-500 font-bold">Rp{product.price.toLocaleString("id-ID")}</span>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={cartLoading[product.id] || product.stock <= 0}
                    className={`text-sm px-4 py-2 rounded-lg ${product.stock <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 text-white"}`}
                  >
                    {cartLoading[product.id] ? "Adding..." : product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
