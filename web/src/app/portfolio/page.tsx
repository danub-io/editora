"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/gospelreads/Navbar';
import AuthorProfileBuilder from '@/components/gospelreads/AuthorProfileBuilder';
import { Book, AuthorProfile } from '@/components/gospelreads/types';
import { INITIAL_BOOKS } from '@/components/gospelreads/data';

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [profile, setProfile] = useState<AuthorProfile>({
    name: 'Luana Costa',
    penName: 'Luana Costa',
    bio: 'Escrevo desde a infância, fascinada pela imensidão das galáxias e os mistérios insondáveis da poeira cósmica. Meus romances buscam conciliar ficção científica de alta precisão técnica e sentimentos humanos puros, oferecendo aos leitores uma âncora lírica no desconhecido.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    website: 'https://luanacosta.gospelreads.com',
    twitter: 'https://twitter.com/luanacosta',
    instagram: 'https://instagram.com/luanacosta',
    featuredBookIds: ['1', '2']
  });

  useEffect(() => {
    setMounted(true);

    const savedBooks = localStorage.getItem('gospelreads_books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }

    const savedProfile = localStorage.getItem('gospelreads_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gospelreads_profile', JSON.stringify(profile));
    }
  }, [profile, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#09090b]"></div>;
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col justify-between text-neutral-100 font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <AuthorProfileBuilder 
          profile={profile}
          setProfile={setProfile}
          books={books}
        />
      </main>
    </div>
  );
}
