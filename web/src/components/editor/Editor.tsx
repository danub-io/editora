"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useCallback } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { EditorToolbar } from "./EditorToolbar";

export function Editor({ chapterId }: { chapterId: string }) {
  const { getChapter, updateChapter } = useProjectStore();
  const chapter = getChapter(chapterId);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced save to API (800ms after stop typing)
  const debouncedSave = useCallback(
    (html: string, wordCount: number) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        updateChapter(chapterId, { content: html, wordCount });
      }, 800);
    },
    [chapterId, updateChapter]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Comece a escrever seu capítulo...",
      }),
    ],
    content: chapter?.content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
      debouncedSave(html, wordCount);
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && chapter && editor.getHTML() !== chapter.content) {
      editor.commands.setContent(chapter.content || "");
    }
  }, [chapterId, editor, chapter]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  if (!editor) return null;

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      <EditorToolbar editor={editor} />
      <div className="flex-1 overflow-y-auto px-8 pb-32 pt-16 flex justify-center">
        <article className="w-full max-w-[800px]">
          <h1 className="font-serif text-editor-chapter text-on-surface mb-12">
            {chapter?.title || "Sem Título"}
          </h1>
          <div className="font-serif text-editor-text text-on-surface">
            <EditorContent editor={editor} />
          </div>
        </article>
      </div>
    </div>
  );
}
