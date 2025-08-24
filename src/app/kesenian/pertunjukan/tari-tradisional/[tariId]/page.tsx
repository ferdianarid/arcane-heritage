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
import { danceData } from "@/data/dance";
import { DanceCard } from "@/components/elements/dance-card";

interface DetailTariProps {
  params: {
    tariId: string;
  };
}

const getTariTradisionalById = (id: string) => {
  const dance = danceData;
  return dance.find((item) => item.id.toString() === id);
};

export default function DetailTari({ params }: DetailTariProps) {
  const { tariId } = params;

  const detailTari = getTariTradisionalById(tariId);

  if (!detailTari) {
    notFound();
  }

  const relatedDance = danceData
    .filter((dance) => dance.id !== detailTari.id)
    .slice(0, 3);

  return (
    <>
      <header className="w-full">
        <div className="w-full relative pb-20 md:pb-32 bg-white">
          <Image
            src={detailTari.image}
            fill
            style={{ objectFit: "cover" }}
            alt={detailTari.name}
          />

          <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black to-transparent z-10"></div>

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>

          <Navbar />

          <div className="w-full px-5 md:px-24 max-w-[1440px] mx-auto relative z-10 mt-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/kesenian">Kesenian</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/kesenian/pertunjukan/tari-tradisional">
                    Tari Tradisional
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{detailTari?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-4 relative z-30 py-10 md:p-16 mt-16 mx-auto w-fit flex items-start">
            <div className="w-full md:w-[700px] mx-auto text-center grid gap-5">
              <BlurFade delay={0.5}>
                <h1 className="font-normal text-6xl md:text-[140px] leading-[90%] font-italianno text-white">
                  {detailTari?.name}
                </h1>
              </BlurFade>
              <BlurFade delay={0.75}>
                <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
                  {detailTari?.description}
                </p>
              </BlurFade>

              <div className="w-fit flex mx-auto gap-10 items-center justify-between text-white/80">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{detailTari?.location}</span>
                </div>
                <div className="flex items-center">
                  <Landmark className="w-4 h-4 mr-1" />
                  <span>{detailTari?.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="w-full px-5 md:px-[300px] max-w-[1440px] mx-auto pt-8 md:pt-16 grid gap-12">
        <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
          {detailTari.description}
        </p>

        {detailTari.blogSections &&
          detailTari.blogSections.map((section, index) => (
            <BlogSection
              key={index}
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
          {relatedDance.map((dance) => (
            <DanceCard key={dance.id} dance={dance} />
          ))}
        </div>
      </section>

      <FloatingAudio textToRead={detailTari.description} />

      <Footer />
    </>
  );
}
