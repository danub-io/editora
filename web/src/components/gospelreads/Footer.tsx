"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-[#09090b] border-t border-neutral-900 shrink-0 text-neutral-100 font-sans">
      <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-2">
            <Link 
              href="/"
              className="font-serif font-bold text-xl tracking-widest text-white uppercase cursor-pointer"
            >
              GospelReads<span className="text-indigo-500">.</span>
            </Link>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              A plataforma autoral independente focada em reescrever o futuro editorial através de soluções digitais de alta costura literária.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-widest">
            <Link className="text-neutral-400 hover:text-indigo-400 transition-colors" href="/termos">Termos</Link>
            <Link className="text-neutral-400 hover:text-indigo-400 transition-colors" href="/privacidade">Privacidade</Link>
            <a className="text-neutral-400 hover:text-indigo-400 transition-colors" href="#">Suporte</a>
            <a className="text-neutral-400 hover:text-indigo-400 transition-colors" href="#">Carreiras</a>
          </div>

          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            © {new Date().getFullYear()} GospelReads. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
