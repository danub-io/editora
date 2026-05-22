"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { useEffect, useRef, useCallback, useState } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { SelectionToolbar } from "./SelectionToolbar";
import { cn } from "@/lib/utils";
import { Check, Loader2, AlertCircle, Minimize2 } from "lucide-react";

export function Editor({ chapterId }: { chapterId: string }) {
  const { getChapter, updateChapter, focusMode, toggleFocusMode, setActiveChapter } = useProjectStore();
  const chapter = getChapter(chapterId);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(chapter?.title || "");
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Sync editTitle when chapter changes
  useEffect(() => {
    setEditTitle(chapter?.title || "");
  }, [chapter?.title]);

  const handleSaveTitle = useCallback(async () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== chapter?.title) {
      await updateChapter(chapterId, { title: trimmed });
    }
    setIsEditingTitle(false);
  }, [editTitle, chapter?.title, chapterId, updateChapter]);

  const handleTitleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleInputRef.current?.blur();
    }
  }, []);

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
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Comece a escrever seu capítulo...",
      }),
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
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
    <div className="flex flex-col h-full bg-background">
      <SelectionToolbar editor={editor} focusMode={focusMode} />

      {/* Exit focus mode button */}
      {focusMode && (
        <button
          onClick={toggleFocusMode}
          className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
          title="Sair do modo foco"
        >
          <Minimize2 className="h-5 w-5" />
        </button>
      )}
      
      {/* Status de Salvamento */}
      {!focusMode && (
      <div className="absolute right-6 top-20 flex items-center gap-1.5 text-xs text-muted-foreground">
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
        <div className={cn("w-full", focusMode ? "max-w-2xl" : "max-w-3xl")}>

        <article>
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={handleTitleKeyDown}
              className={cn(
                "w-full bg-transparent font-serif text-3xl outline-none pb-0.5",
                focusMode ? "mb-8 text-center" : "mb-4"
              )}
              autoFocus
            />
          ) : (
            <h1
              onClick={() => setIsEditingTitle(true)}
              className={cn(
                "font-serif text-3xl outline-none cursor-pointer hover:text-primary/80 transition-colors",
                focusMode ? "mb-8 text-center" : "mb-4"
              )}
              title="Clique para editar o título"
            >
              {chapter?.title || "Sem Título"}
            </h1>
          )}
          <div className={cn("outline-none", focusMode ? "text-foreground/85 space-y-4 leading-relaxed" : "text-foreground")}>
            <EditorContent editor={editor} />
          </div>
        </article>
        </div>
      </div>
    </div>
  );
}
