"use client";

import { useProjectStore } from "@/stores/projectStore";
import { cn } from "@/lib/utils";
import { FileText, Folder } from "lucide-react";
import { useMemo } from "react";

export function Corkboard() {
  const { chapters, activeChapterId, setActiveChapter, updateChapter } = useProjectStore();

  // Se nada tiver sido selecionado no binder, usamos o root
  // Mas como no Scrivener, o Corkboard mostra os FILHOS do documento/pasta atual.
  const parentId = activeChapterId || null;

  const cards = useMemo(() => {
    return chapters
      .filter((c) => c.parentId === parentId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [chapters, parentId]);

  if (cards.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-[#f4f2eb] dark:bg-zinc-950 p-8 text-on-surface-variant text-center">
        <p>Esta pasta/documento não contém sub-documentos.</p>
        <p className="text-sm opacity-70 mt-2">
          Adicione documentos dentro deste item pelo Fichário (Binder) para vê-los aqui no Quadro de Cortiça.
        </p>
      </div>
    );
  }

  // Textura baseada num quadro de cortiça real
  return (
    <div className="flex-1 overflow-y-auto p-8 h-full bg-[#e8e4d8] dark:bg-zinc-900 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onDoubleClick={() => setActiveChapter(card.id)}
            className="group relative bg-[#fdfdfc] dark:bg-zinc-800 shadow-md hover:shadow-lg transition-shadow rounded p-4 border-t-2 border-t-amber-100 dark:border-t-zinc-600 aspect-[3/4] flex flex-col"
          >
            {/* Top Bar of the Card */}
            <div className="flex items-center gap-2 mb-3 border-b border-black/5 dark:border-white/5 pb-2">
              {card.isFolder ? (
                <Folder className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
              ) : (
                <FileText className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
              )}
              <input
                className="font-semibold text-sm w-full bg-transparent outline-none focus:border-b focus:border-primary placeholder:text-gray-400"
                value={card.title}
                onChange={(e) => updateChapter(card.id, { title: e.target.value })}
                placeholder="Título do Documento"
              />
            </div>

            {/* Synopsis Area */}
            <textarea
              className="flex-1 resize-none bg-transparent text-sm w-full outline-none text-gray-700 dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-600 leading-relaxed font-serif"
              value={card.synopsis || ""}
              onChange={(e) => updateChapter(card.id, { synopsis: e.target.value })}
              placeholder="Sinopse do documento..."
            />

            {/* Stamp / Label / Status Indicators */}
            <div className="absolute bottom-2 right-3 left-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
               {card.status && (
                 <span className="text-[10px] uppercase font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-sm">
                   {card.status}
                 </span>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
