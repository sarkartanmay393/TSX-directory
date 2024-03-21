"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ActionItemArgs } from "~/context/MiddleSidebar";
import { GrandSidebarPaths } from "~/utils/types";
import { getMockData } from "../mock";
import { SidebarActionItem } from "./";
import { cn } from "~/utils";

import { ScrollArea } from "~/components/ui/scroll-area";
import { SidebarHeader } from "./Header";

type MiddleSidebarState = {
  heading: string;
  items: ActionItemArgs[];
};

type Props = { show: boolean };

export function MiddleSidebar({ show }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const path = usePathname();
  const [state, setState] = useState<MiddleSidebarState>({
    heading: "",
    items: [],
  });

  useEffect(() => {
    if (show) {
      const localPath = GrandSidebarPaths.find((gsp) => path.startsWith(gsp));
      if (localPath) {
        let heading = localPath.slice(1);
        heading = heading.charAt(0).toUpperCase() + heading.slice(1);
        const items = getMockData(localPath);

        setState({
          heading,
          items,
        });
      }
    }
  }, [show, path]);

  return (
    <div
      className={cn(
        show ? "translate-x-0" : "-translate-x-full",
        "flex w-80 flex-col items-center py-2 transition-all duration-300 shadow-xl"
      )}
    >
      {state ? (
        <div className="w-full h-screen">
          <SidebarHeader
            heading={state.heading}
            searchMetarials={{ searchValue, setSearchValue }}
          />
          <ScrollArea className="h-[90%] p-2">
            <div className="flex flex-col px-2 gap-2">
              {state.items.map((item, i) => (
                <SidebarActionItem
                  key={item.id + i}
                  title={item.title}
                  id={item.id}
                />
              ))}
              <div className="h-10"></div>
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
