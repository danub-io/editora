import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Diário — GospelReads.",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { SafeImage } from "@/components/marketplace/SafeImage";
import { PenLine, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const mockPosts = [
  {
    title: "O Resgate da Literatura Clássica na Era Digital",
    slug: "resgate-literatura-classica",
    excerpt: "Como a facilidade do acesso digital nos ajuda a redescobrir obras fundamentais da teologia e da ficção clássica que moldaram gerações.",
    date: "25 de Junho, 2026",
    readTime: "5 min de leitura",
    category: "Ensaios",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "A Arte de Estruturar um Manuscrito Teológico",
    slug: "arte-estruturar-manuscrito",
    excerpt: "Dicas práticas de organização, pesquisa e estilo de escrita para novos autores que desejam publicar ensaios e estudos teológicos claros.",
    date: "18 de Junho, 2026",
    readTime: "8 min de leitura",
    category: "Escrever",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Por que ainda lemos em papel? O Charme da Impressão",
    slug: "charme-da-impressao",
    excerpt: "Uma reflexão sobre a experiência tátil da leitura física, o design editorial clássico e como a tipografia influencia a nossa absorção do texto.",
    date: "05 de Junho, 2026",
    readTime: "6 min de leitura",
    category: "Reflexões",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  },
];

export default function DiárioPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 max-w-container-max mx-auto px-edge-margin-mobile md:px-edge-margin-desktop py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-outline-variant pb-8">
          <h1 className="font-display-lg text-display-lg text-primary flex items-center gap-3">
            <PenLine className="w-8 h-8 text-primary" /> Diário de Bordo
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
            Críticas literárias, reflexões teológicas, novidades da plataforma e conselhos práticos para autores e leitores.
          </p>
        </header>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <article
              key={post.slug}
              className="border border-outline-variant hover:bg-surface-container-low transition-colors rounded-none flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="aspect-[16/10] bg-surface-container overflow-hidden border-b border-outline-variant relative">
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="font-caption text-caption text-primary uppercase tracking-wider font-semibold">
                    {post.category}
                  </span>
                  <h3 className="font-headline-md text-lg font-bold text-primary line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Meta & Link */}
              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-widest group-hover:text-surface-tint transition-colors border-t border-outline-variant pt-4">
                  Ler Artigo <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
