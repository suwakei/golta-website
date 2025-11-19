"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { FaHome, FaBook, FaList, FaGithub } from "react-icons/fa";

export function Header() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/GoltaLogo.svg"
          alt="Golta Logo"
          width={120}
          height={59}
          priority
        />
      </Link>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
        >
          <FaHome />
          Home
        </Link>
        <Link
          href="/guide"
          className={`${styles.navLink} ${
            pathname === "/guide" ? styles.active : ""
          }`}
        >
          <FaBook />
          Guide
        </Link>
        <Link
          href="/reference"
          className={`${styles.navLink} ${
            pathname === "/reference" ? styles.active : ""
          }`}
        >
          <FaList />
          Reference
        </Link>
        <Link
          href="https://github.com/suwakei/golta"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          <FaGithub />
          GitHub
        </Link>
      </nav>
    </header>
  );
}
