"use client";

import dynamic from "next/dynamic";

const GallerySection = dynamic(
  () => import("./gallery-section"),
  { ssr: false }
);

export default function GalleryClient() {
  return <GallerySection />;
}
