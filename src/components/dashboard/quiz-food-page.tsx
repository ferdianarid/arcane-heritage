"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface QuizFoodPageProps {
  questions: {
    id: string;
    question: string;
    options: string[];
    answer: string;
  }[];
}

const QuizFoodPage: React.FC<QuizFoodPageProps> = ({ questions }) => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option: string) => {
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-6">
      {!started ? (
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Quiz Makanan Nusantara 🍲</h1>
          <p className="text-white/70 mb-6">
            Uji pengetahuanmu seputar makanan khas Indonesia. Klik tombol di
            bawah untuk memulai quiz!
          </p>
          <Button
            onClick={() => setStarted(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl shadow-lg"
          >
            Mulai Quiz
          </Button>
        </div>
      ) : (
        <div className="text-center max-w-lg">
          {currentQuestion ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Pertanyaan {currentIndex + 1}
              </h2>
              <p className="mb-6">{currentQuestion.question}</p>
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((opt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full"
                    onClick={() => handleAnswer(opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Quiz Selesai 🎉</h2>
              <p className="text-white/80">
                Skor kamu: {score} / {questions.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizFoodPage;
