import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { QuizCategoryCardProps } from "@/types";

export const QuizCategoryCard = ({ name, href }: QuizCategoryCardProps) => {
  return (
    <Link href={href as string} className="group">
      <Card className="flex relative overflow-hidden w-full flex-col items-center justify-center text-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 h-[200px] transition-colors duration-300 backdrop-blur-sm">
        <div className="w-full h-[300px] bg-gray-500"></div>

        <div className="absolute inset-0 bg-black/50 group-hover:backdrop-blur-[4px] z-10"></div>
        <CardContent className="p-0 mt-2 relative z-20 grid gap-2">
          <CardTitle className="text-2xl font-semibold text-white">
            {name}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
};
