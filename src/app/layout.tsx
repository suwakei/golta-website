import type { Metadata } from "next";
import { Header } from "@/components/layout/header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Golta - A fast, cross-platform Go version manager with Volta-style seamless switching.",
  description:
    "A fast, cross-platform Go version manager with Volta-style seamless switching.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
