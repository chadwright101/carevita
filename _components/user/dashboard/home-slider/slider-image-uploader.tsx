"use client";

import MediaUploader from "@/_components/user/dashboard/media-uploader";

interface Props {
  onUploaded: (url: string) => void;
}

export default function SliderImageUploader({ onUploaded }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-smallest font-medium">Add image</p>
      <MediaUploader storagePath="home/slider" onUploaded={onUploaded} />
    </div>
  );
}
