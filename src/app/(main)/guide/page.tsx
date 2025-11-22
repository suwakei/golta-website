import MemoizedReactMarkdown from "@/components/ui/common/MemoizedReactMarkdown";
import { guideContent } from "@/lib/markdownContent";
import styles from "@/styles/content.module.css";

export default function Guide() {
  return (
    <div className={styles.container}>
      <MemoizedReactMarkdown>{guideContent}</MemoizedReactMarkdown>
    </div>
  );
}
