"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, School, Landmark } from "lucide-react";
import Image from "next/image";
import { AudioPlayer } from "@/components/audio-player";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getUrlFileImageBuilding } from "@/lib/supabase";
import { Lens } from "../magicui/lens";

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
  return (
    <Card className="w-full mx-auto !py-0 !rounded-md !gap-0 border-none bg-[#121212]">
      <Dialog>
        <div className="w-full p-4 bg-[#121212]">
          <Lens
            zoomFactor={2}
            lensSize={150}
            isStatic={false}
            ariaLabel="Zoom Area"
          >
            <div className="w-full h-[200px] relative">
              <Image
                src={getUrlFileImageBuilding(building.image)}
                fill
                className="rounded-md"
                style={{ objectFit: "cover" }}
                alt={building.name}
              />
            </div>
          </Lens>
        </div>

        <CardContent className="!p-0 h-full">
          <div className="p-5 w-full flex flex-col justify-between h-full">
            <div className="h-fit flex-grow">
              <h3 className="text-xl font-bold text-white mb-4">
                {building.name}
              </h3>

              <div className="flex items-center justify-between mb-4 text-sm text-white/70">
                <div className="flex items-center flex-wrap gap-3 w-full space-x-6">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{building.location}</span>
                  </div>
                  <div className="flex items-center">
                    <School className="w-4 h-4 mr-1" />
                    <span>{building.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-5 mb-6">
                <div>
                  <p className="text-sm text-white/70 mb-2">By Administrator</p>
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
                    <span className="ml-2 text-sm text-white/70">
                      ( {building.reviews} reviews )
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <AudioPlayer textToRead={building.name} />
                </div>
              </div>
            </div>
            <div className="w-full grid gap-2">
              <DialogTrigger asChild>
                <Button className="w-full bg-[#252525] hover:bg-[#222222] text-white font-semibold !py-3 rounded-md shadow-md transform hover:scale-[1.02] transition-all duration-200">
                  Preview
                </Button>
              </DialogTrigger>
              <Link href={`/bangunan/${building.id}`} className="mt-auto">
                <Button className="w-full bg-[#7b3636] hover:bg-[#672929] text-white font-semibold !py-3 rounded-md shadow-md transform hover:scale-[1.02] transition-all duration-200">
                  Pelajari
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
        <DialogContent className="sm:max-w-md !p-0">
          <DialogHeader className="p-6 pb-0 !gap-0">
            <div className="w-full h-48 relative mb-4">
              <Image
                src={getUrlFileImageBuilding(building.image)}
                fill
                className="rounded-md"
                style={{ objectFit: "cover" }}
                alt={building.name}
              />
            </div>
            <div className="w-full flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{building.rating}</span>
              </div>
              <div className="flex items-center text-sm text-white/70 gap-2">
                <span>( {building.reviews} Reviews )</span>
              </div>
            </div>
            <DialogTitle className="text-white text-2xl">
              {building.name}
            </DialogTitle>
            <DialogDescription className="text-white/70 leading-normal tracking-wide">
              {building.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid mb-2 gap-4 py-4 text-white px-4 md:px-6">
            <div className="w-full flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">{building.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                <span className="font-semibold">{building.category}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
