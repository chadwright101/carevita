"use client";

import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
  ourHomesDescription: string;
  setOurHomesDescription: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function OurHomesPageSection({
  ourHomesDescription,
  setOurHomesDescription,
  activeSection,
  toggleSection,
}: Props) {
  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("ourHomesPage")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="text-subheading">Our Homes Page</span>
        <span>{activeSection === "ourHomesPage" ? "−" : "+"}</span>
      </button>
      {activeSection === "ourHomesPage" && (
        <div className="flex flex-col gap-3 p-4 border-t border-black">
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Description</span>
            <RichTextEditor
              value={ourHomesDescription}
              onChange={setOurHomesDescription}
              minHeight="min-h-64"
            />
          </div>
        </div>
      )}
      <input type="hidden" name="ourHomesDescription" value={ourHomesDescription} />
    </div>
  );
}
