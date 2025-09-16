"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";
import { PreviousButton } from "../atoms/button";

interface QuizIntroProps {
  category: { name: string };
  totalQuestions: number;
  countdown: number | null;
  startQuiz: () => void;
}

export default function QuizIntro({
  category,
  totalQuestions,
  countdown,
  startQuiz,
}: QuizIntroProps) {
  return (
    <div className="w-full min-h-screen flex items-center relative justify-center p-6 text-white z-10">
      <div className="w-full h-screen absolute z-20 bg-black/80"></div>
      <div className="max-w-2xl relative z-30 text-center space-y-8">
        <div className="w-fit mr-auto">
          <PreviousButton>Back to quiz</PreviousButton>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Quiz: {category.name}
        </h1>
        <p className="text-gray-400 text-lg">
          Uji pengetahuanmu seputar{" "}
          <span className="text-orange-400 font-medium">{category.name}</span>.
          Ada{" "}
          <span className="text-orange-400 font-medium">{totalQuestions}</span>{" "}
          pertanyaan menantimu 🚀
        </p>
        <Button
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white !rounded-xl px-8 !py-4 text-xl font-semibold hover:scale-105 transition-transform"
          onClick={startQuiz}
        >
          Mulai Quiz
        </Button>
      </div>
      <AnimatePresence>
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50">
            <AnimatePresence mode="wait">
              <motion.span
                key={countdown}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-7xl md:text-9xl font-extrabold text-orange-500 drop-shadow-lg"
              >
                {countdown === 0 ? "Mulai!" : countdown}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
