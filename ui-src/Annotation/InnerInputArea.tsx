import { useState } from "react";
import { cn } from "../util";

interface InnerInputAreaProps {
  name?: string;
  defaultValue?: string;
  className?: string;
}
export function InnerInputArea({
  name,
  defaultValue,
  className,
}: InnerInputAreaProps) {
  const [inputText, setInputText] = useState(defaultValue || "");
  return (
    <div>
      <div
        className={cn(className)}
        contentEditable
        onInput={(e) => {
          setInputText(e.currentTarget.innerText);
        }}
      >
        {defaultValue}
      </div>
      <input type="hidden" name={name} value={inputText} />
    </div>
  );
}
