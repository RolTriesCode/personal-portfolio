import type { Metadata } from "next";
import { Bebas_Neue, Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import LenisScroll from "./lenisScroll";
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { ScrollProgress } from "@/components/ui/scroll-progress"
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"], 
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Errol Tabangen",
  description: "My Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${inter.variable} ${notoSerif.variable} antialiased scroll-smooth`}
      >
        <ScrollProgress />

<div className="hidden lg:flex">
        <SmoothCursor />  

</div>

        <LenisScroll />
        {children}
      </body>
    </html>
  );
}
// bring back later 
/**
 *               
 */