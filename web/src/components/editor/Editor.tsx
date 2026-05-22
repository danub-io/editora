"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useCallback, useState } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { EditorToolbar } from "./EditorToolbar";
import { cn } from "@/lib/utils";
import { Check, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

export function Editor({ chapterId }: { chapterId: string }) {
  const { getChapter, updateChapter, focusMode, setActiveChapter } = useProjectStore();
  const chapter = getChapter(chapterId);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Debounced save to API (800ms after stop typing)
  const debouncedSave = useCallback(
    (html: string, wordCount: number) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      
      setSaveStatus('saving');
      
      saveTimerRef.current = setTimeout(async () => {
        try {
          await updateChapter(chapterId, { content: html, wordCount });
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (e) {
          setSaveStatus('error');
        }
      }, 800);
    },
    [chapterId, updateChapter]
  );

  const editor = useEditor({
    immediatelyRender: false,
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
      {!focusMode && <EditorToolbar editor={editor} />}
      
      {/* Status de Salvamento */}
      {!focusMode && (
        <div className="absolute right-6 top-[5.5rem] flex items-center gap-1.5 text-xs text-on-surface-variant">
          {saveStatus === 'saving' && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {saveStatus === 'saved' && <Check className="h-3.5 w-3.5 text-green-600" />}
          {saveStatus === 'error' && <AlertCircle className="h-3.5 w-3.5 text-red-600" />}
          
          <span>
            {saveStatus === 'saving' && 'Salvando...'}
            {saveStatus === 'saved' && 'Salvo'}
            {saveStatus === 'error' && 'Erro ao salvar'}
          </span>
        </div>
      )}
      <div className={cn("flex-1 overflow-y-auto px-8 flex justify-center", focusMode ? "pb-32 pt-20 lg:pt-32" : "pb-32 pt-16")}>
        <div className="w-full max-w-[800px]">
          {!focusMode && (
            <button
              onClick={() => setActiveChapter(null)}
              className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors py-3 -ml-1 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              Voltar ao Dashboard
            </button>
          )}
        <article>
          <h1 className={cn("font-serif text-editor-chapter text-on-surface outline-none", focusMode ? "mb-12 uppercase text-center tracking-widest" : "mb-12")}>
            {chapter?.title || "Sem Título"}
          </h1>
          <div className={cn("font-serif text-editor-text outline-none", focusMode ? "text-on-surface-variant space-y-8 leading-relaxed" : "text-on-surface")}>
            <EditorContent editor={editor} />
          </div>
        </article>
        </div>
      </div>
    </div>
  );
}
