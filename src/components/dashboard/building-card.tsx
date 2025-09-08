/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  School,
  SquarePen,
  Trash2,
  TvMinimal,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { getUrlFileImageBuilding } from "@/lib/supabase";
import { Lens } from "../magicui/lens";
import FormUpdateBuilding from "../elements/forms/update-building";
import { Badge } from "../ui/badge";

interface BuildingItem {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string | null;
  rating: number | any;
  reviews: number | any;
  category: string | any;
}

interface BuildingCardProps {
  building: BuildingItem;
}

export const BuildingCard = ({ building }: BuildingCardProps) => {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  return (
    <Card className="w-full mx-auto !py-0 !rounded-2xl overflow-clip !gap-0 border-none bg-[#121212]">
      <div className="w-full p-4 bg-[#121212] cursor-pointer">
        <Lens
          zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
          <div className="w-full relative h-[180px]">
            <Image
              src={getUrlFileImageBuilding(building.image)}
              fill
              className="rounded-sm"
              style={{ objectFit: "cover" }}
              alt={building.name}
            />
          </div>
        </Lens>
      </div>

      <CardContent className="!p-0 h-full">
        <div className="p-5 pt-1 w-full flex flex-col justify-between h-full">
          <div className="w-full mb-3 flex items-center justify-between">
            <Badge className="flex items-center bg-yellow-400">
              <School className="w-4 h-4 mr-1" />
              <span className="font-medium">{building.category}</span>
            </Badge>

            <Button
              onClick={() => setOpenPreview(true)}
              className="bg-transparent hover:bg-[#202020]"
            >
              <TvMinimal className="text-white" />
              <p className="text-xs font-normal text-white">Preview</p>
            </Button>
          </div>
          <div className="h-fit flex-grow">
            <h3 className="text-xl capitalize tracking-wide font-bold text-white mb-4">
              {building.name}
            </h3>

            <div className="flex items-center justify-between mb-4 text-sm text-white/70">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{building.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 mb-6">
              <div>
                <p className="text-xs text-white/70 mb-2">By Administrator</p>
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(building.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-white/70">
                    ( {building.reviews} reviews )
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid gap-2">
            <Button
              onClick={() => setOpenUpdate(true)}
              className="w-full bg-[#252525] hover:bg-[#222222] text-white font-semibold !py-5 rounded-md shadow-md transform hover:scale-[1.02] transition-all duration-200"
            >
              <SquarePen />
              Update
            </Button>
            <Button
              onClick={() => setOpenDelete(true)}
              className="w-full bg-[#7b3636] hover:bg-[#672929] text-white font-semibold !py-5 rounded-md shadow-md transform hover:scale-[1.02] transition-all duration-200"
            >
              <Trash2 />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>

      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogContent className="w-full !bg-[#121212] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">{building.name}</DialogTitle>
            <DialogDescription className="leading-relaxed tracking-wide">
              {building.description}
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[200px] rounded-xl overflow-clip relative">
            <Image
              src={getUrlFileImageBuilding(building.image)}
              fill
              alt={building.name}
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{building.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="text-xs text-white/70 mb-2">By Administrator</p>
              <div className="flex items-center gap-[2px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(building.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-white/70">
                  ( {building.reviews} reviews )
                </span>
              </div>
            </div>
          </div>

          <div className="w-full grid gap-2">
            {" "}
            <h3 className="font-medium text-white text-sm">Deskripsi</h3>
            <p className="text-sm font-normal leading-relaxed tracking-wide text-white/60">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique dolor, eos suscipit neque velit voluptate quaerat vero
              ab qui repudiandae?
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
        <DialogContent className="sm:max-w-md !p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              Update Building
            </DialogTitle>
            <DialogDescription className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
              Lets update building data
            </DialogDescription>
          </DialogHeader>
          <FormUpdateBuilding building={building} />
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-bold">{building.name}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setOpenDelete(false)}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                setOpenDelete(false);
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
