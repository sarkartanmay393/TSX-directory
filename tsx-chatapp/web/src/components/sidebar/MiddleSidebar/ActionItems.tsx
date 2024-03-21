import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "~/components/ui/hover-card";
import { cn } from "~/utils";

type Props = {
  id: string;
  title: string;
  icon?: any;
};

export const SidebarActionItem = ({ id, title }: Props) => {
  const paths = usePathname().split("/");

  return (
    <Link href={`/${paths[1]}/${id}`}>
      <Card
        className={cn(
          "w-full cursor-pointer shadow-none hover:bg-primary-foreground hover:shadow-sm",
          paths[paths.length - 1] === id ? "bg-transparent" : "bg-default" // shows active item
        )}
      >
        <CardContent className="min-h-16 flex items-center gap-x-4 p-0 px-2">
          <HoverCard openDelay={1500}>
            <HoverCardTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage />
                <AvatarFallback>
                  {title.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent side="right">
              <h3 className="text-sm font-semibold">@{title}</h3>
              <h3 className="text-sm text-[12px] tracking-light">
                Peacefuly working ass off for growing
              </h3>
            </HoverCardContent>
          </HoverCard>

          <div className="flex flex-col">
            <h3 className="text-md font-medium tracking-normal">{title}</h3>
            <p className="text-sm font-normal text-gray-400">He: hi nerds!</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
