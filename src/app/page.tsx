import { AudioPlayer } from "@/components/audio-player";
import { MarqueeCarousel } from "@/components/card-carousel";
import { CompanyCarousel } from "@/components/company-carousel";
import Footer from "@/components/footer";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Circle, DiamondIcon, DiamondPlusIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="w-full md:min-h-[864px] pb-24 relative">
        <Navbar />
        <Image
          src="/assets/images/hero.png"
          fill
          className="hidden md:block"
          style={{ objectFit: "cover", backgroundPosition: "left center" }}
          alt="hero"
        />
        <Image
          src="/assets/images/mobile-hero.png"
          fill
          className="block md:hidden"
          style={{ objectFit: "cover", backgroundPosition: "left center" }}
          alt="hero"
        />

        <div className="w-full md:w-[1000px] px-4 md:px-0 pt-[100px] relative z-10 mx-auto flex flex-col items-center justify-center gap-4">
          <h1 className="font-normal text-6xl md:text-[140px] leading-[90%] text-center font-italianno">
            Membuka Tabir Warisan Tersembunyi Nusantara
          </h1>
          <p className="text-base md:text-[24px] leading-relaxed text-center font-normal font-jakarta-sans text-white/80">
            panduan digital Anda untuk menjelajahi kekayaan budaya di setiap
            penjuru Nusantara. Temukan kisah dan tradisi tersembunyi yang
            membentuk identitas bangsa.
          </p>

          <Button
            variant="default"
            className="min-h-14 md:min-h-16 text-white hover:cursor-pointer hover:bg-amber-900 mt-10 px-12 bg-amber-700 font-medium font-jakarta-sans text-xl"
          >
            Jelajah Sekarang
          </Button>
        </div>
        <MarqueeCarousel />
      </header>

      <section className="w-full py-10 md:py-20 max-w-[1440px] mx-auto">
        <div className="w-full md:w-[700px] text-center mx-auto grid gap-3">
          <h2 className="font-italianno leading-[100%] text-[56px] md:text-[80px] text-white">
            Telusuri Warisan Nusantara
          </h2>
          <p className="text-[20px] leading-relaxed font-normal text-white/80">
            Telusuri kekayaan budaya Indonesia di setiap provinsi. Temukan
            cerita dan tradisi unik yang membentuk identitas bangsa.
          </p>
        </div>

        <div className="w-full md:max-w-[1024px] px-6 md:px-0 mt-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="overflow-hidden flex flex-col justify-between relative h-[500px] md:h-[700px] rounded-xl dark:bg-black/40">
                <Image
                  src="/assets/images/bali.png"
                  alt="Bali, Indonesia"
                  fill
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                <div className="p-6 relative z-10 mt-auto">
                  <div className="p-0 grid gap-1">
                    <h3 className="text-[56px] md:text-[72px] font-italianno leading-[100%] text-white">
                      Bali, Indonesia
                    </h3>
                    <p className="text-base md:text-xl leading-relaxed text-gray-300">
                      Bali adalah salah satu provinsi yang ada di Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-12">
              <div className="overflow-hidden flex flex-col justify-between relative flex-1 rounded-xl dark:bg-black/40">
                <Image
                  src="/assets/images/tari.png"
                  alt="Tari Tradisional"
                  fill
                  className="rounded-t-xl"
                />
                <div className="p-6 relative z-10 mt-auto">
                  <div className="p-0 grid gap-1">
                    <h3 className="text-[56px] md:text-[72px] font-italianno leading-[100%] text-white">
                      Tari Tradisional
                    </h3>
                    <p className="text-base md:text-xl leading-relaxed text-gray-300">
                      Tari tradisional adalah salah satu kesenian
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden flex flex-col justify-between relative flex-1 rounded-xl dark:bg-black/40">
                <Image
                  src="/assets/images/temple.png"
                  alt="Candi Peninggalan"
                  fill
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                <div className="p-6 relative z-10 mt-auto">
                  <div className="p-0 grid gap-1">
                    <h3 className="text-[56px] md:text-[72px] font-italianno leading-[100%] text-white">
                      Peninggalan Candi
                    </h3>
                    <p className="text-base md:text-xl leading-relaxed text-gray-300">
                      Candi adalah bangunan peninggalan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:max-w-[1600px] mx-auto">
        <div className="w-full relative h-[500px] md:h-[828px] flex flex-col justify-between">
          <Image
            src="/assets/images/borobudur.png"
            style={{ objectFit: "cover" }}
            fill
            className="hidden md:block"
            alt="borobudur"
          />

          <Image
            src="/assets/images/borobudur-mobile.png"
            style={{ objectFit: "cover" }}
            fill
            className="block md:hidden"
            alt="borobudur"
          />

          <div className="w-fit grid relative z-10 px-6 md:px-20 mt-auto">
            <h3 className="font-italianno leading-[100%] text-[56px] md:text-[200px] text-white">
              Candi Borobudur
            </h3>
            <p className="text-base md:text-[24px] line-clamp-3 md:line-clamp-none leading-[180%] tracking-wide font-normal font-jakarta-sans text-white/80">
              Borobudur is a magnificent 9th-century Mahayana Buddhist temple in
              Central Java, Indonesia. As the world&lsquo;s largest Buddhist
              temple, it&lsquo;s a monumental structure built with two million
              stone blocks and recognized as a UNESCO World Heritage site. The
              temple features nine stacked platforms—six square and three
              circular—topped by a central dome.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full pt-10 pb-20 md:pt-20 md:pb-32">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <ScrollVelocityContainer className="text-4xl md:text-7xl md:leading-[5rem] font-bold tracking-[-0.02em]">
            <ScrollVelocityRow
              className="text-[48px] md:text-[90px] leading-normal"
              baseVelocity={5}
              direction={1}
            >
              <DiamondPlusIcon /> &nbsp;Lestarikan Budaya Indonesia&nbsp;
            </ScrollVelocityRow>
            <ScrollVelocityRow
              className="text-[48px] md:text-[90px] leading-normal"
              baseVelocity={5}
              direction={-1}
            >
              <DiamondPlusIcon /> &nbsp;Beragam Tradisi Nusantara&nbsp;
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </section>

      <Footer />
    </>
  );
}
