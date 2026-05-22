import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Project,
  Chapter,
  Character,
  Location,
  TimelineEvent,
} from "@/types";

interface ProjectStore {
  // Data
  projects: Project[];
  chapters: Chapter[];
  characters: Character[];
  locations: Location[];
  timelineEvents: TimelineEvent[];

  // UI State
  activeProjectId: string | null;
  activeChapterId: string | null;
  sidebarOpen: boolean;
  focusMode: boolean;
  isLoading: boolean;

  // Data actions (API-backed)
  fetchProjects: () => Promise<void>;
  createProject: (
    data: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getProject: (id: string) => Project | undefined;

  fetchChapters: (projectId: string) => Promise<void>;
  createChapter: (
    data: Omit<Chapter, "id" | "createdAt" | "updatedAt">
  ) => Promise<Chapter>;
  updateChapter: (id: string, updates: Partial<Chapter>) => Promise<void>;
  deleteChapter: (id: string) => Promise<void>;
  getChapter: (id: string) => Chapter | undefined;
  getChaptersByProject: (projectId: string) => Chapter[];
  reorderChapters: (projectId: string, newOrder: string[]) => void;

  fetchCharacters: (projectId: string) => Promise<void>;
  createCharacter: (
    data: Omit<Character, "id" | "createdAt" | "updatedAt">
  ) => Promise<Character>;
  updateCharacter: (id: string, updates: Partial<Character>) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;
  getCharactersByProject: (projectId: string) => Character[];

  fetchLocations: (projectId: string) => Promise<void>;
  createLocation: (
    data: Omit<Location, "id" | "createdAt" | "updatedAt">
  ) => Promise<Location>;
  deleteLocation: (id: string) => Promise<void>;
  updateLocation: (id: string, updates: Partial<Location>) => Promise<void>;
  getLocationsByProject: (projectId: string) => Location[];

  fetchTimeline: (projectId: string) => Promise<void>;
  createTimelineEvent: (
    data: Omit<TimelineEvent, "id" | "createdAt" | "updatedAt">
  ) => Promise<TimelineEvent>;
  deleteTimelineEvent: (id: string) => Promise<void>;
  updateTimelineEvent: (id: string, updates: Partial<TimelineEvent>) => Promise<void>;
  getTimelineByProject: (projectId: string) => TimelineEvent[];

  // UI actions
  setActiveProject: (id: string | null) => void;
  setActiveChapter: (id: string | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleFocusMode: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      // Initial state
      projects: [],
      chapters: [],
      characters: [],
      locations: [],
      timelineEvents: [],
      activeProjectId: null,
      activeChapterId: null,
      sidebarOpen: false,
      focusMode: false,
      isLoading: false,

      // ── Projects ──
      fetchProjects: async () => {
        set({ isLoading: true });
        try {
          const res = await fetch("/api/projects");
          const data = await res.json();
          set({ projects: data, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },

      createProject: async (projectData) => {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        const project = await res.json();
        set((s) => ({
          projects: [...s.projects, project],
          activeProjectId: project.id,
        }));
        return project;
      },

      updateProject: async (id, updates) => {
        await fetch(`/api/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
          ),
        }));
      },

      deleteProject: async (id) => {
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        set((s) => ({
          projects: s.projects.filter((p) => p.id !== id),
          chapters: s.chapters.filter((c) => c.projectId !== id),
          characters: s.characters.filter((c) => c.projectId !== id),
          locations: s.locations.filter((l) => l.projectId !== id),
          timelineEvents: s.timelineEvents.filter((e) => e.projectId !== id),
          activeProjectId:
            s.activeProjectId === id ? null : s.activeProjectId,
          activeChapterId: null,
        }));
      },

      getProject: (id) => get().projects.find((p) => p.id === id),

      // ── Chapters ──
      fetchChapters: async (projectId) => {
        const res = await fetch(`/api/projects/${projectId}/chapters`);
        const data = await res.json();
        set((s) => ({
          chapters: [
            ...s.chapters.filter((c) => c.projectId !== projectId),
            ...data,
          ],
        }));
      },

      createChapter: async (chapterData) => {
        const res = await fetch(
          `/api/projects/${chapterData.projectId}/chapters`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(chapterData),
          }
        );
        const chapter = await res.json();
        set((s) => ({
          chapters: [...s.chapters, chapter],
          activeChapterId: chapter.id,
        }));
        return chapter;
      },

      updateChapter: async (id, updates) => {
        // Optimistic update first for responsiveness (especially editor typing)
        set((s) => ({
          chapters: s.chapters.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
          ),
        }));
        // Then persist to API
        await fetch(`/api/chapters/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
      },

      deleteChapter: async (id) => {
        await fetch(`/api/chapters/${id}`, { method: "DELETE" });
        set((s) => ({
          chapters: s.chapters.filter((c) => c.id !== id),
          activeChapterId:
            s.activeChapterId === id ? null : s.activeChapterId,
        }));
      },

      getChapter: (id) => get().chapters.find((c) => c.id === id),

      getChaptersByProject: (projectId) =>
        get()
          .chapters.filter((c) => c.projectId === projectId)
          .sort((a, b) => a.number - b.number),

      setActiveChapter: (id) => set({ activeChapterId: id }),

      reorderChapters: (projectId, newOrder) => {
        const updated = get().chapters.map((c) => {
          if (c.projectId !== projectId) return c;
          const idx = newOrder.indexOf(c.id);
          if (idx !== -1) {
            const newNum = idx + 1;
            // Fire-and-forget API update
            fetch(`/api/chapters/${c.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ number: newNum }),
            });
            return { ...c, number: newNum };
          }
          return c;
        });
        set({ chapters: updated });
      },

      // ── Characters ──
      fetchCharacters: async (projectId) => {
        const res = await fetch(`/api/projects/${projectId}/characters`);
        const data = await res.json();
        set((s) => ({
          characters: [
            ...s.characters.filter((c) => c.projectId !== projectId),
            ...data,
          ],
        }));
      },

      createCharacter: async (charData) => {
        const res = await fetch(
          `/api/projects/${charData.projectId}/characters`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(charData),
          }
        );
        const character = await res.json();
        set((s) => ({ characters: [...s.characters, character] }));
        return character;
      },

      updateCharacter: async (id, updates) => {
        await fetch(`/api/characters/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        set((s) => ({
          characters: s.characters.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
          ),
        }));
      },

      deleteCharacter: async (id) => {
        await fetch(`/api/characters/${id}`, { method: "DELETE" });
        set((s) => ({
          characters: s.characters.filter((c) => c.id !== id),
        }));
      },

      getCharactersByProject: (projectId) =>
        get().characters.filter((c) => c.projectId === projectId),

      // ── Locations ──
      fetchLocations: async (projectId) => {
        const res = await fetch(`/api/projects/${projectId}/locations`);
        const data = await res.json();
        set((s) => ({
          locations: [
            ...s.locations.filter((l) => l.projectId !== projectId),
            ...data,
          ],
        }));
      },

      createLocation: async (locData) => {
        const res = await fetch(
          `/api/projects/${locData.projectId}/locations`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(locData),
          }
        );
        const location = await res.json();
        set((s) => ({ locations: [...s.locations, location] }));
        return location;
      },

      deleteLocation: async (id) => {
        await fetch(`/api/locations/${id}`, { method: "DELETE" });
        set((s) => ({ locations: s.locations.filter((l) => l.id !== id) }));
      },

      updateLocation: async (id, updates) => {
        await fetch(`/api/locations/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        set((s) => ({
          locations: s.locations.map((l) =>
            l.id === id ? { ...l, ...updates, updatedAt: new Date() } : l
          ),
        }));
      },

      getLocationsByProject: (projectId) =>
        get().locations.filter((l) => l.projectId === projectId),

      // ── Timeline ──
      fetchTimeline: async (projectId) => {
        const res = await fetch(`/api/projects/${projectId}/timeline`);
        const data = await res.json();
        set((s) => ({
          timelineEvents: [
            ...s.timelineEvents.filter((e) => e.projectId !== projectId),
            ...data,
          ],
        }));
      },

      createTimelineEvent: async (eventData) => {
        const res = await fetch(
          `/api/projects/${eventData.projectId}/timeline`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
          }
        );
        const event = await res.json();
        set((s) => ({ timelineEvents: [...s.timelineEvents, event] }));
        return event;
      },

      deleteTimelineEvent: async (id) => {
        await fetch(`/api/timeline/${id}`, { method: "DELETE" });
        set((s) => ({
          timelineEvents: s.timelineEvents.filter((e) => e.id !== id),
        }));
      },

      updateTimelineEvent: async (id, updates) => {
        await fetch(`/api/timeline/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        set((s) => ({
          timelineEvents: s.timelineEvents.map((e) =>
            e.id === id ? { ...e, ...updates, updatedAt: new Date() } : e
          ),
        }));
      },

      getTimelineByProject: (projectId) =>
        get()
          .timelineEvents.filter((e) => e.projectId === projectId)
          .sort((a, b) => a.order - b.order),

      // ── UI ──
      setActiveProject: (id) =>
        set({ activeProjectId: id, activeChapterId: null }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
    }),
    {
      name: "editora-storage",
      version: 1,
      partialize: (state) => ({
        activeProjectId: state.activeProjectId,
        focusMode: state.focusMode,
      }),
    }
  )
);