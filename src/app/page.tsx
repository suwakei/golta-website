import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/styles/content.module.css";
import { Footer } from "@/components/layout/footer/Footer";
import { HomeContent } from "@/lib/markdownContent";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{HomeContent}</ReactMarkdown>
      </div>
      <Footer />
    </>
  );
}
