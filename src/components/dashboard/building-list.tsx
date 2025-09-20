"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { PlusIcon, SlidersHorizontal } from "lucide-react";
import { Building } from "@/generated/prisma";
import { BuildingCard } from "./building-card";
import { Input } from "@/components/ui/input";
import { normalizeString, slugify, unslugify } from "@/helpers/string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddBuildingForm } from "../elements/forms/add-building";
import EmptyStateResult from "../elements/empty-state-result";

interface BuildingListProps {
  buildings: Building[];
}

export function BuildingListDashboard({ buildings = [] }: BuildingListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams?.toString() ?? ""),
    [searchParams]
  );

  const locationParam = params.get("location") || "all";
  const sortParam = params.get("sortBy") || "asc";
  const searchParam = params.get("search") || "";

  const [searchInput, setSearchInput] = useState(searchParam);
  const [isAddBuildingModal, setIsAddBuildingModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newParams = new URLSearchParams(params.toString());

      if (searchInput.trim() === "") {
        newParams.delete("search");
      } else {
        newParams.set("search", searchInput);
      }

      router.push(`?${newParams.toString()}`);
    }, 200);

    return () => clearTimeout(timeout);
  }, [params, router, searchInput]);

  const setQueryParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (value === "all" || value === "" || value === "asc") {
      newParams.delete(key);
    } else {
      newParams.set(key, slugify(value));
    }

    router.push(`?${newParams.toString()}`);
  };

  const locations = useMemo(() => {
    const allLocations = buildings.map((building) => building.location);
    const uniqueLocations = [...new Set(allLocations)];
    return ["all", ...uniqueLocations];
  }, [buildings]);

  const filteredAndSortedBuildings = useMemo(() => {
    let result = [...buildings];

    if (searchParam) {
      result = result.filter(
        (building) =>
          building.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          building.description
            ?.toLowerCase()
            .includes(searchParam.toLowerCase())
      );
    }

    if (locationParam !== "all") {
      const normalizedLocationParam = normalizeString(unslugify(locationParam));

      result = result.filter(
        (building) =>
          normalizeString(building.location ?? "") === normalizedLocationParam
      );
    }

    if (sortParam === "asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortParam === "desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [buildings, searchParam, locationParam, sortParam]);

  const handleClearSearch = () => {
    setSearchInput("");
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("search");
    router.push(`?${newParams.toString()}`);
  };

  const handleAddBuilding = () => {
    setIsAddBuildingModal(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-fit grid gap-1">
          <h1 className="font-bold text-white text-2xl">Bangunan</h1>
          <p className="text-sm leading-relaxed font-normal font-jakarta-sans text-white/70">
            Bangunan-bangunan bersejarah yang ada di Indonesia
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-fit ml-auto">
          <Input
            type="text"
            placeholder="Cari bangunan..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full md:w-[220px] min-h-12 bg-[#1c1c1c] text-white border"
          />

          <Select
            onValueChange={(val) => setQueryParam("location", val)}
            value={locationParam}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Pilih Lokasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locations.map((location) => (
                  <SelectItem key={location} value={slugify(location)}>
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
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup
                value={sortParam}
                onValueChange={(val) => setQueryParam("sortBy", val)}
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

          <Dialog
            open={isAddBuildingModal}
            onOpenChange={setIsAddBuildingModal}
          >
            <DialogTrigger asChild>
              <Button className="min-h-12 bg-green-600 text-white font-medium hover:bg-green-700">
                <PlusIcon />
                Add Building
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="">
                <DialogTitle className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                  Add new Building
                </DialogTitle>
                <DialogDescription className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                  Lets add new building
                </DialogDescription>
              </DialogHeader>
              <AddBuildingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <p className="text-sm font-normal text-white/70">
        Menampilkan{" "}
        <span className="font-bold text-white">
          {filteredAndSortedBuildings.length}
        </span>{" "}
        data Building
      </p>

      {filteredAndSortedBuildings.length === 0 ? (
        <EmptyStateResult
          searchQuery={searchParam}
          onAddItem={handleAddBuilding}
          onClearSearch={handleClearSearch}
          category="building"
        />
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5 pb-24">
          {filteredAndSortedBuildings.map((item) => (
            <BuildingCard key={item.id} building={item} />
          ))}
        </div>
      )}
    </div>
  );
}
