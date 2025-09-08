"use client";

import { useFormStatus } from "react-dom";
import { saveFoodAction } from "@/servers/actions/foods/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useActionState, useState } from "react";
import Image from "next/image";
import { MdCloudUpload } from "react-icons/md";
import { LabelInputContainer } from "@/components/ui/gradient";
import { Label } from "@/components/ui/label";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding food..." : "Add Food"}
    </Button>
  );
};

export function AddFoodForm() {
  const [state, formAction] = useActionState(saveFoodAction, {
    errorTitle: null,
    errorDesc: [],
  });

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  if (state?.success) {
    toast.success("Food successfully added 🚀");
  }

  return (
    <form
      action={formAction}
      className="mt-4 flex w-full max-w-[700px] flex-col gap-4 phone:my-4 pb-5 mx-auto"
    >
      {/* Upload Image Section */}
      <div className="relative w-[220px] flex aspect-square flex-col items-center justify-center gap-2 rounded-lg bg-[#1b1b1b]">
        <input
          id="file-upload"
          name="image"
          type="file"
          accept=".jpg,.png,.webp,.svg"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          onChange={handleImageChange}
        />
        {!previewImageUrl ? (
          <div className="flex flex-col items-center">
            <MdCloudUpload size={40} className="text-[#404040]" />
            <h3 className="text-xs font-medium text-[#adadad]">
              Upload main image
            </h3>
          </div>
        ) : (
          <Image
            src={previewImageUrl}
            width={300}
            height={250}
            alt="Uploaded Image"
            className="h-full w-full rounded-lg object-cover"
          />
        )}
      </div>

      {/* Name + Location */}
      <div className="grid w-full grid-cols-2 gap-4">
        <LabelInputContainer>
          <Label htmlFor="name">Nama Makanan</Label>
          <Input id="name" name="name" placeholder="Ex. Rendang" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="location">Lokasi</Label>
          <Input id="location" name="location" placeholder="Ex. Padang" />
        </LabelInputContainer>
      </div>

      {/* Description */}
      <LabelInputContainer>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Deskripsi singkat..."
          className="resize-none"
        />
      </LabelInputContainer>

      {/* Rating, Reviews, Category */}
      <div className="grid w-full grid-cols-3 gap-4">
        <LabelInputContainer>
          <Label htmlFor="rating">Rating (0-5)</Label>
          <Input id="rating" name="rating" type="number" min={0} max={5} />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="reviews">Jumlah Reviews</Label>
          <Input id="reviews" name="reviews" type="number" min={0} />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="category">Kategori</Label>
          <Input
            id="category"
            name="category"
            placeholder="Ex. Masakan Tradisional"
            type="text"
          />
        </LabelInputContainer>
      </div>

      <SubmitButton />
    </form>
  );
}
