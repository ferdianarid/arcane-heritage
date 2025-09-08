import { z } from "zod";

export const buildingFormSchema = z.object({
  name: z.string().min(3, "Nama bangunan diperlukan"),
  image: z.any().optional(),
  location: z.string().min(3, "Lokasi diperlukan"),
  description: z.string().min(10, "Deskripsi diperlukan"),
  panoramaImage: z.any().optional(),
  rating: z.coerce.number().min(0).max(5, "Rating harus antara 0 dan 5"),
  reviews: z.coerce.number().min(0, "Jumlah reviews harus non-negatif"),
  category: z.string().min(3, "Kategori diperlukan"),
});
