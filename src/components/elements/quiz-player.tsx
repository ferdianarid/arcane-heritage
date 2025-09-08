"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Trophy,
  Star,
  ChevronLeft,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { QuizPlayerProps, QuizResult } from "@/types/quiz";
import Link from "next/link";
import { Button } from "../ui/button";

export default function QuizPlayer({ questions, category }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  const [showIntro, setShowIntro] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setShowIntro(false); // mulai quiz
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const startQuiz = () => {
    setCountdown(3);
  };

  const [showResult, setShowResult] = useState(false);

  const [direction, setDirection] = useState<"next" | "prev">("next");

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (index: number) => {
    if (selectedAnswers[currentIndex] !== null) return;
    const updated = [...selectedAnswers];
    updated[currentIndex] = index;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setDirection("next");
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection("prev");
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setShowResult(false);
  };

  if (showResult) {
    const score = selectedAnswers.reduce<number>((acc, sel, idx) => {
      if (sel === questions[idx].answer) return acc + 1;
      return acc;
    }, 0);

    const result: QuizResult = {
      score,
      totalQuestions,
      questions: questions.map((q, idx) => ({
        ...q,
        userAnswer: selectedAnswers[idx],
      })),
    };

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
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 ${scoreInfo.bg} rounded-full mb-6 shadow-lg`}
            >
              <Trophy className={`w-10 h-10 ${scoreInfo.color}`} />
            </div>
            <h1 className="text-4xl md:text-4xl font-bold mb-4">Hasil Quiz</h1>
          </div>

          {/* Score Card */}
          <div className="bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8 mb-8 text-center">
            <div className="w-full flex items-center justify-between">
              <p className="text-xl text-gray-300 mb-6">
                Kamu menjawab{" "}
                <span className="font-bold text-yellow-500">
                  {result.score}
                </span>{" "}
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
              onClick={handleRestart}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <RefreshCw className="w-5 h-5" /> Coba Lagi
            </button>
          </div>

          {/* Questions Review */}
          <div className="space-y-6">
            {result.questions.map((question) => {
              const isCorrect = question.userAnswer === question.answer;
              const userAnswerText =
                question.userAnswer !== undefined &&
                question.userAnswer !== null
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

  const isCorrect = selectedAnswers[currentIndex] === currentQuestion.answer;
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

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

  if (showIntro) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center p-6 text-white">
        <div className="max-w-2xl text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            Quiz: {category.name}
          </h1>
          <p className="text-gray-400 text-lg">
            Uji pengetahuanmu seputar{" "}
            <span className="text-orange-400">{category.name}</span>. Ada{" "}
            {totalQuestions} pertanyaan menantimu 🚀
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl px-8 py-4 text-xl font-semibold hover:scale-105 transition-transform"
            onClick={startQuiz}
          >
            Mulai Quiz
          </Button>
        </div>

        {/* Overlay Countdown */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              key={countdown}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
            >
              <span className="text-7xl md:text-9xl font-extrabold text-orange-500 drop-shadow-lg">
                {countdown === 0 ? "Start!" : countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

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
                Quiz: {category.name}
              </h1>
            </div>
            {/* Progress Bar */}
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

            {/* Question Card */}
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
                  onClick={() => {
                    if (currentIndex === questions.length - 1) {
                      setShowResult(true);
                    } else {
                      handleNext();
                    }
                  }}
                  disabled={selectedAnswers[currentIndex] === null}
                  className={`px-6 py-2 rounded-xl text-white ${
                    selectedAnswers[currentIndex] !== null
                      ? "bg-orange-500 hover:bg-orange-400"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {currentIndex === questions.length - 1 ? "Selesai" : "Next"}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
