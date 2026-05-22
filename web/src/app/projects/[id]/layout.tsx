"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectStore } from "@/stores/projectStore";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { cn } from "@/lib/utils";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { ChevronRight, Menu } from "lucide-react";

/** Minimum width (px) the center column must maintain */
const MIN_CENTER_WIDTH = 900;

/**
 * Right sidebar widths:
 * - collapsed: 56px (just icon toolbar)
 * - expanded: 56 + 320 = 376px (search panel open)
 */
const LEFT_WIDTH = 256;
const RIGHT_COLLAPSED = 56;
const RIGHT_EXPANDED = 376;

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params.id as string;
  const {
    getProject,
    setActiveProject,
    fetchProjects,
    fetchChapters,
    fetchCharacters,
    fetchLocations,
    fetchTimeline,
    projects,
    focusMode,
    sidebarOpen,
    setSidebarOpen,
  } = useProjectStore();
  const router = useRouter();
  const [rightOpen, setRightOpen] = useState(false); // search panel closed by default
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if both sidebars can be open simultaneously given the current viewport
  const canFitBoth = useCallback(() => {
    if (!containerRef.current || focusMode) return true;
    const totalWidth = containerRef.current.offsetWidth;
    const centerWidth = totalWidth - LEFT_WIDTH - RIGHT_EXPANDED;
    return centerWidth >= MIN_CENTER_WIDTH;
  }, [focusMode]);

  // Handler for toggling the left sidebar
  const handleToggleLeft = useCallback(() => {
    const next = !sidebarOpen;
    setSidebarOpen(next);
    // Opening left: if right is already open and both won't fit, close right
    if (next && rightOpen && !canFitBoth()) {
      setRightOpen(false);
    }
  }, [sidebarOpen, rightOpen, canFitBoth, setSidebarOpen]);

  // Handler for toggling the right search panel (from RightSidebar onOpenChange)
  const handleToggleRight = useCallback(
    (open: boolean) => {
      if (open) {
        // Opening right: if left is already open and both won't fit, close left
        if (sidebarOpen && !canFitBoth()) {
          setSidebarOpen(false);
        }
      }
      setRightOpen(open);
    },
    [sidebarOpen, canFitBoth]
  );

  // On resize, re-evaluate; if both are open but no longer fit, close right
  useEffect(() => {
    if (focusMode) return;
    const onResize = () => {
      if (sidebarOpen && rightOpen && !canFitBoth()) {
        setRightOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sidebarOpen, rightOpen, canFitBoth, focusMode]);

  useEffect(() => {
    // Ensure projects are loaded
    if (projects.length === 0) {
      fetchProjects().then(() => {
        const project = useProjectStore.getState().getProject(id);
        if (!project) {
          router.push("/");
        } else {
          setActiveProject(id);
        }
      });
    } else {
      const project = getProject(id);
      if (!project) {
        router.push("/");
      } else {
        setActiveProject(id);
      }
    }
  }, [id]);

  // Prefetch all project data
  useEffect(() => {
    if (id) {
      fetchChapters(id);
      fetchCharacters(id);
      fetchLocations(id);
      fetchTimeline(id);
    }
  }, [id, fetchChapters, fetchCharacters, fetchLocations, fetchTimeline]);

  return (
    <div ref={containerRef} className={cn("h-screen flex overflow-hidden", focusMode ? "bg-background text-foreground group relative" : "bg-background")}>
      {/* Hamburger — only when sidebar is closed */}
      {!focusMode && (
        <button
          onClick={() => { setSidebarOpen(true); if (rightOpen && !canFitBoth()) setRightOpen(false); }}
          className={cn(
            "fixed left-0 top-0 z-50 px-3 pt-4 pb-2 text-muted-foreground hover:text-foreground/50 transition-colors",
            sidebarOpen ? "hidden" : "flex items-center justify-center"
          )}
          title="Abrir painel"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Chevron trigger to toggle left sidebar — positioned after the hamburger */}
      {!focusMode && (
        <div
          className={cn(
            "fixed top-0 h-full z-40 flex items-center transition-[left] duration-200 ease-out pointer-events-none",
            sidebarOpen ? "left-64" : "left-0"
          )}
        >
          <button
            onClick={() => {
              const next = !sidebarOpen;
              setSidebarOpen(next);
              if (next && rightOpen && !canFitBoth()) {
                setRightOpen(false);
              }
            }}
            className="pointer-events-auto flex flex-col items-center justify-center w-10 bg-transparent cursor-pointer transition-colors"
            title={sidebarOpen ? "Fechar painel" : "Abrir painel"}
          >
            <ChevronRight
              className={cn(
                "h-8 w-8 stroke-[2] transition-transform duration-200 text-muted-foreground hover:text-foreground",
                sidebarOpen && "rotate-180"
              )}
            />
          </button>
        </div>
      )}
      {!focusMode && <Sidebar isOpen={sidebarOpen} onClose={handleToggleLeft} />}
      <div className={cn("flex-1 flex flex-col h-screen min-w-0 transition-[margin-left] duration-200 ease-out bg-background", focusMode ? "bg-transparent" : (sidebarOpen ? "ml-[296px]" : "ml-10 mr-10"))}>
        <main className={cn("flex-1 relative overflow-y-auto", focusMode ? "bg-background scroll-smooth flex justify-center" : "")}>{children}</main>
      </div>
      {!focusMode && <RightSidebar isOpen={rightOpen} onOpenChange={handleToggleRight} />}
    </div>
  );
}
