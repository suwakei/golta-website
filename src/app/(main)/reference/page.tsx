"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/styles/content.module.css";

const markdownContent = `
# Golta Command Reference

This page provides a detailed reference for all available \`golta\` commands.

## \`golta install\`

Installs a specific version of Go.

\`\`\`bash
golta install <version>
\`\`\`

## \`golta use\`

Switches the Go version for the current shell session.

\`\`\`bash
golta use <version>
\`\`\`
`;

export default function Reference() {
  return (
    <div className={styles.container}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
