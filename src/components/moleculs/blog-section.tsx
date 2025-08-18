import React from "react";

interface BlogSectionProps {
  title?: string;
  content: string;
}

export function BlogSection({ title, content }: BlogSectionProps) {
  return (
    <div className="w-full grid gap-2">
      {title && (
        <h3 className="font-normal font-italianno text-[40px] leading-[100%] md:text-[64px] text-white">
          {title}
        </h3>
      )}
      <p className="text-base md:text-[24px] leading-relaxed font-normal font-jakarta-sans text-white/80">
        {content}
      </p>
    </div>
  );
}
