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
import { BlogSection } from "@/components/moleculs/blog-section";
import { FloatingAudio } from "@/components/floating-audio";
import { notFound } from "next/navigation";
import { MapPin, Landmark } from "lucide-react";
import { BuildingCard } from "@/components/elements/building-card";
import {
  getAllBuildings,
  getBuildingById,
} from "@/servers/actions/buildings/actions";
import { getUrlFileImageBuilding } from "@/lib/supabase";

export default async function DetailBuilding({
  params,
}: {
  params: Promise<{ bangunanId: string }>;
}) {
  const { bangunanId } = await params;

  const detailBuilding = await getBuildingById(bangunanId);

  console.log(detailBuilding);

  if (!detailBuilding) {
    notFound();
  }

  const allBuildings = await getAllBuildings();
  const relatedBuildings = allBuildings
    .filter((building) => building.id !== detailBuilding.id)
    .slice(0, 3);

  return (
    <>
      <header className="w-full">
        <div className="w-full relative pb-20 md:pb-32 bg-white">
          <Image
            src={getUrlFileImageBuilding(detailBuilding.image)}
            fill
            style={{ objectFit: "cover" }}
            alt={detailBuilding.name}
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
                  <BreadcrumbLink href="/bangunan">Bangunan</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{detailBuilding?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-4 relative z-30 py-10 md:p-16 mt-16 mx-auto w-fit flex items-start">
            <div className="w-full md:w-[700px] mx-auto text-center grid gap-5">
              <BlurFade delay={0.5}>
                <h1 className="font-normal text-6xl md:text-[100px] leading-[90%] font-italianno text-white">
                  {detailBuilding?.name}
                </h1>
              </BlurFade>
              <BlurFade delay={0.75}>
                <p className="text-base md:text-[20px] line-clamp-2 leading-relaxed font-normal font-jakarta-sans text-white/80">
                  {detailBuilding?.description}
                </p>
              </BlurFade>

              <div className="w-fit flex mx-auto gap-10 items-center justify-between text-white/80">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{detailBuilding?.location}</span>
                </div>
                <div className="flex items-center">
                  <Landmark className="w-4 h-4 mr-1" />
                  <span>{detailBuilding?.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="w-full px-5 md:px-[300px] max-w-[1440px] mx-auto pt-8 md:pt-16 grid gap-12">
        <p className="text-base md:text-[20px] leading-relaxed font-normal font-jakarta-sans text-white/80">
          {detailBuilding.description}
        </p>

        {detailBuilding.blogSections.map((section) => (
          <BlogSection
            key={section.id}
            title={section.title}
            content={section.content}
          />
        ))}
      </section>

      <Separator className="my-12" />

      <section className="w-full px-5 md:px-[300px] max-w-[1440px] mx-auto pb-20 md:pb-[100px]">
        <h3 className="font-normal font-italianno text-[40px] leading-[120%] md:text-[64px] text-white">
          Bangunan Terkait
        </h3>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {relatedBuildings.map((building) => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      </section>

      {!detailBuilding.description ? (
        ""
      ) : (
        <FloatingAudio textToRead={detailBuilding.description} />
      )}

      <Footer />
    </>
  );
}
