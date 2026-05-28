"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { Editor } from "@/components/editor/Editor";
import { toast } from "sonner";
import { FileText, ListOrdered, CheckCircle, Edit3 } from "lucide-react";

export default function ProjectPage() {
  const {
    activeChapterId,
    activeProjectId,
    projects,
    getChaptersByProject,
    fetchChapters,
    fetchProjects,
    setActiveChapter,
  } = useProjectStore();
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    if (activeProjectId) {
      fetchChapters(activeProjectId);
    }
  }, [activeProjectId, fetchChapters]);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const chapters = activeProjectId
    ? getChaptersByProject(activeProjectId)
    : [];

  const completedCount = chapters.filter(
    (c) => c.status === "completed"
  ).length;
  const totalWords = chapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);
  const progress =
    chapters.length > 0
      ? Math.round((completedCount / chapters.length) * 100)
      : 0;

  const handleBuild = async () => {
    if (!activeProject) return;
    setIsBuilding(true);
    try {
      const response = await fetch("/api/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: activeProject, chapters }),
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

  // Show editor when a chapter is selected
  if (activeChapterId) {
    return <Editor chapterId={activeChapterId} />;
  }

  // Dashboard view
  return (
    <div className="p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Project Header */}
        <div className="flex flex-col gap-2 mb-4">
          <span className="text-xs text-primary uppercase tracking-wider font-medium">
            Projeto Atual
          </span>
          <h1 className="text-3xl font-bold text-foreground">
            {activeProject?.title || "Projeto"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mt-0">
            {activeProject?.description ||
              "Sem descrição. Edite as configurações do projeto para adicionar detalhes."}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Total de Capítulos
              </h3>
              <ListOrdered className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                {chapters.length}
              </span>
              <span className="text-sm text-muted-foreground">
                capítulos
              </span>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm md:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Progresso Total do Manuscrito
              </h3>
              <span className="text-xs text-primary font-bold">
                {progress}%
              </span>
            </div>
            <div className="space-y-3">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{totalWords.toLocaleString("pt-BR")} palavras</span>
                <span>{completedCount} concluídos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-0">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Atividade Recente
          </h2>

          {chapters.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
              <h3 className="text-lg font-medium mb-2 text-foreground">
                Nenhum capítulo ainda
              </h3>
              <p className="text-muted-foreground mb-4">
                Comece criando seu primeiro capítulo na barra lateral.
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <ul className="divide-y divide-border/50">
                {chapters.slice(0, 5).map((chapter) => (
                  <li
                    key={chapter.id}
                    onClick={() => setActiveChapter(chapter.id)}
                    className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          chapter.status === "completed"
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {chapter.status === "completed" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Edit3 className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          {chapter.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0">
                          {chapter.wordCount || 0} palavras
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 border ${
                        chapter.status === "completed"
                          ? "bg-primary/20 text-primary border-primary/20"
                          : chapter.status === "review"
                          ? "bg-secondary text-secondary-foreground border-secondary/20"
                          : "bg-muted text-muted-foreground border-border/50"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          chapter.status === "completed"
                            ? "bg-primary"
                            : chapter.status === "review"
                            ? "bg-secondary"
                            : "bg-outline"
                        }`}
                      />
                      {chapter.status === "completed"
                        ? "Concluído"
                        : chapter.status === "review"
                        ? "Revisão"
                        : "Rascunho"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
