import { LucideEdit, Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/utils";

type Props = {
  heading: string;
  searchMetarials: {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
  };
};

export const SidebarHeader = ({ heading, searchMetarials }: Props) => {
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <div className="flex flex-col border-b-[0.1px] py-2 gap-3 px-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-[500] tracking-normal">{heading}</h3>
        <Button variant="ghost" size="icon">
          <LucideEdit size={20} />
        </Button>
      </div>
      <div
        className={cn(
          "border-[1px] border-gray-300 rounded-2xl flex items-center px-2",
          searchFocus && "ring-1 ring-ring"
        )}
      >
        <Input
          type="text"
          name="search"
          value={searchMetarials.searchValue}
          placeholder="Search"
          onBlur={() => setSearchFocus(false)}
          onFocus={() => setSearchFocus(true)}
          onChange={(e) =>
            searchMetarials.setSearchValue(e.currentTarget.value)
          }
          className="border-0 focus-visible:ring-0 shadow-none"
        />
        <Button
          variant="ghost"
          size="icon"
          disabled={!searchMetarials.searchValue}
          className="rounded-lg"
        >
          <Search size={16} />
        </Button>
      </div>
    </div>
  );
};
