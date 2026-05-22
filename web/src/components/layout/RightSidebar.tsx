"use client";

import { useState } from "react";
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
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useProjectStore } from "@/stores/projectStore";

export function RightSidebar() {
  const [activePanel, setActivePanel] = useState<string | null>("search");
  const { activeChapterId, getChapter, updateChapter } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [searchOnlyThisChapter, setSearchOnlyThisChapter] = useState(true);

  const togglePanel = (panel: string) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleFind = () => {
    if (!searchQuery.trim()) return;
    const found = window.find(searchQuery, false, false, true, false, false, false);
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
    <div className="flex h-full border-l border-slate-200 bg-white relative z-40 shrink-0">
      {/* Sliding Panel (Find & Replace) */}
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out bg-white flex flex-col",
          activePanel === "search" ? "w-80 border-r border-slate-200" : "w-0 border-r-0"
        )}
      >
        <div className="flex flex-col h-full w-80">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-slate-800">Find & replace</h2>
          </div>
          
          <div className="p-5 flex-1 overflow-y-auto">
            {/* Toggle */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
              <span className="text-[13px] text-slate-700 font-medium">Search only this chapter</span>
              <button 
                onClick={() => setSearchOnlyThisChapter(!searchOnlyThisChapter)}
                className={cn(
                  "w-9 h-5 rounded-full relative transition-colors duration-200",
                  searchOnlyThisChapter ? "bg-emerald-500" : "bg-slate-300"
                )}
              >
                <div className={cn(
                  "w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-200",
                  searchOnlyThisChapter ? "translate-x-4.5 left-[1px]" : "translate-x-0.5"
                )} />
              </button>
            </div>

            {/* Find */}
            <div className="mb-6">
              <label className="block text-[13px] font-semibold text-slate-800 mb-2">Find</label>
              <input
                type="text"
                placeholder="Find..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 mb-2 placeholder:text-slate-400"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button onClick={() => toast.info("Busca com case-sensitive em breve!")} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-[12px] font-medium text-slate-700 transition-colors">Aa</button>
                  <button onClick={() => toast.info("Busca por palavra exata em breve!")} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-[12px] font-medium text-slate-700 transition-colors">Match word</button>
                </div>
                <button onClick={handleFind} className="px-4 py-1.5 bg-slate-500 hover:bg-slate-600 text-white rounded text-[12px] font-medium transition-colors">Find</button>
              </div>
            </div>

            {/* Replace */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-800 mb-2">Replace</label>
              <input
                type="text"
                placeholder="Replace..."
                value={replaceQuery}
                onChange={(e) => setReplaceQuery(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 mb-2 placeholder:text-slate-400"
              />
              <div className="flex items-center justify-end gap-1.5">
                <button onClick={handleReplaceAll} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-[12px] font-medium text-slate-700 transition-colors">Replace all</button>
                <button onClick={handleReplace} className="px-4 py-1.5 bg-slate-500 hover:bg-slate-600 text-white rounded text-[12px] font-medium transition-colors">Replace</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Toolbar */}
      <div className="w-14 bg-white flex flex-col py-4 items-center gap-6 overflow-y-auto overflow-x-hidden">
        {/* Top Group */}
        <div className="flex flex-col gap-6 items-center">
          <ToolbarButton icon={Target} onClick={() => toast.info("Comentários direcionados em breve!")} />
          <ToolbarButton icon={Pin} badge="2" onClick={() => toast.info("Notas fixadas em breve!")} />
          <ToolbarButton icon={MessageSquare} onClick={() => toast.info("Comentários em breve!")} />
          <ToolbarButton icon={History} onClick={() => toast.info("Histórico de versões em breve!")} />
        </div>

        <div className="w-6 border-b border-slate-100 my-1" />

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

        <div className="w-6 border-b border-slate-100 my-1" />

        {/* Bottom Group */}
        <div className="flex flex-col gap-6 items-center flex-1 justify-end">
          <ToolbarButton icon={Download} onClick={() => toast.info("Exportar em breve!")} />
          <ToolbarButton icon={Users} onClick={() => toast.info("Colaboradores em breve!")} />
          <ToolbarButton icon={Settings} onClick={() => toast.info("Configurações do editor em breve!")} />
        </div>
      </div>
    </div>
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
        isActive ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <Icon className="h-[18px] w-[18px] stroke-[2.5]" />
      {badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
