"use client";

import { useProjectStore } from "@/stores/projectStore";
import { Bell, UserCircle, Download, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { GlobalSearch } from "../search/GlobalSearch";

export function ProjectTopBar() {
  const { activeProjectId } = useProjectStore();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 h-16 bg-white/80 backdrop-blur-md border-b border-outline-variant/50 text-sm font-medium">
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
          <kbd className="hidden sm:inline-flex ml-1 px-1.5 py-0.5 text-[10px] bg-surface border border-outline-variant rounded font-mono">⌘K</kbd>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-primary hover:bg-surface-variant transition-colors">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Compilar PDF</span>
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
