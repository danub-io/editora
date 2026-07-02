"use client";
export const runtime = "edge";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectStore } from "@/stores/projectStore";

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
    projects,
  } = useProjectStore();
  const router = useRouter();

  useEffect(() => {
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

  useEffect(() => {
    if (id) {
      fetchChapters(id);
    }
  }, [id, fetchChapters]);

  return <>{children}</>;
}
