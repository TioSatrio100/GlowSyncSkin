"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon, ShoppingBagIcon, TagIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
    { name: "Products", href: "/admin/products", icon: ShoppingBagIcon },
    { name: "Categories", href: "/admin/categories", icon: TagIcon },
    { name: "Orders", href: "/admin/orders", icon: ClipboardDocumentListIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${isActive ? "bg-gray-100 border-l-4 border-primary-500" : ""}`}>
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
