// src/components/quiz/QuizResultSummary.tsx
"use client";

import React from "react";
import { QuizResult } from "@/types/quiz";
import { CheckCircle, XCircle, RefreshCw, Trophy, Star } from "lucide-react";

interface QuizResultProps {
  result: QuizResult;
  onRestart: () => void;
}

export default function QuizResultSummary({
  result,
  onRestart,
}: QuizResultProps) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const getScoreMessage = () => {
    if (percentage >= 80)
      return {
        message: "Luar Biasa!",
        color: "text-green-400",
        bg: "bg-green-900/30",
      };
    if (percentage >= 60)
      return {
        message: "Bagus!",
        color: "text-blue-400",
        bg: "bg-blue-900/30",
      };
    if (percentage >= 40)
      return {
        message: "Cukup Baik",
        color: "text-yellow-400",
        bg: "bg-yellow-900/30",
      };
    return {
      message: "Perlu Belajar Lagi",
      color: "text-red-400",
      bg: "bg-red-900/30",
    };
  };
  const scoreInfo = getScoreMessage();

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 ${scoreInfo.bg} rounded-full mb-6 shadow-lg`}
          >
            <Trophy className={`w-10 h-10 ${scoreInfo.color}`} />
          </div>
          <h1 className="text-4xl md:text-4xl font-bold mb-4">Hasil Quiz</h1>
        </div>

        <div className="bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8 mb-8 text-center">
          <div className="w-full flex items-center justify-between">
            <p className="text-xl text-gray-300 mb-6">
              Kamu menjawab{" "}
              <span className="font-bold text-yellow-500">{result.score}</span>{" "}
              dari{" "}
              <span className="font-bold text-yellow-500">
                {result.totalQuestions}
              </span>{" "}
              pertanyaan dengan benar
            </p>
            <div
              className={`flex items-center w-fit ml-auto gap-2 px-6 py-3 ${scoreInfo.bg} rounded-2xl mb-6`}
            >
              <Star className={`w-6 h-6 ${scoreInfo.color}`} />
              <span className={`text-xl font-bold ${scoreInfo.color}`}>
                {scoreInfo.message}
              </span>
            </div>
          </div>
          <h3 className="font-bold text-xl text-white">Skor kamu : </h3>
          <div className="flex justify-center mb-6 mt-4">
            <div
              className={`text-5xl font-bold px-6 py-3 ${scoreInfo.bg} ${scoreInfo.color} rounded-2xl`}
            >
              {percentage}%
            </div>
          </div>

          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <RefreshCw className="w-5 h-5" /> Coba Lagi
          </button>
        </div>

        <div className="space-y-6">
          {result.questions.map((question: any) => {
            const isCorrect = question.userAnswer === question.answer;
            const userAnswerText =
              question.userAnswer !== undefined && question.userAnswer !== null
                ? question.options[question.userAnswer]
                : "Tidak dijawab";
            const correctAnswerText = question.options[question.answer];

            return (
              <div
                key={question.id}
                className="bg-gray-900 rounded-3xl shadow-lg border border-gray-700 p-6 pr-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? "bg-green-900/30" : "bg-red-900/30"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3">
                      {question.question}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-300">
                          Jawabanmu:
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isCorrect
                              ? "bg-green-900/30 text-green-400"
                              : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {userAnswerText}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-300">
                            Jawaban benar:
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400">
                            {correctAnswerText}
                          </span>
                        </div>
                      )}
                    </div>
                    {question.explanation && (
                      <div className="bg-gray-800 rounded-2xl p-4 border border-gray-600">
                        <p className="text-gray-300 leading-relaxed">
                          <span className="font-semibold text-blue-400">
                            Penjelasan:
                          </span>{" "}
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
