/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFileImageBuilding } from "@/lib/supabase";

export interface ActionResult {
  success?: boolean;
  errorTitle?: string | null;
  errorDesc?: string[] | null;
}

const buildingFormSchema = z.object({
  name: z.string().min(3, "Building name min 3 character length"),
  location: z.string().min(3, "Location min 3 character length"),
  description: z.string().min(10, "Description min 3 character length"),
  rating: z.coerce
    .number()
    .min(0, "Rating cant be negative")
    .max(5, "Rating max 5"),
  reviews: z.coerce.number().min(0, "Review count cant be negative"),
  category: z.string().min(3, "Category min 3 character length"),
  image: z.any().optional(),
  panoramaImage: z.any().optional(),
});

export async function saveBuildingAction(
  _prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const parsed = buildingFormSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
    description: formData.get("description"),
    rating: formData.get("rating"),
    reviews: formData.get("reviews"),
    category: formData.get("category"),
    image: formData.get("image"),
    panoramaImage: formData.get("panoramaImage"),
  });

  if (!parsed.success) {
    return {
      errorTitle: "Validation Error",
      errorDesc: parsed.error.issues.map((i) => i.message),
    };
  }

  let uploadedImageFilename: string | null = null;
  let uploadedPanoramaFilename: string | null = null;

  if (parsed.data.image && parsed.data.image instanceof File) {
    uploadedImageFilename = await uploadFileImageBuilding(parsed.data.image);
  }

  if (parsed.data.panoramaImage && parsed.data.panoramaImage instanceof File) {
    uploadedPanoramaFilename = await uploadFileImageBuilding(
      parsed.data.panoramaImage
    );
  }

  try {
    await prisma.building.create({
      data: {
        name: parsed.data.name,
        image: uploadedImageFilename as string,
        location: parsed.data.location,
        description: parsed.data.description,
        panoramaImage: uploadedPanoramaFilename,
        rating: parsed.data.rating,
        reviews: parsed.data.reviews,
        category: parsed.data.category,
      },
    });
  } catch (err) {
    return {
      errorTitle: "Database Error",
      errorDesc: ["Failed to add new building"],
    };
  }

  revalidatePath("/dashboard/bangunan");
  return redirect("/dashboard/bangunan");
}

export async function updateBuildingAction(
  _prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const id = formData.get("id") as string;
  if (!id) {
    return {
      errorTitle: "Invalid Input",
      errorDesc: ["Building ID cant be found"],
    };
  }

  const existing = await prisma.building.findUnique({ where: { id } });
  if (!existing) {
    return {
      errorTitle: "Not Found",
      errorDesc: ["Data building not found"],
    };
  }

  const fileImage = formData.get("image") as File | null;
  const filePanorama = formData.get("panoramaImage") as File | null;

  const parsed = buildingFormSchema.safeParse({
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
  let uploadedPanoramaFilename: string | null = existing.panoramaImage;

  if (fileImage && fileImage.size > 0) {
    uploadedImageFilename = await uploadFileImageBuilding(fileImage);
  }

  if (filePanorama && filePanorama.size > 0) {
    uploadedPanoramaFilename = await uploadFileImageBuilding(filePanorama);
  }

  try {
    await prisma.building.update({
      where: { id },
      data: {
        name: parsed.data.name,
        location: parsed.data.location,
        description: parsed.data.description,
        rating: parsed.data.rating,
        reviews: parsed.data.reviews,
        category: parsed.data.category,
        image: uploadedImageFilename,
        panoramaImage: uploadedPanoramaFilename,
      },
    });
  } catch (err) {
    return {
      errorTitle: "Database Error",
      errorDesc: ["Failed to update building"],
    };
  }

  revalidatePath(`/dashboard/bangunan`);
  return redirect(`/dashboard/bangunan`);
}

export async function getAllBuildings() {
  try {
    return await prisma.building.findMany();
  } catch (err) {
    console.error("Failed to fetch buildings:", err);
    return [];
  }
}

export async function getBuildingById(buildingId: string) {
  try {
    return await prisma.building.findUnique({
      where: { id: buildingId },
      include: { blogSections: true },
    });
  } catch (err) {
    console.error("Failed to fetch building:", err);
    return null;
  }
}
