"use client";

import "./globals.css";
import { ReactNode } from "react";
import { PageTransition } from "../components/PageTransition";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="luxury-scroll">
      <body className="bg-[#f5f2ec] text-stone-950 antialiased">
        <PageTransition>
          <Navbar />
          <main className="pt-20 pb-16">{children}</main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
