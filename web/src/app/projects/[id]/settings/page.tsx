"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArchiveLayout from "@/components/archive/ArchiveLayout";
import { useProjectStore } from "@/stores/projectStore";
import { Settings } from "lucide-react";

function LoadingSkeleton() {
  return (
    <div className="animate-pulse flex-1 px-edge-margin-desktop py-12">
      <div className="mb-12 border-b border-outline-variant pb-6">
        <div className="h-9 w-48 bg-surface-container-high mb-4" />
        <div className="h-6 w-96 bg-surface-container-high" />
      </div>
      <div className="flex flex-col items-center justify-center py-24 border border-dashed border-outline-variant">
        <div className="w-12 h-12 bg-surface-container-high mb-4" />
        <div className="h-6 w-48 bg-surface-container-high" />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const [isLoading, setIsLoading] = useState(true);

  const { projects } = useProjectStore();
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <ArchiveLayout
      projectId={projectId}
      projectTitle={project?.title || "Projeto"}
      sectionTitle="Configurações"
      sectionLabel="Configurações"
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <main id="main-content" className="flex-1 px-edge-margin-desktop py-12">
          {/* Page Header */}
          <div className="mb-12 border-b border-outline-variant pb-6">
            <h2 className="font-display-lg text-display-lg text-on-background mb-4">
              Configurações
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Configurações do projeto.
            </p>
          </div>

          {/* Placeholder */}
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-outline-variant">
            <Settings className="w-12 h-12 text-on-surface-variant/40 mb-4" />
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Configurações em breve.
            </p>
          </div>
        </main>
      )}
    </ArchiveLayout>
  );
}
