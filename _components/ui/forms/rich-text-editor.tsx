"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";

interface ToolbarButton {
  label: string;
  action: () => boolean;
  isActive: () => boolean;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  disabled?: boolean;
  toolbarButtons?: (
    | "bold"
    | "italic"
    | "bulletList"
    | "orderedList"
    | "heading"
  )[];
}

export default function RichTextEditor({
  value,
  onChange,
  minHeight = "min-h-64",
  disabled = false,
  toolbarButtons = ["bold", "italic", "bulletList", "orderedList"],
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none p-3 outline-none [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-3 [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-3 [&_h1]:text-heading [&_h2]:text-subheading [&_h3]:text-paragraph",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const getToolbarButtons = (): ToolbarButton[] => {
    const buttons: Record<string, ToolbarButton> = {
      bold: {
        label: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive("bold"),
      },
      italic: {
        label: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive("italic"),
      },
      bulletList: {
        label: "Bullet List",
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive("bulletList"),
      },
      orderedList: {
        label: "Ordered List",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive("orderedList"),
      },
    };

    return toolbarButtons.map((btn) => buttons[btn]);
  };

  return (
    <div className="border border-black rounded overflow-hidden">
      <div className="border-b border-black p-2 flex gap-1 bg-gray-50">
        {getToolbarButtons().map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.action}
            disabled={disabled}
            className={classNames(
              "px-3 py-1 border border-black rounded desktop:hover:cursor-pointer disabled:opacity-50",
              {
                "bg-black text-white": btn.isActive(),
              },
            )}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <EditorContent
        editor={editor}
        className={classNames(minHeight, {
          "border-black border-t": isFocused,
        })}
      />
    </div>
  );
}
