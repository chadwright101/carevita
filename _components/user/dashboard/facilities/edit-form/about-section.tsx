"use client";

import { useState } from "react";
import Image from "next/image";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
  aboutContent: string;
  aboutImage: string;
  setAboutImage: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function AboutSection({
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
        <div className="flex flex-col gap-3 p-4 border-t border-black">
          <span className="text-smallest">Content</span>
          <RichTextEditor
            value={content}
            onChange={setContent}
            toolbarButtons={["bold", "italic", "bulletList", "orderedList"]}
          />
          <label className="flex flex-col gap-1">
            <span className="text-smallest">About Image URL</span>
            <input
              value={aboutImage}
              onChange={(e) => setAboutImage(e.target.value)}
              className="border border-black rounded p-2"
            />
            {aboutImage && (
              <div className="relative w-20 h-14 overflow-hidden rounded">
                <Image src={aboutImage} alt="" fill className="object-cover" />
              </div>
            )}
          </label>
        </div>
      )}
      <input
        type="hidden"
        name="aboutParagraphs"
        value={content}
      />
      <input type="hidden" name="aboutImage" value={aboutImage} />
    </div>
  );
}
