"use client";

import { useProjectStore } from "@/stores/projectStore";
import { cn } from "@/lib/utils";
import { FileText, Tags, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function Inspector() {
  const { activeChapterId, getChapter, updateChapter } = useProjectStore();
  const chapter = activeChapterId ? getChapter(activeChapterId) : null;

  // Local state for debouncing
  const [synopsis, setSynopsis] = useState("");
  const [notes, setNotes] = useState("");

  // Sync local state when chapter changes
  useEffect(() => {
    if (chapter) {
      setSynopsis(chapter.synopsis || "");
      setNotes(chapter.notes || "");
    }
  }, [chapter?.id]);

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center h-full text-on-surface-variant p-6 text-center text-sm bg-surface">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-8 h-8 opacity-20" />
          <p>Nenhum documento selecionado</p>
        </div>
      </div>
    );
  }

  const handleSynopsisBlur = () => {
    if (synopsis !== (chapter.synopsis || "")) {
      updateChapter(chapter.id, { synopsis });
    }
  };

  const handleNotesBlur = () => {
    if (notes !== (chapter.notes || "")) {
      updateChapter(chapter.id, { notes });
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface border-l border-outline-variant overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b border-outline-variant shrink-0 bg-surface-container-lowest">
        <h3 className="text-sm font-semibold text-on-surface truncate pr-4">
          {chapter.title}
        </h3>
        <div className="text-[11px] text-on-surface-variant uppercase tracking-wider mt-1">
          {chapter.wordCount?.toLocaleString("pt-BR") || 0} palavras
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1">

        {/* Synopsis Area (Styled like an index card) */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
            <FileText className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Sinopse</h4>
          </div>
          <div className="bg-[#fdfdfc] dark:bg-zinc-800 rounded shadow-sm border-t-2 border-t-amber-100 dark:border-t-zinc-600 p-3 relative aspect-[5/3]">
             <textarea
              className="w-full h-full resize-none bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 font-serif leading-relaxed"
              placeholder="Resumo do documento..."
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              onBlur={handleSynopsisBlur}
            />
          </div>
        </div>

        {/* Meta Data */}
        <div className="space-y-4 border-t border-outline-variant/50 pt-4">
          <div className="flex items-center gap-2 text-on-surface-variant mb-3">
            <Tags className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Metadados</h4>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-on-surface-variant">Rótulo</label>
              <select
                className="w-full bg-surface-container-lowest outline-none text-on-surface border border-outline-variant focus:border-primary rounded p-1.5 text-sm"
                value={chapter.label || ""}
                onChange={(e) => updateChapter(chapter.id, { label: e.target.value })}
              >
                <option value="">Nenhum Rótulo</option>
                <option value="Conceito">Conceito</option>
                <option value="Capítulo">Capítulo</option>
                <option value="Cena">Cena</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-on-surface-variant">Status</label>
              <select
                className="w-full bg-surface-container-lowest outline-none text-on-surface border border-outline-variant focus:border-primary rounded p-1.5 text-sm"
                value={chapter.status || ""}
                onChange={(e) => updateChapter(chapter.id, { status: e.target.value })}
              >
                <option value="">Nenhum Status</option>
                <option value="Fazer">A Fazer</option>
                <option value="Rascunho">Primeiro Rascunho</option>
                <option value="Revisado">Revisado</option>
                <option value="Pronto">Pronto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Document Notes */}
        <div className="border-t border-outline-variant/50 pt-4 flex-1 flex flex-col min-h-[200px]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Notas do Documento</h4>
          <textarea
            className="flex-1 w-full resize-none bg-surface-container-lowest border border-outline-variant focus:border-primary rounded p-3 text-sm text-on-surface outline-none"
            placeholder="Anotações, ideias, ou pesquisas para este documento específico..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleNotesBlur}
          />
        </div>

      </div>
    </div>
  );
}
