"use client";

import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Users,
  Map,
  Clock,
  FileText,
  Download,
  Edit3,
  Sparkles,
} from "lucide-react";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav
        links={[
          { href: "/dash", label: "Dashboard" },
        ]}
      >
        <Link
          href="/dash"
          className="hidden text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:block"
        >
          Entrar
        </Link>
        <Link
          href="/dash"
          className="rounded-full bg-primary px-6 py-2.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Começar
        </Link>
      </Nav>

      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-8">
          <h1 className="mx-auto mb-4 max-w-4xl font-serif text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground">
            O ambiente mais focado para escrever seu livro
          </h1>
          <p className="mx-auto mb-4 max-w-2xl font-sans text-base lg:text-lg leading-relaxed text-muted-foreground">
            Editor de manuscrito pessoal com ferramentas profissionais para criação de
            personagens, worldbuilding, timeline e compilação em PDF e EPUB. Tudo o
            que você precisa para dar vida às suas histórias, em um só lugar.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dash"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Começar a escrever
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dash"
              className="inline-flex items-center justify-center rounded-full bg-card px-8 py-3.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              Ver dashboard
            </Link>
          </div>
        </section>

        {/* ─── Stats Section ─── */}
        <section className="bg-muted py-12">
          <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center gap-1">
                <span className="font-serif text-3xl font-bold text-foreground">
                  100%
                </span>
                <span className="text-xs text-muted-foreground">Foco na escrita</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-serif text-3xl font-bold text-foreground">
                  PDF + EPUB
                </span>
                <span className="text-xs text-muted-foreground">
                  Compilação profissional
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-serif text-3xl font-bold text-foreground">
                  IA
                </span>
                <span className="text-xs text-muted-foreground">
                  Análise de estilo integrada
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Product Features Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
          <h2 className="mb-8 text-center font-serif text-3xl lg:text-4xl font-semibold text-foreground">
            Tudo que você precisa para escrever
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                Editor de Texto
              </h3>
              <p className="text-sm text-muted-foreground">
                Editor rico com TipTap, formatação profissional, suporte a capítulos e
                controle de versão integrado.
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                Personagens
              </h3>
              <p className="text-sm text-muted-foreground">
                Fichas detalhadas com histórico, personalidade, arcos dramáticos e
                relacionamentos entre personagens.
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Map className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                Locais
              </h3>
              <p className="text-sm text-muted-foreground">
                Worldbuilding completo com notas de geografia, cultura e importância
                narrativa para cada cenário.
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                Timeline
              </h3>
              <p className="text-sm text-muted-foreground">
                Linha do tempo interativa para visualizar eventos na ordem cronológica
                e controlar o ritmo da narrativa.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Writing Workflow Section ─── */}
        <section className="bg-muted">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:px-8">
            <div className="order-1 md:order-2">
              <h2 className="mb-4 font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                Escreva do começo ao fim
              </h2>
              <p className="mb-4 max-w-lg font-sans text-base lg:text-lg leading-relaxed text-muted-foreground">
                Gerencie todo o seu manuscrito em um só lugar. Do primeiro rascunho à
                compilação final em PDF ou EPUB, cada etapa do processo criativo está
                ao seu alcance.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xs font-bold text-foreground">
                    Rascunho a rascunho
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Escreva e reescreva com versionamento automático.
                  </p>
                </div>
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xs font-bold text-foreground">
                    Compile com um clique
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Gere PDF e EPUB prontos para publicação.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-2 md:order-1">
              <div className="flex items-center justify-center rounded-xl bg-card p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Edit3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xs font-bold text-foreground">Editor Rico</h3>
                    <p className="text-xs text-muted-foreground">
                      Formatação profissional de texto.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xs font-bold text-foreground">IA</h3>
                    <p className="text-xs text-muted-foreground">
                      Sugestões de estilo e consistência.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── AI Analysis Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-8">
          <h2 className="mx-auto mb-4 max-w-2xl font-serif text-3xl lg:text-4xl font-semibold text-foreground">
            Seu revisor de estilo pessoal
          </h2>
          <p className="mx-auto mb-4 max-w-2xl font-sans text-base lg:text-lg leading-relaxed text-muted-foreground">
            Análise profunda de estilo narrativo, sugestões de vocabulário e
            verificação de consistência — tudo com inteligência artificial treinada
            para entender sua voz como autor.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex max-w-md flex-col items-center gap-4 rounded-xl bg-card p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Análise por IA
              </h3>
              <p className="text-sm text-muted-foreground">
                Receba sugestões contextuais de estilo, tom e consistência narrativa
                enquanto escreve — sem sair do editor.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Final CTA Section ─── */}
        <section className="bg-primary px-6 py-24 text-center text-primary-foreground">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 font-serif text-4xl lg:text-5xl font-bold leading-tight">
              Comece a escrever agora
            </h2>
            <p className="mx-auto mb-4 max-w-2xl font-sans text-base lg:text-lg leading-relaxed text-primary-foreground/80">
              Abra o editor e dê vida à sua história. Sua obra-prima começa com o
              primeiro parágrafo.
            </p>
            <Link
              href="/dash"
              className="inline-flex items-center justify-center rounded-full bg-card px-8 py-4 text-xs font-medium text-primary shadow-sm transition-colors hover:bg-muted"
            >
              Entrar no Editor
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
