"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";
import MediaUploader from "@/_components/user/dashboard/media-uploader";

interface Props {
  aboutContent: string;
  setAboutContent: (v: string) => void;
  aboutImage1: string;
  setAboutImage1: (v: string) => void;
  aboutImage2: string;
  setAboutImage2: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
  onPendingAdd?: (url: string) => void;
  onPendingRemove?: (url: string) => void;
}

const AboutSection = forwardRef<HTMLDivElement, Props>(function AboutSection(
  {
    aboutContent,
    setAboutContent,
    aboutImage1,
    setAboutImage1,
    aboutImage2,
    setAboutImage2,
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
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              Content *
              <RichTextEditor value={aboutContent} onChange={setAboutContent} />
            </label>
          </div>
          <div className="grid gap-10 tablet:grid-cols-2">
            <div className="flex flex-col gap-5">
              <span className="font-semibold">Image 1 *</span>
              <MediaUploader
                storagePath="home/about/image1"
                onUploaded={setAboutImage1}
                currentUrl={aboutImage1}
                showPreview
                replaceMode={!!aboutImage1}
                onPendingAdd={onPendingAdd}
                onPendingRemove={onPendingRemove}
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-semibold">Image 2 *</span>
              <MediaUploader
                storagePath="home/about/image2"
                onUploaded={setAboutImage2}
                currentUrl={aboutImage2}
                showPreview
                replaceMode={!!aboutImage2}
                onPendingAdd={onPendingAdd}
                onPendingRemove={onPendingRemove}
              />
            </div>
          </div>
        </div>
      )}
      <input type="hidden" name="aboutContent" value={aboutContent} />
      <input type="hidden" name="aboutImage1" value={aboutImage1} />
      <input type="hidden" name="aboutImage2" value={aboutImage2} />
    </div>
  );
});

export default AboutSection;
