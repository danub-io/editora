"use client";

import React, { useState } from 'react';
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
    <div className="bg-neutral-primary text-body font-sans antialiased pb-12 pt-16">
      {/* 4.2 Hero Section */}
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 py-6 md:py-12">
        <section className="relative flex min-h-[420px] flex-1 shrink-0 items-center justify-center overflow-hidden rounded-base bg-neutral-primary-medium py-16 shadow-lg md:py-20 xl:py-36 border border-default">
          {/* image - start */}
          <img 
            src="https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500" 
            loading="lazy" 
            alt="Photo by Fakurian Design" 
            className="absolute inset-0 h-full w-full object-cover object-center opacity-85" 
          />
          {/* image - end */}

          {/* overlay - start */}
          <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-70"></div>
          {/* overlay - end */}

          {/* text start */}
          <div className="relative flex flex-col items-center p-6 sm:max-w-2xl z-10 text-center">
            <p className="mb-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-indigo-100 md:mb-6">
              Plataforma para Autores Autônomos
            </p>
            <h1 className="mb-6 text-center text-4xl font-extrabold text-white sm:text-5xl md:mb-10 md:text-6xl leading-[1.1] tracking-tight">
              Escreva, publique e lucre. Sua jornada literária começa aqui.
            </h1>
            <p className="mb-8 text-center text-sm md:text-base text-indigo-100 max-w-xl leading-relaxed opacity-90">
              Do manuscrito à distribuição global, a GospelReads. é a ferramenta profissional para autores independentes. Comece seu livro hoje mesmo, gratuitamente.
            </p>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                id="hero-btn-start"
                onClick={() => setActiveTab('editor')}
                className="inline-block rounded-base bg-brand px-8 py-3 text-center text-sm font-semibold text-white transition duration-100 hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-brand-medium cursor-pointer"
              >
                Começar Gratuitamente
              </button>

              <button
                id="hero-btn-resources"
                onClick={() => setActiveTab('exporter')}
                className="inline-block rounded-base bg-neutral-primary-soft border border-default-medium px-8 py-3 text-center text-sm font-semibold text-heading transition duration-100 hover:bg-neutral-tertiary-medium focus:outline-none focus:ring-2 focus:ring-neutral-tertiary cursor-pointer"
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
            <h2 className="mb-4 text-center text-2xl font-bold text-heading md:mb-6 lg:text-3xl uppercase tracking-tight">
              Nosso Diferencial Competitivo
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-body md:text-lg">
              Foque na escrita. Nós cuidamos da formatação, exportação e venda. Ferramentas digitais de alta precisão para o autor contemporâneo.
            </p>
          </div>
          {/* text - end */}

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="flex flex-col rounded-base border border-default bg-neutral-primary-medium p-4 md:p-6 hover:border-brand transition duration-100 cursor-pointer group"
            >
              <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20 mb-4 text-brand">
                <Edit3 size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-heading md:text-xl">Editor de Escrita Profissional</h3>
              <p className="mb-4 text-body text-sm leading-relaxed">
                Um ambiente sem distrações criado especificamente para escrita de fôlego com metas diárias.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-brand transition duration-100 hover:text-brand-strong flex items-center gap-1 text-sm">
                  Escrever <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('exporter')}
              className="flex flex-col rounded-base border border-default bg-neutral-primary-medium p-4 md:p-6 hover:border-brand transition duration-100 cursor-pointer group"
            >
              <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20 mb-4 text-brand">
                <FileText size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-heading md:text-xl">Exportação para PDF e EPUB</h3>
              <p className="mb-4 text-body text-sm leading-relaxed">
                Gere PDFs prontos para impressão e EPUBs perfeitos com um único clique do diagramador.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-brand transition duration-100 hover:text-brand-strong flex items-center gap-1 text-sm">
                  Diagramar <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex flex-col rounded-base border border-default bg-neutral-primary-medium p-4 md:p-6 hover:border-brand transition duration-100 cursor-pointer group"
            >
              <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20 mb-4 text-brand">
                <User size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-heading md:text-xl">Perfil do Autor</h3>
              <p className="mb-4 text-body text-sm leading-relaxed">
                Construa seu público com uma página de portfólio de autor bonita, elegante e personalizável.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-brand transition duration-100 hover:text-brand-strong flex items-center gap-1 text-sm">
                  Configurar <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('marketplace')}
              className="flex flex-col rounded-base border border-default bg-neutral-primary-medium p-4 md:p-6 hover:border-brand transition duration-100 cursor-pointer group"
            >
              <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20 mb-4 text-brand">
                <Store size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-heading md:text-xl">Marketplace Integrado</h3>
              <p className="mb-4 text-body text-sm leading-relaxed">
                Venda diretamente aos leitores e mantenha royalties mais altos sem intermediários exploradores.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-brand transition duration-100 hover:text-brand-strong flex items-center gap-1 text-sm">
                  Vender <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="flex flex-col rounded-base border border-default bg-neutral-primary-medium p-4 md:p-6 hover:border-brand transition duration-100 cursor-pointer group"
            >
              <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20 mb-4 text-brand">
                <Layers size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-heading md:text-xl">Ferramentas de Estrutura</h3>
              <p className="mb-4 text-body text-sm leading-relaxed">
                Organize facilmente capítulos, seções e prefácios arrastando e soltando na barra lateral.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-brand transition duration-100 hover:text-brand-strong flex items-center gap-1 text-sm">
                  Organizar <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}

            {/* feature - start */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="flex flex-col rounded-base border border-default bg-neutral-primary-medium p-4 md:p-6 hover:border-brand transition duration-100 cursor-pointer group"
            >
              <div className="bg-brand/10 p-3 rounded-base w-fit border border-brand/20 mb-4 text-brand">
                <RefreshCw size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-heading md:text-xl">Salvamento Automático</h3>
              <p className="mb-4 text-body text-sm leading-relaxed">
                Seu trabalho é sempre salvo e sincronizado localmente em tempo real enquanto você digita.
              </p>
              <div className="mt-auto">
                <span className="font-bold text-brand transition duration-100 hover:text-brand-strong flex items-center gap-1 text-sm">
                  Verificar <ArrowRight size={14} />
                </span>
              </div>
            </div>
            {/* feature - end */}
          </div>
        </div>
      </section>

      {/* 4.4 PASSO A PASSO Section */}
      <section className="py-16 md:py-24 bg-neutral-primary-soft border-t border-b border-default">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-2">
            <span className="text-[10px] font-bold text-brand tracking-[0.2em] uppercase font-mono block">PASSO A PASSO</span>
            <h2 className="text-3xl md:text-5xl uppercase tracking-tight text-heading font-semibold">
              Da página em branco ao livro publicado
            </h2>
            <p className="text-xs md:text-sm text-body">Sua trilha rumo à autopublicação simplificada em quatro passos práticos.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="bg-neutral-primary border border-default rounded-base py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-brand transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-[10px] font-bold text-brand mb-6 tracking-widest uppercase font-mono bg-brand/10 px-3 py-1 rounded-full border border-brand/20">Passo 01</div>
              <h3 className="text-lg font-bold text-heading mb-3">Crie Sua Conta</h3>
              <p className="text-body text-xs leading-relaxed max-w-[200px]">
                Cadastre-se e configure seu perfil em poucos minutos.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="bg-neutral-primary border border-default rounded-base py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-brand transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-[10px] font-bold text-brand mb-6 tracking-widest uppercase font-mono bg-brand/10 px-3 py-1 rounded-full border border-brand/20">Passo 02</div>
              <h3 className="text-lg font-bold text-heading mb-3">Escreva & Estruture</h3>
              <p className="text-body text-xs leading-relaxed max-w-[200px]">
                Redija seu manuscrito em um editor imersivo focado nas ideias.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setActiveTab('exporter')}
              className="bg-neutral-primary border border-default rounded-base py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-brand transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-[10px] font-bold text-brand mb-6 tracking-widest uppercase font-mono bg-brand/10 px-3 py-1 rounded-full border border-brand/20">Passo 03</div>
              <h3 className="text-lg font-bold text-heading mb-3">Formatos de Exportação</h3>
              <p className="text-body text-xs leading-relaxed max-w-[200px]">
                Gere arquivos digitais ou físicos perfeitos de forma instantânea.
              </p>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => setActiveTab('marketplace')}
              className="bg-neutral-primary border border-default rounded-base py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-brand transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-[10px] font-bold text-brand mb-6 tracking-widest uppercase font-mono bg-brand/10 px-3 py-1 rounded-full border border-brand/20">Passo 04</div>
              <h3 className="text-lg font-bold text-heading mb-3">Publique & Venda</h3>
              <p className="text-body text-xs leading-relaxed max-w-[200px]">
                Lance seu livro para o mundo nos seus termos, faturando direto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 DIAGRAMAÇÃO INTEGRADA Section */}
      <section className="py-16 md:py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-neutral-primary-medium border border-default rounded-base p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-80 h-80 bg-brand/5 rounded-full blur-3xl"></div>
            
            <div className="space-y-8 relative z-10">
              <span className="text-[10px] font-bold text-brand tracking-[0.2em] uppercase font-mono bg-brand/10 px-3 py-1 rounded-full border border-brand/20 w-fit block">DIAGRAMAÇÃO INTEGRADA</span>
              <h2 className="text-3xl md:text-5xl uppercase tracking-tight leading-tight text-heading font-semibold">
                Exporte uma vez. Publique em qualquer lugar.
              </h2>
              <p className="text-sm md:text-base text-body leading-relaxed">
                Tipografia profissional aplicada automaticamente para garantir legibilidade absoluta em qualquer meio.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-neutral-primary-soft p-2.5 rounded-base border border-default mt-1 text-brand">
                    <Printer size={20} className="shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-heading mb-1">PDF para Impressão</h3>
                    <p className="text-body text-xs leading-relaxed">
                      Pronto para KDP Print e IngramSpark. Inclui margens perfeitas e numeração profissional de páginas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-neutral-primary-soft p-2.5 rounded-base border border-default mt-1 text-brand">
                    <Smartphone size={20} className="shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-heading mb-1">EPUB para E-readers</h3>
                    <p className="text-body text-xs leading-relaxed">
                      Renderização impecável no Kindle e Apple Books. Tipografia dinâmica para qualquer tela móvel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-default bg-neutral-primary rounded-base p-3 shadow-2xl group overflow-hidden relative z-10">
              <img
                alt="Mockup de exportação"
                className="w-full h-auto rounded-base opacity-85 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr_tOFS-qpDagB2qIYEYvRuV5ukbUH4AClL_YedvK_LQRP8VzA4Dm6e9UxL9zZrruwzPBYjUAQBOOR1o76GfZR7khLHn2rzz7I0EqQ8C0I2bZbefx1LxMSYRljnzGR-fUkIdb-qp9WZteGscMsxrWrWZdW8cB8dhPtsRaEfV-4zQrgS9zPKQy_Mgf7XqeZcq54Iavl1hlMTlPD9Sre4FAH49X1zA_fwbNZ2WzzHBUjiW36WcP1SXNaNSGqDnCCKBAs9p6zEOFkLxE"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4.6 Últimos Lançamentos Section */}
      <section className="py-16 md:py-24 bg-neutral-primary-soft border-t border-b border-default">
        <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-brand tracking-[0.2em] uppercase font-mono block mb-1">MARKETPLACE</span>
              <h2 className="text-3xl md:text-5xl uppercase tracking-tight text-heading font-semibold">Últimos Lançamentos</h2>
            </div>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="text-xs font-bold uppercase tracking-widest text-brand hover:text-brand-strong flex items-center gap-1.5 cursor-pointer transition-colors"
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
                <div className="aspect-[2/3] bg-neutral-primary-medium rounded-base border border-default overflow-hidden shadow-sm group-hover:shadow-brand/10 group-hover:shadow-lg group-hover:border-brand transition-all duration-300 relative">
                  <img
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    src={book.coverUrl}
                  />
                </div>
                <div className="space-y-1 px-1">
                  <h4 className="font-bold text-sm uppercase truncate text-heading tracking-tight leading-none">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-body-subtle uppercase tracking-wider truncate">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive CTA section */}
      <section className="py-20 md:py-28 bg-neutral-primary relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mx-auto">
            Acesso Instantâneo
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-heading uppercase tracking-tight leading-none font-extrabold max-w-2xl mx-auto">
            O mundo está esperando sua história.
          </h2>
          <p className="text-xs md:text-sm text-body max-w-md mx-auto">
            Faça parte da nova onda de autopublicação. Crie sua conta grátis agora mesmo e entre no editor em segundos.
          </p>
          
          <form onSubmit={handleCreateAccount} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto p-1.5 cta-form rounded-full focus-within:border-brand/50 transition-colors">
            <input
              required
              type="email"
              placeholder="Seu melhor e-mail"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-5 py-3 cta-input w-full placeholder:text-body-subtle text-xs"
            />
            <button
              type="submit"
              className="bg-brand hover:bg-brand-strong text-white px-6 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors cursor-pointer rounded-full"
            >
              Criar Conta Grátis
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
