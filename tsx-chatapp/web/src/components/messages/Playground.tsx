import React from "react";
import MessageNavbar from "./Navbar";
import { MessageInput } from "./Input";
import { Separator } from "../ui/separator";
import { MessageScreen } from "~/utils/types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "~/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { Edit3, Trash2 } from "lucide-react";

export const MessagePlayground = ({
  id,
  title,
  messages,
  icon,
  status,
}: MessageScreen) => {
  return (
    <div key={id} className="flex flex-col w-full h-full">
      <MessageNavbar title={title} status={status} />
      <Separator />
      <ScrollArea className="h-[90%]">
        <div className="flex flex-col gap-2 p-2 px-6">
          {messages.map((m, i) => (
            <ContextMenu key={m.id + i}>
              <ContextMenuTrigger asChild>
                <Card
                  className={cn(
                    "w-80 min-h-fit max-h-auto rounded-md flex flex-col justify-between bg-primary-foreground shadow-sm",
                    m.sender === "tanmay" ? "self-end" : "self-start"
                  )}
                >
                  <CardContent className="text-sm tracking-tight p-2 break-words overflow-hidden">
                    {m.text}
                  </CardContent>
                  <CardFooter className="p-0 pr-1 pb-1 text-sm text-[10px] font-[300] text-gray-500 flex justify-end overflow-hidden">
                    {m.sentOn}
                  </CardFooter>
                </Card>
              </ContextMenuTrigger>
              <ContextMenuContent className="">
                <ContextMenuItem className="text-sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </ContextMenuItem>
                <Separator />
                <ContextMenuItem className="text-sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </ScrollArea>
      <MessageInput />
    </div>
  );
};
