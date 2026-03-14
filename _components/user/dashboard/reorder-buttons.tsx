"use client";

import classNames from "classnames";

interface Props {
  index: number;
  total: number;
  onMove: (direction: -1 | 1) => void;
  disabled?: boolean;
}

export default function ReorderButtons({
  index,
  total,
  onMove,
  disabled = false,
}: Props) {
  return (
    <div className="grid gap-2 h-full">
      <button
        type="button"
        onClick={() => onMove(-1)}
        disabled={index === 0 || disabled}
        className={classNames(
          "px-5 text-smallest border border-black rounded disabled:opacity-30 tablet:hover:cursor-pointer tablet:hover:bg-black/5 eae-in-out duration-300",
          { "hover:desktop:cursor-not-allowed": index === 0 },
        )}
      >
        ↑
      </button>
      <button
        type="button"
        onClick={() => onMove(1)}
        disabled={index === total - 1 || disabled}
        className={classNames(
          "px-5 text-smallest border border-black rounded tablet:px-3 disabled:opacity-30 tablet:hover:cursor-pointer tablet:hover:bg-black/5 eae-in-out duration-300",
          { "hover:desktop:cursor-not-allowed": index === total - 1 },
        )}
      >
        ↓
      </button>
    </div>
  );
}
