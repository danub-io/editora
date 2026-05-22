"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { ChapterList } from "./ChapterList";
import {
  BookOpen,
  Users,
  Map,
  Clock,
  Plus,
  ChevronDown,
  ChevronRight,
  FileText,
  BookMarked,
  ListOrdered,
  Quote,
  ScrollText,
  Bookmark,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const FRONT_MATTER_OPTIONS = [
  { subType: "copyright", title: "Copyright", icon: ScrollText },
  { subType: "dedication", title: "Dedicatória", icon: BookMarked },
  { subType: "toc", title: "Sumário", icon: ListOrdered },
  { subType: "epigraph", title: "Epígrafe", icon: Quote },
  { subType: "preface", title: "Prefácio", icon: Bookmark },
  { subType: "introduction", title: "Introdução", icon: FileText },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    activeProjectId,
    createChapter,
    fetchChapters,
    getChaptersByProject,
    chapters,
  } = useProjectStore();

  const pathname = usePathname();
  const [frontMatterExpanded, setFrontMatterExpanded] = useState(true);
  const [bodyExpanded, setBodyExpanded] = useState(true);
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  useEffect(() => {
    if (activeProjectId) fetchChapters(activeProjectId);
  }, [activeProjectId, fetchChapters]);

  const allChapters = activeProjectId
    ? getChaptersByProject(activeProjectId)
    : [];

  const frontMatterPages = allChapters.filter((c) => c.type === "front_matter");
  const bodyChapters = allChapters.filter(
    (c) => c.type === "chapter" || c.type === "part_header"
  );
  const totalWords = allChapters.reduce(
    (acc, c) => acc + (c.wordCount || 0),
    0
  );

  const handleAddChapter = async () => {
    if (!activeProjectId) return;
    const bodyOnly = allChapters.filter((c) => c.type === "chapter");
    await createChapter({
      projectId: activeProjectId,
      type: "chapter",
      title: `Capítulo ${bodyOnly.length + 1}`,
      content: "",
      number: allChapters.length + 1,
      status: "draft",
      wordCount: 0,
      tags: [],
    });
    setAddMenuOpen(false);
  };

  const handleAddPart = async () => {
    if (!activeProjectId) return;
    const parts = allChapters.filter((c) => c.type === "part_header");
    await createChapter({
      projectId: activeProjectId,
      type: "part_header",
      title: `Parte ${parts.length + 1}`,
      content: "",
      number: allChapters.length + 1,
      status: "draft",
      wordCount: 0,
      tags: [],
    });
    setAddMenuOpen(false);
  };

  const handleAddFrontMatter = async (
    subType: string,
    title: string
  ) => {
    if (!activeProjectId) return;
    // Check if already exists
    const exists = frontMatterPages.some((c) => c.subType === subType);
    if (exists) {
      setAddMenuOpen(false);
      return;
    }
    await createChapter({
      projectId: activeProjectId,
      type: "front_matter",
      subType: subType as any,
      title,
      content: "",
      number: frontMatterPages.length + 1,
      status: "draft",
      wordCount: 0,
      tags: [],
    });
    setAddMenuOpen(false);
  };

  if (!activeProjectId) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Overlay backdrop for mobile/small screens */}
      <div
        className={cn(
          "fixed inset-0 z-20 bg-background/50 transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <nav
        className={cn(
          "fixed left-0 top-0 flex flex-col h-full z-30 bg-sidebar text-sidebar-fg w-64 flex-shrink-0 select-none transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* ── Header: Hamburger + Title + Add ── */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded transition-colors text-sidebar-fg hover:text-foreground"
              title="Fechar painel"
            >
              <X className="h-5 w-5" />
            </button>
            <Link
              href={`/projects/${activeProjectId}`}
              className="text-[15px] font-semibold text-sidebar-fg"
            >
              Manuscrito
            </Link>
          </div>
        <div className="relative">
          <button
            onClick={() => setAddMenuOpen(!addMenuOpen)}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded hover:bg-sidebar-muted"
          >
            Adicionar
            <Plus className="h-3.5 w-3.5" />
          </button>

          {/* Add Dropdown */}
          {addMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setAddMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-0 z-50 w-52 bg-popover border border-border rounded-lg shadow-lg py-1 text-[13px]">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-popover-foreground/60 font-semibold">
                  Corpo
                </div>
                <button
                  onClick={handleAddChapter}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-accent text-popover-foreground hover:text-accent-foreground transition-colors"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Capítulo
                </button>
                <button
                  onClick={handleAddPart}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-accent text-popover-foreground hover:text-accent-foreground transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Parte / Seção
                </button>

                <div className="my-1" />

                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-popover-foreground/60 font-semibold">
                  Páginas Especiais
                </div>
                {FRONT_MATTER_OPTIONS.map((opt) => {
                  const exists = frontMatterPages.some(
                    (c) => c.subType === opt.subType
                  );
                  return (
                    <button
                      key={opt.subType}
                      onClick={() =>
                        handleAddFrontMatter(opt.subType, opt.title)
                      }
                      disabled={exists}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 transition-colors",
                        exists
                          ? "text-muted-foreground cursor-not-allowed"
                          : "hover:bg-accent text-popover-foreground hover:text-accent-foreground"
                      )}
                    >
                      <opt.icon className="h-4 w-4 text-muted-foreground" />
                      {opt.title}
                      {exists && (
                        <span className="ml-auto text-[10px] text-muted-foreground">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Scrollable Manuscript Content ── */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Front Matter Section */}
        {(frontMatterPages.length > 0 || true) && (
          <div>
            <button
              onClick={() => setFrontMatterExpanded(!frontMatterExpanded)}
              className="w-full flex items-center justify-between px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-sidebar-fg/60 hover:text-sidebar-fg transition-colors"
            >
              <span className="flex items-center gap-1.5">
                {frontMatterExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                Páginas Iniciais
              </span>
              <span className="text-[10px] text-sidebar-fg/60 font-normal normal-case">
                edit
              </span>
            </button>
            {frontMatterExpanded && (
              <div className="pb-1">
                <ChapterList
                  chapters={frontMatterPages}
                  showNumbers={false}
                  section="front_matter"
                />
              </div>
            )}
          </div>
        )}

        {/* Body Section */}
        <div>
          <button
            onClick={() => setBodyExpanded(!bodyExpanded)}
            className="w-full flex items-center justify-between px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-sidebar-fg/60 hover:text-sidebar-fg transition-colors"
          >
            <span className="flex items-center gap-1.5">
              {bodyExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
               Conteúdo Principal
            </span>
            <span className="text-[10px] text-sidebar-fg/60 font-normal normal-case">
              edit
            </span>
          </button>
          {bodyExpanded && (
            <div className="pb-1">
              <ChapterList
                chapters={bodyChapters}
                showNumbers={true}
                section="body"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Footer: Word Count + Nav ── */}
      <div>
        {/* Word count */}
        <div className="px-5 py-3 text-[13px] text-sidebar-fg/60 tabular-nums">
          {totalWords.toLocaleString("pt-BR")} palavras
        </div>

        {/* Navigation */}
        <div className="px-3 py-3 space-y-4">
          <FooterNavItem
            icon={Users}
            label="Personagens"
            href={`/projects/${activeProjectId}/characters`}
            active={isActive(`/projects/${activeProjectId}/characters`)}
          />
          <FooterNavItem
            icon={Map}
            label="Locais"
            href={`/projects/${activeProjectId}/locations`}
            active={isActive(`/projects/${activeProjectId}/locations`)}
          />
          <FooterNavItem
            icon={Clock}
            label="Timeline"
            href={`/projects/${activeProjectId}/timeline`}
            active={isActive(`/projects/${activeProjectId}/timeline`)}
          />

        </div>
      </div>
    </nav>
    </>
  );
}

function FooterNavItem({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-3 py-1.5 rounded text-[13px] transition-all duration-150",
        active
          ? "text-sidebar-fg bg-sidebar-muted"
          : "text-sidebar-fg/70 hover:text-sidebar-fg hover:bg-sidebar-muted"
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-sidebar-fg/40" />
      {label}
    </Link>
  );
}
