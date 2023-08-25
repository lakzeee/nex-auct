import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import NavBar from "@/app/Components/layout/NavBar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexAuct",
  description: "NexAuct",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*<body className={inter.className}>*/}
      <body>
        <NavBar />
        <main className="container mx-auto px-4 pt-4">{children}</main>
      </body>
    </html>
  );
}
