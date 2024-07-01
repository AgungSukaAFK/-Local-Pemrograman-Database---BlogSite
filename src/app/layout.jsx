"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/ui/navbar";
import Footer from "@/ui/footer";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const disableNavbar = ["/login", "/register"];
const disableFooter = ["/login", "/register"];

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {!disableNavbar.includes(pathname) && <Navbar />}
          <div className="container">{children}</div>
          {!disableFooter.includes(pathname) && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
