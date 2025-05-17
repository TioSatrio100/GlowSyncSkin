import "./styles/globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Glowsync",
  description: "E-commerce with Supabase & Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
