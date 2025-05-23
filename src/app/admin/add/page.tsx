"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    categoryId: "",
  });

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  //  Get category list from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("Category").select("*");
      if (error) {
        console.error("Gagal ambil kategori:", error.message);
      } else {
        setCategoryList(data);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage.from("product-images").upload(fileName, imageFile);

      if (error) {
        console.error("Upload gagal:", error.message);
        return;
      }

      imageUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/product-images/${fileName}`;
    }

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        imageUrl,
      }),
    });

    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <input name="name" placeholder="Name" className="border p-2 w-full" onChange={handleChange} required />
      <input name="description" placeholder="Description" className="border p-2 w-full" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" className="border p-2 w-full" onChange={handleChange} required />
      <input name="stock" placeholder="Stock" type="number" className="border p-2 w-full" onChange={handleChange} required />

      {/* Select category from supabase */}
      <select name="categoryId" className="border p-2 w-full" value={form.categoryId} onChange={handleChange} required>
        <option value="">-- Pilih Kategori --</option>
        {categoryList.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/*  Upload picture */}
      <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />

      {/*  Preview picture */}
      {previewUrl && (
        <div className="relative w-full h-64 mt-4 border rounded overflow-hidden">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
        </div>
      )}

      <button className="bg-pink-600 text-white px-4 py-2 rounded" type="submit">
        Save Product
      </button>
    </form>
  );
}
