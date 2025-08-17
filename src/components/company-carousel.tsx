"use client";

import Image from "next/image";
import { Marquee } from "./magicui/marquee";
import { companyList } from "@/data/company";

export function CompanyCarousel() {
  return (
    <div className="w-full mt-20">
      <Marquee className="[--duration:20s] [--gap:2rem]">
        {companyList.map((item, index) => (
          <div key={index} className="w-[224px] h-12 relative flex-shrink-0">
            <Image
              src={`/assets/images/company/${item.image}.svg`}
              alt={item.name.toLowerCase()}
              fill
              className="rounded-t-xl"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
