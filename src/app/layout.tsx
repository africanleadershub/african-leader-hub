import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "African Leaders Hub - Building Africa's Future",
  description:
    "Empowering youth, children, and women as ethical leaders for sustainable African development through education, rights awareness, entrepreneurship, and environmental action.",
  keywords:
    "youth leadership Rwanda, climate ambassadors Africa, teen mothers empowerment, teacher training East Africa, know your rights program",
  authors: [{ name: "African Leaders Hub" }],
  openGraph: {
    title: "African Leaders Hub - Building Africa's Future",
    description:
      "Empowering youth, children, and women as ethical leaders for sustainable African development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "African Leaders Hub - Building Africa's Future",
    description:
      "Empowering youth, children, and women as ethical leaders for sustainable African development.",
    creator: "@A_LeadersHub",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
