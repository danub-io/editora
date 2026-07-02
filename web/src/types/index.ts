export interface Project {
  id: string;
  title: string;
  author: string;
  description?: string;
  language: string;
  isbn?: string;
  categories: string[];
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  coverImage?: string;
  settings: ProjectSettings;
}

export interface ProjectSettings {
  pageFormat: "A5" | "6x9" | "5x8" | "5.5x8.5";
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  margins: {
    top: string;
    bottom: string;
    inner: string;
    outer: string;
  };
  theme: "light" | "dark" | "sepia";
}

export interface Chapter {
  id: string;
  projectId: string;
  parentId?: string | null;
  isFolder?: boolean;
  type?: string;
  subType?: string;
  partId?: string | null;
  number?: number;
  order: number;
  title: string;
  content: string;
  synopsis?: string | null;
  wordCount: number;
  tags: string[];
  status?: string | null;
  label?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ViewMode = "editor" | "corkboard" | "outliner";

export interface Character {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  role?: string;
  relationships?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  type?: "indoor" | "outdoor" | "city" | "fantasy" | "other";
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEvent {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  date?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditorState {
  activeProjectId: string | null;
  activeChapterId: string | null; // This acts as the selected item in the Binder
  sidebarOpen: boolean;
  focusMode: boolean;
  inspectorOpen: boolean;
  viewMode: ViewMode;
}

export interface AIResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface EditSuggestion {
  original: string;
  edited: string;
  reason: string;
}

export interface ProofreadingError {
  original: string;
  correction: string;
  type: "gramática" | "ortografia" | "pontuação" | "concordância" | "digitação";
  explanation: string;
}

export interface ConsistencyIssue {
  type: "character" | "timeline" | "fact" | "tone";
  description: string;
  chapters?: number[];
  severity: "low" | "medium" | "high";
}
