"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/gospelreads/Navbar';
import MarketplaceView from '@/components/gospelreads/MarketplaceView';
import Footer from '@/components/gospelreads/Footer';
import { Book } from '@/components/gospelreads/types';
import { INITIAL_BOOKS } from '@/components/gospelreads/data';

export default function Acervo() {
  const [mounted, setMounted] = useState(false);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const savedBooks = localStorage.getItem('gospelreads_books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }

    const savedSelectedBook = localStorage.getItem('gospelreads_selected_book');
    if (savedSelectedBook) {
      setSelectedBook(JSON.parse(savedSelectedBook));
      localStorage.removeItem('gospelreads_selected_book');
    }
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#09090b]"></div>;
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col justify-between text-neutral-100 font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <MarketplaceView 
          books={books}
          setBooks={setBooks}
        />
      </main>
      <Footer />
    </div>
  );
}
