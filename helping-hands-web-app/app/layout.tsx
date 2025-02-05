import type { Metadata } from "next";
import { Ubuntu, Inter } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ['latin'],
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "500", "700"],
});

const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Helping Hand App",
  description: "A social network to empower those in need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
