"use client";

import { useProjectStore } from "@/stores/projectStore";
import { BinderTree } from "./BinderTree";
import { Plus, FolderPlus, FilePlus } from "lucide-react";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Binder() {
  const { activeProjectId, chapters, createChapter } = useProjectStore();

  // Root items are those without a parent
  const rootItems = useMemo(() => {
    return chapters
      .filter((c) => !c.parentId && c.projectId === activeProjectId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [chapters, activeProjectId]);

  const handleCreateDocument = async () => {
    if (!activeProjectId) return;
    await createChapter({
      projectId: activeProjectId,
      type: "chapter",
      title: "Novo Documento",
      content: "",
      order: chapters.length,
      isFolder: false,
      tags: [], wordCount: 0,
    });
  };

  const handleCreateFolder = async () => {
    if (!activeProjectId) return;
    await createChapter({
      projectId: activeProjectId,
      type: "chapter",
      title: "Nova Pasta",
      content: "",
      order: chapters.length,
      isFolder: true,
      tags: [], wordCount: 0,
    });
  };

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-fg">
      {/* Header Actions */}
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border shrink-0">
        <span className="text-[11px] font-bold uppercase tracking-wider text-sidebar-fg/60">
          Fichário
        </span>
        <div className="flex items-center gap-1">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded text-sidebar-fg/60 hover:text-sidebar-fg hover:bg-sidebar-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Plus className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 text-xs">
              <DropdownMenuItem onClick={handleCreateDocument} className="gap-2">
                <FilePlus className="w-4 h-4" />
                <span>Novo Documento</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateFolder} className="gap-2">
                <FolderPlus className="w-4 h-4" />
                <span>Nova Pasta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto py-2">
        <BinderTree items={rootItems} />
      </div>
    </div>
  );
}
