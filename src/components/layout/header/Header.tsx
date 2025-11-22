"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/GoltaCircle.svg"
            alt="Golta Logo"
            width={120}
            height={59}
            priority
          />
        </Link>
        <div className={styles.logoText}>Golta</div>
      </div>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
        >
          <Image
            src="/Home.svg"
            alt="Home icon"
            width={20}
            height={20}
            className={styles.icon}
          />
          Home
        </Link>
        <Link
          href="/guide"
          className={`${styles.navLink} ${
            pathname === "/guide" ? styles.active : ""
          }`}
        >
          <Image
            src="/book.svg"
            alt="book icon"
            width={20}
            height={20}
            className={styles.icon}
          />
          Guide
        </Link>
        <Link
          href="/reference"
          className={`${styles.navLink} ${
            pathname === "/reference" ? styles.active : ""
          }`}
        >
          <Image
            src="/reference.svg"
            alt="reference icon"
            width={20}
            height={20}
            className={styles.icon}
          />
          Reference
        </Link>
        <Link
          href="https://github.com/suwakei/golta"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          <Image
            src="/github.svg"
            alt="github icon"
            width={20}
            height={20}
            className={styles.icon}
          />
          GitHub
        </Link>
      </nav>
    </header>
  );
}
