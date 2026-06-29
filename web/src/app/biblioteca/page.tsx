import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Biblioteca — GospelReads.",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
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
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 max-w-container-max mx-auto px-edge-margin-mobile md:px-edge-margin-desktop py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-outline-variant pb-8">
          <h1 className="font-display-lg text-display-lg text-primary">Minha Biblioteca</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
            Gerencie suas leituras ativas, livros favoritos e acompanhe seu progresso de leitura nas obras do acervo.
          </p>
        </header>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-outline-variant pb-4">
          <button className="font-label-md text-label-md uppercase tracking-widest px-4 py-2 bg-primary text-primary-foreground">
            Todos os Livros
          </button>
          <button className="font-label-md text-label-md uppercase tracking-widest px-4 py-2 border border-outline-variant text-on-surface-variant hover:text-primary transition-colors">
            Lendo
          </button>
          <button className="font-label-md text-label-md uppercase tracking-widest px-4 py-2 border border-outline-variant text-on-surface-variant hover:text-primary transition-colors">
            Lidos
          </button>
          <button className="font-label-md text-label-md uppercase tracking-widest px-4 py-2 border border-outline-variant text-on-surface-variant hover:text-primary transition-colors">
            Favoritos
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockLibraryBooks.map((book) => (
            <div
              key={book.title}
              className="border border-outline-variant p-6 flex gap-6 hover:bg-surface-container-low transition-colors group"
            >
              {/* Cover */}
              <div className="w-24 shrink-0 aspect-[2/3] bg-surface-container-low border border-outline-variant overflow-hidden relative">
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
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                      {book.author}
                    </span>
                    {book.favorite && (
                      <Star className="w-4 h-4 fill-primary text-primary shrink-0" />
                    )}
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-primary mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Progress info */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-caption text-[11px] text-on-surface-variant flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {book.lastRead}
                      </span>
                      <span className="font-label-md text-[11px] font-bold text-primary">
                        {book.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-outline-variant relative">
                      <div
                        className="absolute left-0 top-0 h-full bg-primary"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <button className="font-label-md text-label-md uppercase tracking-widest text-primary hover:text-surface-tint transition-colors border-b border-primary pb-0.5 self-start">
                    {book.progress === 100 ? "Reler Livro" : book.progress === 0 ? "Começar Lendo" : "Continuar Lendo"}
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
