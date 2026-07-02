"use client";

import { useProjectStore } from "@/stores/projectStore";
import { cn } from "@/lib/utils";
import {
  Sidebar as SidebarIcon,
  PanelRight,
  FileText,
  LayoutGrid,
  ListTree,
  Plus
} from "lucide-react";

export function TopToolbar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    inspectorOpen,
    toggleInspector,
    viewMode,
    setViewMode,
  } = useProjectStore();

  return (
    <div className="h-12 border-b border-outline-variant bg-surface flex items-center justify-between px-2 shrink-0 select-none">
      <div className="flex items-center gap-1">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "p-1.5 rounded flex items-center justify-center transition-colors",
            sidebarOpen ? "bg-surface-container-high text-on-surface" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          )}
          title="Fichário (Binder)"
        >
          <SidebarIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-outline-variant mx-1" />

        {/* View Modes */}
        <div className="flex bg-surface-container-lowest rounded border border-outline-variant p-0.5">
          <button
            onClick={() => setViewMode("editor")}
            className={cn(
              "px-2.5 py-1 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-colors",
              viewMode === "editor"
                ? "bg-surface-container-highest text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            )}
            title="Modo Editor de Texto"
          >
            <FileText className="w-3.5 h-3.5" />
            Editor
          </button>
          <button
            onClick={() => setViewMode("corkboard")}
            className={cn(
              "px-2.5 py-1 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-colors",
              viewMode === "corkboard"
                ? "bg-surface-container-highest text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            )}
            title="Quadro de Cortiça"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Corkboard
          </button>
          <button
            onClick={() => setViewMode("outliner")}
            className={cn(
              "px-2.5 py-1 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-colors",
              viewMode === "outliner"
                ? "bg-surface-container-highest text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            )}
            title="Visão em Tópicos"
          >
            <ListTree className="w-3.5 h-3.5" />
            Outliner
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1">
         <button
          onClick={toggleInspector}
          className={cn(
            "p-1.5 rounded flex items-center justify-center transition-colors",
            inspectorOpen ? "bg-surface-container-high text-on-surface" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          )}
          title="Inspetor"
        >
          <PanelRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
