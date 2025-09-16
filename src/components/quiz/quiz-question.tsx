"use client";

import React from "react";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Question } from "@/types/quiz";

interface QuizQuestionProps {
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  progressPercentage: number;
  selectedAnswers: (number | null)[];
  direction: "next" | "prev";
  isCorrect: boolean;
  handleAnswer: (index: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  categoryName: string;
}

const variants = {
  enter: (dir: "next" | "prev") => ({
    x: dir === "next" ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: "next" | "prev") => ({
    x: dir === "next" ? -50 : 50,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function QuizQuestion({
  currentQuestion,
  currentIndex,
  totalQuestions,
  progressPercentage,
  selectedAnswers,
  direction,
  isCorrect,
  handleAnswer,
  handleNext,
  handlePrev,
  categoryName,
}: QuizQuestionProps) {
  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-4 text-white">
      <div className="max-w-4xl w-full relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="w-full flex mb-4 items-center justify-between">
              <Link
                href="/quiz"
                className="font-bold flex items-center gap-1 text-base text-white"
              >
                <ChevronLeft /> Back to Quiz List
              </Link>
              <Link
                href="/"
                className="font-italianno text-center font-medium text-white/80 transition-all duration-300 hover:text-white text-[48px]"
              >
                ArcaneHeritage
              </Link>
              <h1 className="text-2xl font-bold mb-4 text-white">
                Quiz: {categoryName}
              </h1>
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2 text-gray-300">
                <span>
                  Pertanyaan {currentIndex + 1} dari {totalQuestions}
                </span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700 p-8 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  let buttonClasses =
                    "w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 font-medium text-lg ";

                  if (selectedAnswers[currentIndex] === null) {
                    buttonClasses +=
                      "border-gray-600 bg-gray-700 hover:border-orange-300 hover:bg-gray-600 hover:shadow-lg transform hover:-translate-y-1";
                  } else if (index === currentQuestion.answer) {
                    buttonClasses +=
                      "border-green-400 bg-green-900 text-green-400";
                  } else if (
                    index === selectedAnswers[currentIndex] &&
                    index !== currentQuestion.answer
                  ) {
                    buttonClasses += "border-red-400 bg-red-900 text-red-400";
                  } else {
                    buttonClasses +=
                      "border-gray-600 bg-gray-700 text-gray-400";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswers[currentIndex] !== null}
                      className={buttonClasses}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {selectedAnswers[currentIndex] !== null && (
                          <>
                            {index === currentQuestion.answer && (
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            )}
                            {index === selectedAnswers[currentIndex] &&
                              index !== currentQuestion.answer && (
                                <XCircle className="w-6 h-6 text-red-400" />
                              )}
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedAnswers[currentIndex] !== null && (
                <div
                  className={`mt-8 p-6 rounded-2xl border border-gray-600 bg-gray-700`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        isCorrect ? "bg-green-900/30" : "bg-red-900/30"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold mb-2 ${
                          isCorrect ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {isCorrect ? "Jawaban Benar!" : "Jawaban Salah"}
                      </h3>
                      {currentQuestion.explanation && (
                        <p className="text-gray-300 leading-relaxed">
                          <strong>Penjelasan:</strong>{" "}
                          {currentQuestion.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-5">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-6 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentIndex] === null}
                  className={`px-6 py-2 rounded-xl text-white ${
                    selectedAnswers[currentIndex] !== null
                      ? "bg-orange-500 hover:bg-orange-400"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {currentIndex === totalQuestions - 1 ? "Selesai" : "Next"}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
