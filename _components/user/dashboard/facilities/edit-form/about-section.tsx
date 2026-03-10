import Image from "next/image";

interface Props {
  aboutParagraphs: string[];
  setAboutParagraphs: React.Dispatch<React.SetStateAction<string[]>>;
  aboutImage: string;
  setAboutImage: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function AboutSection({
  aboutParagraphs,
  setAboutParagraphs,
  aboutImage,
  setAboutImage,
  activeSection,
  toggleSection,
}: Props) {
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
          <span className="text-smallest">Paragraphs</span>
          {aboutParagraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={p}
                onChange={(e) =>
                  setAboutParagraphs((prev) =>
                    prev.map((v, j) => (j === i ? e.target.value : v))
                  )
                }
                rows={3}
                className="border border-black rounded p-2 flex-1"
              />
              <button
                type="button"
                onClick={() =>
                  setAboutParagraphs((prev) => prev.filter((_, j) => j !== i))
                }
                className="desktop:hover:cursor-pointer self-start"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setAboutParagraphs((prev) => [...prev, ""])}
            className="desktop:hover:cursor-pointer self-start"
          >
            Add Paragraph
          </button>
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
        value={JSON.stringify(aboutParagraphs)}
      />
      <input type="hidden" name="aboutImage" value={aboutImage} />
    </div>
  );
}
