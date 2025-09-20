import { QuizListDashboard } from "@/components/dashboard/quiz-list";
import {
  getAllQuizzes,
  getQuizCategories,
} from "@/servers/actions/quiz/actions";
import { Suspense } from "react";

export default async function Page() {
  const categories = await getQuizCategories();
  const quizzes = await getAllQuizzes();
  console.log(categories);
  return (
    <Suspense>
      <QuizListDashboard quizzes={quizzes} quizCategory={categories} />
    </Suspense>
  );
}
