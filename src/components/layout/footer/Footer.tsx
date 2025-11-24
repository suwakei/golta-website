import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          The Go gopher was designed by Renee French. The design is licensed
          under the{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons 3.0 Attributions license
          </a>
          .
        </p>
        <div className={styles.bottomNav}>
          <p>&copy; {new Date().getFullYear()} Golta</p>
        </div>
      </div>
    </footer>
  );
};
