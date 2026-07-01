"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/gospelreads/Navbar';
import BlogView from '@/components/gospelreads/BlogView';
import Footer from '@/components/gospelreads/Footer';

export default function Blog() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-zinc-950"></div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col justify-between text-gray-500 dark:text-zinc-400 font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <BlogView />
      </main>
      <Footer />
    </div>
  );
}
