"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Volume2 } from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";

interface AudioPlayerProps {
  textToRead: string;
}

export function FloatingAudio({ textToRead }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speechInstance, setSpeechInstance] =
    useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "id-ID";
      setSpeechInstance(utterance);

      utterance.onend = () => {
        setIsPlaying(false);
      };

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [textToRead]);

  const togglePlayPause = () => {
    if (!speechInstance) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.speak(speechInstance);
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <Button
        onClick={togglePlayPause}
        variant="default"
        className="fixed bottom-5 left-1/2 w-fit z-[999] !px-6 h-12 flex items-center justify-center -translate-x-1/2 bg-black/50 hover:bg-black/80 backdrop-blur-2xl"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <>
            <Pause className="h-8 w-8 text-white" />
            <h3 className="font-semibold text-white text-base">Playing...</h3>
          </>
        ) : (
          <>
            <Volume2 className="h-8 w-8 text-white" />
            <h3 className="font-semibold text-white text-base">Speak</h3>
          </>
        )}

        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          borderWidth={2}
          className="from-transparent via-blue-800 to-transparent"
        />
      </Button>
    </>
  );
}
