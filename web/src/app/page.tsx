"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/gospelreads/Navbar';
import LandingView from '@/components/gospelreads/LandingView';
import Footer from '@/components/gospelreads/Footer';
import { Book } from '@/components/gospelreads/types';
import { INITIAL_BOOKS } from '@/components/gospelreads/data';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [profileEmail, setProfileEmail] = useState('');

  useEffect(() => {
    setMounted(true);
    const savedBooks = localStorage.getItem('gospelreads_books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  const handleActiveTabChange = (tab: 'home' | 'editor' | 'exporter' | 'profile' | 'marketplace') => {
    if (tab === 'home') router.push('/');
    else if (tab === 'editor') router.push('/dash');
    else if (tab === 'exporter') router.push('/dash?tab=exporter');
    else if (tab === 'profile') router.push('/portfolio');
    else if (tab === 'marketplace') router.push('/acervo');
  };

  const handleSetProfileEmail = (email: string) => {
    setProfileEmail(email);
    localStorage.setItem('gospelreads_profile_email_temp', email);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#09090b]"></div>;
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col justify-between text-neutral-100 font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <LandingView 
          books={books}
          setActiveTab={handleActiveTabChange}
          setSelectedBookInMarketplace={(book) => {
            if (book) {
              localStorage.setItem('gospelreads_selected_book', JSON.stringify(book));
            }
          }}
          profileEmail={profileEmail}
          setProfileEmail={handleSetProfileEmail}
        />
      </main>
      <Footer />
    </div>
  );
}
