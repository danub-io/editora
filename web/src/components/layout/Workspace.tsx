"use client";

import { useProjectStore } from "@/stores/projectStore";
import { cn } from "@/lib/utils";
import { Binder as Sidebar } from "@/components/binder/Binder";
import { Editor } from "@/components/editor/Editor";
import { Inspector } from "@/components/inspector/Inspector";
import { Corkboard } from "@/components/corkboard/Corkboard";
import { Outliner } from "@/components/outliner/Outliner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TopToolbar } from "@/components/layout/TopToolbar";

export function Workspace() {
  const {
    activeProjectId,
    activeChapterId,
    sidebarOpen,
    inspectorOpen,
    viewMode,
    focusMode,
  } = useProjectStore();

  if (!activeProjectId) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {!focusMode && <TopToolbar />}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar (Binder) */}
        {!focusMode && (
          <div
            className={cn(
              "shrink-0 transition-all duration-300 ease-in-out border-r border-outline-variant bg-sidebar overflow-hidden",
              sidebarOpen ? "w-64" : "w-0"
            )}
          >
            <Sidebar />
          </div>
        )}

        {/* Center Workspace */}
        <main
          className={cn(
            "flex-1 flex flex-col min-w-0 transition-all duration-300 bg-background overflow-hidden relative",
            focusMode ? "z-50" : ""
          )}
        >
          {/* Main content area based on view mode */}
          <div className="flex-1 overflow-hidden relative">
            {viewMode === "editor" && activeChapterId && (
              <Editor chapterId={activeChapterId} />
            )}
            {viewMode === "editor" && !activeChapterId && (
              <div className="flex-1 flex items-center justify-center text-on-surface-variant">
                Selecione um documento no fichário para editar
              </div>
            )}

            {viewMode === "corkboard" && <Corkboard />}
            {viewMode === "outliner" && <Outliner />}
          </div>
        </main>

        {/* Right Sidebar (Inspector) */}
        {!focusMode && (
          <div
            className={cn(
              "shrink-0 transition-all duration-300 ease-in-out border-l border-outline-variant bg-surface overflow-hidden",
              inspectorOpen ? "w-72" : "w-0"
            )}
          >
             <Inspector />
          </div>
        )}
      </div>
    </div>
  );
}
