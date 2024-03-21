import { Dispatch, SetStateAction, createContext } from "react";

export const MiddleSidebarContext = createContext<{
  middleSidebarState: MiddleSidebarArgs;
  setMiddleSidebarState: Dispatch<SetStateAction<MiddleSidebarArgs>>;
}>({
  middleSidebarState: null,
  setMiddleSidebarState: () => {},
});

export type MiddleSidebarArgs = {
  activeActionItemId: string; // always a corresponding id
  heading: string;
  items: ActionItemArgs[];
} | null;

export type ActionItemArgs = {
  readonly id: string;
  title: string;
  icon?: string;
  description?: string;
  lastActivity?: string;
};
