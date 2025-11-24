import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { NavLink } from "@/components/ui/link/NavLink";
import GithubLink from "@/components/ui/link/GithubLink";

export function Header() {
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
        <NavLink href="/" iconSrc="/Home.svg" iconAlt="Home icon">
          Home
        </NavLink>
        <NavLink href="/guide" iconSrc="/book.svg" iconAlt="book icon">
          Guide
        </NavLink>
        <NavLink
          href="/reference"
          iconSrc="/reference.svg"
          iconAlt="reference icon"
        >
          Reference
        </NavLink>
        <GithubLink
          href="https://github.com/suwakei/golta"
          iconSrc="/github.svg"
          iconAlt="github icon"
        >
          GitHub
        </GithubLink>
      </nav>
    </header>
  );
}
