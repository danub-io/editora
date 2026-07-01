/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  ShoppingBag, 
  User, 
  X, 
  Plus, 
  Minus, 
  Trash2,
  MessageSquarePlus,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Book, Review } from './types';
import { GENRES } from './data';

interface MarketplaceViewProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  onNavigateToAuthor?: (authorName: string) => void;
}

export default function MarketplaceView({ books, setBooks, onNavigateToAuthor }: MarketplaceViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'info' | 'excerpt' | 'reviews'>('info');
  
  // Shopping Cart state
  const [cart, setCart] = useState<{ book: Book; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // New Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Filters
  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'Todos' || b.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        return prev.map(item => item.book.id === book.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (bookId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.book.id === bookId) {
          const nextQty = item.quantity + delta;
          if (nextQty <= 0) return null;
          return { ...item, quantity: nextQty };
        }
        return item;
      }).filter((item): item is { book: Book; quantity: number } => item !== null);
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewContent || !selectedBook) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      authorName: reviewName,
      rating: reviewRating,
      content: reviewContent,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [newReview, ...selectedBook.reviews];
    const newRating = parseFloat(((selectedBook.reviews.reduce((sum, r) => sum + r.rating, 0) + reviewRating) / (selectedBook.reviews.length + 1)).toFixed(1));

    setBooks(prev => prev.map(b => {
      if (b.id === selectedBook.id) {
        return {
          ...b,
          reviews: updatedReviews,
          rating: newRating,
          reviewCount: b.reviewCount + 1
        };
      }
      return b;
    }));

    setSelectedBook(prev => {
      if (!prev) return null;
      return {
        ...prev,
        reviews: updatedReviews,
        rating: newRating,
        reviewCount: prev.reviewCount + 1
      };
    });

    setReviewName('');
    setReviewRating(5);
    setReviewContent('');
    setShowReviewForm(false);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setCart([]);
    }, 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 min-h-[calc(100vh-4rem)] border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-10">
        
        {/* Bookstore Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-zinc-800 pb-6">
          <div>
            <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block mb-3">MARKETPLACE</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-tight mt-1 lg:text-4xl">Últimos Lançamentos</h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-sans mt-2 max-w-xl">
              Explore a nossa coleção exclusiva de obras inspiradoras e descubra novos horizontes literários através das vozes de autores independentes.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Genre chips list */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3.5 py-1.5 text-sm tracking-wider font-sans border rounded-full transition-all cursor-pointer ${
                  selectedGenre === genre
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-gray-400 dark:hover:border-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar título ou autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm border border-gray-300 dark:border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 focus:border-indigo-500 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 font-sans"
            />
            <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400 dark:text-zinc-500" />
          </div>
        </div>

        {/* Books Shelf Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredBooks.map(book => (
              <div 
                key={book.id} 
                onClick={() => { setSelectedBook(book); setActiveModalTab('info'); }}
                className="group cursor-pointer flex flex-col justify-between h-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Book cover */}
                  <div className="aspect-[2/3] bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden relative shadow-md">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                    />
                  </div>

                  <div className="space-y-1 px-1 overflow-hidden">
                    <h4 className="font-bold text-sm uppercase truncate text-gray-900 dark:text-zinc-100 tracking-tight leading-none">
                      {book.title}
                    </h4>
                    <p className="text-sm text-gray-400 dark:text-zinc-500 uppercase tracking-wider truncate font-sans">
                      {book.author}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 dark:border-zinc-800 pt-2.5 mt-3 text-sm font-mono px-1">
                  <span className="font-bold text-indigo-500 dark:text-indigo-400">R$ {book.price.toFixed(2)}</span>
                  <span className="text-gray-400 dark:text-zinc-500 text-sm uppercase tracking-wider">{book.genre}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 dark:border-zinc-700 rounded-lg text-gray-400 dark:text-zinc-500 text-sm">
            Nenhum livro encontrado com esses critérios. Experimente alterar sua busca.
          </div>
        )}

      </div>

      {/* Book Detail Modal Drawer */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-gray-900/60 dark:bg-zinc-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800 h-full shadow-2xl flex flex-col relative overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-950/40">
              <span className="text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 font-mono">{selectedBook.genre}</span>
              <button
                onClick={() => { setSelectedBook(null); setShowReviewForm(false); }}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation tabs */}
            <div className="flex border-b border-gray-200 dark:border-zinc-800 text-sm font-bold uppercase tracking-widest bg-white dark:bg-zinc-900">
              <button 
                onClick={() => setActiveModalTab('info')}
                className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${
                  activeModalTab === 'info' ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400' : 'border-transparent text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100'
                }`}
              >
                Sinopse & Compra
              </button>
              <button 
                onClick={() => setActiveModalTab('excerpt')}
                className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${
                  activeModalTab === 'excerpt' ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400' : 'border-transparent text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100'
                }`}
              >
                Degustação Literária
              </button>
              <button 
                onClick={() => setActiveModalTab('reviews')}
                className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${
                  activeModalTab === 'reviews' ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400' : 'border-transparent text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100'
                }`}
              >
                Críticas ({selectedBook.reviewCount})
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-zinc-950">
              
              {/* TAB 1: Core details */}
              {activeModalTab === 'info' && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img 
                      src={selectedBook.coverUrl} 
                      alt={selectedBook.title} 
                      className="w-36 h-52 object-cover border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg shrink-0 mx-auto sm:mx-0" 
                    />
                    <div className="space-y-4 text-center sm:text-left">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 leading-tight">
                          {selectedBook.title}
                        </h3>
                        <p 
                          onClick={() => {
                            if (onNavigateToAuthor) {
                              onNavigateToAuthor(selectedBook.author);
                              setSelectedBook(null);
                            }
                          }}
                          className="text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 uppercase tracking-wider font-sans mt-1 hover:underline cursor-pointer inline-block transition-colors"
                        >
                          por <span className="font-semibold">{selectedBook.author}</span>
                        </p>
                      </div>

                      {/* Ratings stars reviewCount */}
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < Math.round(selectedBook.rating) ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-mono text-gray-900 dark:text-zinc-100 font-bold">{selectedBook.rating}</span>
                        <span className="text-sm text-gray-400 dark:text-zinc-500">({selectedBook.reviewCount} avaliações)</span>
                      </div>

                      <div className="text-xl font-bold text-indigo-500 dark:text-indigo-400">
                        R$ {selectedBook.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Synopsis Box */}
                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">Sinopse da Obra</h4>
                    <p className="font-serif text-sm leading-relaxed text-gray-600 dark:text-zinc-300 text-justify">
                      {selectedBook.description}
                    </p>
                  </div>

                  <div className="bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-lg text-sm text-gray-500 dark:text-zinc-400 space-y-1.5 font-mono">
                    <div>Publicação: <strong className="text-gray-900 dark:text-zinc-100">{selectedBook.year}</strong></div>
                    <div>Garantia: <strong className="text-gray-900 dark:text-zinc-100">Satisfação garantida ou seu dinheiro de volta</strong></div>
                  </div>
                </div>
              )}

              {/* TAB 2: Excerpt reading */}
              {activeModalTab === 'excerpt' && (
                <div className="space-y-6 bg-gray-100 dark:bg-zinc-900 p-8 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-inner">
                  <div className="border-b border-gray-200 dark:border-zinc-700 pb-3 text-center">
                    <span className="text-sm font-mono text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Leitura Parcial de Amostra Grátis</span>
                  </div>
                  
                  <div className="font-serif text-sm leading-relaxed text-justify text-gray-700 dark:text-zinc-200 space-y-4 whitespace-pre-wrap">
                    {selectedBook.sampleText}
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-zinc-700 text-center">
                    <p className="text-sm text-gray-400 dark:text-zinc-500 italic font-sans">Escreva você também a sua história na GospelReads.</p>
                  </div>
                </div>
              )}

              {/* TAB 3: Reviews list and new review creator */}
              {activeModalTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">Opiniões dos Leitores</h4>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-sm font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquarePlus size={14} /> Escrever Crítica
                    </button>
                  </div>

                  {/* Review Creator Form */}
                  {showReviewForm && (
                    <form onSubmit={handleAddReview} className="bg-gray-100 dark:bg-zinc-900 p-6 border border-indigo-100 dark:border-indigo-900/50 rounded-lg space-y-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-zinc-100 uppercase">Enviar Nova Crítica</div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-sm font-bold text-gray-500 dark:text-zinc-400 uppercase block">Seu Nome / Pseudônimo</label>
                          <input
                            type="text"
                            required
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            className="w-full text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                            placeholder="Ex: João da Silva"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm font-bold text-gray-500 dark:text-zinc-400 uppercase block">Sua Nota (Estrelas)</label>
                          <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(parseInt(e.target.value, 10))}
                            className="w-full text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                          >
                            <option value={5}>5 Estrelas - Excelente</option>
                            <option value={4}>4 Estrelas - Muito Bom</option>
                            <option value={3}>3 Estrelas - Regular</option>
                            <option value={2}>2 Estrelas - Ruim</option>
                            <option value={1}>1 Estrela - Péssimo</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-500 dark:text-zinc-400 uppercase block">Seu Comentário</label>
                        <textarea
                          required
                          value={reviewContent}
                          onChange={(e) => setReviewContent(e.target.value)}
                          rows={3}
                          className="w-full text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 font-sans"
                          placeholder="Compartilhe o que achou da escrita, narrativa, ritmo de leitura..."
                        />
                      </div>

                      <div className="flex justify-end gap-2 text-sm">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="py-2 px-4 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-lg transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors"
                        >
                          Publicar Crítica
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {selectedBook.reviews.map(rev => (
                      <div key={rev.id} className="bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 rounded-lg space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <strong className="text-gray-900 dark:text-zinc-100 flex items-center gap-1.5 font-semibold">
                            <User size={12} className="text-gray-400 dark:text-zinc-500" /> {rev.authorName}
                          </strong>
                          <span className="text-gray-400 dark:text-zinc-500 font-mono text-sm">{rev.date}</span>
                        </div>
                        
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < rev.rating ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>

                        <p className="font-serif text-sm leading-relaxed text-gray-600 dark:text-zinc-300 text-justify">
                          {rev.content}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Floating Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/60 dark:bg-zinc-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 h-full shadow-2xl flex flex-col relative border-l border-gray-200 dark:border-zinc-800">
            
            {/* Cart Header */}
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-950/40">
              <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                <ShoppingBag size={18} className="text-indigo-500 dark:text-indigo-400" /> Sacola de Compras
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.book.id} className="bg-gray-100 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 p-4 rounded-lg flex gap-4">
                    <img src={item.book.coverUrl} alt={item.book.title} className="w-12 h-18 object-cover border border-gray-200 dark:border-zinc-700 rounded shrink-0" />
                    
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate">{item.book.title}</h4>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-0.5 shrink-0"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-400 dark:text-zinc-500 uppercase tracking-wider font-sans">{item.book.author}</div>
                      
                      <div className="flex justify-between items-center pt-1.5">
                        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-1.5 py-0.5 rounded text-sm">
                          <button onClick={() => updateCartQuantity(item.book.id, -1)} className="p-0.5 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100">
                            <Minus size={10} />
                          </button>
                          <span className="font-bold text-gray-900 dark:text-zinc-100 font-mono min-w-[12px] text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.book.id, 1)} className="p-0.5 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100">
                            <Plus size={10} />
                          </button>
                        </div>

                        <span className="text-sm font-bold font-mono text-indigo-500 dark:text-indigo-400">R$ {(item.book.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-24 text-gray-400 dark:text-zinc-500 text-sm space-y-2">
                  <ShoppingBag size={28} className="mx-auto opacity-30 text-indigo-400" />
                  <p>Sua sacola de compras está vazia.</p>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950/80 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-zinc-400">Subtotal do Pedido</span>
                  <strong className="text-lg font-bold text-indigo-500 dark:text-indigo-400">R$ {cartTotal.toFixed(2)}</strong>
                </div>

                <p className="text-sm text-gray-400 dark:text-zinc-500 text-center">Ao finalizar, você simulará um faturamento livre de taxas intermediárias absurdas.</p>

                <button
                  id="btn-cart-checkout"
                  onClick={handleCheckout}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-bold uppercase tracking-widest py-4 transition-colors cursor-pointer rounded-lg"
                >
                  Finalizar Compra Protegida
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Checkout Processing Loader */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 dark:bg-zinc-950/80 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-zinc-900 p-8 max-w-sm w-full border border-gray-200 dark:border-zinc-800 rounded-lg shadow-2xl space-y-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Processando Pagamento...</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Aguarde enquanto autenticamos a transação segura direta.</p>
            
            <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
            
            <div className="text-sm text-gray-400 dark:text-zinc-500 font-mono">
              Criptografia direta peer-to-peer de faturamento de autor.
            </div>
          </div>
        </div>
      )}

      {/* Checkout Complete Receipt Modal */}
      {checkoutComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 dark:bg-zinc-950/80 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-zinc-900 p-8 max-w-md w-full border border-gray-200 dark:border-zinc-800 rounded-lg shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <CheckCircle size={44} className="text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Compra Aprovada!</h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Agradecemos o seu incentivo direto à literatura independente brasileira.</p>
            </div>

            <div className="bg-gray-100 dark:bg-zinc-950 p-5 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm space-y-3">
              <div className="font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wider text-center border-b border-gray-200 dark:border-zinc-700 pb-2 mb-2">Comprovante de Compra</div>
              
              <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                <span>Número do Pedido</span>
                <span className="font-mono text-gray-900 dark:text-zinc-100 font-bold">#HUB-{Math.floor(Math.random() * 900000) + 100000}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                <span>Status de Envio</span>
                <span className="text-emerald-500 dark:text-emerald-400 font-bold">Disponível para Leitura</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-zinc-400 border-t border-gray-200 dark:border-zinc-700 pt-2 mt-2">
                <span>Método</span>
                <span>Faturamento Direto de Autor</span>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3.5 border border-indigo-100 dark:border-indigo-900/50 text-sm text-indigo-600 dark:text-indigo-300 leading-relaxed rounded-lg flex items-start gap-2.5">
              <Clock size={14} className="shrink-0 mt-0.5 text-indigo-500 dark:text-indigo-400" />
              <span>O manuscrito em formato digital foi anexado ao seu perfil de leitor e um recibo de royalties foi enviado ao autor!</span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCheckoutComplete(false)}
                className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-bold uppercase tracking-widest py-3 px-6 cursor-pointer rounded-lg transition-colors"
              >
                Retornar ao Catálogo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
