/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingBag, 
  BookOpen, 
  User, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Heart,
  MessageSquarePlus,
  Bookmark,
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

    // Update global books list
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

    // Update selected book modal data
    setSelectedBook(prev => {
      if (!prev) return null;
      return {
        ...prev,
        reviews: updatedReviews,
        rating: newRating,
        reviewCount: prev.reviewCount + 1
      };
    });

    // Reset Form
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
      setCart([]); // Clear cart
    }, 2000);
  };

  return (
    <div className="w-full bg-[#09090b] min-h-[calc(100vh-4rem)] border-t border-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-10">
        
        {/* Bookstore Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 font-mono bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 w-fit block mb-3">MARKETPLACE</span>
            <h2 className="text-4xl font-serif text-white font-semibold mt-1">Últimos Lançamentos</h2>
            <p className="text-xs md:text-sm text-neutral-400 font-sans mt-2 max-w-xl">
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
                className={`px-3.5 py-1.5 text-xs tracking-wider font-sans border rounded-full transition-all cursor-pointer ${
                  selectedGenre === genre
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300 font-medium'
                    : 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900'
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
              className="w-full text-xs border border-neutral-850 rounded-xl pl-10 pr-4 py-3 bg-neutral-900/60 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500/50 text-white placeholder:text-neutral-500 font-sans"
            />
            <Search size={14} className="absolute left-3.5 top-3.5 text-neutral-500" />
          </div>
        </div>

        {/* Books Shelf Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredBooks.map(book => (
              <div 
                key={book.id} 
                onClick={() => { setSelectedBook(book); setActiveModalTab('info'); }}
                className="group cursor-pointer flex flex-col justify-between h-full bg-neutral-900 border border-neutral-800 p-4 rounded-3xl hover:border-indigo-500/30 hover:shadow-indigo-500/5 hover:shadow-xl transition-all duration-300 bento-card"
              >
                <div className="space-y-4">
                  {/* Book cover wrapping with premium grayscale transition */}
                  <div className="aspect-[2/3] bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden relative shadow-md">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  <div className="space-y-1 px-1 overflow-hidden">
                    <h4 className="font-bold text-sm uppercase truncate text-white font-serif tracking-tight leading-none">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider truncate font-sans">
                      {book.author}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-neutral-850 pt-2.5 mt-3 text-xs font-mono px-1">
                  <span className="font-bold text-indigo-400 font-serif">R$ {book.price.toFixed(2)}</span>
                  <span className="text-neutral-500 text-[9px] uppercase tracking-wider">{book.genre}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl text-neutral-500 text-xs">
            Nenhum livro encontrado com esses critérios. Experimente alterar sua busca.
          </div>
        )}

      </div>

      {/* Book Detail Modal Drawer */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-neutral-900 border-l border-neutral-850 h-full shadow-2xl flex flex-col relative overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-850 flex justify-between items-center bg-neutral-950/40">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-sans">{selectedBook.genre}</span>
              <button
                onClick={() => { setSelectedBook(null); setShowReviewForm(false); }}
                className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation tabs */}
            <div className="flex border-b border-neutral-850 text-xs font-bold uppercase tracking-widest bg-neutral-900">
              <button 
                onClick={() => setActiveModalTab('info')}
                className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${
                  activeModalTab === 'info' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                Sinopse & Compra
              </button>
              <button 
                onClick={() => setActiveModalTab('excerpt')}
                className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${
                  activeModalTab === 'excerpt' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                Degustação Literária
              </button>
              <button 
                onClick={() => setActiveModalTab('reviews')}
                className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${
                  activeModalTab === 'reviews' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                Críticas ({selectedBook.reviewCount})
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#0c0c0e]">
              
              {/* TAB 1: Core details */}
              {activeModalTab === 'info' && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img 
                      src={selectedBook.coverUrl} 
                      alt={selectedBook.title} 
                      className="w-36 h-52 object-cover border border-neutral-800 rounded-2xl shadow-2xl shrink-0 mx-auto sm:mx-0" 
                    />
                    <div className="space-y-4 text-center sm:text-left">
                      <div>
                        <h3 className="font-serif text-3xl font-bold text-white leading-tight">
                          {selectedBook.title}
                        </h3>
                        <p 
                          onClick={() => {
                            if (onNavigateToAuthor) {
                              onNavigateToAuthor(selectedBook.author);
                              setSelectedBook(null);
                            }
                          }}
                          className="text-xs text-indigo-400 hover:text-indigo-300 uppercase tracking-wider font-sans mt-1 hover:underline cursor-pointer inline-block transition-colors"
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
                        <span className="text-xs font-mono text-white font-bold">{selectedBook.rating}</span>
                        <span className="text-xs text-neutral-500">({selectedBook.reviewCount} avaliações)</span>
                      </div>

                      <div className="text-xl font-serif font-bold text-indigo-400">
                        R$ {selectedBook.price.toFixed(2)}
                      </div>

                      {/* No cart action displayed per request */}
                    </div>
                  </div>

                  {/* Synopsis Box */}
                  <div className="space-y-3 pt-4 border-t border-neutral-850">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Sinopse da Obra</h4>
                    <p className="font-serif text-sm leading-relaxed text-neutral-300 text-justify">
                      {selectedBook.description}
                    </p>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-850 p-4 rounded-2xl text-xs text-neutral-400 space-y-1.5 font-mono">
                    <div>Publicação: <strong className="text-neutral-200">{selectedBook.year}</strong></div>
                    <div>Garantia: <strong className="text-neutral-200">Satisfação garantida ou seu dinheiro de volta</strong></div>
                  </div>
                </div>
              )}

              {/* TAB 2: Excerpt reading */}
              {activeModalTab === 'excerpt' && (
                <div className="space-y-6 bg-neutral-950 p-8 border border-neutral-850 rounded-2xl shadow-inner">
                  <div className="border-b border-neutral-800 pb-3 text-center">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Leitura Parcial de Amostra Grátis</span>
                  </div>
                  
                  {/* The actual structured excerpt page */}
                  <div className="font-serif text-sm leading-relaxed text-justify text-neutral-200 space-y-4 whitespace-pre-wrap">
                    {selectedBook.sampleText}
                  </div>

                  <div className="pt-6 border-t border-neutral-800 text-center">
                    <p className="text-xs text-neutral-400 italic font-sans">Escreva você também a sua história na GospelReads.</p>
                  </div>
                </div>
              )}

              {/* TAB 3: Reviews list and new review creator */}
              {activeModalTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Opiniões dos Leitores</h4>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquarePlus size={14} /> Escrever Crítica
                    </button>
                  </div>

                  {/* Review Creator Form */}
                  {showReviewForm && (
                    <form onSubmit={handleAddReview} className="bg-neutral-900 p-6 border border-indigo-500/10 rounded-2xl space-y-4">
                      <div className="text-xs font-bold text-white uppercase">Enviar Nova Crítica</div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-400 uppercase">Seu Nome / Pseudônimo</label>
                          <input
                            type="text"
                            required
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            className="w-full text-xs border border-neutral-800 bg-neutral-950 text-white p-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Ex: João da Silva"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-400 uppercase">Sua Nota (Estrelas)</label>
                          <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(parseInt(e.target.value, 10))}
                            className="w-full text-xs border border-neutral-800 bg-neutral-950 text-white p-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                        <label className="text-[10px] font-bold text-neutral-400 uppercase">Seu Comentário</label>
                        <textarea
                          required
                          value={reviewContent}
                          onChange={(e) => setReviewContent(e.target.value)}
                          rows={3}
                          className="w-full text-xs border border-neutral-800 bg-neutral-950 text-white p-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                          placeholder="Compartilhe o que achou da escrita, narrativa, ritmo de leitura..."
                        />
                      </div>

                      <div className="flex justify-end gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="py-2 px-4 hover:bg-neutral-800 text-neutral-300 rounded-lg"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest px-4 py-2 rounded-3xl"
                        >
                          Publicar Crítica
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {selectedBook.reviews.map(rev => (
                      <div key={rev.id} className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-2 bento-card">
                        <div className="flex justify-between items-center text-xs">
                          <strong className="text-neutral-200 flex items-center gap-1.5 font-sans font-medium">
                            <User size={12} className="text-neutral-500" /> {rev.authorName}
                          </strong>
                          <span className="text-neutral-500 font-mono text-[10px]">{rev.date}</span>
                        </div>
                        
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={10} 
                              fill={i < rev.rating ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>

                        <p className="font-serif text-xs leading-relaxed text-neutral-300 text-justify">
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
        <div className="fixed inset-0 z-50 flex justify-end bg-neutral-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-900 h-full shadow-2xl flex flex-col relative border-l border-neutral-800">
            
            {/* Cart Header */}
            <div className="p-6 border-b border-neutral-850 flex justify-between items-center bg-neutral-950/40">
              <h3 className="text-lg font-serif text-white font-bold flex items-center gap-2">
                <ShoppingBag size={18} className="text-indigo-400" /> Sacola de Compras
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.book.id} className="bg-neutral-950 border border-neutral-850 p-4 rounded-2xl flex gap-4 bento-card">
                    <img src={item.book.coverUrl} alt={item.book.title} className="w-12 h-18 object-cover border border-neutral-800 rounded shrink-0" />
                    
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-sm font-bold text-white truncate">{item.book.title}</h4>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-0.5 shrink-0"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-sans">{item.book.author}</div>
                      
                      <div className="flex justify-between items-center pt-1.5">
                        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-xs">
                          <button onClick={() => updateCartQuantity(item.book.id, -1)} className="p-0.5 text-neutral-400 hover:text-white">
                            <Minus size={10} />
                          </button>
                          <span className="font-bold text-white font-mono min-w-[12px] text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.book.id, 1)} className="p-0.5 text-neutral-400 hover:text-white">
                            <Plus size={10} />
                          </button>
                        </div>

                        <span className="text-xs font-bold font-mono text-indigo-400 font-serif">R$ {(item.book.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-24 text-neutral-500 text-sm space-y-2">
                  <ShoppingBag size={28} className="mx-auto opacity-30 text-indigo-400" />
                  <p>Sua sacola de compras está vazia.</p>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-850 bg-neutral-950/80 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Subtotal do Pedido</span>
                  <strong className="text-lg font-serif text-indigo-400">R$ {cartTotal.toFixed(2)}</strong>
                </div>

                <p className="text-[10px] text-neutral-500 text-center">Ao finalizar, você simulará um faturamento livre de taxas intermediárias absurdas.</p>

                <button
                  id="btn-cart-checkout"
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest py-4 transition-colors cursor-pointer rounded-3xl"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-neutral-900 p-8 max-w-sm w-full border border-neutral-800 rounded-3xl shadow-2xl space-y-6 text-center bento-card">
            <h3 className="text-xl font-serif text-white">Processando Pagamento...</h3>
            <p className="text-xs text-neutral-400">Aguarde enquanto autenticamos a transação segura direta.</p>
            
            <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
            
            <div className="text-[10px] text-neutral-500 font-mono">
              Criptografia direta peer-to-peer de faturamento de autor.
            </div>
          </div>
        </div>
      )}

      {/* Checkout Complete Receipt Modal */}
      {checkoutComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm px-4">
          <div className="bg-neutral-900 p-8 max-w-md w-full border border-neutral-800 rounded-3xl shadow-2xl space-y-6 bento-card">
            <div className="text-center space-y-2">
              <CheckCircle size={44} className="text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-serif text-white">Compra Aprovada!</h3>
              <p className="text-sm text-neutral-400">Agradecemos o seu incentivo direto à literatura independente brasileira.</p>
            </div>

            <div className="bg-neutral-950 p-5 border border-neutral-850 rounded-2xl text-xs space-y-3 bento-card">
              <div className="font-bold text-white uppercase tracking-wider text-center border-b border-neutral-800 pb-2 mb-2">Comprovante de Compra</div>
              
              <div className="flex justify-between text-neutral-400">
                <span>Número do Pedido</span>
                <span className="font-mono text-white font-bold">#HUB-{Math.floor(Math.random() * 900000) + 100000}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Status de Envio</span>
                <span className="text-emerald-400 font-bold">Disponível para Leitura</span>
              </div>
              <div className="flex justify-between text-neutral-400 border-t border-neutral-800 pt-2 mt-2">
                <span>Método</span>
                <span>Faturamento Direto de Autor</span>
              </div>
            </div>

            <div className="bg-indigo-500/10 p-3.5 border border-indigo-500/20 text-[10px] text-indigo-300 leading-relaxed rounded-xl flex items-start gap-2.5">
              <Clock size={14} className="shrink-0 mt-0.5 text-indigo-400" />
              <span>O manuscrito em formato digital foi anexado ao seu perfil de leitor e um recibo de royalties foi enviado ao autor!</span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCheckoutComplete(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest py-3 px-6 cursor-pointer rounded-3xl transition-colors"
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
