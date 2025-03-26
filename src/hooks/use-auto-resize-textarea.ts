import { useCallback, useRef } from "react";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight: number;
}

export function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(Math.max(textareaRef.current.scrollHeight, minHeight), maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [minHeight, maxHeight]);

  return { textareaRef, adjustHeight };
}
