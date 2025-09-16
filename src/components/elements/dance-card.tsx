"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, School, Landmark, Users, Timer } from "lucide-react";
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
import { DanceItem } from "@/types";

interface DanceCardProps {
  dance: DanceItem;
}

export const DanceCard = ({ dance }: DanceCardProps) => {
  return (
    <Card className="w-full mx-auto !py-0 !rounded-md !gap-0 border-none bg-[#121212]">
      <Dialog>
        <div className="w-full p-4 bg-[#121212]">
          <div className="w-full h-[200px] relative">
            <Image
              src={dance.image}
              fill
              className="rounded-md"
              style={{ objectFit: "cover" }}
              alt={dance.name}
            />
          </div>
        </div>

        <CardContent className="!p-0 h-full">
          <div className="p-5 w-full flex flex-col justify-between h-full">
            <div className="h-fit flex-grow">
              <div className="w-full flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{dance.name}</h3>
                <AudioPlayer textToRead={dance.name} />
              </div>

              <div className="flex items-center justify-between mb-4 text-sm text-white/70">
                <div className="flex items-center flex-wrap gap-3 w-full space-x-6">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{dance.location}</span>
                  </div>
                  <div className="flex items-center">
                    <School className="w-4 h-4 mr-1" />
                    <span>{dance.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{dance.dancers}</span>
                  </div>
                  <div className="flex items-center">
                    <Timer className="w-4 h-4 mr-1" />
                    <span>{dance.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid gap-2">
              <DialogTrigger asChild>
                <Button className="w-full !py-3 bg-[#252525] hover:bg-[#222222] text-white font-semibold rounded-md shadow-md transform hover:scale-[1.02] transition-all duration-200">
                  Preview
                </Button>
              </DialogTrigger>
              <Link
                href={`/kesenian/pertunjukan/tari-tradisional/${dance.id}`}
                className="mt-auto"
              >
                <Button className="w-full !py-3 bg-[#7b3636] hover:bg-[#672929] text-white font-semibold rounded-md shadow-md transform hover:scale-[1.02] transition-all duration-200">
                  Pelajari
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
        <DialogContent className="sm:max-w-md !p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="w-full h-48 relative mb-4">
              <Image
                src={dance.image}
                fill
                className="rounded-md"
                style={{ objectFit: "cover" }}
                alt={dance.name}
              />
            </div>

            {/*  */}
            <DialogTitle className="text-white text-2xl">
              {dance.name}
            </DialogTitle>
            <DialogDescription className="text-white/70 leading-normal tracking-wide">
              {dance.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid mb-2 gap-4 py-4 text-white px-4 md:px-6">
            <div className="w-full flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">{dance.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                <span className="font-semibold">{dance.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">{dance.dancers}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span className="font-semibold">{dance.duration}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
