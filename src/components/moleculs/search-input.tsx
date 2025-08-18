import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative w-full bg-white rounded-md">
      <Input
        className="min-h-16 placeholder:text-base text-base font-normal px-4 text-gray-900 pr-12"
        placeholder="Cari makanan"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute bg-[#7b3636] hover:bg-[#672929] right-2 top-1/2 ml-auto w-fit -translate-y-1/2 rounded-md px-4 text-white !h-12"
      >
        <Search className="h-5 w-5" />
        Cari Makanan
      </Button>
    </div>
  );
}
