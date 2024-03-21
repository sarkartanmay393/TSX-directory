"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GrandSidebarPaths } from "~/utils/types";
import { GrandSidebar } from "./GrandSidebar";
import { MiddleSidebar } from "./MiddleSidebar";
import { cn } from "~/utils";

export default function Sidebar() {
  const path = usePathname();
  const [showMiddleSidebar, setShowMiddleSidebar] = useState(false);

  useEffect(() => {
    if (GrandSidebarPaths.find((p) => path.startsWith(p))) {
      setShowMiddleSidebar(true);
    } else {
      setShowMiddleSidebar(false);
    }
  }, [path]);

  return (
    <div className="flex h-full">
      <div
        className={cn(
          "transition-width flex max-w-[30vw] duration-300",
          showMiddleSidebar ? "w-[calc(80px+20rem)]" : "w-[80px]"
        )}
      >
        <GrandSidebar />
        <MiddleSidebar show={showMiddleSidebar} />
      </div>
    </div>
  );
}
