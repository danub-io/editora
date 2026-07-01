import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Templates — GospelReads.",
};

import Navbar from "@/components/gospelreads/Navbar";
import Footer from "@/components/gospelreads/Footer";
import { SafeImage } from "@/components/marketplace/SafeImage";
import { Layout, Compass } from "lucide-react";

const mockTemplates = [
  {
    name: "Romance Moderno",
    category: "Ficção",
    format: "6x9 polegadas (15.24 x 22.86 cm)",
    font: "Lora / Inter",
    description:
      "Layout refinado com margens amplas para proporcionar uma leitura confortável e imersiva. Ideal para romances longos e ficções contemporâneas.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Ensaio Acadêmico",
    category: "Não-Ficção",
    format: "A5 (14.8 x 21.0 cm)",
    font: "Playfair Display / Inter",
    description:
      "Estrutura limpa e pragmática, otimizada para ensaios filosóficos, teologia sistemática e estudos aprofundados com notas de rodapé generosas.",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Poesia Clássica",
    category: "Poesia",
    format: "5x8 polegadas (12.7 x 20.32 cm)",
    font: "Lora",
    description:
      "Foco total na centralização dos versos, com amplas margens laterais e cabeçalhos discretos. Perfeito para coletâneas de poemas e devocionais líricos.",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Devocional & Diário",
    category: "Devocional",
    format: "A5 (14.8 x 21.0 cm)",
    font: "Inter",
    description:
      "Design moderno com espaços dedicados para anotações diárias, citações em destaque e cabeçalhos decorados para leitura meditativa.",
    image:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=600&auto=format&fit=crop",
  },
];

const categories = ["Ver Todos", "Ficção", "Não-Ficção", "Poesia"];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col pt-16">
      <Navbar />
      <main id="main-content" className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-gray-200 dark:border-zinc-800 pb-8">
          <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block mb-3">
            DIAGRAMAÇÃO EDITORIAL
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-tight">
            Templates Editoriais
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-4 max-w-2xl text-sm">
            Escolha entre layouts profissionais predefinidos para estruturar o seu livro. Nossos templates seguem os padrões da indústria de impressão e e-books.
          </p>
        </header>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-gray-200 dark:border-zinc-800 pb-4">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                i === 0
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockTemplates.map((tpl) => (
            <div
              key={tpl.name}
              className="bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors rounded-lg flex flex-col sm:flex-row overflow-hidden group"
            >
              {/* Cover Preview Image */}
              <div className="sm:w-2/5 aspect-[3/4] sm:aspect-auto bg-gray-200 dark:bg-zinc-800 overflow-hidden border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-zinc-700 relative">
                <SafeImage
                  src={tpl.image}
                  alt={tpl.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Template details */}
              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest font-mono block mb-2">
                    {tpl.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-3 uppercase tracking-tight">
                    {tpl.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                {/* Specs / Meta */}
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400">
                      <Layout className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                      <span className="font-mono">{tpl.format}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400">
                      <Compass className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                      <span className="font-mono">{tpl.font}</span>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-bold uppercase tracking-widest py-2.5 transition-colors rounded-lg cursor-pointer">
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
