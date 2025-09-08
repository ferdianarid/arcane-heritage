import { z } from "zod";

export const quizFormSchema = z.object({
  question: z.string().min(5, "Pertanyaan minimal 5 karakter"),
  answer: z.string().min(1, "Jawaban benar wajib diisi"),
  options: z
    .array(z.string().min(1, "Opsi tidak boleh kosong"))
    .min(2, "Minimal 2 opsi"),
  explanation: z.string().optional(),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
});

export interface ActionResult {
  success?: boolean;
  errorTitle?: string | null;
  errorDesc?: string[];
}

export const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};
