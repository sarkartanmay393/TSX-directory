import React, { useState } from "react";

import {
  FileUp,
  Flag,
  MoreVertical,
  Search,
  Settings2,
  Trash,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

type Props = {
  title: string;
  status: string;
};

export default function MessageNavbar({ title, status }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="w-full h-20 flex items-center justify-between px-4">
      <div className="flex-1 h-full flex justify-start items-center gap-3">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback>{title.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent>
            <h3 className="text-sm font-semibold">@{title}</h3>
            <h3 className="text-sm text-[12px] tracking-light">
              Peacefuly working ass off for growing
            </h3>
          </HoverCardContent>
        </HoverCard>
        <div className="flex flex-col -space-y-1">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-sm font-light tracking-tight">{status}</p>
        </div>
      </div>

      <div className="flex-[0.5] h-full flex justify-end items-center">
        <div className="flex flex-1 justify-end items-center gap-1">
          {showSearchBar && (
            <Input
              type="text"
              className="flex-1"
              value={searchValue}
              name="messageSearch"
              placeholder="Type to search"
              onChange={(e) => setSearchValue(e.currentTarget.value)}
            />
          )}
          <Button
            className="w-8"
            variant="ghost"
            size="icon"
            onClick={() => setShowSearchBar(!showSearchBar)}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={6} align="end">
            <DropdownMenuItem key="preferences">
              <Settings2 className="mr-2 h-4 w-4" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem key="preferences">
              <FileUp className="mr-2 h-4 w-4" />
              Export Chat
            </DropdownMenuItem>
            <DropdownMenuItem key="report">
              <Flag className="mr-2 h-4 w-4" />
              Report
            </DropdownMenuItem>
            <DropdownMenuItem key="delete" className="focus:bg-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
