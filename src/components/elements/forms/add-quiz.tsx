"use client";

import React, { useState, useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { addQuizAction } from "@/servers/actions/quiz/actions";
import { initialFormState } from "@/validations/schema";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/gradient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ButtonSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending}>
      {pending ? "Menyimpan..." : "Tambah Pertanyaan"}
    </Button>
  );
};

const FormAddQuiz = ({
  categories,
}: {
  categories: { id: string; name: string }[];
}) => {
  const [state, formAction] = useActionState(addQuizAction, initialFormState);
  const [options, setOptions] = useState<string[]>(["", ""]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOptionField = () => setOptions([...options, ""]);

  useEffect(() => {
    if (state?.success) {
      toast.success("Pertanyaan quiz berhasil ditambahkan 🚀");
      setOptions(["", ""]);
      formRef.current?.reset();
    } else if (state?.errorTitle) {
      toast.error(state.errorTitle, {
        description: state.errorDesc?.join("\n") || "Terjadi kesalahan.",
      });
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="w-full flex flex-col gap-4"
    >
      <LabelInputContainer className="grid gap-2">
        Pertanyaan
        <Textarea
          name="question"
          className="resize-none"
          placeholder="Tuliskan pertanyaan quiz"
        />
      </LabelInputContainer>

      <LabelInputContainer className="grid gap-2">
        Jawaban Benar
        <Input name="answer" type="text" placeholder="Tuliskan jawaban benar" />
      </LabelInputContainer>

      <div className="flex flex-col gap-3">
        <Label className="text-base font-normal">Opsi Jawaban</Label>
        <div className="w-full grid grid-cols-2 gap-3">
          {options.map((opt, index) => (
            <Input
              key={index}
              type="text"
              name="options"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Opsi ${index + 1}`}
            />
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addOptionField}>
          + Tambah Opsi
        </Button>
      </div>

      <LabelInputContainer className="grid gap-2">
        Penjelasan
        <Textarea
          name="explanation"
          className="resize-none"
          placeholder="Tuliskan penjelasan jawaban (opsional)"
        />
      </LabelInputContainer>

      <LabelInputContainer className="grid gap-2">
        Kategori
        <Select name="categoryId">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent side="top">
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </LabelInputContainer>

      <ButtonSubmit />
    </form>
  );
};

export default FormAddQuiz;
