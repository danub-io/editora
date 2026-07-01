"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/gospelreads/Navbar';
import Footer from '@/components/gospelreads/Footer';
import { BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Sobre() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-zinc-950"></div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col justify-between text-gray-500 dark:text-zinc-400 font-sans antialiased pt-16">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 font-mono tracking-[0.2em] uppercase">
            <Sparkles size={12} className="text-indigo-500 dark:text-indigo-400" />
            Nossa Missão Editorial
          </span>
          <h1 className="text-4xl md:text-6xl text-gray-900 dark:text-zinc-100 uppercase font-extrabold tracking-tight">
            Sobre a GospelReads
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed">
            Reescrevendo o futuro editorial através da tecnologia e da valorização real do trabalho autoral independente.
          </p>
        </div>

        {/* Bento Grid Info Section */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Royalties Justos */}
          <div className="bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-lg space-y-4 flex flex-col justify-between min-h-[220px]">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/50">
              <ShieldCheck size={24} className="text-indigo-500 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Royalties Justos de até 90%</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                Acreditamos que quem cria deve ser o maior beneficiado. Oferecemos até 90% de repasse de royalties diretos para o autor, cortando intermediários abusivos do mercado tradicional.
              </p>
            </div>
          </div>

          {/* Card 2: Apoio Total a Independentes */}
          <div className="bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-lg space-y-4 flex flex-col justify-between min-h-[220px]">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/50">
              <Heart size={24} className="text-indigo-500 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Apoio ao Autor Contemporâneo</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                Nossa plataforma fornece as ferramentas necessárias para que você diagramar, exportar em formatos digitais ou físicos de alta precisão e expor sua obra sem custos iniciais.
              </p>
            </div>
          </div>

          {/* Card 3: Nossa História */}
          <div className="md:col-span-2 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-lg space-y-4">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/50 mb-2">
              <BookOpen size={24} className="text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Liberdade para Escrever</h3>
            <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed text-justify">
              A GospelReads nasceu do desejo de democratizar o acesso à publicação de qualidade. Unimos um editor de fôlego com salvamento em tempo real, um diagramador automatizado e um catálogo unificado para que você possa focar unicamente no que importa: contar histórias extraordinárias e edificar vidas.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
