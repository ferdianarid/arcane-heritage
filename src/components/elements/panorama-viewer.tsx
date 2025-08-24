/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";

interface Viewer360Props {
  image: string;
}

declare global {
  interface Window {
    pannellum: any;
  }
}

const PanoramaViewer: React.FC<Viewer360Props> = ({ image }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isPannellumLoaded, setIsPannellumLoaded] = useState(false);

  useEffect(() => {
    if (isPannellumLoaded && viewerRef.current) {
      if (viewerRef.current.hasChildNodes()) {
        viewerRef.current.innerHTML = "";
      }
      window.pannellum.viewer(viewerRef.current, {
        type: "equirectangular",
        panorama: "https://pannellum.org/images/alma.jpg",
        autoLoad: true,
        showZoom: false,
        showFullscreen: true,
        autoRotate: -2,
      });
    }
  }, [isPannellumLoaded, image]);

  return (
    <>
      <Link rel="stylesheet" href="/assets/pannellum/pannellum.css" />
      <Script
        src="/assets/pannellum/pannellum.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Pannellum script has been loaded");
          setIsPannellumLoaded(true);
        }}
      />
      <div ref={viewerRef} className="w-full min-h-[500px]" />
    </>
  );
};

export default PanoramaViewer;
