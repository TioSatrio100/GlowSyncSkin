"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductClient({ id }: { id: string }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await fetch(`/api/products/${id}`);
      const product = await productRes.json();

      setForm({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        imageUrl: product.imageUrl ?? "",
        categoryId: product.categoryId ?? "",
      });

      const categoryRes = await fetch("/api/categories");
      const categoryData = await categoryRes.json();
      setCategories(categoryData);
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        imageUrl: form.imageUrl,
        categoryId: form.categoryId,
      }),
    });

    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Edit Produk</h1>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="border p-2 w-full" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 w-full" required />
      <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="border p-2 w-full" required />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="border p-2 w-full" />

      <select name="categoryId" value={form.categoryId} onChange={handleChange} className="border p-2 w-full" required>
        <option value="">-- Pilih Kategori --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button className="bg-yellow-500 text-white px-4 py-2 rounded" type="submit">
        Update
      </button>
    </form>
  );
}
