import { MiddleSidebarArgs } from "~/context/MiddleSidebar";

export const DEFAULT_MIDDLESIDEBA_SELECTIONS: MiddleSidebarArgs = {
  activeActionItemId: "",
  heading: "",
  items: [],
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
