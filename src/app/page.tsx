import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/styles/content.module.css";
import { Footer } from "@/components/layout/footer/Footer";
import { HomeContent } from "@/lib/markdownContent";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/backwhite.svg"
            alt="Golta Logo"
            width={500}
            height={200}
            priority
          />
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{HomeContent}</ReactMarkdown>
      </div>
      <Footer />
    </>
  );
}
