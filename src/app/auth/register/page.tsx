/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithRole } from "@/lib/auth";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await signUpWithRole(email, password, role as "admin" | "user");

      if (error) {
        throw error;
      }

      // Show SweetAlert on success
      await Swal.fire({
        title: "Registration Successful!",
        text: "You can now login to your account",
        icon: "success",
        draggable: true,
        confirmButtonText: "Go to Login",
        background: "#1f2937", // dark:bg-gray-900
        color: "#ffffff",
        confirmButtonColor: "#2563eb", // blue-600
      });

      router.push("/auth/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Register</h1>
        <input className="border p-2 w-full mb-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        <select className="border p-2 w-full mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleRegister} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
          Register
        </button>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
}
