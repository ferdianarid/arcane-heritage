"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { AudioPlayer } from "./audio-player";

export function SpeakDock() {
  return (
    <TooltipProvider>
      <Dock
        direction="middle"
        className="fixed bottom-5 left-1/2 !z-[999] -translate-x-1/2"
      >
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <AudioPlayer
                textToRead="Gudeg, si manis dari Yogyakarta, bukan hanya sekadar makanan. Ia
          adalah cerminan budaya, sejarah, dan filosofi Jawa yang kaya. Makanan
          ini telah menjadi ikon kuliner yang tak terpisahkan dari kota
          istimewa, menarik wisatawan dari seluruh penjuru dunia untuk mencicipi
          keunikannya."
              />
            </TooltipTrigger>
            <TooltipContent>
              <h2 className="font-medium">Speak</h2>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </TooltipProvider>
  );
}
