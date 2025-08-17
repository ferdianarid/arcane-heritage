"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  textToRead: string;
}

export function AudioPlayer({ textToRead }: AudioPlayerProps) {
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
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800 text-white">
      <Volume2 className="h-6 w-6" />
      <span className="font-semibold">Putar Teks</span>
      <Button
        onClick={togglePlayPause}
        variant="outline"
        className="ml-auto w-12 h-12 rounded-full"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
