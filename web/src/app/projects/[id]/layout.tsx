"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectStore } from "@/stores/projectStore";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { cn } from "@/lib/utils";
import { ProjectTopBar } from "@/components/layout/ProjectTopBar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Menu } from "lucide-react";

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
  } = useProjectStore();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true); // search panel open by default
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
    setSidebarOpen((prev) => {
      const next = !prev;
      // Opening left: if right is already open and both won't fit, close right
      if (next && rightOpen && !canFitBoth()) {
        setRightOpen(false);
      }
      return next;
    });
  }, [rightOpen, canFitBoth]);

  // Handler for toggling the right sidebar (from RightSidebar onOpenChange)
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
    <div ref={containerRef} className={cn("h-screen flex overflow-hidden", focusMode ? "bg-surface-container-lowest text-on-background group relative" : "bg-white")}>
      {/* Floating hamburger when sidebar is closed */}
      {!focusMode && (
        <button
          onClick={() => { setSidebarOpen(true); if (rightOpen && !canFitBoth()) setRightOpen(false); }}
          className={cn(
            "fixed left-4 top-4 z-50 p-2 rounded-md transition-colors bg-white/80 backdrop-blur-sm border border-border shadow-sm",
            sidebarOpen ? "hidden" : "flex items-center justify-center"
          )}
          title="Abrir painel"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
      )}
      {!focusMode && <Sidebar isOpen={sidebarOpen} onClose={handleToggleLeft} />}
      <div className={cn("flex-1 flex flex-col h-screen min-w-0 transition-all duration-300", focusMode ? "pt-14" : (sidebarOpen ? "ml-64" : "ml-0"))}>
        <ProjectTopBar onToggleSidebar={handleToggleLeft} sidebarOpen={sidebarOpen} />
        <main className={cn("flex-1 relative overflow-y-auto", focusMode ? "bg-surface-container-lowest scroll-smooth flex justify-center" : "bg-[#fafafa]")}>{children}</main>
      </div>
      {!focusMode && <RightSidebar isOpen={rightOpen} onOpenChange={handleToggleRight} />}
    </div>
  );
}
