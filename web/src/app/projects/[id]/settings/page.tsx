"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Save,
  Trash2,
  BookOpen,
  Palette,
  Type,
  Ruler,
} from "lucide-react";

const PAGE_FORMATS = [
  { value: "A5", label: "A5 (148 × 210 mm)" },
  { value: "6x9", label: '6" × 9" (KDP)' },
  { value: "5x8", label: '5" × 8"' },
  { value: "5.5x8.5", label: '5.5" × 8.5"' },
];

const THEMES = [
  { value: "light", label: "Claro", color: "bg-white" },
  { value: "dark", label: "Escuro", color: "bg-gray-900" },
  { value: "sepia", label: "Sépia", color: "bg-amber-50" },
];

export default function SettingsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { getProject, updateProject, deleteProject, fetchProjects } =
    useProjectStore();

  const project = getProject(projectId);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    language: "pt-BR",
    isbn: "",
    pageFormat: "6x9",
    fontFamily: "Lora",
    fontSize: 11,
    lineHeight: 1.4,
    marginTop: "2cm",
    marginBottom: "2cm",
    marginInner: "2.5cm",
    marginOuter: "2cm",
    theme: "light",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!project) {
      fetchProjects();
      return;
    }
    setForm({
      title: project.title || "",
      author: project.author || "",
      description: project.description || "",
      language: project.language || "pt-BR",
      isbn: project.isbn || "",
      pageFormat: project.settings?.pageFormat || "6x9",
      fontFamily: project.settings?.fontFamily || "Lora",
      fontSize: project.settings?.fontSize || 11,
      lineHeight: project.settings?.lineHeight || 1.4,
      marginTop: project.settings?.margins?.top || "2cm",
      marginBottom: project.settings?.margins?.bottom || "2cm",
      marginInner: project.settings?.margins?.inner || "2.5cm",
      marginOuter: project.settings?.margins?.outer || "2cm",
      theme: project.settings?.theme || "light",
    });
  }, [project, fetchProjects]);

  const handleSave = async () => {
    setIsSaving(true);
    await updateProject(projectId, {
      title: form.title,
      author: form.author,
      description: form.description,
      language: form.language,
      isbn: form.isbn,
      settings: {
        pageFormat: form.pageFormat as any,
        fontFamily: form.fontFamily,
        fontSize: form.fontSize,
        lineHeight: form.lineHeight,
        margins: {
          top: form.marginTop,
          bottom: form.marginBottom,
          inner: form.marginInner,
          outer: form.marginOuter,
        },
        theme: form.theme as any,
      },
    });
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este projeto? Esta ação é irreversível.")) {
      await deleteProject(projectId);
      router.push("/");
    }
  };

  if (!project) return null;

  return (
    <div className="p-8 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-h2 font-semibold text-on-background flex items-center gap-3">
              <Settings className="h-6 w-6 text-primary" />
              Configurações
            </h2>
            <p className="text-ui-body text-on-surface-variant mt-1">
              Gerencie as configurações do seu projeto.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary text-on-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Salvando..." : saved ? "Salvo ✓" : "Salvar"}
          </Button>
        </div>

        {/* ── Book Info ── */}
        <section className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-on-background">
              Informações do Livro
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição / Sinopse</Label>
            <Textarea
              id="description"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="language">Idioma</Label>
              <Input
                id="language"
                value={form.language}
                onChange={(e) =>
                  setForm({ ...form, language: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                placeholder="Opcional"
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* ── Page Format ── */}
        <section className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Ruler className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-on-background">
              Formato da Página
            </h3>
          </div>
          <div className="grid gap-2">
            <Label>Formato</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PAGE_FORMATS.map((fmt) => (
                <button
                  key={fmt.value}
                  onClick={() => setForm({ ...form, pageFormat: fmt.value })}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    form.pageFormat === fmt.value
                      ? "border-primary bg-primary-container/20 text-primary"
                      : "border-border text-on-surface-variant hover:border-md-outline"
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="mt">Margem Superior</Label>
              <Input
                id="mt"
                value={form.marginTop}
                onChange={(e) =>
                  setForm({ ...form, marginTop: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mb">Margem Inferior</Label>
              <Input
                id="mb"
                value={form.marginBottom}
                onChange={(e) =>
                  setForm({ ...form, marginBottom: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mi">Margem Interna</Label>
              <Input
                id="mi"
                value={form.marginInner}
                onChange={(e) =>
                  setForm({ ...form, marginInner: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mo">Margem Externa</Label>
              <Input
                id="mo"
                value={form.marginOuter}
                onChange={(e) =>
                  setForm({ ...form, marginOuter: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* ── Typography ── */}
        <section className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Type className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-on-background">
              Tipografia
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fontFamily">Família da Fonte</Label>
              <Input
                id="fontFamily"
                value={form.fontFamily}
                onChange={(e) =>
                  setForm({ ...form, fontFamily: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fontSize">Tamanho (pt)</Label>
              <Input
                id="fontSize"
                type="number"
                value={form.fontSize}
                onChange={(e) =>
                  setForm({ ...form, fontSize: Number(e.target.value) })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lineHeight">Entrelinhas</Label>
              <Input
                id="lineHeight"
                type="number"
                step="0.1"
                value={form.lineHeight}
                onChange={(e) =>
                  setForm({ ...form, lineHeight: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </section>

        {/* ── Theme ── */}
        <section className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-on-background">Tema</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {THEMES.map((t) => (
              <button
                key={t.value}
                onClick={() => setForm({ ...form, theme: t.value })}
                className={`p-4 rounded-lg border flex flex-col items-center gap-3 transition-all ${
                  form.theme === t.value
                    ? "border-primary shadow-md"
                      : "border-border hover:border-md-outline"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg ${t.color} border border-border`}
                />
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Danger Zone ── */}
        <section className="bg-error-container/10 rounded-xl border border-error/20 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-error flex items-center gap-3">
            <Trash2 className="h-5 w-5" />
            Zona de Perigo
          </h3>
          <p className="text-ui-body text-on-surface-variant">
            Excluir este projeto removerá permanentemente todos os capítulos,
            personagens, locais e eventos de timeline associados.
          </p>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="bg-error text-on-error hover:bg-error/90"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir Projeto
          </Button>
        </section>
      </div>
    </div>
  );
}
