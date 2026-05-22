"use client";

import {
  BookOpen,
  ArrowRight,
  Star,
  Users,
  ShieldCheck,
  CheckCircle,
  Mail,
  MessageCircle,
  FolderOpen,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero Section ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-8">
        <h1 className="mx-auto mb-6 max-w-4xl font-serif text-h1 font-bold leading-tight tracking-tight text-on-background">
          Transforme seu manuscrito em uma obra-prima
        </h1>
        <p className="mx-auto mb-10 max-w-2xl font-sans text-editor-text leading-relaxed text-on-surface-variant">
          Conecte-se com os melhores editores, designers e profissionais do
          mercado editorial. Selecionamos os top 3% para garantir que sua
          obra brilhe.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-ui-label font-medium text-on-primary shadow-sm transition-colors hover:bg-primary/90"
          >
            Começar agora
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface-container-lowest px-8 py-3.5 text-ui-label font-medium text-on-background transition-colors hover:bg-surface-container"
          >
            Explorar profissionais
          </a>
        </div>
      </section>

      {/* ─── Trust / Logos Section ─── */}
      <section className="border-y border-border bg-surface-container-low py-12">
        {/* Content filled in task-02 */}
      </section>

      {/* ─── Talent Showcase Section ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        {/* Content filled in task-02 */}
      </section>

      {/* ─── Collaboration Section ─── */}
      <section className="border-y border-border bg-surface-container-low">
        {/* Content filled in task-03 */}
      </section>

      {/* ─── Trust & Protection Section ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-8">
        {/* Content filled in task-03 */}
      </section>

      {/* ─── Final CTA Section ─── */}
      <section className="bg-primary px-6 py-24 text-center text-on-primary">
        {/* Content filled in task-03 */}
      </section>
    </div>
  );
}
