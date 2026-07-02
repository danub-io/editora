"use client";

import { useProjectStore } from "@/stores/projectStore";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import { useState, useMemo } from "react";
import type { Chapter } from "@/types";

export function BinderTree({
  items,
  level = 0,
}: {
  items: Chapter[];
  level?: number;
}) {
  const { activeChapterId, setActiveChapter, deleteChapter } = useProjectStore();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { chapters } = useProjectStore();

  const getChildren = (parentId: string) => {
    return chapters
      .filter((c) => c.parentId === parentId)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <div className="flex flex-col w-full">
      {items.map((item) => {
        const children = getChildren(item.id);
        const hasChildren = children.length > 0;
        const isExpanded = expanded[item.id] !== false; // default to expanded if has children
        const isActive = activeChapterId === item.id;

        return (
          <div key={item.id}>
            <div
              onClick={() => setActiveChapter(item.id)}
              className={cn(
                "group flex items-center pr-2 py-1 cursor-pointer select-none transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-fg hover:bg-sidebar-muted"
              )}
              style={{ paddingLeft: `${(level * 12) + 12}px` }}
            >
              {/* Expand Toggle */}
              <div
                className={cn("w-4 h-4 flex items-center justify-center mr-1 shrink-0", hasChildren ? "cursor-pointer" : "opacity-0")}
                onClick={(e) => hasChildren ? toggleExpand(item.id, e) : undefined}
              >
                {hasChildren && (
                  isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Icon */}
              {item.isFolder ? (
                <Folder className="w-4 h-4 mr-2 shrink-0 text-sidebar-fg/70" />
              ) : (
                <FileText className="w-4 h-4 mr-2 shrink-0 text-sidebar-fg/70" />
              )}

              {/* Title */}
              <span className="text-[13px] truncate flex-1 leading-tight">
                {item.title}
              </span>

              {/* Actions */}
               <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChapter(item.id);
                }}
                className="shrink-0 opacity-0 group-hover:opacity-100 p-0.5 rounded text-sidebar-fg/40 hover:text-red-500 transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Children Render */}
            {hasChildren && isExpanded && (
              <BinderTree items={children} level={level + 1} />
            )}
          </div>
        );
      })}
    </div>
  );
}
