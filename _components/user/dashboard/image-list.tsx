"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import ReorderButtons from "./reorder-buttons";

interface Props {
  urls: string[];
  onRemove: (url: string, index: number) => void;
  onMove?: (index: number, direction: -1 | 1) => void;
}

export default function ImageList({ urls, onRemove, onMove }: Props) {
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  const handleDeleteClick = (url: string, index: number) => {
    if (confirmIndex === index) {
      onRemove(url, index);
      setConfirmIndex(null);
    } else {
      setConfirmIndex(index);
    }
  };

  return (
    <div className="flex flex-wrap gap-5">
      {urls.map((url, i) => (
        <div key={i} className="flex gap-2">
          {url && (
            <div className="relative w-[160px] phone:w-[260px] aspect-[4/3] desktop:w-[234px]">
              <div className="w-full h-full overflow-hidden">
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover h-full w-full"
                />
              </div>
              <button
                type="button"
                onClick={() => handleDeleteClick(url, i)}
                onBlur={() => setConfirmIndex(null)}
                className={`p-2 absolute top-3 right-3 rounded tablet:hover:cursor-pointer ease-in-out duration-300 ${
                  confirmIndex === i
                    ? "bg-error tablet:hover:opacity-80"
                    : "bg-error/75 tablet:hover:opacity-80"
                }`}
              >
                {confirmIndex === i ? (
                  <span className="text-white text-smallest font-semibold">
                    Confirm
                  </span>
                ) : (
                  <X color="#ffffff" size={20} />
                )}
              </button>
              <span className="absolute top-3 font-semibold left-3 text-smallest rounded grid place-items-center size-7 bg-white/75">
                {i + 1}
              </span>
            </div>
          )}
          {onMove && (
            <ReorderButtons
              index={i}
              total={urls.length}
              onMove={(direction) => onMove(i, direction)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
