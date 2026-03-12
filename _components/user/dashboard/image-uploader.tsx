"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/_actions/upload-image-action";
import { deleteImage } from "@/_actions/delete-image-action";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  storagePath: string;
  onUploaded: (url: string) => void;
  currentUrl?: string;
}

export default function ImageUploader({
  storagePath,
  onUploaded,
  currentUrl,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidFile, setIsValidFile] = useState(false);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setIsValidFile(false);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024;

    const isValid =
      allowedTypes.includes(file.type) && file.size <= maxSize;
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
    <div className="flex flex-col gap-2">
      <p className="text-smallest text-gray-500">
        Supported formats: JPEG, PNG, WebP. Max file size: 10MB
      </p>
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/webp"
          className="text-smallest desktop:hover:cursor-pointer"
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
      {error && <p className="text-error text-smallest">{error}</p>}
      {success && <p className="text-green text-smallest">Uploaded</p>}
    </div>
  );
}
