"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAndRedirect } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await loginAndRedirect(email, password, router);
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Login Into Your Account</h2>

        <div className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
            Masuk
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Dont have account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
}
