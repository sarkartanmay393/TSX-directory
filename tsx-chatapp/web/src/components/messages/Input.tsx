import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  CameraIcon,
  DownloadCloud,
  Paperclip,
  SendHorizontal,
  VideoIcon,
} from "lucide-react";
import { cn } from "~/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage("");
    const textarea = document.getElementById("input_textarea");
    if (textarea) textarea.style.height = 'auto';
  };

  const handleAttach = () => {
    console.log("Attach file");
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const maxHeight = 300;

    const textarea = document.getElementById("input_textarea");
    textarea?.addEventListener("input", autoResize, false);
    function autoResize() {
      if (textarea) {
        textarea.style.height = "auto";

        let newHeight = textarea.scrollHeight + 2;

        if (newHeight > maxHeight) {
          textarea.style.height = `${maxHeight}px`;
          textarea.style.overflowY = "scroll";
        } else {
          textarea.style.height = `${newHeight}px`;
          textarea.style.overflowY = "hidden";
        }
      }
    }
  }, []);

  return (
    <div className="mb-4 w-[90%] self-center flex items-center justify-center min-h-16 border-[1px] border-black rounded-lg px-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" onClick={handleAttach} className="rounded-full">
            <Paperclip className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem>
            <CameraIcon className="w-4 h-4 mr-2" />
            Photos
          </DropdownMenuItem>
          <DropdownMenuItem>
            <VideoIcon className="w-4 h-4 mr-2" />
            Videos
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadCloud className="w-4 h-4 mr-2" />
            Documents
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Textarea
        // autoSave="" will use
        autoFocus
        id="input_textarea"
        value={message}
        onChange={handleInputChange}
        placeholder="Enter your message here..."
        className={cn(
          "max-h-full group-data-[focus-visible=true]:ring-0 resize shadow-none border-0 focus-visible:ring-0 text-lg scroll-y-auto mb-1",
          message.length > 80 && "text-md",
          message.length > 360 && "text-sm"
        )}
      />
      <Button
        disabled={!message}
        size="icon"
        onClick={handleSendMessage}
        className="rounded-full"
      >
        <SendHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
};
