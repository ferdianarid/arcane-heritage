/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, PlusIcon } from "lucide-react";
import { slugify, unslugify, normalizeString } from "@/helpers/string";
import { Quiz, QuizCategories } from "@/types/quiz";
import { QuizCard } from "./quiz-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormAddQuiz from "../elements/forms/add-quiz";
import EmptyStateQuiz from "../elements/empty-state-quiz";

interface QuizListProps {
  quizzes: Quiz[];
  quizCategory: QuizCategories[];
}

export function QuizListDashboard({ quizzes, quizCategory }: QuizListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams?.toString() ?? ""),
    [searchParams]
  );

  const categoryParam = params.get("category") || "all";
  const sortParam = params.get("sortBy") || "newest";

  const searchParam = params.get("search") || "";

  const [searchInput, setSearchInput] = useState(searchParam);
  const [isAddQuizModal, setIsAddQuizModal] = useState(false);

  const setQueryParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (value === "all" || value === "" || value === "newest") {
      newParams.delete(key);
    } else {
      newParams.set(key, slugify(value));
    }

    router.push(`?${newParams.toString()}`);
  };

  const categories = useMemo(() => {
    const allCategories = quizzes.map(
      (quiz) => quiz.category?.name ?? "Lainnya"
    );
    const uniqueCategories = [...new Set(allCategories)];
    return ["all", ...uniqueCategories];
  }, [quizzes]);

  const filteredAndSortedQuizzes = useMemo(() => {
    let result = [...quizzes];

    if (categoryParam !== "all") {
      const normalizedCategory = normalizeString(unslugify(categoryParam));
      result = result.filter(
        (quiz) =>
          normalizeString(quiz.category?.name ?? "") === normalizedCategory
      );
    }

    if (sortParam === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortParam === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortParam === "az") {
      result.sort((a, b) => a.question.localeCompare(b.question));
    } else if (sortParam === "za") {
      result.sort((a, b) => b.question.localeCompare(a.question));
    }

    return result;
  }, [quizzes, categoryParam, sortParam]);

  const handleClearSearch = () => {
    setSearchInput("");
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("search");
    router.push(`?${newParams.toString()}`);
  };

  const handleAddQuiz = () => {
    setIsAddQuizModal(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-fit grid gap-1">
          <h1 className="font-bold text-white text-2xl">Daftar Quiz</h1>
          <p className="text-sm text-white/70">
            Pilih quiz favoritmu dan mulai belajar
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-fit ml-auto">
          {/* Filter Category */}
          <Select
            onValueChange={(val) => setQueryParam("category", val)}
            value={categoryParam}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={slugify(cat)}>
                    {cat === "all" ? "Semua Kategori" : cat}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="min-h-12">
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuRadioGroup
                value={sortParam}
                onValueChange={(val) => setQueryParam("sortBy", val)}
              >
                <DropdownMenuRadioItem value="newest">
                  Terbaru
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Terlama
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="az">
                  Question A-Z
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="za">
                  Question Z-A
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add Quiz Button */}
          <Dialog open={isAddQuizModal} onOpenChange={setIsAddQuizModal}>
            <DialogTrigger asChild>
              <Button className="min-h-12 bg-green-600 text-white font-medium hover:bg-green-700">
                <PlusIcon />
                Add Quiz
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="">
                <DialogTitle className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                  Add new Question
                </DialogTitle>
                <DialogDescription className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                  Lets add new Question
                </DialogDescription>
              </DialogHeader>
              <FormAddQuiz categories={quizCategory} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Info */}
      <p className="text-sm text-white/70">
        Menampilkan{" "}
        <span className="font-bold text-white">
          {filteredAndSortedQuizzes.length}
        </span>{" "}
        Quiz item
      </p>

      {filteredAndSortedQuizzes.length === 0 ? (
        <EmptyStateQuiz
          searchQuery={searchParam}
          onAddQuiz={handleAddQuiz}
          onClearSearch={handleClearSearch}
        />
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5 pb-24">
          {filteredAndSortedQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}
