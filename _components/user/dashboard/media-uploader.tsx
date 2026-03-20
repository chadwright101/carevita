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
}

export default function MediaUploader({
  storagePath,
  onUploaded,
  currentUrl,
  showPreview = false,
  mediaType = "image",
  maxSizeMb,
  dimensionNote,
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
    ? ["video/mp4", "video/webm"]
    : ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const defaultMaxMb = isVideo ? 3 : 10;
  const effectiveMaxMb = maxSizeMb ?? defaultMaxMb;
  const maxSize = effectiveMaxMb * 1024 * 1024;
  const acceptAttr = isVideo
    ? "video/mp4,video/webm"
    : "image/jpg,image/jpeg,image/png,image/webp";
  const formatNote = isVideo
    ? `Supported formats: MP4, WebM. Max file size: ${effectiveMaxMb}MB`
    : "Supported formats: JPEG, PNG, WebP. Max file size: 10MB";

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    setFileName(file ? file.name : "No file chosen");

    if (!file) {
      setIsValidFile(false);
      return;
    }

    const isValid = allowedTypes.includes(file.type) && file.size <= maxSize;
    setIsValidFile(isValid);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setError("Please select a file");
      return;
    }

    const file = fileInputRef.current.files[0];

    if (!allowedTypes.includes(file.type)) {
      setError(
        isVideo
          ? "Invalid file type. Use MP4 or WebM"
          : "Invalid file type. Use JPEG, PNG, or WebP",
      );
      return;
    }

    if (file.size > maxSize) {
      setError(isVideo ? "File exceeds 3MB limit" : "File exceeds 10MB limit");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    formData.append("storagePath", storagePath);
    if (isVideo) {
      formData.append("maxSizeBytes", String(maxSize));
    }

    const result = isVideo
      ? await uploadVideo({}, formData)
      : await uploadImage({}, formData);
    setLoading(false);

    if (result.success && result.data?.url) {
      if (!isVideo && currentUrl) {
        await deleteImage(currentUrl);
      }
      onUploaded(result.data.url);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } else {
      setError(result.error || "Upload failed");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-5 tablet:justify-start">
        <div className="flex flex-col w-full min-[500px]:flex-row overflow-hidden min-[500px]:items-center gap-2">
          <label
            htmlFor={id}
            className={classNames(
              "shrink-0 w-full min-[500px]:w-auto",
              buttonStyles(undefined, loading, false, "blue"),
            )}
          >
            Choose file
          </label>
          <span className="text-smallest italic text-black/70 max-w-[65vw] phone:max-w-[240px] truncate">
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
          className="desktop:hover:cursor-pointer w-fit"
        >
          <video
            src={currentUrl}
            preload="metadata"
            className="w-[200px] h-[120px] object-cover pointer-events-none"
          />
        </Link>
      )}
    </div>
  );
}
