import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = { title: "Waqar Associates | Islamabad Developer", description: "Urban development and town planning across Pakistan since 1991. Based in Islamabad." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans"><SmoothScroll /><Navbar />{children}<Footer /></body>
    </html>
  );
}