import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Nav",
  description: "Estudio creativo. Ideas que dejan huella.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={interTight.variable}>
      <body>{children}</body>
    </html>
  );
}
