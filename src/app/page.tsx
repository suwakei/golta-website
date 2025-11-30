import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "@/styles/content.module.css";
import remarkGfm from "remark-gfm";
import MemoizedReactMarkdown from "@/components/ui/common/MemoizedReactMarkdown";
import { HomeContent } from "@/lib/markdownContent";

const Footer = dynamic(() =>
  import("@/components/layout/footer/Footer").then((module) => module.Footer),
);

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            src="/backwhite.svg"
            alt="Golta Logo"
            width={500}
            height={200}
            priority
          />
        </div>
        <MemoizedReactMarkdown remarkPlugins={[remarkGfm]}>
          {HomeContent}
        </MemoizedReactMarkdown>
      </div>
      <Footer />
    </>
  );
}
