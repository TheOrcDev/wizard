import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OFooter, OHeader } from "@/components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI NextJS Framework",
  description: "Framework for using AI completions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OHeader />
        {children}
        <OFooter />
      </body>
    </html>
  );
}
