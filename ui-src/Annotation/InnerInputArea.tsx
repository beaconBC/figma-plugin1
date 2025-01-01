import { useState } from "react";
import { cn, convertNewLine } from "../util";

interface InnerInputAreaProps {
  name?: string;
  defaultValue?: string;
  className?: string;
  onBlur?: (value: string) => void;
}
export function InnerInputArea({
  name,
  defaultValue,
  className,
  onBlur,
}: InnerInputAreaProps) {
  const [inputText, setInputText] = useState(defaultValue || "");
  return (
    <div>
      <div
        className={cn("whitespace-pre-wrap", className)}
        contentEditable
        onInput={(e) => {
          setInputText(convertNewLine(e.currentTarget.innerHTML));
        }}
        onBlur={() => {
          onBlur?.(inputText);
        }}
      >
        {defaultValue}
      </div>
      <input type="hidden" name={name} value={inputText} />
    </div>
  );
}
