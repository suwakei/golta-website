import type { Metadata } from "next";
import { SideBar } from "@/components/layout/sideBar/SideBar";
import styles from "./main.module.css";

export const metadata: Metadata = {
  title: "Golta - Introduction",
  description: "Golta Introductions",
};

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
