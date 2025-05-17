import { supabase } from "./supabaseClient";
import { useRouter } from "next/navigation";
type AppRouterInstance = ReturnType<typeof useRouter>;

export async function signUpWithRole(email: string, password: string, role: "admin" | "user"): Promise<{ data: any; error: any }> {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) return { error, data: null };

  const { error: insertError } = await supabase.from("Profile").insert([{ id: data.user.id, role }]);

  if (insertError) return { error: insertError, data: null };

  return { data, error: null };
}

export async function loginAndRedirect(email: string, password: string, router: AppRouterInstance): Promise<{ data: any; error: any }> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) return { error, data: null };

  const { data: profile, error: profileError } = await supabase.from("Profile").select("role").eq("id", data.user.id).single();

  if (profileError || !profile) {
    return { error: profileError ?? new Error("Profil tidak ditemukan."), data: null };
  }

  if (profile.role === "admin") {
    router.push("/admin");
  } else {
    router.push("/catalog");
  }

  return { data, error: null };
}
