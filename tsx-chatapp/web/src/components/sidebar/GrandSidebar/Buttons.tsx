import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "~/components/ui/tooltip";

export type Args = {
  disabled?: boolean;
  label: string;
  icon: any;
  link: string;
};

export const GrandSidebarButton = ({ disabled=false, label, icon, link }: Args) => {
  const router = useRouter();
  const path = usePathname();
  const isActive = link === "/" + path.split("/")[1];
  const handleNavigation = () => {
    if (isActive) {
      router.push("/");
    } else {
      router.push(link);
    }
  };

  return (
    // <TooltipProvider>
    //   <Tooltip>
    //     <TooltipTrigger>
    <Button
      disabled={disabled}
      size="icon"
      onClick={handleNavigation}
      className={`${isActive && "opacity-40"} ${disabled && 'text-slate-700'}`}
    >
      {icon}
    </Button>
    //     </TooltipTrigger>
    //     <TooltipContent>{label}</TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
  );
};
