"use client";

import React, { useEffect, useState } from "react";
import { QuizPlayerProps, QuizResult } from "@/types/quiz";
import QuizIntro from "../quiz/quiz-intro";
import QuizQuestion from "../quiz/quiz-question";
import QuizResultSummary from "../quiz/quiz-result-summary";
import Image from "next/image";

export default function QuizPlayer({ questions, category }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showIntro, setShowIntro] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setShowIntro(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const startQuiz = () => setCountdown(3);

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
    setShowIntro(true);
  };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  const isCorrect = selectedAnswers[currentIndex] === currentQuestion?.answer;

  if (showIntro) {
    return (
      <div className="relative w-full min-h-screen">
        <Image
          src={
            category?.name.toLowerCase().includes("makanan")
              ? "/assets/images/foods/pempek.jpg"
              : "/assets/images/buildings/candi-borobudur.webp"
          }
          alt="quiz-background"
          fill
          priority
          className="object-cover"
        />
        <QuizIntro
          category={category}
          totalQuestions={totalQuestions}
          countdown={countdown}
          startQuiz={startQuiz}
        />
      </div>
    );
  }

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

    return <QuizResultSummary result={result} onRestart={handleRestart} />;
  }

  return (
    <QuizQuestion
      currentQuestion={currentQuestion}
      currentIndex={currentIndex}
      totalQuestions={totalQuestions}
      progressPercentage={progressPercentage}
      selectedAnswers={selectedAnswers}
      direction={direction}
      isCorrect={isCorrect}
      handleAnswer={handleAnswer}
      handleNext={() => {
        if (currentIndex === questions.length - 1) {
          setShowResult(true);
        } else {
          handleNext();
        }
      }}
      handlePrev={handlePrev}
      categoryName={category.name}
    />
  );
}
