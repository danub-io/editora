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
    return <div className="min-h-screen bg-neutral-primary"></div>;
  }

  return (
    <div className="min-h-screen bg-neutral-primary flex flex-col justify-between text-body font-sans antialiased pt-16">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20">
            <Sparkles size={12} className="text-brand" />
            Nossa Missão Editorial
          </span>
          <h1 className="text-4xl md:text-6xl text-heading uppercase font-extrabold tracking-tight">
            Sobre a GospelReads
          </h1>
          <p className="text-sm md:text-base text-body leading-relaxed">
            Reescrevendo o futuro editorial através da tecnologia e da valorização real do trabalho autoral independente.
          </p>
        </div>

        {/* Bento Grid Info Section */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Royalties Justos */}
          <div className="bg-neutral-primary-medium border border-default p-8 rounded-base space-y-4 flex flex-col justify-between min-h-[220px]">
            <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20">
              <ShieldCheck size={24} className="text-brand" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-heading mb-2">Royalties Justos de até 90%</h3>
              <p className="text-body-subtle text-xs leading-relaxed">
                Acreditamos que quem cria deve ser o maior beneficiado. Oferecemos até 90% de repasse de royalties diretos para o autor, cortando intermediários abusivos do mercado tradicional.
              </p>
            </div>
          </div>

          {/* Card 2: Apoio Total a Independentes */}
          <div className="bg-neutral-primary-medium border border-default p-8 rounded-base space-y-4 flex flex-col justify-between min-h-[220px]">
            <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20">
              <Heart size={24} className="text-brand" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-heading mb-2">Apoio ao Autor Contemporâneo</h3>
              <p className="text-body-subtle text-xs leading-relaxed">
                Nossa plataforma fornece as ferramentas necessárias para que você diagramar, exportar em formatos digitais ou físicos de alta precisão e expor sua obra sem custos iniciais.
              </p>
            </div>
          </div>

          {/* Card 3: Nossa História */}
          <div className="md:col-span-2 bg-neutral-primary-medium border border-default p-8 rounded-base space-y-4">
            <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20 mb-2">
              <BookOpen size={24} className="text-brand" />
            </div>
            <h3 className="text-xl font-bold text-heading mb-2">Liberdade para Escrever</h3>
            <p className="text-body-subtle text-xs md:text-sm leading-relaxed text-justify">
              A GospelReads nasceu do desejo de democratizar o acesso à publicação de qualidade. Unimos um editor de fôlego com salvamento em tempo real, um diagramador automatizado e um catálogo unificado para que você possa focar unicamente no que importa: contar histórias extraordinárias e edificar vidas.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
