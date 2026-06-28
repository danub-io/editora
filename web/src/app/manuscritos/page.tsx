import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Manuscritos — GospelReads.",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { SafeImage } from "@/components/marketplace/SafeImage";
import { Plus,Clock, Calendar } from "lucide-react";
import Link from "next/link";

const mockManuscripts = [
  {
    id: "m1",
    title: "O Eco do Vento",
    author: "Sara Ribeiro",
    wordCount: 45200,
    status: "Em Progresso",
    progress: 68,
    lastEdit: "Há 45 minutos",
    created: "22 de Mai de 2026",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m2",
    title: "As Crônicas da Graça",
    author: "Mário Neto",
    wordCount: 12800,
    status: "Esboço",
    progress: 20,
    lastEdit: "Ontem, às 18:30",
    created: "10 de Jun de 2026",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m3",
    title: "Fundamentos do Amanhã",
    author: "Sara Ribeiro",
    wordCount: 89000,
    status: "Concluído",
    progress: 100,
    lastEdit: "Há 1 semana",
    created: "15 de Jan de 2026",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  },
];

export default function ManuscritosPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 max-w-container-max mx-auto px-edge-margin-mobile md:px-edge-margin-desktop py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-outline-variant pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="font-display-lg text-display-lg text-primary">Meus Manuscritos</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
              Crie, gerencie e organize seus rascunhos de livros. Utilize nosso editor integrado focado em escrita sem distrações.
            </p>
          </div>
          <Link
            href="/dash"
            className="flex items-center justify-center bg-primary text-primary-foreground font-label-md text-label-md uppercase px-6 py-3 hover:bg-surface-tint transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Manuscrito
          </Link>
        </header>

        {/* Manuscripts Grid List */}
        <div className="space-y-8">
          {mockManuscripts.map((manuscript) => (
            <div
              key={manuscript.id}
              className="border border-outline-variant p-6 hover:bg-surface-container-low transition-colors rounded-none flex flex-col md:flex-row gap-8 items-start md:items-center"
            >
              {/* Cover layout preview */}
              <div className="w-24 shrink-0 aspect-[2/3] bg-surface-container-low border border-outline-variant overflow-hidden relative self-center md:self-auto">
                <SafeImage
                  src={manuscript.cover}
                  alt={manuscript.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description and Info */}
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <div className="flex flex-wrap gap-3 items-center mb-1">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                      {manuscript.author}
                    </span>
                    <span className="w-1 h-1 bg-outline rounded-full" />
                    <span className="font-caption text-caption text-primary uppercase tracking-wider font-semibold">
                      {manuscript.status}
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-primary font-bold">
                    {manuscript.title}
                  </h3>
                </div>

                {/* Progress metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="font-caption text-[11px] text-on-surface-variant uppercase tracking-wider block">
                      Palavras
                    </span>
                    <span className="font-label-lg text-base text-primary font-bold">
                      {manuscript.wordCount.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-caption text-[11px] text-on-surface-variant uppercase tracking-wider block">
                      Progresso do Livro
                    </span>
                    <span className="font-label-lg text-base text-primary font-bold">
                      {manuscript.progress}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-caption text-[11px] text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Última Edição
                    </span>
                    <span className="font-label-md text-sm text-on-surface-variant block mt-0.5">
                      {manuscript.lastEdit}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-caption text-[11px] text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Criado em
                    </span>
                    <span className="font-label-md text-sm text-on-surface-variant block mt-0.5">
                      {manuscript.created}
                    </span>
                  </div>
                </div>

                {/* Progress Line */}
                <div className="w-full h-1 bg-outline-variant relative">
                  <div
                    className="absolute left-0 top-0 h-full bg-primary"
                    style={{ width: `${manuscript.progress}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-end">
                <Link
                  href="/dash"
                  className="flex-1 md:flex-none text-center font-label-md text-label-md uppercase tracking-widest bg-primary text-primary-foreground px-6 py-2.5 hover:bg-surface-tint transition-colors"
                >
                  Editar Texto
                </Link>
                <button className="flex-1 md:flex-none font-label-md text-label-md uppercase tracking-widest border border-outline-variant text-on-surface-variant hover:text-primary px-6 py-2.5 transition-colors">
                  Configurar Capa
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
