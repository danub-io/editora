"use client";

import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Star,
  Users,
  ShieldCheck,
  CheckCircle,
  MessageCircle,
  FolderOpen,
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

        {/* ─── Talent Showcase Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
          <div className="grid items-center gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-4 font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                Conheça os profissionais
              </h2>
              <p className="mb-4 font-sans text-base lg:text-lg leading-relaxed text-muted-foreground">
                Nosso marketplace reúne milhares de editores, designers e
                marketeiros independentes que já trabalharam em livros
                best-sellers.
              </p>
              <ul className="mb-4 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Top 3% de talentos selecionados
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Experiência verificada no mercado editorial
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Ferramentas de colaboração integradas
                  </span>
                </li>
              </ul>
              <Link
                href="/dash"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                Explorar perfis{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center rounded-xl bg-card p-8 shadow-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-foreground">
                    Editora Profissional
                  </p>
                  <p className="text-center text-sm text-muted-foreground">
                    &ldquo;Excelente trabalho editorial, superou todas as
                    expectativas.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Collaboration Section ─── */}
        <section className="bg-muted">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:px-8">
            <div className="order-2 md:order-1">
              <div className="flex items-center justify-center rounded-xl bg-card p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xs font-bold text-foreground">
                      Mensagens
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Chat em tempo real com profissionais.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FolderOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xs font-bold text-foreground">
                      Arquivos
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Compartilhe manuscritos com segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="mb-4 font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                Colaboração perfeita
              </h2>
              <p className="mb-4 max-w-lg font-sans text-base lg:text-lg leading-relaxed text-muted-foreground">
                Gerencie todo o seu projeto em um único painel. Compartilhe
                arquivos, comunique-se diretamente e processe pagamentos com
                segurança — tudo sem sair da plataforma.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-4 text-xs font-bold text-foreground">
                    Mensagens diretas
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Converse com profissionais instantaneamente.
                  </p>
                </div>
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FolderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-4 text-xs font-bold text-foreground">
                    Compartilhamento
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Troque manuscritos com total segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trust & Protection Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-8">
          <h2 className="mx-auto mb-4 max-w-2xl font-serif text-3xl lg:text-4xl font-semibold text-foreground">
            Seu trabalho está seguro
          </h2>
          <p className="mx-auto mb-4 max-w-2xl font-sans text-base lg:text-lg leading-relaxed text-muted-foreground">
            Cuidamos dos contratos e pagamentos para que você possa focar no
            processo criativo. Cada projeto é respaldado pela nossa garantia
            Editora.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex max-w-md flex-col items-center gap-4 rounded-xl bg-card p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Garantia Editora
              </h3>
              <p className="text-sm text-muted-foreground">
                Proteção total do início ao fim. Segurança, transparência e
                qualidade garantida em cada etapa do seu projeto editorial.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Final CTA Section ─── */}
        <section className="bg-primary px-6 py-24 text-center text-primary-foreground">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 font-serif text-4xl lg:text-5xl font-bold leading-tight">
              Pronto para publicar sua obra-prima?
            </h2>
            <p className="mx-auto mb-4 max-w-2xl font-sans text-base lg:text-lg leading-relaxed text-primary-foreground/80">
              Junte-se a milhares de autores que encontraram a equipe editorial
              perfeita na Editora.
            </p>
            <Link
              href="/dash"
              className="inline-flex items-center justify-center rounded-full bg-card px-8 py-4 text-xs font-medium text-primary shadow-sm transition-colors hover:bg-muted"
            >
              Cadastre-se gratuitamente
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
