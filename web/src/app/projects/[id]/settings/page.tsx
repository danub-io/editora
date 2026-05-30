"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Settings,
  Save,
  Trash2,
  BookOpen,
  Palette,
  Type,
  Ruler,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_FORMATS = [
  { value: "12x19", label: "12 × 19 cm — bolso" },
  { value: "14x21", label: "14 × 21 cm — brochura" },
  { value: "A5", label: "A5 (148 × 210 mm) — literatura" },
  { value: "15x23", label: "15 × 23 cm — KDP" },
  { value: "16x23", label: "16 × 23 cm — padrão" },
  { value: "A4", label: "A4 (210 × 297 mm) — impressão" },
  { value: "29x36", label: "29 × 36 cm — revista" },
];

const MARGIN_PRESETS: Record<string, { top: string; bottom: string; inner: string; outer: string }> = {
  "12x19": { top: "1.2cm", bottom: "1.2cm", inner: "1.5cm", outer: "1.2cm" },
  "14x21": { top: "1.5cm", bottom: "1.5cm", inner: "2cm", outer: "1.5cm" },
  A5: { top: "1.5cm", bottom: "1.5cm", inner: "2cm", outer: "1.5cm" },
  "15x23": { top: "1.9cm", bottom: "1.9cm", inner: "2.2cm", outer: "1.9cm" },
  "16x23": { top: "1.9cm", bottom: "1.9cm", inner: "2.2cm", outer: "1.9cm" },
  A4: { top: "2cm", bottom: "2cm", inner: "2.5cm", outer: "2cm" },
  "29x36": { top: "1.5cm", bottom: "1.5cm", inner: "2cm", outer: "1.5cm" },
};

const FONT_FAMILIES = [
  "Lora", "Merriweather", "PT Serif", "Georgia",
  "Source Serif", "Literata", "Bookerly",
];

const FONT_SIZES = [9, 10, 11, 12, 13, 14];

const LINE_HEIGHTS = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];

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
    pageFormat: "16x23",
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
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
      pageFormat: project.settings?.pageFormat || "16x23",
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
    toast.success("Configurações salvas!");
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async () => {
    await deleteProject(projectId);
    toast.success("Projeto excluído com sucesso.");
    router.push("/");
  };

  if (!project) return null;

  return (
    <div className="p-4 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-4 md:space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
              <Settings className="h-6 w-6 text-primary" />
              Configurações
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie as configurações do seu projeto.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Salvando..." : saved ? "Salvo ✓" : "Salvar"}
          </Button>
        </div>

        {/* ── Book Info ── */}
        <section className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
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
        <section className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Ruler className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Formato da Página
            </h3>
          </div>
          <div className="grid gap-2">
            <Select value={form.pageFormat} onValueChange={(v) => {
              if (v == null) return;
              const preset = MARGIN_PRESETS[v];
              setForm({ ...form, pageFormat: v, marginTop: preset.top, marginBottom: preset.bottom, marginInner: preset.inner, marginOuter: preset.outer });
            }}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  {PAGE_FORMATS.find((f) => f.value === form.pageFormat)?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {PAGE_FORMATS.map((fmt) => (
                  <SelectItem key={fmt.value} value={fmt.value}>{fmt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </section>

        {/* ── Typography ── */}
        <section className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Type className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Tipografia
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Família da Fonte</Label>
              <Select value={form.fontFamily} onValueChange={(v) => v != null && setForm({ ...form, fontFamily: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue>{form.fontFamily}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {FONT_FAMILIES.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Tamanho (pt)</Label>
              <Select value={String(form.fontSize)} onValueChange={(v) => setForm({ ...form, fontSize: Number(v) })}>
                <SelectTrigger className="w-full">
                  <SelectValue>{form.fontSize}pt</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {FONT_SIZES.map((s) => (
                    <SelectItem key={s} value={String(s)}>{s}pt</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Entrelinhas</Label>
              <Select value={String(form.lineHeight)} onValueChange={(v) => setForm({ ...form, lineHeight: Number(v) })}>
                <SelectTrigger className="w-full">
                  <SelectValue>{form.lineHeight}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {LINE_HEIGHTS.map((h) => (
                    <SelectItem key={h} value={String(h)}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* ── Theme ── */}
        <section className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Tema</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {THEMES.map((t) => (
              <button
                key={t.value}
                onClick={() => setForm({ ...form, theme: t.value })}
                className={`p-4 rounded-lg border flex flex-col items-center gap-3 transition-all ${
                  form.theme === t.value
                    ? "border-primary shadow-md"
                      : "border-border hover:border-muted-foreground"
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
        <section className="bg-destructive/10 rounded-xl border border-destructive/20 p-4 md:p-6 space-y-4">
          <h3 className="text-lg font-semibold text-destructive flex items-center gap-3">
            <Trash2 className="h-5 w-5" />
            Zona de Perigo
          </h3>
          <p className="text-sm text-muted-foreground">
            Excluir este projeto removerá permanentemente todos os capítulos,
            personagens, locais e eventos de timeline associados.
          </p>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir Projeto
          </Button>
        </section>

        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Excluir Projeto
              </DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir este projeto? Esta ação é irreversível e removerá permanentemente todos os capítulos, personagens, locais e eventos associados.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
