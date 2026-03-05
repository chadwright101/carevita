"use client";

import { useState, useActionState } from "react";
import { updateHomeSlider } from "@/_actions/admin-home-actions";
import SliderImageList from "./slider-image-list";
import SliderImageUploader from "./slider-image-uploader";

interface Props {
  images: string[];
}

const initialState = { success: false, error: "" };

export default function HomeSliderSection({ images }: Props) {
  const [current, setCurrent] = useState(images);
  const [state, formAction] = useActionState(updateHomeSlider, initialState);

  function handleUploaded(url: string) {
    setCurrent((prev) => [...prev, url]);
  }

  function handleRemove(index: number) {
    setCurrent((prev) => prev.filter((_, i) => i !== index));
  }

  function handleMove(index: number, direction: -1 | 1) {
    const next = [...current];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setCurrent(next);
  }

  return (
    <section className="flex flex-col gap-4">
      <h2>Home Slider</h2>
      <div className="flex flex-col gap-4 p-4 border border-black rounded-md">
        <SliderImageList
          images={current}
          onRemove={handleRemove}
          onMove={handleMove}
        />
        <SliderImageUploader onUploaded={handleUploaded} />
        <form action={formAction}>
          <input type="hidden" name="ourHomesSliderHomePage" value={JSON.stringify(current)} />
          {state.error && <p className="text-error text-smallest mb-2">{state.error}</p>}
          {state.success && <p className="text-green text-smallest mb-2">Saved successfully</p>}
          <button
            type="submit"
            className="px-6 py-2 bg-blue text-white rounded desktop:hover:cursor-pointer"
          >
            Save Slider
          </button>
        </form>
      </div>
    </section>
  );
}
