"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/gospelreads/Navbar';
import BlogView from '@/components/gospelreads/BlogView';
import Footer from '@/components/gospelreads/Footer';

export default function Diario() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#09090b]"></div>;
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col justify-between text-neutral-100 font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <BlogView />
      </main>
      <Footer />
    </div>
  );
}
