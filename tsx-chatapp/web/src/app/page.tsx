import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { GrandSidebarPaths } from "~/utils/types";

export default function Page(): JSX.Element {
  return (
    <div className="w-screen h-screen items-center justify-center flex flex-col">
      <h3 className="text-3xl font-semibold">Welcome Guest!</h3>
      <h6 className="text-lg font-[300]">
        Hope you find a wonderfull experience in this chat app
      </h6>
      <div className="grid grid-flow-col gap-1 mt-4">
        {GrandSidebarPaths.map((p) => (
          <Link key={p} href={p}>
            <Badge className="rounded-sm shadow-sm text-md hover:rounded-md hover:text-lg hover:shadow-lg transition-all">
              {p}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
