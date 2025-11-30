import { memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";

/**
 * A memoized ReactMarkdown component using React.memo.
 * It skips re-rendering unless the `children` prop has changed.
 */
const MemoizedReactMarkdown: React.FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

export default MemoizedReactMarkdown;
