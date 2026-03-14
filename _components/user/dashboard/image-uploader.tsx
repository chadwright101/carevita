"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { uploadImage } from "@/_actions/upload-image-action";
import { deleteImage } from "@/_actions/delete-image-action";
import ButtonType from "@/_components/ui/button-type";
import { buttonStyles } from "@/_styles/button-styles";

interface Props {
  storagePath: string;
  onUploaded: (url: string) => void;
  currentUrl?: string;
  showPreview?: boolean;
}

export default function ImageUploader({
  storagePath,
  onUploaded,
  currentUrl,
  showPreview = false,
}: Props) {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidFile, setIsValidFile] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    setFileName(file ? file.name : "No file chosen");

    if (!file) {
      setIsValidFile(false);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024;

    const isValid = allowedTypes.includes(file.type) && file.size <= maxSize;
    setIsValidFile(isValid);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setError("Please select a file");
      return;
    }

    const file = fileInputRef.current.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Use JPEG, PNG, or WebP");
      return;
    }

    if (file.size > maxSize) {
      setError("File exceeds 10MB limit");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    formData.append("storagePath", storagePath);

    const result = await uploadImage({}, formData);
    setLoading(false);

    if (result.success && result.data?.url) {
      if (currentUrl) {
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
        <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-2">
          <label
            htmlFor={id}
            className={buttonStyles(undefined, loading, false, "blue")}
          >
            Choose file
          </label>
          <span className="text-smallest italic text-black/70">{fileName}</span>
        </div>
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/webp"
          className="hidden"
          disabled={loading}
          onChange={handleFileChange}
        />
        <ButtonType
          backgroundColor="green"
          type="button"
          onClick={handleUpload}
          disabled={loading || !isValidFile}
        >
          {loading ? "Uploading..." : "Upload"}
        </ButtonType>
      </div>
      {error && <p className="text-white bg-error p-2">{error}</p>}
      {success && <p className="text-green">Successfully uploaded</p>}
      <p className="text-smallest text-error/70">
        Supported formats: JPEG, PNG, WebP. Max file size: 10MB
      </p>
      {showPreview && currentUrl && (
        <Image
          src={currentUrl}
          alt=""
          width={200}
          height={120}
          className="object-cover"
        />
      )}
    </div>
  );
}
