import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PatientProvider } from "@/lib/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sehat Setu Medical",
  description: "Clarity in Crisis - Sehat Setu Healthcare Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <PatientProvider>
          {children}
        </PatientProvider>
      </body>
    </html>
  );
}
