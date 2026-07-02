"use client";

import { useProjectStore } from "@/stores/projectStore";
import { cn } from "@/lib/utils";
import { FileText, Folder } from "lucide-react";
import { useMemo } from "react";

export function Outliner() {
  const { chapters, activeChapterId, updateChapter, setActiveChapter } = useProjectStore();

  const parentId = activeChapterId || null;

  const rows = useMemo(() => {
    return chapters
      .filter((c) => c.parentId === parentId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [chapters, parentId]);

  if (rows.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-background p-8 text-on-surface-variant text-center">
        <p>Esta pasta/documento não contém sub-documentos.</p>
        <p className="text-sm opacity-70 mt-2">
          Adicione documentos dentro deste item pelo Fichário (Binder) para vê-los no Outliner.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto h-full bg-background text-sm">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-10 text-on-surface-variant text-xs uppercase tracking-wider">
            <th className="px-4 py-3 font-semibold w-1/3">Título</th>
            <th className="px-4 py-3 font-semibold w-2/5">Sinopse</th>
            <th className="px-4 py-3 font-semibold w-32">Rótulo</th>
            <th className="px-4 py-3 font-semibold w-32">Status</th>
            <th className="px-4 py-3 font-semibold w-24 text-right">Palavras</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-surface-container-lowest transition-colors group cursor-default"
            >
              {/* Title */}
              <td className="px-4 py-2 align-top">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setActiveChapter(row.id)}
                >
                  {row.isFolder ? (
                    <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-on-surface-variant shrink-0" />
                  )}
                  <input
                    className="font-semibold text-on-surface bg-transparent outline-none border-b border-transparent focus:border-primary w-full"
                    value={row.title}
                    onChange={(e) => updateChapter(row.id, { title: e.target.value })}
                  />
                </div>
              </td>

              {/* Synopsis */}
              <td className="px-4 py-2 align-top">
                <textarea
                  className="w-full h-full min-h-[40px] resize-y bg-transparent outline-none border border-transparent focus:border-outline-variant rounded p-1 text-on-surface-variant text-[13px] font-serif"
                  value={row.synopsis || ""}
                  onChange={(e) => updateChapter(row.id, { synopsis: e.target.value })}
                  placeholder="Sinopse..."
                />
              </td>

              {/* Label */}
              <td className="px-4 py-2 align-top">
                <select
                  className="w-full bg-transparent outline-none text-on-surface-variant border border-transparent hover:border-outline-variant focus:border-primary rounded p-1"
                  value={row.label || ""}
                  onChange={(e) => updateChapter(row.id, { label: e.target.value })}
                >
                  <option value="">Sem Rótulo</option>
                  <option value="Conceito">Conceito</option>
                  <option value="Capítulo">Capítulo</option>
                  <option value="Cena">Cena</option>
                </select>
              </td>

              {/* Status */}
              <td className="px-4 py-2 align-top">
                <select
                  className="w-full bg-transparent outline-none text-on-surface-variant border border-transparent hover:border-outline-variant focus:border-primary rounded p-1"
                  value={row.status || ""}
                  onChange={(e) => updateChapter(row.id, { status: e.target.value })}
                >
                  <option value="">Sem Status</option>
                  <option value="Fazer">A Fazer</option>
                  <option value="Rascunho">Primeiro Rascunho</option>
                  <option value="Revisado">Revisado</option>
                  <option value="Pronto">Pronto</option>
                </select>
              </td>

              {/* Word Count */}
              <td className="px-4 py-2 align-top text-right text-on-surface-variant/70 tabular-nums">
                {row.wordCount?.toLocaleString("pt-BR") || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
