"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export const PreviousButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="relative w-fit z-10 ">
      <ArrowLeft size={5} />
      Kembali
    </Button>
  );
};
