"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.css";

type NavLinkProps = {
  href: string;
  iconSrc: string;
  iconAlt: string;
  children: React.ReactNode;
};

export function NavLink({ href, iconSrc, iconAlt, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={20}
        height={20}
        className={styles.icon}
      />
      {children}
    </Link>
  );
}
