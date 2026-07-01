import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Biblioteca — GospelReads.",
};

import Navbar from "@/components/gospelreads/Navbar";
import Footer from "@/components/gospelreads/Footer";
import { SafeImage } from "@/components/marketplace/SafeImage";
import { BookOpen, Star, Clock } from "lucide-react";

const mockLibraryBooks = [
  {
    title: "O Caminho do Peregrino",
    author: "John Bunyan",
    progress: 85,
    lastRead: "Há 2 horas",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    favorite: true,
  },
  {
    title: "Confissões",
    author: "Santo Agostinho",
    progress: 40,
    lastRead: "Ontem",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    favorite: true,
  },
  {
    title: "Ortodoxia",
    author: "G.K. Chesterton",
    progress: 10,
    lastRead: "Há 3 dias",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
    favorite: false,
  },
  {
    title: "Cristianismo Puro e Simples",
    author: "C.S. Lewis",
    progress: 100,
    lastRead: "Semana passada",
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=600&auto=format&fit=crop",
    favorite: true,
  },
  {
    title: "A Imitação de Cristo",
    author: "Tomás de Kempis",
    progress: 65,
    lastRead: "Há 2 semanas",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    favorite: false,
  },
  {
    title: "Mansidão",
    author: "Dane Ortlund",
    progress: 0,
    lastRead: "Não iniciado",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
    favorite: false,
  },
];

export default function BibliotecaPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col pt-16">
      <Navbar />
      <main id="main-content" className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-gray-200 dark:border-zinc-800 pb-8">
          <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block mb-3">
            ACERVO PESSOAL
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-tight">
            Minha Biblioteca
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-4 max-w-2xl text-sm">
            Gerencie suas leituras ativas, livros favoritos e acompanhe seu progresso de leitura nas obras do acervo.
          </p>
        </header>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-200 dark:border-zinc-800 pb-4">
          {["Todos os Livros", "Lendo", "Lidos", "Favoritos"].map((f, i) => (
            <button
              key={f}
              className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                i === 0
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLibraryBooks.map((book) => (
            <div
              key={book.title}
              className="bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 flex gap-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group rounded-lg"
            >
              {/* Cover */}
              <div className="w-20 shrink-0 aspect-[2/3] bg-gray-200 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 overflow-hidden relative rounded-lg">
                <SafeImage
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Book Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                      {book.author}
                    </span>
                    {book.favorite && (
                      <Star className="w-4 h-4 fill-indigo-500 text-indigo-500 shrink-0" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100 mb-2 line-clamp-2 leading-snug">
                    {book.title}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {/* Progress info */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-gray-400 dark:text-zinc-500 flex items-center gap-1 font-sans">
                        <Clock className="w-3 h-3" /> {book.lastRead}
                      </span>
                      <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 font-mono">
                        {book.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 dark:bg-zinc-800 rounded-full relative overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action button */}
                  <button className="text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors border-b border-indigo-300 dark:border-indigo-700 pb-0.5 self-start">
                    {book.progress === 100
                      ? "Reler Livro"
                      : book.progress === 0
                      ? "Começar Lendo"
                      : "Continuar Lendo"}
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
