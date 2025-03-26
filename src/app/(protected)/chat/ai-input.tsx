"use client";

import React, { useState } from "react";

import { CornerRightUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

export interface AIInputProps {
  onSend: (input: string) => Promise<void>;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

const AIInput: React.FC<AIInputProps> = ({
  onSend,
  isGenerating,
  setIsGenerating,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    await onSend(inputValue);
    setInputValue("");
    setIsGenerating(false);
  };

  return (
    <div className="w-full py-4">
      <div className="relative max-w-xl w-full mx-auto flex flex-col gap-2">
        <div className="relative">
          <Textarea
            id="ai-input"
            placeholder="Enter input as: Grade, Marker, Subject, (optional Generic Input)"
            className={cn(
              "w-full bg-black/5 dark:bg-white/5 rounded-3xl pl-6 pr-10 py-4 placeholder:text-black/70 dark:placeholder:text-white/70 border-none ring-black/30 dark:ring-white/30 text-black dark:text-white resize-none leading-[1.2]",
              "min-h-[56px]"
            )}
            ref={textareaRef}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setInputValue(e.target.value);
              adjustHeight();
            }}
            disabled={isGenerating}
          />
          <button
            onClick={handleSubmit}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded-xl py-1 px-1",
              isGenerating ? "bg-none" : "bg-black/5 dark:bg-white/5"
            )}
            type="button"
          >
            {isGenerating ? (
              <div
                className="w-4 h-4 bg-black dark:bg-white rounded-sm animate-spin transition duration-700"
                style={{ animationDuration: "3s" }}
              />
            ) : (
              <CornerRightUp
                className={cn(
                  "w-4 h-4 transition-opacity dark:text-white",
                  inputValue ? "opacity-100" : "opacity-30"
                )}
              />
            )}
          </button>
        </div>
        <p className="pl-4 h-4 text-xs text-center text-black/70 dark:text-white/70">
          {isGenerating ? "AI is thinking..." : "Ready to submit!"}
        </p>
      </div>
    </div>
  );
};

export default AIInput;
