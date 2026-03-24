"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
  facilitySlug: string;
  aboutContent: string;
  setAboutContent: (v: string) => void;
  aboutImage: string;
  setAboutImage: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
  onPendingAdd?: (url: string) => void;
  onPendingRemove?: (url: string) => void;
}

const AboutSection = forwardRef<HTMLDivElement, Props>(function AboutSection(
  {
    facilitySlug,
    aboutContent,
    setAboutContent,
    aboutImage,
    setAboutImage,
    activeSection,
    toggleSection,
    error,
    onPendingAdd,
    onPendingRemove,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className="border border-black rounded-md overflow-hidden scroll-mt-24"
    >
      <button
        type="button"
        onClick={() => toggleSection("about")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <span
            className={classNames("text-subheading", { "text-error": error })}
          >
            About
          </span>
          {error && <span className="text-error text-smallest">{error}</span>}
        </span>
        <span>{activeSection === "about" ? "−" : "+"}</span>
      </button>
      {activeSection === "about" && (
        <div className="flex flex-col gap-10 px-5 py-7 border-t border-black">
          <div className="flex flex-col gap-5">
            <span className="font-semibold">Content *</span>
            <RichTextEditor value={aboutContent} onChange={setAboutContent} />
          </div>
          <div className="flex flex-col gap-5">
            <span className="font-semibold">Image *</span>
            <MediaUploader
              storagePath={`facilities/${facilitySlug}/about`}
              onUploaded={setAboutImage}
              currentUrl={aboutImage}
              showPreview
              replaceMode={!!aboutImage}
              onPendingAdd={onPendingAdd}
              onPendingRemove={onPendingRemove}
            />
          </div>
        </div>
      )}
      <input type="hidden" name="aboutParagraphs" value={aboutContent} />
      <input type="hidden" name="aboutImage" value={aboutImage} />
    </div>
  );
});

export default AboutSection;
