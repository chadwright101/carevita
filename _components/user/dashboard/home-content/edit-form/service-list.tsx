"use client";

import { useState } from "react";
import classNames from "classnames";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import ReorderButtons from "@/_components/user/dashboard/reorder-buttons";
import { Service } from "@/_types/home-types";
import { X } from "lucide-react";
import ButtonType from "@/_components/ui/button-type";
import { deleteImage } from "@/_actions/delete-image-action";

interface Props {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export default function ServiceList({ services, setServices }: Props) {
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  return (
    <div className="grid tablet:grid-cols-2 gap-10 px-5 py-7 border-t border-black">
      {services.map((service, i) => (
        <div
          key={i}
          className="flex flex-col gap-5 border border-black/25 p-5 rounded"
        >
          {confirmIndex === i && (
            <p className="text-smaller text-error">
              Are you sure you want to delete this service?
            </p>
          )}
          <div className="grid phone:grid-cols-[1fr_80px] gap-5">
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-1">
                <span className="font-semibold">Heading *</span>
                <input
                  value={service.title}
                  onChange={(e) =>
                    setServices((prev) =>
                      prev.map((s, j) =>
                        j === i ? { ...s, title: e.target.value } : s,
                      ),
                    )
                  }
                  className="border border-black rounded p-2"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-semibold">
                  Description * ({service.description.length}/500)
                </span>
                <textarea
                  value={service.description}
                  maxLength={500}
                  rows={10}
                  onChange={(e) =>
                    setServices((prev) =>
                      prev.map((s, j) =>
                        j === i ? { ...s, description: e.target.value } : s,
                      ),
                    )
                  }
                  className="border border-black rounded p-2 resize-none"
                />
              </label>
            </div>
            <div className="flex flex-row-reverse order-first gap-2 justify-between phone:justify-start phone:flex-col phone:items-end phone:order-last">
              {confirmIndex === i && (
                <button
                  type="button"
                  onClick={() => setConfirmIndex(null)}
                  className="p-2 rounded desktop:hover:cursor-pointer ease-in-out duration-300 desktop:hover:opacity-80 bg-black/25"
                >
                  <span className="text-white text-smallest font-semibold">
                    Cancel
                  </span>
                </button>
              )}
              {services.length > 3 && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirmIndex === i) {
                      if (service.image) deleteImage(service.image);
                      setServices((prev) => prev.filter((_, j) => j !== i));
                      setConfirmIndex(null);
                    } else {
                      setConfirmIndex(i);
                    }
                  }}
                  className={classNames(
                    "rounded desktop:hover:cursor-pointer desktop:hover:opacity-80 transition-opacity duration-300",
                    confirmIndex === i ? "bg-error p-2" : "bg-error/75 p-4",
                  )}
                >
                  {confirmIndex === i ? (
                    <span className="text-white text-smallest font-semibold">
                      Confirm
                    </span>
                  ) : (
                    <X color="#ffffff" size={20} />
                  )}
                </button>
              )}
              {confirmIndex !== i && (
                <ReorderButtons
                  index={i}
                  total={services.length}
                  onMove={(direction) =>
                    setServices((prev) => {
                      const next = [...prev];
                      const target = i + direction;
                      [next[i], next[target]] = [next[target], next[i]];
                      return next;
                    })
                  }
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold">Image *</span>
            <MediaUploader
              storagePath="home/services"
              onUploaded={(url) =>
                setServices((prev) =>
                  prev.map((s, j) => (j === i ? { ...s, image: url } : s)),
                )
              }
              currentUrl={service.image}
              showPreview
              replaceMode={!!service.image}
            />
          </div>
        </div>
      ))}
      {services.length < 5 && (
        <ButtonType
          type="button"
          backgroundColor="blue"
          cssClasses="mr-auto self-center"
          onClick={() =>
            setServices((prev) => [
              ...prev,
              { title: "", description: "", image: "" },
            ])
          }
        >
          Add Service
        </ButtonType>
      )}
    </div>
  );
}
