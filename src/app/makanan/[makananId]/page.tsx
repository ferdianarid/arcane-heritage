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

export default function DetailMakanan() {
  return (
    <>
      <header className="w-full">
        <div className="w-full relative pb-20 md:pb-20 bg-white">
          <Image
            src="/assets/images/makanan-cover.png"
            fill
            style={{ objectFit: "cover" }}
            alt="makanan"
          />
          <Navbar />

          <div className="w-full px-5 md:px-24 relative z-10 mt-8">
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
                  <BreadcrumbPage>Gudeg Jogja</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="z-10 px-4 py-10 md:p-16 mt-16 mx-auto w-fit flex items-start">
            <div className="w-full md:w-[700px] mx-auto text-center grid gap-5">
              <BlurFade delay={0.5}>
                <h1 className="font-normal text-6xl md:text-[140px] leading-[90%] font-italianno text-white">
                  Gudeg Jogja
                </h1>
              </BlurFade>
              <BlurFade delay={0.75}>
                <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
                  Gudeg Jogja: Manisnya Warisan Kuliner Yogyakarta
                </p>
              </BlurFade>
            </div>
          </div>
        </div>
      </header>

      <section className="w-full px-5 md:px-[300px] max-w-[1440px] mx-auto pt-8 md:pt-16 grid gap-12">
        <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
          Gudeg, si manis dari Yogyakarta, bukan hanya sekadar makanan. Ia
          adalah cerminan budaya, sejarah, dan filosofi Jawa yang kaya. Makanan
          ini telah menjadi ikon kuliner yang tak terpisahkan dari kota
          istimewa, menarik wisatawan dari seluruh penjuru dunia untuk mencicipi
          keunikannya.
        </p>

        <BlogSection
          title="Sekilas tentang Gudeg Jogja"
          content="Gudeg adalah hidangan yang terbuat dari nangka muda (disebut juga gori) yang dimasak dengan santan dan bumbu rempah selama berjam-jam. Proses memasak yang lama inilah yang memberikan gudeg tekstur lembut dan rasa yang sangat khas."
        />

        <BlogSection
          title="Bahan Dasar & Ciri Khas Pengolahan"
          content="Gudeg terbuat dari nangka muda yang dimasak dengan santan kelapa, gula aren, dan rempah-rempah. Ciri khasnya adalah proses memasak yang sangat lama (slow-cooked), yang membuat tekstur nangka menjadi sangat lembut dan bumbu meresap sempurna. Ini berbeda dari hidangan nangka lain yang dimasak lebih cepat."
        />

        <BlogSection
          title="Tradisi Penyajian & Lauk Pendamping"
          content="Gudeg tidak disajikan sendirian. Hidangan ini biasanya ditemani oleh lauk pendamping yang menjadi satu kesatuan, seperti nasi, ayam opor, telur pindang, dan sambal goreng krecek. Tradisi penyajian ini menunjukkan bahwa gudeg adalah hidangan komplit dengan kombinasi rasa dan tekstur yang kaya."
        />
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

      <Footer />
    </>
  );
}
