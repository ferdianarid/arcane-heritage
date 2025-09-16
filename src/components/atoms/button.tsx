"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

/**
 * A reusable button component that navigates back to the previous page.
 * It's styled as a transparent button with an optional icon.
 *
 * @param {object} props - Component props.
 * @param {ReactNode} props.children - The content to display inside the button (e.g., text).
 * @returns {JSX.Element} The previous button component.
 */
export const PreviousButton = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="relative bg-transparent text-white hover:bg-transparent w-fit z-10"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      {children || "Kembali"}
    </Button>
  );
};
