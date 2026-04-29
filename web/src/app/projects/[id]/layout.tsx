"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectStore } from "@/stores/projectStore";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ProjectTopBar } from "@/components/layout/ProjectTopBar";
import { RightSidebar } from "@/components/layout/RightSidebar";

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
  } = useProjectStore();
  const router = useRouter();

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
    <div className="h-screen flex overflow-hidden bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen min-w-0 ml-64">
        <ProjectTopBar />
        <main className="flex-1 relative overflow-y-auto bg-[#fafafa]">{children}</main>
      </div>
      <RightSidebar />
    </div>
  );
}
