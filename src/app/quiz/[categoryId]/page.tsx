import {
  getQuestionsByCategory,
  getQuizCategories,
} from "@/servers/actions/quiz/actions";
import QuizPlayer from "@/components/elements/quiz-player";
import { Question } from "@/types/quiz";

interface PageProps {
  params: { categoryId: string };
}

export default async function Page({ params }: PageProps) {
  const categoryId = params.categoryId;
  const categories = await getQuizCategories();
  const category = categories.find((c) => c.id === categoryId);
  const questions = await getQuestionsByCategory(categoryId);

  if (!category) return <p>Kategori tidak ditemukan.</p>;
  if (questions.length === 0)
    return <p>Tidak ada pertanyaan untuk kategori ini.</p>;

  const formattedQuestions: Question[] = questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
    answer: q.options.findIndex((opt) => opt === q.answer),
    explanation: q.explanation,
  }));

  return (
    <div className="w-full">
      <QuizPlayer questions={formattedQuestions} category={category} />
    </div>
  );
}
