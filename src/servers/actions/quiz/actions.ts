"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { quizFormSchema, ActionResult } from "@/validations/schema";

export async function addQuizAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = quizFormSchema.safeParse({
    question: String(formData.get("question") || ""),
    answer: String(formData.get("answer") || ""),
    options: formData.getAll("options").map(String),
    explanation: String(formData.get("explanation") || ""),
    categoryId: String(formData.get("categoryId") || ""),
  });

  if (!parsed.success) {
    return {
      errorTitle: "Validasi Gagal",
      errorDesc: parsed.error.issues.map((i) => i.message),
    };
  }

  try {
    const data = await prisma.quizQuestion.create({
      data: {
        question: parsed.data.question,
        answer: parsed.data.answer,
        options: parsed.data.options,
        explanation: parsed.data.explanation,
        categoryId: parsed.data.categoryId,
      },
    });

    console.log(data);
  } catch (err) {
    console.error("DB ERROR addQuizAction:", err);
    return {
      errorTitle: "Database Error",
      errorDesc: ["Gagal menyimpan pertanyaan quiz."],
    };
  }

  revalidatePath("/dashboard/quiz");
  return { success: true };
}

export async function getQuizCategories() {
  try {
    const categories = await prisma.quizCategory.findMany({
      orderBy: { name: "asc" },
    });
    return categories;
  } catch (err) {
    console.error("DB ERROR getQuizCategories:", err);
    return [];
  }
}

export async function getQuestionsByCategory(categoryId: string) {
  try {
    const questions = await prisma.quizQuestion.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    return questions;
  } catch (err) {
    console.error("DB ERROR getQuestionsByCategory:", err);
    return [];
  }
}

export async function getAllQuizzes() {
  try {
    const quizzes = await prisma.quizQuestion.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    return quizzes;
  } catch (err) {
    console.error("DB ERROR getAllQuizzes:", err);
    return [];
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.quizCategory.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  } catch (err) {
    console.error("DB ERROR getAllCategories:", err);
    return [];
  }
}
