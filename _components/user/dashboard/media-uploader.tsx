"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { uploadImage } from "@/_actions/upload-image-action";
import { uploadVideo } from "@/_actions/upload-video-action";
import { deleteImage } from "@/_actions/delete-image-action";
import ButtonType from "@/_components/ui/button-type";
import { buttonStyles } from "@/_styles/button-styles";
import classNames from "classnames";

interface Props {
  storagePath: string;
  onUploaded: (url: string) => void;
  currentUrl?: string;
  showPreview?: boolean;
  mediaType?: "image" | "video";
  maxSizeMb?: number;
  dimensionNote?: string;
  multiple?: boolean;
  maxFiles?: number;
  replaceMode?: boolean;
  videoFormat?: "mp4" | "webm";
  onPendingAdd?: (url: string) => void;
  onPendingRemove?: (url: string) => void;
}

export default function MediaUploader({
  storagePath,
  onUploaded,
  currentUrl,
  showPreview = false,
  mediaType = "image",
  maxSizeMb,
  dimensionNote,
  multiple,
  maxFiles,
  replaceMode,
  videoFormat,
  onPendingAdd,
  onPendingRemove,
}: Props) {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidFile, setIsValidFile] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  const isVideo = mediaType === "video";
  const allowedTypes = isVideo
    ? videoFormat === "mp4"
      ? ["video/mp4"]
      : videoFormat === "webm"
        ? ["video/webm"]
        : ["video/mp4", "video/webm"]
    : ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const defaultMaxMb = isVideo ? 7 : 10;
  const effectiveMaxMb = maxSizeMb ?? defaultMaxMb;
  const maxSize = effectiveMaxMb * 1024 * 1024;
  const acceptAttr = isVideo
    ? videoFormat === "mp4"
      ? "video/mp4"
      : videoFormat === "webm"
        ? "video/webm"
        : "video/mp4,video/webm"
    : "image/jpg,image/jpeg,image/png,image/webp";
  const formatNote = isVideo
    ? videoFormat === "mp4"
      ? `Supported formats: MP4. Max file size: ${effectiveMaxMb}MB`
      : videoFormat === "webm"
        ? `Supported formats: WebM. Max file size: ${effectiveMaxMb}MB`
        : `Supported formats: MP4, WebM. Max file size: ${effectiveMaxMb}MB`
    : "Supported formats: JPEG, PNG, WebP. Max file size: 10MB";

  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      setFileName("No file chosen");
      setIsValidFile(false);
      return;
    }
    const fileArray = Array.from(files);
    if (maxFiles && fileArray.length > maxFiles) {
      setError(`Max ${maxFiles} files allowed to be uploaded at a time`);
      setIsValidFile(false);
      setFileName("No file chosen");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setError("");
    setFileName(
      fileArray.length === 1
        ? fileArray[0].name
        : `${fileArray.length} files selected`,
    );
    setIsValidFile(
      fileArray.every(
        (f) => allowedTypes.includes(f.type) && f.size <= maxSize,
      ),
    );
  };

  const handleUpload = async () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      setError("Please select a file");
      return;
    }

    const fileArray = Array.from(files);

    if (maxFiles && fileArray.length > maxFiles) {
      setError(`Max ${maxFiles} files allowed to be uploaded at a time`);
      return;
    }

    for (const file of fileArray) {
      if (!allowedTypes.includes(file.type)) {
        setError(
          isVideo
            ? "Invalid file type. Use MP4 or WebM"
            : "Invalid file type. Use JPEG, PNG, or WebP",
        );
        return;
      }
      if (file.size > maxSize) {
        setError(
          isVideo ? "File exceeds 3MB limit" : "File exceeds 10MB limit",
        );
        return;
      }
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    for (const file of fileArray) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("storagePath", storagePath);
      if (isVideo) {
        formData.append("maxSizeBytes", String(maxSize));
      }

      const result = isVideo
        ? await uploadVideo({}, formData)
        : await uploadImage({}, formData);

      if (result.success && result.data?.url) {
        if (!multiple && currentUrl) {
          await deleteImage(currentUrl);
          onPendingRemove?.(currentUrl);
        }
        onUploaded(result.data.url);
        onPendingAdd?.(result.data.url);
      } else {
        setError(result.error || "Upload failed");
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileName("No file chosen");
    setIsValidFile(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div
      className={classNames(
        "grid gap-5 tablet:gap-y-3",
        isVideo &&
          showPreview &&
          currentUrl &&
          "tablet:gap-x-10 tablet:grid-cols-[325px_1fr]",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-5 tablet:justify-start">
        <div className="flex flex-col w-full min-[500px]:flex-row overflow-hidden min-[500px]:items-center gap-2">
          <label
            htmlFor={id}
            className={classNames(
              "shrink-0 w-full min-[500px]:w-auto",
              buttonStyles(undefined, loading, false, "blue"),
            )}
          >
            {multiple
              ? replaceMode
                ? `Replace ${isVideo ? "video" : "image"}s`
                : `Choose ${isVideo ? "video" : "image"}s`
              : replaceMode
                ? `Replace ${isVideo ? "video" : "image"}`
                : `Choose ${isVideo ? "video" : "image"}`}
          </label>
          <span className="text-smallest italic text-black/70 max-w-[65vw] phone:max-w-[260px] truncate">
            {fileName}
          </span>
        </div>
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept={acceptAttr}
          className="hidden"
          disabled={loading}
          onChange={handleFileChange}
          multiple={multiple}
        />
        <ButtonType
          backgroundColor="green"
          type="button"
          onClick={handleUpload}
          disabled={loading || !isValidFile}
          cssClasses="w-full min-[500px]:w-auto"
        >
          {loading ? "Uploading..." : "Upload"}
        </ButtonType>
      </div>
      {error && <p className="text-white bg-error p-2">{error}</p>}
      {success && <p className="text-green">Successfully uploaded</p>}
      <p className="text-smallest text-error/70">{formatNote}</p>
      {dimensionNote && (
        <p className="text-smallest text-black/70 italic">{dimensionNote}</p>
      )}
      {!isVideo && showPreview && currentUrl && (
        <Image
          src={currentUrl}
          alt=""
          width={200}
          height={120}
          className="object-cover"
        />
      )}
      {isVideo && showPreview && currentUrl && (
        <Link
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tablet:col-start-2 tablet:row-start-1 tablet:row-span-3 desktop:hover:cursor-pointer w-fit"
        >
          <video
            src={currentUrl}
            preload="metadata"
            className="h-[120px] aspect-video w-auto object-cover pointer-events-none tablet:h-[180px]"
          />
        </Link>
      )}
    </div>
  );
}
