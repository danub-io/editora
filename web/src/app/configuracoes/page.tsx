"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/gospelreads/Navbar';
import Footer from '@/components/gospelreads/Footer';
import { Settings, ShieldCheck, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

export default function Configuracoes() {
  const [mounted, setMounted] = useState(false);
  const [blogAdminMode, setBlogAdminMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('gospelreads_blog_admin_mode') === 'true';
    setBlogAdminMode(saved);
  }, []);

  const handleToggleAdminMode = () => {
    const nextVal = !blogAdminMode;
    setBlogAdminMode(nextVal);
    localStorage.setItem('gospelreads_blog_admin_mode', String(nextVal));
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#09090b]"></div>;
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col justify-between text-neutral-100 font-sans antialiased">
      <Navbar />
      
      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 md:py-20 w-full space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles size={12} className="text-indigo-400" />
            Painel Geral
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white uppercase font-extrabold tracking-tight">
            Configurações
          </h1>
          <p className="text-xs md:text-sm text-neutral-400">
            Gerencie preferências e recursos adicionais da plataforma GospelReads.
          </p>
        </div>

        {/* Settings Card */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-6 bento-card">
          <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2 border-b border-neutral-800 pb-3 font-mono">
            <Settings size={14} /> Preferências do Blog
          </h3>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-white block">Modo Administrador do Blog</label>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                Ative para gerenciar postagens diretamente na página do blog (criar, editar e deletar posts).
              </p>
            </div>
            
            <button
              onClick={handleToggleAdminMode}
              className="p-1 rounded-full text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer bg-transparent border-0"
              title={blogAdminMode ? "Desativar Modo Admin" : "Ativar Modo Admin"}
            >
              {blogAdminMode ? (
                <ToggleRight size={40} className="text-indigo-500" />
              ) : (
                <ToggleLeft size={40} className="text-neutral-600" />
              )}
            </button>
          </div>

          {blogAdminMode && (
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-3xl text-xs text-indigo-300 flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-indigo-400 shrink-0" />
              <span>
                <strong>Modo Administrador Ativo:</strong> Ao acessar a página do Blog, você verá os painéis de criação e edição de artigos.
              </span>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
