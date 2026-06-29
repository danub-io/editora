"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProjectStore } from "@/stores/projectStore";
import { BookOpen } from "lucide-react";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";

function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60) return `há ${diffMin} min`;
  if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
  if (diffDays < 7) return `há ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
  if (diffWeeks < 5) return `há ${diffWeeks} semana${diffWeeks > 1 ? "s" : ""}`;
  return `há ${diffMonths} mês${diffMonths > 1 ? "es" : ""}`;
}
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-surface flex flex-col animate-pulse">
      <HomeHeader />
      <main id="main-content" className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-edge-margin-desktop py-12 md:py-24">
          <div className="mb-16 pb-8 border-b border-outline-variant">
            <div className="h-16 w-96 bg-surface-dim mb-4" />
            <div className="h-5 w-48 bg-surface-dim" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col gap-12">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8">
                  <div className="w-32 shrink-0 aspect-[2/3] bg-surface-dim" />
                  <div className="flex-1 space-y-3">
                    <div className="h-8 w-64 bg-surface-dim" />
                    <div className="h-4 w-48 bg-surface-dim" />
                    <div className="h-[1px] w-full bg-outline-variant mt-4" />
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="h-6 w-48 bg-surface-dim" />
              <div className="h-10 w-full bg-surface-dim" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default function DashboardPage() {
  const router = useRouter();
  const { projects, fetchProjects, fetchChapters, getChaptersByProject, createProject } =
    useProjectStore();
  const [isLoading, setIsLoading] = useState(true);
  const [allChaptersLoaded, setAllChaptersLoaded] = useState(false);

  useEffect(() => {
    fetchProjects().then(() => {
      const currentProjects = useProjectStore.getState().projects;
      Promise.all(currentProjects.map((p) => fetchChapters(p.id))).finally(() => {
        setAllChaptersLoaded(true);
        setIsLoading(false);
      });
    });
  }, [fetchProjects, fetchChapters]);

  const handleCreateProject = useCallback(async () => {
    const project = await createProject({
      title: "Meu Novo Livro",
      author: "Autor",
      description: "",
      language: "pt-BR",
      categories: [],
      keywords: [],
      settings: {
        pageFormat: "A5",
        fontFamily: "Inter",
        fontSize: 11,
        lineHeight: 1.6,
        margins: { top: "2cm", bottom: "2cm", inner: "2.5cm", outer: "1.5cm" },
        theme: "light",
      },
    });
    router.push(`/projects/${project.id}`);
  }, [createProject, router]);

  // Helpers using store state directly
  const projectWordCount = (projectId: string): number => {
    const chapters = allChaptersLoaded
      ? getChaptersByProject(projectId)
      : [];
    return chapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);
  };

  const projectProgress = (projectId: string): number => {
    const chapters = allChaptersLoaded
      ? getChaptersByProject(projectId)
      : [];
    if (chapters.length === 0) return 0;
    const done = chapters.filter((c) => c.status === "completed").length;
    return Math.round((done / chapters.length) * 100);
  };

  const projectStatus = (projectId: string): string => {
    const chapters = allChaptersLoaded
      ? getChaptersByProject(projectId)
      : [];
    if (chapters.length === 0) return "Rascunho";
    if (chapters.every((c) => c.status === "completed")) return "Concluído";
    return "Em Progresso";
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 overflow-y-auto">
        {/* ── Meus Manuscritos ── */}
        <div className="max-w-5xl mx-auto px-edge-margin-desktop py-12 md:py-24" id="manuscritos">
          {/* Header */}
          <div className="mb-16 flex justify-between items-end border-b border-outline-variant pb-8">
            <div>
              <h2 className="font-display-lg text-display-lg text-on-background">
                Meus Manuscritos
              </h2>
              <p className="font-label-lg text-label-lg text-on-surface-variant mt-4 uppercase tracking-widest">
                Workspace Ativo
              </p>
            </div>
            <button
              onClick={handleCreateProject}
              className="hidden md:flex items-center justify-center bg-primary text-on-primary font-label-md text-label-md uppercase px-6 py-3 hover:bg-inverse-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Novo Manuscrito
            </button>
          </div>

          {/* Manuscripts Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main List Column */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              {projects.length === 0 ? (
                <div className="py-8 flex flex-col items-start opacity-60">
                  <BookOpen className="w-12 h-12 mb-4 text-outline" />
                  <p className="font-body-md text-body-md italic text-on-surface-variant mb-4">
                    O silêncio da página em branco aguarda a próxima narrativa.
                  </p>
                  <button
                    onClick={handleCreateProject}
                    className="font-label-md text-label-md text-primary uppercase tracking-widest border-b border-primary pb-1 hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Iniciar Novo Projeto
                  </button>
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project.id}>
                    <article className="flex flex-col md:flex-row gap-8 group">
                      {/* Book Cover Thumbnail */}
                      <div className="w-32 shrink-0 aspect-[2/3] bg-neutral-100 border border-outline-variant flex flex-col justify-between p-4">
                        <div className="flex-1 flex items-center justify-center text-center mt-4">
                          <span className="font-headline-md text-sm leading-tight text-primary font-bold break-words">
                            {project.title}
                          </span>
                        </div>
                        <div className="text-center pb-2">
                          <span className="font-label-md text-[9px] uppercase tracking-widest text-on-surface-variant font-medium">
                            {project.author}
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <Link href={`/projects/${project.id}`}>
                          <h3 className="font-headline-lg text-headline-lg text-on-background mb-2 hover:opacity-80 transition-opacity cursor-pointer">
                            {project.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                            Última edição {timeAgo(project.updatedAt)}
                          </span>
                          <span className="w-1 h-1 bg-outline" />
                          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                            {projectWordCount(project.id).toLocaleString("pt-BR")} palavras
                          </span>
                          <span className="w-1 h-1 bg-outline" />
                          <span className="font-caption text-caption text-primary uppercase tracking-wider font-semibold">
                            {projectStatus(project.id)}
                          </span>
                        </div>
                        {/* Progress Line */}
                        <div className="w-full h-[1px] bg-outline-variant mb-6 relative">
                          <div
                            className="absolute left-0 top-0 h-full bg-primary"
                            style={{ width: `${projectProgress(project.id)}%` }}
                          />
                        </div>
                        {/* Actions */}
                        <div className="flex gap-6">
                          <Link
                            href={`/projects/${project.id}`}
                            className="font-label-md text-label-md text-primary uppercase tracking-widest border-b border-primary pb-1 hover:opacity-70 transition-opacity"
                          >
                            Escrever
                          </Link>
                          <button disabled aria-disabled="true" tabIndex={-1} className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest border-b border-transparent pb-1 opacity-40 cursor-not-allowed" title="Em breve">
                            Exportar PDF
                          </button>
                          <button disabled aria-disabled="true" tabIndex={-1} className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest border-b border-transparent pb-1 opacity-40 cursor-not-allowed" title="Em breve">
                            Exportar EPUB
                          </button>
                        </div>
                      </div>
                    </article>
                    <hr className="border-outline-variant mt-8" />
                  </div>
                ))
              )}
            </div>

            {/* Secondary Column: Export Settings Panel */}
            <aside className="lg:col-span-4 lg:border-l border-outline-variant lg:pl-12 pt-12 lg:pt-0">
              <div className="sticky top-12">
                <h4 className="font-headline-md text-headline-md text-on-background mb-8 border-b border-outline-variant pb-4">
                  Configurações de Exportação
                </h4>
                <ExportSettingsPanel defaultAuthor={projects[0]?.author} />
              </div>
            </aside>
          </div>
        </div>

        {/* ── Acervo Público ── */}
        <div className="max-w-5xl mx-auto px-edge-margin-desktop py-12 border-t border-outline-variant mt-12" id="acervo">
          <div className="border border-outline-variant p-8 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-4 text-on-surface-variant" />
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Explore as obras da comunidade no Acervo Público.
            </p>
            <Link
              href="/acervo"
              className="font-label-md text-label-md uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-surface-tint transition-colors"
            >
              Visitar Acervo
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

function ExportSettingsPanel({ defaultAuthor }: { defaultAuthor?: string }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Author Name Input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="author_name"
          className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest"
        >
          Nome do Autor (Página de Rosto)
        </label>
        <input
          id="author_name"
          type="text"
          defaultValue={defaultAuthor || ""}
          className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:border-b-primary focus:ring-0 focus:outline-none transition-colors font-body-md text-on-background w-full"
        />
      </div>

      {/* ISBN Input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="isbn"
          className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest"
        >
          ISBN / Registro (Opcional)
        </label>
        <input
          id="isbn"
          type="text"
          placeholder="978-3-16-148410-0"
          className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:border-b-primary focus:ring-0 focus:outline-none transition-colors font-body-md text-on-background w-full"
        />
      </div>

      {/* Page Size Selection */}
      <div className="flex flex-col gap-4 mt-4">
        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
          Tamanho da Página (PDF)
        </span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              defaultChecked
              className="w-4 h-4 text-primary bg-transparent border-outline focus:ring-primary"
              name="page_size"
              type="radio"
            />
            <span className="font-caption text-caption uppercase group-hover:text-primary">
              A5 (Editorial)
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              className="w-4 h-4 text-primary bg-transparent border-outline focus:ring-primary"
              name="page_size"
              type="radio"
            />
            <span className="font-caption text-caption uppercase text-on-surface-variant group-hover:text-primary">
              A4 (Revisão)
            </span>
          </label>
        </div>
      </div>

      {/* TOC Toggle */}
      <div className="flex items-center justify-between py-4 border-b border-outline-variant">
        <span className="font-label-md text-label-md uppercase tracking-widest text-on-background">
          Incluir Sumário (TOC)
        </span>
        <button
          aria-pressed="true"
          className="w-10 h-5 bg-primary relative transition-colors duration-200 focus:outline-none"
          type="button"
        >
          <span className="absolute right-1 top-1 w-3 h-3 bg-surface transition-transform duration-200" />
        </button>
      </div>

      {/* Save Button */}
      <button
        type="button"
        className="mt-4 bg-transparent border border-primary text-primary font-label-md text-label-md uppercase px-6 py-3 hover:bg-primary hover:text-on-primary transition-colors text-center w-full"
      >
        Salvar Predefinições
      </button>
    </div>
  );
}
