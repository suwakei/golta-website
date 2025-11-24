import styles from "./NavLink.module.css";
import Link from "next/link";
import Image from "next/image";

type GithubLinkProps = {
  href: string;
  iconSrc: string;
  iconAlt: string;
  children: React.ReactNode;
};

export default function GithubLink({
  href,
  iconSrc,
  iconAlt,
  children,
}: GithubLinkProps) {
  return (
    <div>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.navLink}
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
    </div>
  );
}
