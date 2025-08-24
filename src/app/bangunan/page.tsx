import Image from "next/image";
import Navbar from "@/components/navbar";
import { BlurFade } from "@/components/magicui/blur-fade";
import SearchInput from "@/components/moleculs/search-input";
import Footer from "@/components/footer";
import { BuildingList } from "@/components/buildings/building-list";

export default function Bangunan() {
  return (
    <header className="w-full">
      <div className="w-full relative pb-20 md:pb-32 bg-white">
        <Image
          src="/assets/images/buildings/kota-lama.jpeg"
          fill
          style={{ objectFit: "cover" }}
          alt="makanan"
        />

        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black to-transparent z-10"></div>

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>
        <Navbar />

        <div className="z-10 px-4 relative md:p-16 mt-16 mx-auto w-fit">
          <div className="w-full md:w-[70%] mx-auto text-center grid gap-2">
            <BlurFade delay={0.5}>
              <h1 className="font-normal text-7xl md:text-[140px] leading-[90%] font-italianno text-white">
                Bangunan Tradisional
              </h1>
            </BlurFade>
            <BlurFade delay={0.75}>
              <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
                panduan digital Anda untuk menjelajahi kekayaan budaya di setiap
                penjuru Nusantara. Temukan kisah dan tradisi tersembunyi yang
                membentuk identitas bangsa.
              </p>
            </BlurFade>
          </div>
          <BlurFade delay={1} className="mt-8">
            <div className="w-full md:w-[700px] relative z-50 mt-8 md:mt-0 px-4 md:px-0 mx-auto">
              <SearchInput type="bangunan" />
            </div>
          </BlurFade>
        </div>
      </div>

      <BuildingList />

      <Footer />
    </header>
  );
}
