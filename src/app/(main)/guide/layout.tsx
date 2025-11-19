import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golta - Guide",
  description: "Golta Guides",
};

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
