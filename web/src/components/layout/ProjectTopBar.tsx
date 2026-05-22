"use client";

import { useProjectStore } from "@/stores/projectStore";
import { Bell, UserCircle, Download, Search, Minimize2, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { GlobalSearch } from "../search/GlobalSearch";

export function ProjectTopBar() {
  const { activeProjectId, focusMode, toggleFocusMode, getProject, getChapter, activeChapterId, chapters } = useProjectStore();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  
  const currentProject = activeProjectId ? getProject(activeProjectId) : null;
  const currentChapter = activeChapterId ? getChapter(activeChapterId) : null;
  
  // Calculate total words for active chapter (or project)
  const wordCount = currentChapter?.wordCount || 0;

  const handleBuild = async () => {
    if (!currentProject) return;
    setIsBuilding(true);
    try {
      const projectChapters = chapters.filter((c) => c.projectId === activeProjectId);
      const response = await fetch("/api/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: currentProject, chapters: projectChapters }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message || "Livro compilado com sucesso!");
      } else {
        toast.error(data.error || "Erro ao compilar");
      }
    } catch {
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setIsBuilding(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const tabs = [
    { label: "Dashboard", href: `/projects/${activeProjectId}`, exact: true },
    {
      label: "Manuscrito",
      href: `/projects/${activeProjectId}`,
      match: "manuscrito",
    },
    { label: "Revisão", href: "#", match: "revisao" },
  ];

  const isActive = (tab: (typeof tabs)[number]) => {
    if (tab.exact)
      return pathname === `/projects/${activeProjectId}`;
    return false;
  };

  if (focusMode) {
    return (
      <header className="bg-surface-container-lowest text-on-surface flex justify-between items-center w-full px-6 py-3 h-14 border-b border-surface-variant/50 font-['Inter'] font-medium text-sm opacity-20 hover:opacity-100 transition-opacity duration-300 absolute top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="text-on-surface font-semibold">{currentProject?.title || "Lumina Editor"}</div>
          {currentChapter && (
            <span className="text-outline text-xs border-l border-surface-variant pl-4">{currentChapter.title}</span>
          )}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-outline text-ui-label font-ui-label">Saving...</span>
          <span className="text-outline text-ui-label font-ui-label">{wordCount.toLocaleString("pt-BR")} words</span>
          <button 
            onClick={toggleFocusMode}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors cursor-pointer bg-primary/10 px-3 py-1.5 rounded-DEFAULT" 
            title="Exit Focus Mode"
          >
            <Minimize2 className="h-[18px] w-[18px]" />
            <span className="font-ui-label">Exit Focus Mode</span>
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 h-16 bg-white/80 backdrop-blur-md border-b border-border/50 text-sm font-medium">
      {/* Left: Navigation Tabs */}
      <div className="flex items-center gap-6 h-full">
        <nav className="hidden md:flex items-center gap-6 h-full">
          <Link
            href={`/projects/${activeProjectId}`}
            className={cn(
              "h-full flex items-center transition-colors hover:opacity-80",
              "text-primary border-b-2 border-primary"
            )}
          >
            Dashboard
          </Link>
          <span className="h-full flex items-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
            Manuscrito
          </span>
          <span className="h-full flex items-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
            Revisão
          </span>
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded-lg transition-colors"
          title="Pesquisar (Ctrl+K)"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Pesquisar</span>
          <kbd className="hidden sm:inline-flex ml-1 px-1.5 py-0.5 text-[10px] bg-surface border border-border rounded font-mono">⌘K</kbd>
        </button>

        <button
          onClick={handleBuild}
          disabled={isBuilding}
          className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-primary hover:bg-surface-variant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBuilding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isBuilding ? "Compilando..." : "Compilar PDF"}
          </span>
        </button>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
            <UserCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
}
