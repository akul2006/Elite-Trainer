import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Elite Trainer",
  description: "Enterprise capability building, executive leadership transition, and high-stakes communication training. Over 5,000 professionals upskilled.",
  keywords: ["Corporate Trainer", "L&D Strategy", "Executive Coaching", "Organizational Alignment", "Communication Training"],
  authors: [{ name: "Akul Sharma" }],
  openGraph: {
    title: "L&D Strategy & Corporate Consulting",
    description: "Transforming tactical workforces into strategically aligned, high-performing leaders.",
    siteName: "Executive L&D Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-surface text-on-surface transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}