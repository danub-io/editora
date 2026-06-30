/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Edit3, 
  FileText, 
  User, 
  Store, 
  Layers, 
  RefreshCw, 
  CheckCircle, 
  BookOpen, 
  ArrowRight,
  ShieldAlert,
  Star,
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
    <div className="bg-[#09090b] text-neutral-100 font-sans antialiased pb-12">
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-12 md:py-20 grid lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 md:p-12 flex flex-col justify-between gap-8 relative overflow-hidden bento-card backdrop-blur-sm">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              Plataforma para Autores Autônomos
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white uppercase leading-[1.1] tracking-tight font-extrabold">
              Escreva, publique e lucre. Sua jornada literária começa aqui.
            </h1>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
              Do manuscrito à distribuição global, a GospelReads. é a ferramenta profissional para autores independentes. Comece seu livro hoje mesmo, gratuitamente.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
            <button
              id="hero-btn-start"
              onClick={() => setActiveTab('editor')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-3xl shadow-lg hover:shadow-indigo-500/25"
            >
              Começar Gratuitamente
            </button>
            <button
              id="hero-btn-resources"
              onClick={() => setActiveTab('exporter')}
              className="outline-btn px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-3xl"
            >
              Explorar Recursos
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative w-full min-h-[320px] bg-neutral-900/60 border border-neutral-800 rounded-3xl p-4 bento-card group overflow-hidden flex items-center justify-center backdrop-blur-sm">
          {/* Subtle ambient blur */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl"></div>
          
          <img
            alt="Plataforma de edição GospelReads."
            className="w-full h-full object-cover rounded-2xl opacity-85 group-hover:opacity-100 transition-all duration-700"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDChp40jC5x-JnzJkt4F0uoYjAcehcjX-3C5h6-bzOXY9fCQIpod3LBcCwzC6WCS1_1B64TBCXypeEwnJNW1BolaeZQ--JdlWvs3ses20PvQ5O2lHIQtG9yVSetpct4gxRhftPMaMV09oRYZVAuOMTGs-VvOEKfACDGE_ekWymBkbXXDjueEO0f0CikaB5QfPQHF-rag-iw9IQ9tDI1WLNkunl2_xMOy_7EiRogIcc6aIRHVQ0siVdmjcccw3U8hr4ImaG2ljrakXQ"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-5">
              <span className="text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase font-mono block mb-2">RECURSOS PREMIUM</span>
              <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-tight font-semibold">
                Tudo o que um autor profissional precisa
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                Foque na escrita. Nós cuidamos da formatação, exportação e venda. Ferramentas digitais de alta precisão para o autor contemporâneo.
              </p>
            </div>
          </div>

          {/* Interactive Feature Cards Grid - Styled as beautiful Bento boxes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] relative overflow-hidden bento-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6">
                <Edit3 size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Editor de Escrita Profissional</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Um ambiente sem distrações criado especificamente para escrita de fôlego com metas diárias.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div 
              onClick={() => setActiveTab('exporter')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] relative overflow-hidden bento-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6">
                <FileText size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Exportação para PDF e EPUB</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Gere PDFs prontos para impressão e EPUBs perfeitos com um único clique do diagramador.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] relative overflow-hidden bento-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6">
                <User size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Perfil do Autor</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Construa seu público com uma página de portfólio de autor bonita, elegante e personalizável.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div 
              onClick={() => setActiveTab('marketplace')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] relative overflow-hidden bento-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6">
                <Store size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Marketplace Integrado</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Venda diretamente aos leitores e mantenha royalties mais altos sem intermediários exploradores.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] relative overflow-hidden bento-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6">
                <Layers size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Ferramentas de Estrutura</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Organize facilmente capítulos, seções e prefácios arrastando e soltando na barra lateral.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] relative overflow-hidden bento-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6">
                <RefreshCw size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Salvamento Automático</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Seu trabalho é sempre salvo e sincronizado localmente em tempo real enquanto você digita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 md:py-24 bg-neutral-950/40">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-2">
            <span className="text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase font-mono block">PASSO A PASSO</span>
            <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-tight text-white font-semibold">
              Da página em branco ao livro publicado
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 font-sans">Sua trilha rumo à autopublicação simplificada em quatro passos práticos.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500/40 hover:bg-neutral-850 transition-all duration-300 group relative overflow-hidden bento-card"
            >
              <div className="text-[10px] font-bold text-indigo-400 mb-6 tracking-widest uppercase font-mono bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Passo 01</div>
              <h3 className="font-serif text-lg font-bold text-white mb-3">Crie Sua Conta</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-[200px]">
                Cadastre-se e configure seu perfil em poucos minutos.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setActiveTab('editor')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500/40 hover:bg-neutral-850 transition-all duration-300 group relative overflow-hidden bento-card"
            >
              <div className="text-[10px] font-bold text-indigo-400 mb-6 tracking-widest uppercase font-mono bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Passo 02</div>
              <h3 className="font-serif text-lg font-bold text-white mb-3">Escreva & Estruture</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-[200px]">
                Redija seu manuscrito em um editor imersivo focado nas ideias.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setActiveTab('exporter')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500/40 hover:bg-neutral-850 transition-all duration-300 group relative overflow-hidden bento-card"
            >
              <div className="text-[10px] font-bold text-indigo-400 mb-6 tracking-widest uppercase font-mono bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Passo 03</div>
              <h3 className="font-serif text-lg font-bold text-white mb-3">Formatos de Exportação</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-[200px]">
                Gere arquivos digitais ou físicos perfeitos de forma instantânea.
              </p>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => setActiveTab('marketplace')}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl py-10 px-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500/40 hover:bg-neutral-850 transition-all duration-300 group relative overflow-hidden bento-card"
            >
              <div className="text-[10px] font-bold text-indigo-400 mb-6 tracking-widest uppercase font-mono bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Passo 04</div>
              <h3 className="font-serif text-lg font-bold text-white mb-3">Publique & Venda</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-[200px]">
                Lance seu livro para o mundo nos seus termos, faturando direto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Export Showcase Section */}
      <section className="py-16 md:py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 md:p-12 relative overflow-hidden bento-card">
            <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
            
            <div className="space-y-8 relative z-10">
              <span className="text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 w-fit block">DIAGRAMAÇÃO INTEGRADA</span>
              <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-tight leading-tight text-white font-semibold">
                Exporte uma vez. Publique em qualquer lugar.
              </h2>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                Tipografia profissional aplicada automaticamente para garantir legibilidade absoluta em qualquer meio.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-neutral-800 p-2.5 rounded-xl border border-neutral-700/50 mt-1">
                    <Printer size={20} className="text-indigo-400 shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white mb-1">PDF para Impressão</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Pronto para KDP Print e IngramSpark. Inclui margens perfeitas e numeração profissional de páginas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-neutral-800 p-2.5 rounded-xl border border-neutral-700/50 mt-1">
                    <Smartphone size={20} className="text-indigo-400 shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white mb-1">EPUB para E-readers</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Renderização impecável no Kindle e Apple Books. Tipografia dinâmica para qualquer tela móvel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-neutral-800 bg-neutral-900 rounded-2xl p-3 shadow-2xl group overflow-hidden relative z-10">
              <img
                alt="Mockup de exportação"
                className="w-full h-auto rounded-xl opacity-85 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr_tOFS-qpDagB2qIYEYvRuV5ukbUH4AClL_YedvK_LQRP8VzA4Dm6e9UxL9zZrruwzPBYjUAQBOOR1o76GfZR7khLHn2rzz7I0EqQ8C0I2bZbefx1LxMSYRljnzGR-fUkIdb-qp9WZteGscMsxrWrWZdW8cB8dhPtsRaEfV-4zQrgS9zPKQy_Mgf7XqeZcq54Iavl1hlMTlPD9Sre4FAH49X1zA_fwbNZ2WzzHBUjiW36WcP1SXNaNSGqDnCCKBAs9p6zEOFkLxE"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Showcase */}
      <section className="py-16 md:py-24 bg-neutral-950/20">
        <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase font-mono block mb-1">MARKETPLACE</span>
              <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-tight text-white font-semibold">Últimos Lançamentos</h2>
            </div>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer transition-colors"
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
                <div className="aspect-[2/3] bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-sm group-hover:shadow-indigo-500/10 group-hover:shadow-lg group-hover:border-indigo-500/30 transition-all duration-300 relative">
                  <img
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    src={book.coverUrl}
                  />
                </div>
                <div className="space-y-1 px-1">
                  <h4 className="font-bold text-sm uppercase truncate text-white font-serif tracking-tight leading-none">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 uppercase tracking-wider truncate font-sans">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive CTA section */}
      <section className="py-20 md:py-28 bg-neutral-900/40 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mx-auto">
            Acesso Instantâneo
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none font-extrabold max-w-2xl mx-auto">
            O mundo está esperando sua história.
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 max-w-md mx-auto">
            Faça parte da nova onda de autopublicação. Crie sua conta grátis agora mesmo e entre no editor em segundos.
          </p>
          
          <form onSubmit={handleCreateAccount} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto p-1.5 cta-form rounded-3xl focus-within:border-indigo-500/50 transition-colors">
            <input
              required
              type="email"
              placeholder="Seu melhor e-mail"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-5 py-3 cta-input w-full placeholder:text-neutral-500 text-xs"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors cursor-pointer rounded-3xl font-mono"
            >
              Criar Conta Grátis
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
