"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, Fragment } from "react";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import styles from "./SideBar.module.css";
import { slugger } from "@/lib/slugger";
import { guideContent, referenceContent } from "@/lib/markdownContent";

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

  const headings = useMemo(() => {
    const content = pathname === "/guide" ? guideContent : referenceContent;
    if (!content) return [];

    const headingLines = content.match(/^## (.*)/gm) || [];
    return headingLines.map((line) => {
      const text = line.replace(/^## /, "").trim();
      return { text, slug: slugger.slug(text) };
    });
  }, [pathname]);

  useEffect(() => {
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

    headings.forEach(({ slug }) => {
      const element = document.getElementById(slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ slug }) => {
        const element = document.getElementById(slug);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Fragment>
          <div className={styles.section}>
            <button
              className={styles.titleButton}
              onClick={() => setIsGuideOpen(!isGuideOpen)}
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
              {headings.map(({ text, slug }) => (
                <a
                  key={slug}
                  href={`#${slug}`}
                  className={`${styles.tocLink} ${activeId === slug ? styles.activeToc : ""}`}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <button
              className={styles.titleButton}
              onClick={() => setIsReferenceOpen(!isReferenceOpen)}
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
              {headings.map(({ text, slug }) => (
                <a
                  key={slug}
                  href={`#${slug}`}
                  className={`${styles.tocLink} ${activeId === slug ? styles.activeToc : ""}`}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </Fragment>
      </nav>
    </aside>
  );
};
