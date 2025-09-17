"use client";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "sonner";
import {
  updateFoodAction,
  ActionResult,
} from "@/servers/actions/foods/actions";
import { BottomGradient, LabelInputContainer } from "@/components/ui/gradient";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getUrlFileImageFood } from "@/lib/supabase";

export const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const ButtonUpdateFood = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending}>
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/spinner/dots-scale.svg"
            width={32}
            height={32}
            alt="spinner"
          />
          Updating...
        </div>
      ) : (
        "Update Makanan"
      )}
      <BottomGradient />
    </Button>
  );
};

interface FormUpdateFoodProps {
  food: any;
}

const FormUpdateFood: FC<FormUpdateFoodProps> = ({ food }) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const updateFoodWithId = (_state: ActionResult, formData: FormData) =>
    updateFoodAction(null, formData);

  const [state, formAction] = useActionState(
    updateFoodWithId,
    initialFormState
  );

  useEffect(() => {
    if (previewImageUrl) {
      return () => URL.revokeObjectURL(previewImageUrl);
    }
  }, [previewImageUrl]);

  useEffect(() => {
    if (state?.success) {
      toast.success("Makanan berhasil diupdate 🚀");
    }
  }, [state]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {state.errorTitle && (
        <div className="mt-5 flex items-center justify-between rounded-lg border border-red-600 bg-red-600/10 px-3 py-3 text-sm font-normal text-red-600">
          {state.errorTitle}
          {state.errorDesc?.map((error: any, index: number) => (
            <span key={index}>{error}</span>
          ))}
          <RiErrorWarningFill size={20} />
        </div>
      )}

      <form
        action={formAction}
        className="mt-4 flex w-full px-5 flex-col gap-4 phone:my-4 pb-5"
      >
        <input type="hidden" name="id" value={food?.id ?? ""} />

        <input type="hidden" name="oldImage" value={food?.image ?? ""} />

        <div className="relative w-[180px] flex aspect-square flex-col items-center justify-center gap-2 rounded-lg bg-[#1b1b1b]">
          <input
            id="file-upload"
            name="image"
            type="file"
            accept=".jpg,.png,.webp,.svg"
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            onChange={handleImageChange}
          />
          {!previewImageUrl ? (
            food?.image ? (
              <Image
                src={getUrlFileImageFood(food.image)}
                width={300}
                height={250}
                alt={food.name}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex flex-col items-center">
                <MdCloudUpload size={40} className="text-[#404040]" />
                <h3 className="text-xs font-medium text-[#adadad]">
                  Upload gambar makanan
                </h3>
              </div>
            )
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

        <div className="grid w-full grid-cols-2 gap-4">
          <LabelInputContainer>
            <Label htmlFor="name">Nama Makanan</Label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={food?.name || ""}
              placeholder="Ex. Rendang"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              name="location"
              type="text"
              defaultValue={food?.location || ""}
              placeholder="Ex. Padang"
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer>
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={food?.description || ""}
            placeholder="Tuliskan deskripsi makanan"
            className="resize-none"
          />
        </LabelInputContainer>

        <div className="grid w-full grid-cols-3 gap-4">
          <LabelInputContainer>
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              min={0}
              max={5}
              defaultValue={food?.rating || 0}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="reviews">Jumlah Reviews</Label>
            <Input
              id="reviews"
              name="reviews"
              type="number"
              min={0}
              defaultValue={food?.reviews || 0}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="category">Kategori</Label>
            <Input
              id="category"
              name="category"
              type="text"
              defaultValue={food?.category || ""}
              placeholder="Ex. Masakan Tradisional"
            />
          </LabelInputContainer>
        </div>

        <ButtonUpdateFood />
      </form>
    </>
  );
};

export default FormUpdateFood;
