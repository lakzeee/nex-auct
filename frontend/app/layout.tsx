import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/app/Components/layout/NavBar";
import ToasterProvider from "@/app/providers/ToasterProvider";

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
      <body>
        <ToasterProvider />
        <NavBar />
        <main className="container mx-auto px-4 pt-4">{children}</main>
      </body>
    </html>
  );
}
