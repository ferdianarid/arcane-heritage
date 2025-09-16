import Image from "next/image";
import Navbar from "@/components/navbar";
import { BlurFade } from "@/components/magicui/blur-fade";
import SearchInput from "@/components/moleculs/search-input";
import { FilterAndSort } from "@/components/select-filter";
import Footer from "@/components/footer";
import { getAllFoods } from "@/servers/actions/foods/actions";

export default async function Makanan() {
  const foods = await getAllFoods();
  console.log(foods);
  return (
    <header className="w-full">
      <div className="w-full relative pb-20 md:pb-32 bg-white">
        <Image
          src="/assets/images/makanan-cover.png"
          fill
          style={{ objectFit: "cover" }}
          alt="makanan"
        />
        <Navbar />

        <div className="z-10 px-4 md:p-16 mt-16 mx-auto w-fit flex items-end">
          <div className="w-full md:w-[70%] mx-auto text-center grid gap-2">
            <BlurFade delay={0.5}>
              <h1 className="font-normal text-7xl md:text-[140px] leading-[90%] font-italianno text-white">
                Makanan Tradisional
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
        </div>

        <BlurFade delay={1}>
          <div className="w-full md:w-[700px] relative z-10 mt-8 md:mt-0 px-4 md:px-0 mx-auto">
            <SearchInput type="makanan" />
          </div>
        </BlurFade>
      </div>

      <FilterAndSort foods={foods} />

      <Footer />
    </header>
  );
}
