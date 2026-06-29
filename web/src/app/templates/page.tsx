import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Templates — GospelReads.",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { SafeImage } from "@/components/marketplace/SafeImage";
import { Layout, Compass, Info } from "lucide-react";

const mockTemplates = [
  {
    name: "Romance Moderno",
    category: "Ficção",
    format: "6x9 polegadas (15.24 x 22.86 cm)",
    font: "Lora / Inter",
    description: "Layout refinado com margens amplas para proporcionar uma leitura confortável e imersiva. Ideal para romances longos e ficções contemporâneas.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Ensaio Acadêmico",
    category: "Não-Ficção",
    format: "A5 (14.8 x 21.0 cm)",
    font: "Playfair Display / Inter",
    description: "Estrutura limpa e pragmática, otimizada para ensaios filosóficos, teologia sistemática e estudos aprofundados com notas de rodapé generosas.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Poesia Clássica",
    category: "Poesia",
    format: "5x8 polegadas (12.7 x 20.32 cm)",
    font: "Lora",
    description: "Foco total na centralização dos versos, com amplas margens laterais e cabeçalhos discretos. Perfeito para coletâneas de poemas e devocionais líricos.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Devocional & Diário",
    category: "Devocional",
    format: "A5 (14.8 x 21.0 cm)",
    font: "Inter",
    description: "Design moderno com espaços dedicados para anotações diárias, citações em destaque e cabeçalhos decorados para leitura meditativa.",
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=600&auto=format&fit=crop",
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 max-w-container-max mx-auto px-edge-margin-mobile md:px-edge-margin-desktop py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-outline-variant pb-8">
          <h1 className="font-display-lg text-display-lg text-primary">Templates Editoriais</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
            Escolha entre layouts profissionais predefinidos para estruturar o seu livro. Nossos templates seguem os padrões da indústria de impressão e e-books.
          </p>
        </header>

        {/* Categories filters */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-outline-variant pb-4">
          <button className="font-label-md text-label-md uppercase tracking-widest px-4 py-2 bg-primary text-primary-foreground">
            Ver Todos
          </button>
          <button className="font-label-md text-label-md uppercase tracking-widest px-4 py-2 border border-outline-variant text-on-surface-variant hover:text-primary transition-colors">
            Ficção
          </button>
          <button className="font-label-md text-label-md uppercase tracking-widest px-4 py-2 border border-outline-variant text-on-surface-variant hover:text-primary transition-colors">
            Não-Ficção
          </button>
          <button className="font-label-md text-label-md uppercase tracking-widest px-4 py-2 border border-outline-variant text-on-surface-variant hover:text-primary transition-colors">
            Poesia
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockTemplates.map((tpl) => (
            <div
              key={tpl.name}
              className="border border-outline-variant hover:bg-surface-container-low transition-colors rounded-none flex flex-col sm:flex-row overflow-hidden group"
            >
              {/* Cover Preview Image */}
              <div className="sm:w-2/5 aspect-[3/4] sm:aspect-auto bg-surface-container overflow-hidden border-b sm:border-b-0 sm:border-r border-outline-variant relative">
                <SafeImage
                  src={tpl.image}
                  alt={tpl.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Template details */}
              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider block mb-1">
                    {tpl.category}
                  </span>
                  <h3 className="font-headline-md text-xl font-bold text-primary mb-3">
                    {tpl.name}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-3 mb-4">
                    {tpl.description}
                  </p>
                </div>

                {/* Specs / Meta */}
                <div className="space-y-4 pt-4 border-t border-outline-variant">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <Layout className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-label-md truncate">{tpl.format}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <Compass className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-label-md">{tpl.font}</span>
                    </div>
                  </div>

                  <button className="w-full font-label-md text-label-md uppercase tracking-widest bg-primary text-primary-foreground py-2.5 hover:bg-surface-tint transition-colors text-center">
                    Usar Este Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
