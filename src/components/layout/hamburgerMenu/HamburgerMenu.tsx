"use client";

import { useState } from "react";
import styles from "./HamburgerMenu.module.css";

type Props = {
  children: React.ReactNode;
};

export function HamburgerMenu({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        className={styles.hamburger}
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <div className={`${styles.line} ${open ? styles.open : ""}`} />
        <div className={`${styles.line} ${open ? styles.open : ""}`} />
        <div className={`${styles.line} ${open ? styles.open : ""}`} />
      </button>

      {open && (
        <nav className={styles.menu}>
          <ul className={styles.menuList}>{children}</ul>
        </nav>
      )}
    </div>
  );
}
