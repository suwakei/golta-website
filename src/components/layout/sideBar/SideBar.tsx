"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import styles from "./SideBar.module.css";
import { slugger } from "@/lib/slugger";
import { guideContent } from "@/lib/markdownContent";

export const SideBar = () => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(pathname.startsWith("/guide"));
  const [isReferenceOpen, setIsReferenceOpen] = useState(
    pathname.startsWith("/reference"),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedGuideOpen = localStorage.getItem("sidebar-guide-open");
      const savedReferenceOpen = localStorage.getItem("sidebar-reference-open");
      if (savedGuideOpen !== null) {
        setIsGuideOpen(savedGuideOpen === "true");
      }
      if (savedReferenceOpen !== null) {
        setIsReferenceOpen(savedReferenceOpen === "true");
      }
    }, 0);

    const sidebar = sidebarRef.current;
    if (sidebar) {
      const savedScrollPosition = localStorage.getItem(
        "sidebar-scroll-position",
      );
      if (savedScrollPosition) {
        setTimeout(() => {
          sidebar.scrollTop = parseInt(savedScrollPosition, 10);
        }, 0);
      }

      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          localStorage.setItem(
            "sidebar-scroll-position",
            String(sidebar.scrollTop),
          );
        }, 200);
      };
      sidebar.addEventListener("scroll", handleScroll);
      return () => {
        sidebar.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      };
    }
    return () => clearTimeout(timer);
  }, []);

  const guideHeadings = useMemo(() => {
    slugger.reset();
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
      { text: "which", href: "/reference#which" },
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
    <aside className={styles.sidebar} ref={sidebarRef}>
      <nav className={styles.nav}>
        <SidebarSection
          title="Guide"
          href="/guide"
          isOpen={isGuideOpen}
          onToggle={() => {
            const next = !isGuideOpen;
            setIsGuideOpen(next);
            localStorage.setItem("sidebar-guide-open", String(next));
          }}
          isActiveMain={pathname === "/guide"}
          items={guideHeadings.map(({ text, slug }) => ({
            text,
            href: `/guide#${slug}`,
            isActive: pathname === "/guide" && activeId === slug,
          }))}
        />
        <SidebarSection
          title="Reference"
          href="/reference"
          isOpen={isReferenceOpen}
          onToggle={() => {
            const next = !isReferenceOpen;
            setIsReferenceOpen(next);
            localStorage.setItem("sidebar-reference-open", String(next));
          }}
          isActiveMain={pathname === "/reference"}
          items={referenceLinks.map(({ text, href }) => ({
            text,
            href,
            isActive:
              pathname === "/reference" && activeId === href.split("#")[1],
          }))}
        />
      </nav>
    </aside>
  );
};

const SidebarSection = ({
  title,
  href,
  isOpen,
  onToggle,
  isActiveMain,
  items,
}: {
  title: string;
  href: string;
  isOpen: boolean;
  onToggle: () => void;
  isActiveMain: boolean;
  items: { text: string; href: string; isActive: boolean }[];
}) => (
  <div className={styles.section}>
    <div
      className={styles.titleButton}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isOpen}
    >
      <Link
        href={href}
        className={`${styles.mainLink} ${isActiveMain ? styles.activeMain : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title}
      </Link>
      {isOpen ? (
        <FaChevronDown size="0.8em" />
      ) : (
        <FaChevronRight size="0.8em" />
      )}
    </div>
    <div className={`${styles.toc} ${isOpen ? styles.open : ""}`}>
      {items.map(({ text, href, isActive }) => (
        <Link
          key={href}
          href={href}
          className={`${styles.tocLink} ${isActive ? styles.activeToc : ""}`}
        >
          {text}
        </Link>
      ))}
    </div>
  </div>
);
