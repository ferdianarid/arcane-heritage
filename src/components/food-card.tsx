"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ConciergeBell } from "lucide-react";
import Image from "next/image";
import { AudioPlayer } from "./audio-player";
import Link from "next/link";

interface FoodItem {
  name: string;
  image: string;
  location: string;
  reviews: number;
  category: string;
}

interface FoodCardProps {
  food: FoodItem;
}

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <Card className="w-full mx-auto !py-0 !rounded-md !gap-0 border-none bg-[#121212]">
      <div className="w-full p-4 bg-[#121212]">
        <div className="w-full h-[200px] relative">
          <Image
            src={food.image}
            fill
            className="rounded-md"
            style={{ objectFit: "cover" }}
            alt={food.name}
          />
        </div>
      </div>

      <CardContent className="!p-0">
        <div className="p-5 w-full flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{food.name}</h3>

            <div className="flex items-center justify-between mb-4 text-sm text-white/70">
              <div className="flex items-center flex-wrap gap-3 w-full space-x-6">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{food.location}</span>
                </div>
                <div className="flex items-center">
                  <ConciergeBell className="w-4 h-4 mr-1" />
                  <span>{food.category}</span>
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
                        i < Math.floor(food.reviews)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-white/70">
                    ({food.reviews.toFixed(1)})
                  </span>
                </div>
              </div>
              <div className="text-right">
                <AudioPlayer textToRead={food.name} />
              </div>
            </div>
          </div>

          <Link href="/makanan/220" className="mt-auto">
            <Button className="w-full bg-[#7b3636] hover:bg-[#672929] text-white font-semibold !py-5 rounded-md shadow-md transform hover:scale-[1.02] transition-all duration-200">
              Pelajari
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
