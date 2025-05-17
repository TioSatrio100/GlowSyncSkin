"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();

  // Handle auth state
  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) throw error;
        setUser(session?.user || null);
      } catch (error) {
        console.error("Error getting session:", error);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user || null);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const handleProtectedNavigation = (path: string) => {
    if (!user) {
      router.push(`/auth/login?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => (pathname === path ? "font-semibold border-b-2 border-pink-500" : "");

  if (loading) {
    return (
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <div className="relative w-10 h-10 mr-2">
              <div className="absolute inset-0 bg-pink-500 rounded-lg rotate-6"></div>
              <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-pink-500">G</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-pink-500">GLOWSYNC</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-pink-500 hover:text-pink-600 text-sm ${isActive("/")}`}>
              Home
            </Link>
            <button onClick={() => handleProtectedNavigation("/catalog")} className={`text-pink-500 hover:text-pink-600 text-sm ${isActive("/catalog")}`}>
              Catalog
            </button>
            <button onClick={() => handleProtectedNavigation("/analyze")} className={`text-pink-500 hover:text-pink-600 text-sm ${isActive("/analyze")}`}>
              Skin Analysis
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => handleProtectedNavigation("/cart")} className="relative group" aria-label="Cart">
              <ShoppingBagIcon className="h-6 w-6 text-pink-500 group-hover:text-pink-600" />
              {user && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>}
            </button>

            {user ? (
              <button onClick={handleLogout} className="text-pink-500 hover:text-pink-600 text-sm font-medium">
                Logout
              </button>
            ) : (
              <>
                <Link href="/auth/login" className="text-pink-500 hover:text-pink-600 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/auth/register" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 text-sm font-medium rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => handleProtectedNavigation("/cart")} className="relative" aria-label="Cart">
              <ShoppingBagIcon className="h-6 w-6 text-pink-500" />
              {user && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-pink-500 focus:outline-none" aria-label="Menu">
              {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 pt-2 space-y-2 shadow-sm">
          <Link href="/" className={`block text-pink-500 hover:text-pink-600 text-sm font-medium py-2 ${isActive("/")}`} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <button onClick={() => handleProtectedNavigation("/catalog")} className={`block text-pink-500 hover:text-pink-600 text-sm font-medium w-full text-left py-2 ${isActive("/catalog")}`}>
            Catalog
          </button>
          <button onClick={() => handleProtectedNavigation("/analyze")} className={`block text-pink-500 hover:text-pink-600 text-sm font-medium w-full text-left py-2 ${isActive("/analyze")}`}>
            Skin Analysis
          </button>

          <div className="pt-4 border-t border-gray-200 mt-2">
            {user ? (
              <button onClick={handleLogout} className="block text-pink-500 hover:text-pink-600 text-sm font-medium w-full text-left py-2">
                Logout
              </button>
            ) : (
              <>
                <Link href="/auth/login" className="block text-pink-500 hover:text-pink-600 text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/auth/register" className="block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 text-sm font-medium rounded-xl mt-2 text-center" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
