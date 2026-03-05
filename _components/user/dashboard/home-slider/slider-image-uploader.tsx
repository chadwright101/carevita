"use client";

import ImageUploader from "@/_components/user/dashboard/image-uploader";

interface Props {
  onUploaded: (url: string) => void;
}

export default function SliderImageUploader({ onUploaded }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-smallest font-medium">Add image</p>
      <ImageUploader storagePath="home/slider" onUploaded={onUploaded} />
    </div>
  );
}
