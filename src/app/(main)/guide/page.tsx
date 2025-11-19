"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { guideContent } from "@/lib/markdownContent";
import styles from "@/styles/content.module.css";

export default function Guide() {
  return (
    <div className={styles.container}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{guideContent}</ReactMarkdown>
    </div>
  );
}
