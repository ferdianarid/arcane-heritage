import { FoodCard } from "@/components/food-card";
import Footer from "@/components/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FloatingAudio } from "@/components/floating-audio";
import { notFound } from "next/navigation";
import { ConciergeBell, MapPin } from "lucide-react";
import { getAllFoods, getFoodById } from "@/servers/actions/foods/actions";
import { getUrlFileImageFood } from "@/lib/supabase";

interface DetailFoodPrps {
  params: {
    makananId: string;
  };
}

export default async function DetailBuilding({ params }: DetailFoodPrps) {
  const { makananId } = params;

  const foodDetail = await getFoodById(makananId);

  console.log(foodDetail);

  if (!foodDetail) {
    notFound();
  }

  const allFoods = await getAllFoods();

  const relatedFoods = allFoods
    .filter((food) => food.id !== foodDetail.id)
    .slice(0, 3);

  return (
    <>
      <header className="w-full">
        <div className="w-full relative pb-20 md:pb-32 bg-white">
          <Image
            src={getUrlFileImageFood(foodDetail.image)}
            fill
            style={{ objectFit: "cover" }}
            alt="makanan"
          />

          <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black to-transparent z-10"></div>

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>

          <Navbar />

          <div className="w-full px-5 md:px-24 max-w-[1440px] mx-auto relative z-10 mt-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/makanan">Makanan</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{foodDetail?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-4 relative z-30 py-10 md:p-16 mt-16 mx-auto w-fit flex items-start">
            <div className="w-full md:w-[700px] mx-auto text-center grid gap-5">
              <BlurFade delay={0.5}>
                <h1 className="font-normal text-6xl md:text-[140px] leading-[90%] font-italianno text-white">
                  {foodDetail?.name}
                </h1>
              </BlurFade>
              <BlurFade delay={0.75}>
                <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
                  Gudeg Jogja: Manisnya Warisan Kuliner Yogyakarta
                </p>
              </BlurFade>

              <div className="w-fit flex mx-auto gap-10 items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{foodDetail?.location}</span>
                </div>
                <div className="flex items-center">
                  <ConciergeBell className="w-4 h-4 mr-1" />
                  <span>{foodDetail?.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="w-full px-5 md:px-[300px] max-w-[1440px] mx-auto pt-8 md:pt-16 grid gap-12">
        <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
          {foodDetail?.description}
        </p>
      </section>

      <Separator className="my-12" />

      <section className="w-full px-5 md:px-[300px] max-w-[1440px] mx-auto pb-20 md:pb-[100px]">
        <h3 className="font-normal font-italianno text-[40px] leading-[120%] md:text-[64px] text-white">
          Makanan Terkait yang Wajib Dicoba di Yogyakarta
        </h3>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {relatedFoods.slice(0, 3).map((food) => (
            <FoodCard key={food.name} food={food} />
          ))}
        </div>
      </section>

      {!foodDetail.description ? (
        ""
      ) : (
        <FloatingAudio textToRead={foodDetail.description} />
      )}

      <Footer />
    </>
  );
}
