"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { danceData } from "@/data/dance";
import { DanceCard } from "../elements/dance-card";

export function DanceList() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const locations = useMemo(() => {
    const allLocations = danceData.map((building) => building.location);
    const uniqueLocations = [...new Set(allLocations)];
    return ["all", ...uniqueLocations];
  }, []);

  const filteredAndSortedDance = useMemo(() => {
    let result = [...danceData];

    if (selectedLocation !== "all") {
      result = result.filter(
        (building) => building.location === selectedLocation
      );
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [selectedLocation, sortOrder]);

  return (
    <div className="flex flex-col gap-8 w-full md:max-w-[1440px] mx-auto pt-12 md:pt-24 px-4 md:px-24">
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-fit ml-auto">
        <Select onValueChange={setSelectedLocation} value={selectedLocation}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Pilih Lokasi" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location === "all" ? "Semua Lokasi" : location}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="min-h-12">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Urutkan berdasarkan Nama
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuRadioGroup
              value={sortOrder}
              onValueChange={setSortOrder}
            >
              <DropdownMenuRadioItem value="asc">
                Nama (A-Z)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">
                Nama (Z-A)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5 pb-24">
        {filteredAndSortedDance.map((dance) => (
          <DanceCard key={dance.id} dance={dance} />
        ))}
      </div>
    </div>
  );
}
