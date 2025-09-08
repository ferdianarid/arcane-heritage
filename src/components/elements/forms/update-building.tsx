/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "sonner";
import {
  updateBuildingAction,
  ActionResult,
} from "@/servers/actions/buildings/actions";
import { BottomGradient, LabelInputContainer } from "@/components/ui/gradient";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getUrlFileImageBuilding } from "@/lib/supabase";

export const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const ButtonUpdateBuilding = () => {
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
        "Update Bangunan"
      )}
      <BottomGradient />
    </Button>
  );
};

interface FormUpdateBuildingProps {
  building: any;
}

const FormUpdateBuilding: FC<FormUpdateBuildingProps> = ({ building }) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [previewPanoramaUrl, setPreviewPanoramaUrl] = useState<string | null>(
    null
  );

  const updateBuildingWithId = (_state: ActionResult, formData: FormData) =>
    updateBuildingAction(null, formData);

  const [state, formAction] = useActionState(
    updateBuildingWithId,
    initialFormState
  );

  useEffect(() => {
    if (previewImageUrl) return () => URL.revokeObjectURL(previewImageUrl);
  }, [previewImageUrl]);

  useEffect(() => {
    if (previewPanoramaUrl)
      return () => URL.revokeObjectURL(previewPanoramaUrl);
  }, [previewPanoramaUrl]);

  useEffect(() => {
    if (state?.success) {
      toast.success("Bangunan berhasil diupdate 🚀");
    }
  }, [state]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handlePanoramaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewPanoramaUrl(URL.createObjectURL(file));
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
        <input type="hidden" name="id" value={building?.id ?? ""} />

        {/* simpan image lama */}
        <input type="hidden" name="oldImage" value={building?.image ?? ""} />
        <input
          type="hidden"
          name="oldPanorama"
          value={building?.panoramaImage ?? ""}
        />

        <div className="flex w-full gap-5">
          {/* Main Image */}
          <div className="relative w-full flex aspect-square flex-col items-center justify-center gap-2 rounded-lg bg-[#1b1b1b]">
            <input
              id="file-upload"
              name="image"
              type="file"
              accept=".jpg,.png,.webp,.svg"
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              onChange={handleImageChange}
            />
            {!previewImageUrl ? (
              building?.image ? (
                <Image
                  src={getUrlFileImageBuilding(building.image)}
                  width={300}
                  height={250}
                  alt={building.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <MdCloudUpload size={40} className="text-[#404040]" />
                  <h3 className="text-xs font-medium text-[#adadad]">
                    Upload main image
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

          {/* Panorama Image */}
          <div className="relative w-full flex aspect-square flex-col items-center justify-center gap-2 rounded-lg bg-[#1b1b1b]">
            <input
              id="panorama-upload"
              name="panoramaImage"
              type="file"
              accept=".jpg,.png,.webp,.svg"
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              onChange={handlePanoramaChange}
            />
            {!previewPanoramaUrl ? (
              building?.panoramaImage ? (
                <Image
                  src={getUrlFileImageBuilding(building.panoramaImage)}
                  width={300}
                  height={250}
                  alt="Panorama"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <MdCloudUpload size={40} className="text-[#404040]" />
                  <h3 className="text-xs font-medium text-[#adadad]">
                    Upload panorama image
                  </h3>
                </div>
              )
            ) : (
              <Image
                src={previewPanoramaUrl}
                width={300}
                height={250}
                alt="Uploaded Panorama"
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-4">
          <LabelInputContainer>
            <Label htmlFor="name">Nama Bangunan</Label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={building?.name || ""}
              placeholder="Ex. Museum"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              name="location"
              type="text"
              defaultValue={building?.location || ""}
              placeholder="Ex. Yogyakarta"
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer>
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={building?.description || ""}
            placeholder="Tuliskan deskripsi singkat"
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
              defaultValue={building?.rating || 0}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="reviews">Jumlah Reviews</Label>
            <Input
              id="reviews"
              name="reviews"
              type="number"
              min={0}
              defaultValue={building?.reviews || 0}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="category">Kategori</Label>
            <Input
              id="category"
              name="category"
              type="text"
              defaultValue={building?.category || ""}
              placeholder="Ex. Museum"
            />
          </LabelInputContainer>
        </div>

        <ButtonUpdateBuilding />
      </form>
    </>
  );
};

export default FormUpdateBuilding;
