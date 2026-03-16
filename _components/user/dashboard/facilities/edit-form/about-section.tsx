"use client";

import { useState } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
  facilitySlug: string;
  aboutContent: string;
  aboutImage: string;
  setAboutImage: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function AboutSection({
  facilitySlug,
  aboutContent,
  aboutImage,
  setAboutImage,
  activeSection,
  toggleSection,
}: Props) {
  const [content, setContent] = useState(aboutContent);

  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("about")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="text-subheading">About</span>
        <span>{activeSection === "about" ? "−" : "+"}</span>
      </button>
      {activeSection === "about" && (
        <div className="flex flex-col gap-10 px-5 py-7 border-t border-black">
          <div className="flex flex-col gap-5">
            <span className="font-semibold">Content</span>
            <RichTextEditor
              value={content}
              onChange={setContent}
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="font-semibold">Image</span>
            <MediaUploader
              storagePath={`facilities/${facilitySlug}/about`}
              onUploaded={setAboutImage}
              currentUrl={aboutImage}
              showPreview
            />
          </div>
        </div>
      )}
      <input type="hidden" name="aboutParagraphs" value={content} />
      <input type="hidden" name="aboutImage" value={aboutImage} />
    </div>
  );
}
