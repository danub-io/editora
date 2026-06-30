"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight, 
  User
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `transition-colors cursor-pointer ${
      isActive ? 'text-indigo-400 font-bold' : 'text-neutral-400 hover:text-white font-medium'
    }`;
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `text-left py-2 border-b border-neutral-800/40 flex justify-between items-center ${
      isActive ? 'text-indigo-400 font-bold' : 'text-neutral-400 font-medium'
    }`;
  };

  return (
    <nav className="sticky top-0 w-full z-40 bg-[#09090b] border-b border-neutral-900 flex justify-between items-center px-6 md:px-12 h-16 shrink-0 text-neutral-100 font-sans">
      <Link 
        href="/"
        className="font-serif font-semibold text-lg tracking-widest text-white cursor-pointer uppercase flex items-center gap-1.5 select-none"
      >
        GospelReads<span className="text-indigo-500">.</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-8 items-center text-xs font-bold uppercase tracking-wider">
        <Link href="/" className={getLinkClass('/')}>
          Início
        </Link>
        <Link href="/dash" className={getLinkClass('/dash')}>
          Editor
        </Link>
        <Link href="/acervo" className={getLinkClass('/acervo')}>
          Marketplace
        </Link>
        <Link href="/diario" className={getLinkClass('/diario')}>
          Blog
        </Link>
      </div>

      {/* Desktop Right Action button */}
      <div className="hidden lg:flex gap-4 items-center">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="p-2 border border-neutral-800 hover:bg-neutral-900 rounded-xl text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center justify-center bg-transparent"
          title="Mudar Tema"
        >
          {mounted && resolvedTheme === 'light' ? (
            <Moon size={15} className="text-indigo-400" />
          ) : (
            <Sun size={15} className="text-amber-400" />
          )}
        </button>

        <Link
          href="/portfolio"
          className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
          title="Meu Perfil"
        >
          <User size={15} className="text-indigo-400" /> Perfil
        </Link>
        <Link 
          href="/dash"
          className="emerald-btn px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-sm hover:shadow transition-shadow text-center"
        >
          Entrar no Editor
        </Link>
      </div>

      {/* Mobile menu trigger */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden text-white p-1 cursor-pointer bg-transparent border-0"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Drawer Navigation overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer fixed inset-0 top-16 z-30 bg-[#09090b] flex flex-col p-6 space-y-6 lg:hidden border-t border-neutral-900 text-neutral-100">
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass('/')}
            >
              Início <ChevronRight size={14} />
            </Link>
            <Link 
              href="/dash" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass('/dash')}
            >
              Editor <ChevronRight size={14} />
            </Link>
            <Link 
              href="/acervo" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass('/acervo')}
            >
              Marketplace <ChevronRight size={14} />
            </Link>
            <Link 
              href="/diario" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass('/diario')}
            >
              Blog <ChevronRight size={14} />
            </Link>
            <Link 
              href="/portfolio" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass('/portfolio')}
            >
              Perfil <ChevronRight size={14} />
            </Link>
            <button 
              onClick={() => {
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-3 text-neutral-400 flex items-center justify-between mt-2 font-bold cursor-pointer bg-transparent border-0"
            >
              <span className="flex items-center gap-2">
                {mounted && resolvedTheme === 'light' ? <Moon size={16} className="text-indigo-400" /> : <Sun size={16} className="text-amber-400" />}
                {mounted && resolvedTheme === 'light' ? 'Mudar para Tema Escuro' : 'Mudar para Tema Claro'}
              </span>
            </button>
          </div>

          <Link 
            href="/dash"
            onClick={() => setIsMobileMenuOpen(false)}
            className="emerald-btn py-4 w-full text-xs font-bold uppercase tracking-widest text-center"
          >
            Começar Agora
          </Link>
        </div>
      )}
    </nav>
  );
}
