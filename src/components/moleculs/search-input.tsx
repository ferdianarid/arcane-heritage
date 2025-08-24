"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearchStore } from "@/store/search";

interface SearchInputProps {
  type: "makanan" | "bangunan" | "tari tradisional";
}

export default function SearchInput({ type }: SearchInputProps) {
  const setQuery = useSearchStore((state) => state.setQuery);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = (form.elements.namedItem("search") as HTMLInputElement).value;
    setQuery(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full bg-white rounded-md"
    >
      <Input
        id="search"
        name="search"
        className="min-h-16 placeholder:text-base text-base font-normal px-4 text-gray-900 pr-12"
        placeholder={`Cari ${type}`}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute bg-[#7b3636] hover:bg-[#672929] right-2 top-1/2 ml-auto w-fit -translate-y-1/2 rounded-md px-4 text-white !h-12"
      >
        <Search className="h-5 w-5 mr-2" />
        {`Cari ${type}`}
      </Button>
    </form>
  );
}
