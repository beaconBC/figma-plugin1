import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function convertNewLine(text: string) {
  return text
    .replace(/\<div\>\<br\>\<\/div\>/g, "\n")
    .replace(/\<div\>/g, "\n")
    .replace(/\<\/div\>/g, "");
}
