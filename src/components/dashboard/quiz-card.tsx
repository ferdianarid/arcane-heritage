"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Quiz } from "@/types/quiz";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: Quiz;
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-950/90 to-gray-900 rounded-2xl !border-none transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg">
          <CardHeader className="flex-grow">
            <CardTitle className="text-lg tracking-wide font-semibold text-white line-clamp-3">
              {quiz.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-auto">
            <p className="text-sm text-gray-400 mb-2">
              Kategori:{" "}
              <span className="text-orange-400 font-medium">
                {quiz.category?.name ?? "Lainnya"}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {quiz.options.length} pilihan jawaban
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader className="mt-5">
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Detail pertanyaan quiz
          </DialogDescription>
          <Badge
            className={cn(
              "text-white !py-1 mt-4 font-medium",
              quiz.category?.name.toLowerCase().includes("bangunan")
                ? "bg-blue-700"
                : "bg-orange-700"
            )}
          >
            {quiz.category?.name ?? "Lainnya"}
          </Badge>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {quiz.question}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Pilihan Jawaban:
          </p>
          <ul className="list-disc list-inside grid grid-cols-2 space-y-1 text-gray-600 dark:text-gray-400">
            {quiz.options.map((opt, i) => {
              const isAnswer = opt === quiz.answer;
              return (
                <li
                  key={i}
                  className={
                    isAnswer ? "font-bold text-yellow-500 animate-pulse" : ""
                  }
                >
                  {opt}
                </li>
              );
            })}
          </ul>

          {quiz.explanation && (
            <div className="mt-8 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="tracking-wide text-sm text-gray-700 leading-relaxed dark:text-gray-300">
                <span className="font-semibold">Penjelasan:</span>{" "}
                {quiz.explanation}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
