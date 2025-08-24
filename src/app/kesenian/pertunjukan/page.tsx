import Navbar from "@/components/navbar";
import { BlurFade } from "@/components/magicui/blur-fade";
import Footer from "@/components/footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SeniPertunjukanCard } from "@/components/elements/seni-pertunjukan-card";
import { seniPertunjukan } from "@/data/kesenian";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";

export default function SeniPertunjukan() {
  return (
    <header className="w-full">
      <div className="w-full relative pb-20 md:pb-32 bg-black">
        <Navbar />

        <div className="w-full px-5 md:px-24 max-w-[1440px] mx-auto relative z-10 mt-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/kesenian">Kesenian</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Seni Pertunjukan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="z-10 px-4 relative md:p-16 mx-auto w-fit">
          <div className="w-[40rem] mx-auto h-16 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px w-1/4" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
          <div className="w-full md:w-[70%] mx-auto text-center grid gap-2">
            <BlurFade delay={0.5}>
              <h1 className="font-normal text-5xl md:text-[80px] leading-[90%] font-italianno text-white">
                Seni Pertunjukan
              </h1>
            </BlurFade>
            <BlurFade delay={0.75}>
              <p className="text-base md:text-lg leading-relaxed font-normal font-jakarta-sans text-white/80">
                Seni yang melibatkan tindakan langsung oleh seorang seniman atau
                kelompok seniman di hadapan penonton.
              </p>
            </BlurFade>
          </div>
        </div>

        <section className="grid grid-cols-1 max-w-[1440px] mx-auto mt-6 md:mt-0 sm:grid-cols-2 w-full px-6 md:px-20 lg:grid-cols-2 gap-5 md:gap-8">
          {seniPertunjukan.map((category, index) => (
            <BlurFade key={category.id} delay={1 + index * 0.25}>
              <SeniPertunjukanCard {...category} />
            </BlurFade>
          ))}
        </section>
      </div>

      <Footer />
    </header>
  );
}
