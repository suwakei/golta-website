import MemoizedReactMarkdown from "@/components/ui/common/MemoizedReactMarkdown";
import { referenceContent } from "@/lib/markdownContent";
import styles from "@/styles/content.module.css";

export default function Reference() {
  return (
    <div className={styles.container}>
      <MemoizedReactMarkdown>{referenceContent}</MemoizedReactMarkdown>
    </div>
  );
}
