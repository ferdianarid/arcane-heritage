import Navbar from "@/components/navbar";
import { BlurFade } from "@/components/magicui/blur-fade";
import Footer from "@/components/footer";
import { getAllCategories } from "@/servers/actions/quiz/actions";
import { QuizCategoryCard } from "@/components/elements/quiz-category-card";

export default async function QuizMainPage() {
  const quizCategory = await getAllCategories();

  return (
    <header className="w-full">
      <div className="w-full relative pb-20 md:pb-32 bg-black">
        <Navbar />

        <div className="z-10 px-4 relative md:p-16 mt-10 mx-auto w-fit">
          <div className="w-full md:w-[70%] mx-auto text-center grid gap-2">
            <BlurFade delay={0.5}>
              <h1 className="font-normal text-5xl md:text-[80px] leading-[90%] font-italianno text-white">
                Interactive Quiz
              </h1>
            </BlurFade>
            <BlurFade delay={0.75}>
              <p className="text-base md:text-lg leading-relaxed font-normal font-jakarta-sans text-white/80">
                Jendela menuju kekayaan seni dan budaya Indonesia. Mulai dari
                tarian dinamis hingga ukiran yang rumit, setiap bentuk seni
                memiliki cerita dan makna mendalam yang menunggu untuk Anda
                temukan.
              </p>
            </BlurFade>
          </div>
        </div>

        <section className="grid grid-cols-1 max-w-[1440px] mx-auto mt-6 md:mt-0 sm:grid-cols-2 w-full px-6 md:px-32 lg:grid-cols-2 gap-5 md:gap-8">
          {quizCategory.length > 0 ? (
            quizCategory.map((category, index) => (
              <BlurFade key={category.id} delay={1 + index * 0.25}>
                <QuizCategoryCard {...category} href={`/quiz/${category.id}`} />
              </BlurFade>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Belum ada quiz
              </h2>
              <p className="text-white/70 text-base md:text-lg">
                Quiz akan segera hadir, nantikan update selanjutnya!
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </header>
  );
}
