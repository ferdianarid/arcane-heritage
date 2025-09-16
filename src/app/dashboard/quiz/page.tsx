import { QuizListDashboard } from "@/components/dashboard/quiz-list";
import {
  getAllQuizzes,
  getQuizCategories,
} from "@/servers/actions/quiz/actions";

export default async function Page() {
  const categories = await getQuizCategories();
  const quizzes = await getAllQuizzes();
  console.log(categories);
  return <QuizListDashboard quizzes={quizzes} quizCategory={categories} />;
}
