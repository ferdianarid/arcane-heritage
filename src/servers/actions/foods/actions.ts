"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFileImageFood } from "@/lib/supabase";

export interface ActionResult {
  success?: boolean;
  errorTitle?: string | null;
  errorDesc?: string[] | null;
}

const foodFormSchema = z.object({
  name: z.string().min(3, "Food name min 3 character length"),
  location: z.string().min(3, "Location min 3 character length"),
  description: z.string().min(10, "Description min 10 character length"),
  rating: z.coerce
    .number()
    .min(0, "Rating can't be negative")
    .max(5, "Rating max 5"),
  reviews: z.coerce.number().min(0, "Review count can't be negative"),
  category: z.string().min(3, "Category min 3 character length"),
  image: z.any().optional(),
});

export async function saveFoodAction(
  _prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const parsed = foodFormSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
    description: formData.get("description"),
    rating: formData.get("rating"),
    reviews: formData.get("reviews"),
    category: formData.get("category"),
    image: formData.get("image"),
  });

  if (!parsed.success) {
    return {
      errorTitle: "Validation Error",
      errorDesc: parsed.error.issues.map((i) => i.message),
    };
  }

  let uploadedImageFilename: string | null = null;

  if (parsed.data.image && parsed.data.image instanceof File) {
    uploadedImageFilename = await uploadFileImageFood(parsed.data.image);
  }

  try {
    await prisma.food.create({
      data: {
        name: parsed.data.name,
        image: uploadedImageFilename as string,
        location: parsed.data.location,
        description: parsed.data.description,
        rating: parsed.data.rating,
        reviews: parsed.data.reviews,
        category: parsed.data.category,
      },
    });
  } catch (err) {
    return {
      errorTitle: "Database Error",
      errorDesc: ["Failed to add new food"],
    };
  }

  revalidatePath("/dashboard/makanan");
  return redirect("/dashboard/makanan");
}

export async function updateFoodAction(
  _prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const id = formData.get("id") as string;
  if (!id) {
    return {
      errorTitle: "Invalid Input",
      errorDesc: ["Food ID can't be found"],
    };
  }

  const existing = await prisma.food.findUnique({ where: { id } });
  if (!existing) {
    return {
      errorTitle: "Not Found",
      errorDesc: ["Food data not found"],
    };
  }

  const file = formData.get("image") as File | null;

  const parsed = foodFormSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
    description: formData.get("description"),
    rating: formData.get("rating"),
    reviews: formData.get("reviews"),
    category: formData.get("category"),
  });

  if (!parsed.success) {
    return {
      errorTitle: "Validation Error",
      errorDesc: parsed.error.issues.map((i) => i.message),
    };
  }

  let uploadedImageFilename: string | null = existing.image;

  if (file && file.size > 0) {
    uploadedImageFilename = await uploadFileImageFood(file);
  }

  try {
    await prisma.food.update({
      where: { id },
      data: {
        name: parsed.data.name,
        image: uploadedImageFilename,
        location: parsed.data.location,
        description: parsed.data.description,
        rating: parsed.data.rating,
        reviews: parsed.data.reviews,
        category: parsed.data.category,
      },
    });
  } catch (err) {
    return {
      errorTitle: "Database Error",
      errorDesc: ["Failed to update food"],
    };
  }

  revalidatePath("/dashboard/makanan");
  return redirect("/dashboard/makanan");
}

export async function deleteFoodAction(foodId: string) {
  if (!foodId) {
    return {
      success: false,
      errorTitle: "Invalid Input",
      errorDesc: ["Food ID is required"],
    };
  }

  try {
    await prisma.foodSection.deleteMany({
      where: { foodId },
    });

    await prisma.food.delete({
      where: { id: foodId },
    });

    revalidatePath("/dashboard/makanan");
    return redirect("/dashboard/makanan");
  } catch (err) {
    console.error("Failed to delete food:", err);
    return {
      success: false,
      errorTitle: "Database Error",
      errorDesc: ["Failed to delete food"],
    };
  }
}

export async function getAllFoods() {
  try {
    return await prisma.food.findMany();
  } catch (err) {
    console.error("Failed to fetch foods:", err);
    return [];
  }
}

export async function getFoodById(foodId: string) {
  try {
    return await prisma.food.findUnique({
      where: { id: foodId },
      include: { foodSections: true },
    });
  } catch (err) {
    console.error("Failed to fetch food:", err);
    return null;
  }
}
