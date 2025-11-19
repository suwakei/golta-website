import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golta - Reference",
  description: "Golta References",
};

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
