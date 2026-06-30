"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Edit3, 
  FileText, 
  User, 
  Store, 
  Layers, 
  RefreshCw, 
  ArrowRight,
  Printer,
  Smartphone
} from 'lucide-react';
import { Book } from './types';

interface LandingViewProps {
  books: Book[];
  setActiveTab: (tab: 'home' | 'editor' | 'exporter' | 'profile' | 'marketplace') => void;
  setSelectedBookInMarketplace: (book: Book | null) => void;
  profileEmail: string;
  setProfileEmail: (email: string) => void;
}

export default function LandingView({
  books,
  setActiveTab,
  setSelectedBookInMarketplace,
  profileEmail,
  setProfileEmail
}: LandingViewProps) {
  const [emailInput, setEmailInput] = useState('');

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setProfileEmail(emailInput);
    setActiveTab('profile');
  };

  const handleBookClick = (book: Book) => {
    setSelectedBookInMarketplace(book);
    setActiveTab('marketplace');
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-gray-500 dark:text-zinc-400 font-sans antialiased pb-12 pt-16">
      {/* 4.2 Hero Section */}
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 py-6 md:py-12">
        <section className="hero-section relative flex min-h-96 flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">
          {/* image - start */}
          <img 
            src="https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500" 
            loading="lazy" 
            alt="Photo by Fakurian Design" 
            className="absolute inset-0 h-full w-full object-cover object-center" 
          />
          {/* image - end */}

          {/* overlay - start */}
          <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply"></div>
          {/* overlay - end */}

          {/* text start */}
          <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
            <p className="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">
              Plataforma para Autores Autônomos
            </p>
            <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">
              Escreva, publique e lucre. Sua jornada começa aqui.
            </h1>

            <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
              <button
                onClick={() => setActiveTab('editor')}
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white ring-indigo-300 transition duration-100 outline-none hover:bg-indigo-600 focus-visible:ring-2 active:bg-indigo-700 md:text-base cursor-pointer"
              >
                Começar Gratuitamente
              </button>

              <button
                onClick={() => setActiveTab('exporter')}
                className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 ring-indigo-300 transition duration-100 outline-none hover:bg-gray-300 focus-visible:ring-2 active:text-gray-700 md:text-base cursor-pointer"
              >
                Explorar Recursos
              </button>
            </div>
          </div>
          {/* text end */}
        </section>
      </div>

      {/* 4.3 Features Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          {/* text - start */}
          <div className="mb-10 md:mb-16 text-center">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-805 md:mb-6 lg:text-3xl uppercase tracking-tight">
              Our competitive advantage
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-gray-500 dark:text-zinc-400 md:text-lg">
              Foque na escrita. Nós cuidamos da formatação, exportação e venda. Ferramentas digitais de alta precisão para o autor contemporâneo.
            </p>
          </div>
          {/* text - end */}

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4 md:p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition duration-100 cursor-pointer group"
            >
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/40 mb-4 text-indigo-500 dark:text-indigo-400">
                <Edit3 size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-805 md:text-xl">Editor de Escrita Professional</h3>
              <p className="mb-4 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                Um ambiente sem distrações criado especificamente para escrita de fôlego com metas diárias.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-indigo-500 dark:text-indigo-400 transition duration-100 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 text-sm">
                  Escrever <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('exporter')}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4 md:p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition duration-100 cursor-pointer group"
            >
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/40 mb-4 text-indigo-500 dark:text-indigo-400">
                <FileText size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-805 md:text-xl">Exportação para PDF e EPUB</h3>
              <p className="mb-4 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                Gere PDFs prontos para impressão e EPUBs perfeitos com um único clique do diagramador.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-indigo-500 dark:text-indigo-400 transition duration-100 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 text-sm">
                  Diagramar <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4 md:p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition duration-100 cursor-pointer group"
            >
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/40 mb-4 text-indigo-500 dark:text-indigo-400">
                <User size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-805 md:text-xl">Perfil do Autor</h3>
              <p className="mb-4 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                Construa seu público com uma página de portfólio de autor bonita, elegante e personalizável.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-indigo-500 dark:text-indigo-400 transition duration-100 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 text-sm">
                  Configurar <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('marketplace')}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4 md:p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition duration-100 cursor-pointer group"
            >
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/40 mb-4 text-indigo-500 dark:text-indigo-400">
                <Store size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-805 md:text-xl">Marketplace Integrado</h3>
              <p className="mb-4 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                Venda diretamente aos leitores e mantenha royalties mais altos sem intermediários exploradores.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-indigo-500 dark:text-indigo-400 transition duration-100 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 text-sm">
                  Vender <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4 md:p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition duration-100 cursor-pointer group"
            >
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/40 mb-4 text-indigo-500 dark:text-indigo-400">
                <Layers size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-805 md:text-xl">Ferramentas de Estrutura</h3>
              <p className="mb-4 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                Organize facilmente capítulos, seções e prefácios arrastando e soltando na barra lateral.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-indigo-500 dark:text-indigo-400 transition duration-100 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 text-sm">
                  Organizar <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4 md:p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition duration-100 cursor-pointer group"
            >
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/40 mb-4 text-indigo-500 dark:text-indigo-400">
                <RefreshCw size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-805 md:text-xl">Salvamento Automático</h3>
              <p className="mb-4 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                Seu trabalho é sempre salvo e sincronizado localmente em tempo real enquanto você digita.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-indigo-500 dark:text-indigo-400 transition duration-100 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 text-sm">
                  Verificar <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}
          </div>
        </div>
      </section>

      {/* 4.4 PASSO A PASSO Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-zinc-900/60 border-t border-b border-gray-200 dark:border-zinc-800">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-2">
            <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono block">PASSO A PASSO</span>
            <h2 className="text-3xl md:text-5xl uppercase tracking-tight text-gray-900 dark:text-zinc-100 font-semibold">
              Da página em branco ao livro publicado
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400">Sua trilha rumo à autopublicação simplificada em quatro passos práticos.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 mb-6 tracking-widest uppercase font-mono bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50">Passo 01</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-3">Crie Sua Conta</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed max-w-[200px]">
                Cadastre-se e configure seu perfil em poucos minutos.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 mb-6 tracking-widest uppercase font-mono bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50">Passo 02</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-3">Escreva & Estruture</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed max-w-[200px]">
                Redija seu manuscrito em um editor imersivo focado nas ideias.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setActiveTab('exporter')}
              className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 mb-6 tracking-widest uppercase font-mono bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50">Passo 03</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-3">Formatos de Exportação</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed max-w-[200px]">
                Gere arquivos digitais ou físicos perfeitos de forma instantânea.
              </p>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => setActiveTab('marketplace')}
              className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 mb-6 tracking-widest uppercase font-mono bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50">Passo 04</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-3">Publique & Venda</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed max-w-[200px]">
                Lance seu livro para o mundo nos seus termos, faturando direto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5-DIAGRAMAÇÃO INTEGRADA Section */}
      <section className="py-16 md:py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
            
            <div className="space-y-8 relative z-10">
              <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block">DIAGRAMAÇÃO INTEGRADA</span>
              <h2 className="text-3xl md:text-5xl uppercase tracking-tight leading-tight text-gray-900 dark:text-zinc-100 font-bold">
                Exporte uma vez. Publique em qualquer lugar.
              </h2>
              <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed">
                Tipografia profissional aplicada automaticamente para garantir legibilidade absoluta em qualquer meio.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-gray-200 dark:border-zinc-800 mt-1 text-indigo-500 dark:text-indigo-400">
                    <Printer size={20} className="shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-1">PDF para Impressão</h3>
                    <p className="text-gray-550 dark:text-zinc-400 text-xs leading-relaxed">
                      Pronto para KDP Print e IngramSpark. Inclui margens perfeitas e numeração profissional de páginas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-gray-200 dark:border-zinc-800 mt-1 text-indigo-500 dark:text-indigo-400">
                    <Smartphone size={20} className="shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-1">EPUB para E-readers</h3>
                    <p className="text-gray-550 dark:text-zinc-400 text-xs leading-relaxed">
                      Renderização impecável no Kindle e Apple Books. Tipografia dinâmica para qualquer tela móvel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg p-3 shadow-2xl group overflow-hidden relative z-10">
              <img
                alt="Mockup de exportação"
                className="w-full h-auto rounded-lg opacity-85 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr_tOFS-qpDagB2qIYEYvRuV5ukbUH4AClL_YedvK_LQRP8VzA4Dm6e9UxL9zZrruwzPBYjUAQBOOR1o76GfZR7khLHn2rzz7I0EqQ8C0I2bZbefx1LxMSYRljnzGR-fUkIdb-qp9WZteGscMsxrWrWZdW8cB8dhPtsRaEfV-4zQrgS9zPKQy_Mgf7XqeZcq54Iavl1hlMTlPD9Sre4FAH49X1zA_fwbNZ2WzzHBUjiW36WcP1SXNaNSGqDnCCKBAs9p6zEOFkLxE"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4.6 Últimos Lançamentos Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-zinc-900/60 border-t border-b border-gray-200 dark:border-zinc-800">
        <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono block mb-1">MARKETPLACE</span>
              <h2 className="text-3xl md:text-5xl uppercase tracking-tight text-gray-900 dark:text-zinc-100 font-semibold">Últimos Lançamentos</h2>
            </div>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 hover:text-indigo-650 dark:hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              Explorar Catálogo Completo <ArrowRight size={14} />
            </button>
          </div>

          {/* Six Books shelf */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {books.slice(0, 6).map(book => (
              <div 
                key={book.id} 
                onClick={() => handleBookClick(book)}
                className="group cursor-pointer space-y-4"
              >
                <div className="aspect-[2/3] bg-gray-100 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm group-hover:shadow-indigo-550/10 group-hover:shadow-lg group-hover:border-indigo-500 dark:group-hover:border-indigo-400 transition-all duration-300 relative">
                  <img
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    src={book.coverUrl}
                  />
                </div>
                <div className="space-y-1 px-1">
                  <h4 className="font-bold text-sm uppercase truncate text-gray-900 dark:text-zinc-100 tracking-tight leading-none">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider truncate">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <div className="bg-white dark:bg-zinc-950 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center rounded-lg bg-gray-100 dark:bg-zinc-900 p-4 sm:p-8">
            <div className="mb-4 sm:mb-8">
              <h2 className="text-center text-xl font-bold text-indigo-500 dark:text-indigo-400 sm:text-2xl lg:text-3xl">
                O mundo está esperando sua história
              </h2>
              <p className="text-center text-gray-500 dark:text-zinc-400 text-sm mt-1">
                Faça parte da nova onda de autopublicação. Crie sua conta grátis.
              </p>
            </div>

            <form onSubmit={handleCreateAccount} className="mb-3 flex w-full max-w-md gap-2 sm:mb-5">
              <input 
                required
                type="email"
                placeholder="Seu melhor e-mail" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full flex-1 rounded border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-gray-800 dark:text-zinc-100 placeholder-gray-400 dark:placeholder:text-zinc-500 ring-indigo-300 transition duration-100 outline-none focus:ring" 
              />

              <button 
                type="submit"
                className="inline-block cursor-pointer rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white ring-indigo-300 transition duration-100 outline-none hover:bg-indigo-600 focus-visible:ring-2 active:bg-indigo-700 md:text-base"
              >
                Cadastrar
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 dark:text-zinc-550">
              Ao se cadastrar, você concorda com nossos{" "}
              <Link href="/termos" className="underline transition duration-100 hover:text-indigo-500 dark:hover:text-indigo-400 active:text-indigo-600">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="/privacidade" className="underline transition duration-100 hover:text-indigo-500 dark:hover:text-indigo-400 active:text-indigo-600">
                Política de Privacidade
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
