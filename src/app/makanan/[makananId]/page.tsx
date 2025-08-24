// app/DetailMakanan/page.tsx
import { FoodCard } from "@/components/food-card";
import Footer from "@/components/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { foodData } from "@/data/foods-and-drinks";
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
import { ConciergeBell, MapPin } from "lucide-react";

interface DetailMakananProps {
  params: {
    makananId: string;
  };
}

const getMakananById = async (id: string) => {
  const makanan = foodData;
  return makanan.find((food) => food.id.toString() === id);
};

export default async function DetailMakanan({ params }: DetailMakananProps) {
  const { makananId } = await params;

  const detailMakanan = await getMakananById(makananId);

  if (!detailMakanan) {
    notFound();
  }
  return (
    <>
      <header className="w-full">
        <div className="w-full relative pb-20 md:pb-32 bg-white">
          <Image
            src={detailMakanan.image}
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
                  <BreadcrumbPage>{detailMakanan?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-4 relative z-30 py-10 md:p-16 mt-16 mx-auto w-fit flex items-start">
            <div className="w-full md:w-[700px] mx-auto text-center grid gap-5">
              <BlurFade delay={0.5}>
                <h1 className="font-normal text-6xl md:text-[140px] leading-[90%] font-italianno text-white">
                  {detailMakanan?.name}
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
                  <span>{detailMakanan?.location}</span>
                </div>
                <div className="flex items-center">
                  <ConciergeBell className="w-4 h-4 mr-1" />
                  <span>{detailMakanan?.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="w-full px-5 md:px-[300px] max-w-[1440px] mx-auto pt-8 md:pt-16 grid gap-12">
        <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
          {detailMakanan.description}
        </p>

        {detailMakanan.foodSections &&
          detailMakanan.foodSections.map((section, index) => (
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
          Makanan Terkait yang Wajib Dicoba di Yogyakarta
        </h3>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {foodData.slice(0, 3).map((food) => (
            <FoodCard key={food.name} food={food} />
          ))}
        </div>
      </section>

      <FloatingAudio
        textToRead="Gudeg, si manis dari Yogyakarta, bukan hanya sekadar makanan. Ia
          adalah cerminan budaya, sejarah, dan filosofi Jawa yang kaya. Makanan
          ini telah menjadi ikon kuliner yang tak terpisahkan dari kota
          istimewa, menarik wisatawan dari seluruh penjuru dunia untuk mencicipi
          keunikannya."
      />

      <Footer />

      {/* <SpeakDock /> */}
    </>
  );
}
