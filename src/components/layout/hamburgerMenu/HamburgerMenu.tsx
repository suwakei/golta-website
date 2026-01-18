"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./HamburgerMenu.module.css";

type Props = {
  children: React.ReactNode;
};

export function HamburgerMenu({ children }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={styles.container} ref={menuRef}>
      {" "}
      <button
        className={styles.hamburger}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <div className={`${styles.line} ${open ? styles.open : ""}`} />
        <div className={`${styles.line} ${open ? styles.open : ""}`} />
        <div className={`${styles.line} ${open ? styles.open : ""}`} />
      </button>
      {open && (
        <nav className={styles.menu} onClick={() => setOpen(false)}>
          <ul className={styles.menuList}>{children}</ul>
        </nav>
      )}
    </div>
  );
}
