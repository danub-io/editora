import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "GospelReads. — Do manuscrito ao livro",
};

import Link from "next/link";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { SafeImage } from "@/components/marketplace/SafeImage";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HomeHeader />

      <main id="main-content" className="flex-1 max-w-container-max mx-auto px-edge-margin-mobile md:px-edge-margin-desktop">
        {/* ─── Hero Section ─── */}
        <section className="py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="flex flex-col gap-6">
              <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg font-bold text-primary">
                Onde as
                <br />
                histórias ganham
                <br />
                forma definitiva
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Escreva, revise e publique com as ferramentas que os melhores
                autores e editores usam. Do rascunho ao livro — sem distrações.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <Link
                  href="/dash"
                  className="font-label-lg text-label-md uppercase tracking-widest bg-primary text-primary-foreground px-8 py-3 hover:bg-surface-tint transition-colors rounded-none w-full sm:w-auto text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Iniciar Manuscrito
                </Link>
                <Link
                  href="/acervo"
                  className="font-label-lg text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-outline-variant px-8 py-3 rounded-none w-full sm:w-auto text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Explorar Acervo
                </Link>
              </div>
            </div>

            {/* Right: decorative mockup */}
            <div className="hidden md:flex justify-center relative">
              <div className="relative w-64 h-80">
                {/* Manuscript page mockup */}
                <div className="absolute top-0 left-0 w-56 h-72 bg-surface-container border border-outline-variant p-4 rotate-[-3deg]">
                  <div className="space-y-2 pt-8">
                    <div className="h-1.5 w-full bg-surface-container-high" />
                    <div className="h-1.5 w-5/6 bg-surface-container-high" />
                    <div className="h-1.5 w-4/6 bg-surface-container-high" />
                    <div className="h-1.5 w-full bg-surface-container-high" />
                    <div className="h-1.5 w-3/4 bg-surface-container-high" />
                    <div className="h-1.5 w-5/6 bg-surface-container-high" />
                    <div className="h-1.5 w-2/3 bg-surface-container-high" />
                  </div>
                </div>
                {/* Book cover block */}
                <div className="absolute bottom-0 right-0 w-40 h-52 bg-surface-container-low overflow-hidden rotate-[2deg] border border-outline-variant">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop"
                    alt="GospelReads. Obra"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Community Showcase ─── */}
        <section className="py-24 border-t border-outline-variant">
          <div className="space-y-12">
            {/* Section header */}
            <div className="space-y-3">
              <span className="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
                Do Acervo Público
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
                Histórias da
                <br />
                comunidade
              </h2>
            </div>

            {/* Featured book */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Book cover mockup */}
              <div className="flex justify-center">
                <div className="w-48 h-64 border border-outline-variant bg-surface-container-low overflow-hidden">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400&auto=format&fit=crop"
                    alt="Vozes do Silêncio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Description */}
              <div className="flex flex-col gap-4">
                <h3 className="font-headline-md text-headline-md font-bold text-primary">
                  Vozes do Silêncio
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Um romance íntimo sobre três gerações de mulheres que
                  descobrem, nas entrelinhas do passado, a força para
                  reescrever o futuro. Publicado de forma independente
                  através do GospelReads.
                </p>
                <Link
                  href="/acervo"
                  className="font-label-lg text-label-md uppercase tracking-widest text-primary hover:text-surface-tint transition-colors self-start border-b border-outline-variant pb-1"
                >
                  Ler Obra
                </Link>
              </div>
            </div>

            {/* Recent releases grid */}
            <div className="space-y-4">
              <h3 className="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
                Lançamentos Recentes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Aurora", author: "Pedro Lima", genre: "Ficção", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop" },
                  { title: "Raízes", author: "Ana Torres", genre: "Poesia", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=300&auto=format&fit=crop" },
                  { title: "O Portal", author: "Lucas Sá", genre: "Fantasia", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300&auto=format&fit=crop" },
                  { title: "Cartas", author: "Clara Melo", genre: "Ensaio", image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=300&auto=format&fit=crop" },
                ].map((book) => (
                  <div
                    key={book.title}
                    className="border border-outline-variant p-4 hover:bg-surface-container-low transition-colors rounded-none"
                  >
                    <div className="aspect-[3/4] bg-surface-container-low overflow-hidden mb-3 border border-outline-variant">
                      <SafeImage
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-label-md text-label-md font-bold text-primary">
                      {book.title}
                    </p>
                    <p className="font-caption text-caption text-on-surface-variant">
                      {book.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Functional Grid ─── */}
        <section className="py-24 border-t border-outline-variant">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-outline-variant">
            {[
              {
                index: "01",
                label: "Editor",
                title: "Prepare seu\nmanuscrito",
                desc: "Ferramentas de revisão, formatação e anotações para polir cada linha com precisão editorial.",
              },
              {
                index: "02",
                label: "Designer",
                title: "Dê forma\nao texto",
                desc: "Tipografia refinada, templates de capa e layout profissional para cada gênero literário.",
              },
              {
                index: "03",
                label: "Autor",
                title: "Escreva sem\natritos",
                desc: "Um ambiente focado, livre de distrações, com tudo o que você precisa ao alcance — e nada mais.",
              },
              {
                index: "04",
                label: "Leitor",
                title: "Publique para\n o mundo",
                desc: "Exporte para EPUB, PDF e Web com um clique. Sua obra, nos formatos que os leitores exigem.",
              },
            ].map((cell) => (
              <div
                key={cell.index}
                className="p-12 border-b border-outline-variant odd:border-r border-outline-variant hover:bg-surface-container-low transition-colors rounded-none"
              >
                <span className="font-caption text-caption uppercase tracking-widest text-on-surface-variant">
                  {cell.index} — {cell.label}
                </span>
                <h3 className="font-headline-md text-headline-md font-bold italic text-primary mt-3 whitespace-pre-line">
                  {cell.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-3">
                  {cell.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ─── Stats Bar (full-width, outside main container) ─── */}
      <div className="w-full bg-primary text-primary-foreground py-3 border-t border-outline-variant text-center">
        <p className="font-caption text-caption uppercase tracking-widest opacity-80">
          +12.000 manuscritos criados &nbsp;·&nbsp; +3.500 obras publicadas
          &nbsp;·&nbsp; Comunidade em 14 países
        </p>
      </div>

      <Footer />
    </div>
  );
}
