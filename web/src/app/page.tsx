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
          className="hidden text-ui-label font-medium text-on-surface-variant transition-colors hover:text-on-background md:block"
        >
          Entrar
        </Link>
        <Link
          href="/dash"
          className="rounded-full bg-primary px-6 py-2.5 text-ui-label font-medium text-on-primary shadow-sm transition-colors hover:bg-primary/90"
        >
          Começar
        </Link>
      </Nav>

      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-8">
          <h1 className="mx-auto mb-4 max-w-4xl font-serif text-h1 font-bold leading-tight tracking-tight text-on-background">
            Transforme seu manuscrito em uma obra-prima
          </h1>
          <p className="mx-auto mb-4 max-w-2xl font-sans text-editor-text leading-relaxed text-on-surface-variant">
            Conecte-se com os melhores editores, designers e profissionais do
            mercado editorial. Selecionamos os top 3% para garantir que sua
            obra brilhe.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dash"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-ui-label font-medium text-on-primary shadow-sm transition-colors hover:bg-primary/90"
            >
              Começar agora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dash"
              className="inline-flex items-center justify-center rounded-full bg-surface-container-lowest px-8 py-3.5 text-ui-label font-medium text-on-background transition-colors hover:bg-surface-container"
            >
              Explorar profissionais
            </Link>
          </div>
        </section>

        {/* ─── Trust / Logos Section ─── */}
        <section className="bg-surface-container-low py-12">
          <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
            <p className="mb-4 text-ui-label font-medium uppercase tracking-wider text-md-outline">
              Destaque na mídia
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 opacity-50 md:gap-4">
              <span className="font-serif text-headline-md font-bold text-on-background">
                The New York Times
              </span>
              <span className="font-serif text-headline-md font-bold italic text-on-background">
                Forbes
              </span>
              <span className="font-serif text-headline-md font-bold tracking-tighter text-on-background">
                WIRED
              </span>
              <span className="font-serif text-headline-md font-bold uppercase text-on-background">
                The Guardian
              </span>
            </div>
          </div>
        </section>

        {/* ─── Talent Showcase Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
          <div className="grid items-center gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-4 font-serif text-h2 font-semibold text-on-background">
                Conheça os profissionais
              </h2>
              <p className="mb-4 font-sans text-editor-text leading-relaxed text-on-surface-variant">
                Nosso marketplace reúne milhares de editores, designers e
                marketeiros independentes que já trabalharam em livros
                best-sellers.
              </p>
              <ul className="mb-4 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-ui-body text-on-surface-variant">
                    Top 3% de talentos selecionados
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-ui-body text-on-surface-variant">
                    Experiência verificada no mercado editorial
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-ui-body text-on-surface-variant">
                    Ferramentas de colaboração integradas
                  </span>
                </li>
              </ul>
              <Link
                href="/dash"
                className="inline-flex items-center gap-1 text-ui-label font-medium text-primary transition-colors hover:text-primary/80"
              >
                Explorar perfis{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center rounded-xl bg-surface-container-lowest p-8 shadow-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-container">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-tertiary-fixed text-tertiary-fixed" />
                    ))}
                  </div>
                  <p className="text-ui-label font-medium text-on-background">
                    Editora Profissional
                  </p>
                  <p className="text-center text-ui-body text-on-surface-variant">
                    &ldquo;Excelente trabalho editorial, superou todas as
                    expectativas.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Collaboration Section ─── */}
        <section className="bg-surface-container-low">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:px-8">
            <div className="order-2 md:order-1">
              <div className="flex items-center justify-center rounded-xl bg-surface-container-lowest p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-container">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-ui-label font-bold text-on-background">
                      Mensagens
                    </h3>
                    <p className="text-ui-label text-on-surface-variant">
                      Chat em tempo real com profissionais.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-container">
                      <FolderOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-ui-label font-bold text-on-background">
                      Arquivos
                    </h3>
                    <p className="text-ui-label text-on-surface-variant">
                      Compartilhe manuscritos com segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="mb-4 font-serif text-h2 font-semibold text-on-background">
                Colaboração perfeita
              </h2>
              <p className="mb-4 max-w-lg font-sans text-editor-text leading-relaxed text-on-surface-variant">
                Gerencie todo o seu projeto em um único painel. Compartilhe
                arquivos, comunique-se diretamente e processe pagamentos com
                segurança — tudo sem sair da plataforma.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-4 text-ui-label font-bold text-on-background">
                    Mensagens diretas
                  </h3>
                  <p className="text-ui-label text-on-surface-variant">
                    Converse com profissionais instantaneamente.
                  </p>
                </div>
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container">
                    <FolderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-4 text-ui-label font-bold text-on-background">
                    Compartilhamento
                  </h3>
                  <p className="text-ui-label text-on-surface-variant">
                    Troque manuscritos com total segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trust & Protection Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-8">
          <h2 className="mx-auto mb-4 max-w-2xl font-serif text-h2 font-semibold text-on-background">
            Seu trabalho está seguro
          </h2>
          <p className="mx-auto mb-4 max-w-2xl font-sans text-editor-text leading-relaxed text-on-surface-variant">
            Cuidamos dos contratos e pagamentos para que você possa focar no
            processo criativo. Cada projeto é respaldado pela nossa garantia
            Editora.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex max-w-md flex-col items-center gap-4 rounded-xl bg-surface-container-lowest p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-headline-md font-semibold text-on-background">
                Garantia Editora
              </h3>
              <p className="text-ui-body text-on-surface-variant">
                Proteção total do início ao fim. Segurança, transparência e
                qualidade garantida em cada etapa do seu projeto editorial.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Final CTA Section ─── */}
        <section className="bg-primary px-6 py-24 text-center text-on-primary">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 font-serif text-h1 font-bold leading-tight">
              Pronto para publicar sua obra-prima?
            </h2>
            <p className="mx-auto mb-4 max-w-2xl font-sans text-editor-text leading-relaxed text-on-primary-container/80">
              Junte-se a milhares de autores que encontraram a equipe editorial
              perfeita na Editora.
            </p>
            <Link
              href="/dash"
              className="inline-flex items-center justify-center rounded-full bg-surface-container-lowest px-8 py-4 text-ui-label font-medium text-primary shadow-sm transition-colors hover:bg-surface-container"
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
