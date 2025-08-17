"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Marquee } from "./magicui/marquee";

import { carouselData } from "@/data/carousel";

export function MarqueeCarousel() {
  return (
    <div className="w-full mt-20 max-w-[1800px] mx-auto">
      <Marquee className="[--duration:20s] [--gap:2rem]">
        {carouselData.map((item, index) => (
          <div
            key={index}
            className="w-[250px] md:w-[300px] p-2 bg-white/10 rounded-xl backdrop-blur-2xl flex-shrink-0"
          >
            <Card className="overflow-hidden relative h-[300px] md:h-[449px] rounded-xl dark:bg-black/40">
              <Image
                src={item.image}
                alt={item.title}
                fill
                objectFit="cover"
                className="rounded-t-xl"
              />
              <CardContent className="p-6 relative z-10 mt-auto">
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-semibold text-white">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="pt-2 text-sm text-gray-300">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </CardContent>
            </Card>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
