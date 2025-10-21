import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2048 - Join the numbers!",
  description: "A modern Next.js implementation of the classic 2048 game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-game-bg text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
