import { ReactNode } from "react";
import { cn } from "../util";

interface OneTabProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function OneTab({ selected, onClick, children }: OneTabProps) {
  return (
    <li
      onClick={onClick}
      className={cn(
        "inline-block py-2 px-4 border-b-2 border-transparent rounded-t-lg cursor-pointer",
        !selected &&
          "hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-400",
        selected && "text-blue-600 border-blue-600 rounded-t-lg"
      )}
      aria-current="page"
    >
      {children}
    </li>
  );
}
