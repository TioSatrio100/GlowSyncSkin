import { supabase } from "@/lib/supabaseClient";

export const CartService = {
  // Ambil semua item cart user
  async getCart(userId: string) {
    const { data, error } = await supabase
      .from("CartItem")
      .select(
        `
        id, 
        quantity,
        product:productId (id, name, price, imageUrl)
      `
      )
      .eq("profileId", userId);
    return { data, error };
  },

  // Tambah/update item
  async addItem(userId: string, productId: string) {
    const { data, error } = await supabase
      .from("CartItem")
      .upsert(
        {
          profileId: userId,
          productId,
          quantity: 1,
        },
        {
          onConflict: "profileId,productId",
        }
      )
      .select();
    return { data, error };
  },

  // Hapus item
  async removeItem(itemId: string) {
    const { error } = await supabase.from("CartItem").delete().eq("id", itemId);
    return { error };
  },

  // Hitung total item
  async getCount(userId: string) {
    const { count } = await supabase.from("CartItem").select("*", { count: "exact", head: true }).eq("profileId", userId);
    return count || 0;
  },
};
