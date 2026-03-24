"use client";

import { useEffect } from "react";
import { deleteImage } from "@/_actions/delete-image-action";

const KEY = "carevita_pending_uploads";

function getPending(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function setPending(urls: string[]) {
  localStorage.setItem(KEY, JSON.stringify(urls));
}

export function usePendingUploads() {
  useEffect(() => {
    const pending = getPending();
    if (pending.length === 0) return;
    setPending([]);
    pending.forEach((url) => deleteImage(url));
  }, []);

  function addPending(url: string) {
    setPending([...getPending(), url]);
  }

  function removePending(url: string) {
    setPending(getPending().filter((u) => u !== url));
  }

  function clearAll() {
    setPending([]);
  }

  return { addPending, removePending, clearAll };
}
