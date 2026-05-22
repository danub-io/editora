"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Strikethrough,
  Code,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjectStore } from "@/stores/projectStore";

export function EditorToolbar({ editor }: { editor: Editor }) {
  const { focusMode, toggleFocusMode, sidebarOpen } = useProjectStore();

  if (!editor) return null;

  const groups = [
    [
      {
        icon: <Heading1 className="h-5 w-5" />,
        onClick: () =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editor.isActive("heading", { level: 1 }),
        label: "Título 1",
      },
      {
        icon: <Heading2 className="h-5 w-5" />,
        onClick: () =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive("heading", { level: 2 }),
        label: "Título 2",
      },
    ],
    [
      {
        icon: <Bold className="h-5 w-5" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
        label: "Negrito",
      },
      {
        icon: <Italic className="h-5 w-5" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
        label: "Itálico",
      },
    ],
    [
      {
        icon: <List className="h-5 w-5" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
        label: "Lista",
      },
      {
        icon: <ListOrdered className="h-5 w-5" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
        label: "Lista Numerada",
      },
    ],
  ];

  return (
    <div className={cn("sticky top-0 z-30 w-full bg-surface-container-lowest/90 backdrop-blur-sm py-2 flex justify-center", sidebarOpen ? "px-4" : "pl-16 pr-4")}>
      <div className="w-full max-w-[800px] flex items-center gap-2">
        {/* Button Groups */}
        <div className="flex items-center gap-1 bg-surface-container-low rounded-lg p-1">
          {groups.map((group, gi) => (
            <div key={gi} className="flex items-center">
              {group.map((btn, bi) => (
                <button
                  key={bi}
                  onClick={btn.onClick}
                  className={cn(
                    "p-1.5 rounded transition-colors flex items-center justify-center",
                    btn.isActive
                      ? "bg-surface-container-highest text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-highest"
                  )}
                  title={btn.label}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Right side: focus mode */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleFocusMode}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded transition-colors"
            title="Modo foco"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
