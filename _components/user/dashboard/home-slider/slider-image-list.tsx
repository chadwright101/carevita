"use client";

import Image from "next/image";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  images: string[];
  onRemove: (index: number) => void;
  onMove: (index: number, direction: -1 | 1) => void;
}

export default function SliderImageList({ images, onRemove, onMove }: Props) {
  if (images.length === 0) {
    return <p className="text-smallest">No images added yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {images.map((url, index) => (
        <li key={url} className="flex items-center gap-3 p-2 border border-black rounded-md">
          <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded">
            <Image src={url} alt="" fill className="object-cover" />
          </div>
          <p className="text-smallest flex-1 break-all">{url}</p>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => onMove(index, -1)}
              disabled={index === 0}
              className="px-2 py-1 text-smallest border border-black rounded disabled:opacity-30 desktop:hover:cursor-pointer"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => onMove(index, 1)}
              disabled={index === images.length - 1}
              className="px-2 py-1 text-smallest border border-black rounded disabled:opacity-30 desktop:hover:cursor-pointer"
            >
              ↓
            </button>
          </div>
          <ButtonType type="button" strokeColor="red" cssClasses="px-3 py-1 text-smallest" onClick={() => onRemove(index)}>
            Remove
          </ButtonType>
        </li>
      ))}
    </ul>
  );
}
