"use client";

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

import {
  Cross,
  CrossIcon,
  DoorClosed,
  MessageCircleMore,
  SearchIcon,
  Users,
} from "lucide-react";
import { GrandSidebarButton } from ".";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";

export function GrandSidebar() {
  return (
    <div className="bg-primary z-10 flex h-screen min-w-20 max-w-20 flex-col items-center justify-between rounded-br-2xl rounded-tr-2xl py-6 shadow-lg">
      {/* profile heading */}
      <div className="flex">
        <Drawer open={false}>
          <DrawerTrigger asChild>
            <Avatar>
              <AvatarImage src="https://dub.sh/zoro-dp" />
              <AvatarFallback />
            </Avatar>
          </DrawerTrigger>
          <DrawerContent className="h-[90%] m-8 backdrop:blur-md">
            <DrawerClose className="self-end mr-5 font-semibold">X</DrawerClose>
            <div className="h-full w-full flex items-center justify-center">
              No data currently
            </div>
            <DrawerFooter className="flex w-full flex-row justify-center">
              <Button className="w-fit">Submit</Button>
              <Button variant="outline" className="w-fit">
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-col gap-4">
        {/* action buttons */}
        <GrandSidebarButton
          key="explore"
          label="Explore"
          icon={<SearchIcon />}
          link="/explore"
        />
        <GrandSidebarButton
          key="messages"
          label="Messages"
          icon={<MessageCircleMore />}
          link="/messages"
        />
        <GrandSidebarButton
          disabled
          key="groups"
          label="Groups"
          icon={<Users />}
          link="/groups"
        />
      </div>
    </div>
  );
}
