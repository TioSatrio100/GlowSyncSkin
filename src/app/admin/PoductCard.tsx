"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = async (productId: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          window.location.reload();
        } else {
          const errorData = await res.json();
          alert(errorData.error || "Gagal menghapus produk");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Terjadi kesalahan saat menghapus produk");
      }
    }
  };

  // Format angka secara konsisten
  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <div className="space-y-1 text-gray-600">
        <p>Harga: Rp{formatPrice(product.price)}</p>
        <p>Stok: {product.stock}</p>
        <p className="text-sm text-gray-400">Ditambahkan: {isClient ? new Date(product.createdAt).toLocaleDateString() : ""}</p>
      </div>
      <div className="mt-4 flex space-x-3">
        <Link href={`/admin/edit/${product.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
          Edit
        </Link>
        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 hover:underline">
          Hapus
        </button>
      </div>
    </div>
  );
}
