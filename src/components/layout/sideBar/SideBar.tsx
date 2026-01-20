"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, Fragment } from "react";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import styles from "./SideBar.module.css";
import { slugger } from "@/lib/slugger";
import { guideContent } from "@/lib/markdownContent";

export const SideBar = () => {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(pathname.startsWith("/guide"));
  const [isReferenceOpen, setIsReferenceOpen] = useState(
    pathname.startsWith("/reference"),
  );

  useEffect(() => {
    setIsGuideOpen(pathname.startsWith("/guide"));
    setIsReferenceOpen(pathname.startsWith("/reference"));
  }, [pathname]);

  const guideHeadings = useMemo(() => {
    const headingLines = guideContent.match(/^## (.*)/gm) || [];
    return headingLines.map((line) => {
      const text = line.replace(/^## /, "").trim();
      return { text, slug: slugger.slug(text) };
    });
  }, []);

  const referenceLinks = useMemo(
    () => [
      { text: "install", href: "/reference#install" },
      { text: "uninstall", href: "/reference#uninstall" },
      { text: "list", href: "/reference#list" },
      { text: "list-remote", href: "/reference#list-remote" },
      { text: "default", href: "/reference#default" },
      { text: "pin", href: "/reference#pin" },
      { text: "unpin", href: "/reference#unpin" },
      { text: "exec", href: "/reference#exec" },
      { text: "run", href: "/reference#run" },
      { text: "which", href: "reference#which" },
    ],
    [],
  );

  useEffect(() => {
    if (pathname !== "/guide" && pathname !== "/reference") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    const slugs =
      pathname === "/guide"
        ? guideHeadings.map((h) => h.slug)
        : referenceLinks.map((l) => l.href.split("#")[1] || "");

    slugs.forEach((slug) => {
      const element = document.getElementById(slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      slugs.forEach((slug) => {
        const element = document.getElementById(slug);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [guideHeadings, pathname, referenceLinks]);

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Fragment>
          <div className={styles.section}>
            <button
              className={styles.titleButton}
              onClick={() => setIsGuideOpen(!isGuideOpen)}
              aria-expanded={isGuideOpen}
            >
              <Link
                href="/guide"
                className={`${styles.mainLink} ${pathname === "/guide" ? styles.activeMain : ""}`}
                onClick={(e) => e.stopPropagation()} // Prevent button click when link is clicked
              >
                Guide
              </Link>
              {isGuideOpen ? (
                <FaChevronDown size="0.8em" />
              ) : (
                <FaChevronRight size="0.8em" />
              )}
            </button>
            <div className={`${styles.toc} ${isGuideOpen ? styles.open : ""}`}>
              {guideHeadings.map(({ text, slug }) => (
                <Link
                  key={slug}
                  href={`/guide#${slug}`}
                  className={`${styles.tocLink} ${pathname === "/guide" && activeId === slug ? styles.activeToc : ""}`}
                >
                  {text}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <button
              className={styles.titleButton}
              onClick={() => setIsReferenceOpen(!isReferenceOpen)}
              aria-expanded={isReferenceOpen}
            >
              <Link
                href="/reference"
                className={`${styles.mainLink} ${pathname === "/reference" ? styles.activeMain : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                Reference
              </Link>
              {isReferenceOpen ? (
                <FaChevronDown size="0.8em" />
              ) : (
                <FaChevronRight size="0.8em" />
              )}
            </button>
            <div
              className={`${styles.toc} ${isReferenceOpen ? styles.open : ""}`}
            >
              {referenceLinks.map(({ text, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${styles.tocLink} ${pathname === "/reference" && activeId === href.split("#")[1] ? styles.activeToc : ""}`}
                >
                  {text}
                </Link>
              ))}
            </div>
          </div>
        </Fragment>
      </nav>
    </aside>
  );
};
