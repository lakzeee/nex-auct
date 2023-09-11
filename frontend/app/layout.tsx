import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/app/Components/layout/NavBar";
import ToasterProvider from "@/app/providers/ToasterProvider";
import SignalRProvider from "@/app/providers/SignalRProvider";
import { getCurrentUser } from "@/app/Actions/authActions";

export const metadata: Metadata = {
  title: "NexAuct",
  description: "NexAuct",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ToasterProvider />
        <NavBar />
        <main className="container mx-auto px-4 pt-24">
          <SignalRProvider user={user}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}
