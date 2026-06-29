"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const LABELS: Record<string, string> = {
  producao: "Produção",
  mundo: "Mundo",
  personagens: "Personagens",
  characters: "Personagens",
  locais: "Locais",
  locations: "Locais",
  timeline: "Linha do Tempo",
  settings: "Configurações",
};

export function Breadcrumbs({
  projectTitle,
  projectId,
}: {
  projectTitle: string;
  projectId: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 font-caption text-caption text-on-surface-variant px-edge-margin-desktop py-3 border-b border-outline-variant"
    >
      <Link href="/dash" className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        Workspace
      </Link>
      <ChevronRight className="h-3 w-3" />
      <Link
        href={`/projects/${projectId}`}
        className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {projectTitle}
      </Link>
      {segments.length > 2 && (
        <>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary">
            {LABELS[segments[2]] || segments[2]}
          </span>
        </>
      )}
    </nav>
  );
}
