"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  Target, 
  Pin, 
  MessageSquare, 
  History, 
  Search, 
  Type, 
  Plus, 
  Scissors, 
  Trash2, 
  Download, 
  Users, 
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useProjectStore } from "@/stores/projectStore";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export function RightSidebar({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activePanel, setActivePanel] = useState<string | null>("search");
  const { activeProjectId, activeChapterId, getChapter, updateChapter } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [searchOnlyThisChapter, setSearchOnlyThisChapter] = useState(true);

  // Sync internal panel state when isOpen is forced from outside
  useEffect(() => {
    if (!isOpen && activePanel !== null) {
      setActivePanel(null);
    }
  }, [isOpen]);

  const togglePanel = (panel: string) => {
    const next = activePanel === panel ? null : panel;
    setActivePanel(next);
    onOpenChange(next !== null);
  };

  const handleFind = () => {
    if (!searchQuery.trim()) return;
    const found = (window as any).find(searchQuery, false, false, true, false, false, false);
    if (!found) {
      toast.info("Nenhuma ocorrência encontrada.");
    }
  };

  const handleReplace = () => {
    if (!searchQuery.trim()) return;
    const chapter = activeChapterId ? getChapter(activeChapterId) : null;
    if (!chapter) {
      toast.info("Nenhum capítulo ativo para substituir.");
      return;
    }
    const newContent = chapter.content.replaceAll(searchQuery, replaceQuery);
    if (newContent === chapter.content) {
      toast.info("Nenhuma ocorrência para substituir.");
      return;
    }
    updateChapter(activeChapterId!, { content: newContent });
    toast.success("Substituição concluída.");
  };

  const handleReplaceAll = () => {
    if (!searchQuery.trim()) return;
    const chapter = activeChapterId ? getChapter(activeChapterId) : null;
    if (!chapter) {
      toast.info("Nenhum capítulo ativo.");
      return;
    }
    const count = (chapter.content.match(new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (count === 0) {
      toast.info("Nenhuma ocorrência encontrada.");
      return;
    }
    const newContent = chapter.content.replaceAll(searchQuery, replaceQuery);
    updateChapter(activeChapterId!, { content: newContent });
    toast.success(`${count} ocorrência(s) substituída(s).`);
  };

  return (
    <>
      {/* Fixed trigger — same fixed pattern as left chevron */}
      <div className="fixed right-0 top-0 h-screen z-40 flex items-center pointer-events-none">
        <button
          onClick={() => onOpenChange(!isOpen)}
          className={cn(
            "pointer-events-auto flex flex-col items-center justify-center w-10 bg-transparent cursor-pointer transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
          title={isOpen ? "Fechar painel" : "Abrir painel"}
        >
          <ChevronLeft
            className={cn(
              "h-8 w-8 stroke-[2] transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Collapsible content panel — in the document flow */}
      <Collapsible
        open={isOpen}
        onOpenChange={onOpenChange}
        className="flex h-full relative z-30 shrink-0"
      >
        <CollapsibleContent className="flex bg-background border-l border-border">
            {/* Sliding Panel (Find & Replace) */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out bg-card flex flex-col",
                activePanel === "search" ? "w-80" : "w-0"
              )}
            >
              <div className="flex flex-col h-full w-80">
                <div className="px-5 py-4 flex items-center justify-between">
                  <h2 className="text-[15px] font-semibold text-foreground">Find & replace</h2>
                </div>

                <div className="p-5 flex-1 overflow-y-auto">
                  {/* Toggle */}
                  <div className="flex items-center justify-between mb-4 pb-6">
                    <span className="text-[13px] text-foreground font-medium">Search only this chapter</span>
                    <button
                      onClick={() => setSearchOnlyThisChapter(!searchOnlyThisChapter)}
                      className={cn(
                        "w-9 h-5 rounded-full relative transition-colors duration-200",
                        searchOnlyThisChapter ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-200",
                        searchOnlyThisChapter ? "translate-x-4.5 left-[1px]" : "translate-x-0.5"
                      )} />
                    </button>
                  </div>

                  {/* Find */}
                  <div className="mb-4">
                    <label className="block text-[13px] font-semibold text-foreground mb-4">Find</label>
                    <input
                      type="text"
                      placeholder="Find..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border-input bg-background rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring/50 mb-4 placeholder:text-muted-foreground"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <button onClick={() => toast.info("Busca com case-sensitive em breve!")} className="px-2.5 py-1.5 bg-muted hover:bg-accent rounded text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors">Aa</button>
                        <button onClick={() => toast.info("Busca por palavra exata em breve!")} className="px-2.5 py-1.5 bg-muted hover:bg-accent rounded text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors">Match word</button>
                      </div>
                      <button onClick={handleFind} className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-[12px] font-medium transition-colors">Find</button>
                    </div>
                  </div>

                  {/* Replace */}
                  <div>
                    <label className="block text-[13px] font-semibold text-foreground mb-4">Replace</label>
                    <input
                      type="text"
                      placeholder="Replace..."
                      value={replaceQuery}
                      onChange={(e) => setReplaceQuery(e.target.value)}
                      className="w-full border-input bg-background rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring/50 mb-4 placeholder:text-muted-foreground"
                    />
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={handleReplaceAll} className="px-3 py-1.5 bg-muted hover:bg-accent rounded text-[12px] font-medium text-foreground transition-colors">Replace all</button>
                      <button onClick={handleReplace} className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-[12px] font-medium transition-colors">Replace</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon Toolbar */}
            <div className="w-14 bg-card border-l border-border flex flex-col items-center overflow-y-auto overflow-x-hidden relative">
              {/* Top Group */}
              <div className="flex flex-col gap-6 items-center pt-4">
                <ToolbarButton icon={Target} onClick={() => toast.info("Comentários direcionados em breve!")} />
                <ToolbarButton icon={Pin} badge="2" onClick={() => toast.info("Notas fixadas em breve!")} />
                <ToolbarButton icon={MessageSquare} onClick={() => toast.info("Comentários em breve!")} />
                <ToolbarButton icon={History} onClick={() => toast.info("Histórico de versões em breve!")} />
              </div>

              <div className="my-3" />

              {/* Middle Group */}
              <div className="flex flex-col gap-6 items-center">
                <ToolbarButton
                  icon={Search}
                  isActive={activePanel === "search"}
                  onClick={() => togglePanel("search")}
                />
                <ToolbarButton icon={Type} onClick={() => toast.info("Estilos de texto em breve!")} />
                <ToolbarButton icon={Plus} onClick={() => toast.info("Inserir elementos em breve!")} />
                <ToolbarButton icon={Scissors} onClick={() => toast.info("Recortar em breve!")} />
                <ToolbarButton icon={Trash2} onClick={() => toast.info("Excluir seleção em breve!")} />
              </div>

              {/* Spacer to push bottom group down */}
              <div className="flex-1" />

              <div className="my-3" />

              {/* Bottom Group */}
              <div className="flex flex-col gap-6 items-center pb-4">
                <ToolbarButton icon={Download} onClick={() => toast.info("Exportar em breve!")} />
                <ToolbarButton icon={Users} onClick={() => toast.info("Colaboradores em breve!")} />
                <ToolbarButton icon={Settings} onClick={() => pathname === `/projects/${activeProjectId}/settings` ? router.back() : router.push(`/projects/${activeProjectId}/settings`)} />
              </div>
            </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

function ToolbarButton({ 
  icon: Icon, 
  badge, 
  isActive, 
  onClick 
}: { 
  icon: React.ElementType, 
  badge?: string,
  isActive?: boolean,
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative p-2 rounded-md transition-colors",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon className="h-[18px] w-[18px] stroke-[2.5]" />
      {badge && (
        <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
