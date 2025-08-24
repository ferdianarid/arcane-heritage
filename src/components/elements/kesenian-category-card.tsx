import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { KesenianCategoryCardProps } from "@/types";

export const KesenianCategoryCard = ({
  title,
  description,
  href,
  coverImage,
}: KesenianCategoryCardProps) => {
  return (
    <Link href={href} className="group">
      <Card className="flex relative overflow-hidden w-full flex-col items-center justify-center text-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 h-[200px] transition-colors duration-300 backdrop-blur-sm">
        <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110">
          <Image
            src={coverImage}
            fill
            alt={title}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="absolute inset-0 bg-black/50 group-hover:backdrop-blur-[4px] z-10"></div>
        <CardContent className="p-0 mt-2 relative z-20 grid gap-2">
          <CardTitle className="text-2xl font-semibold text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-sm font-normal text-white/70">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
