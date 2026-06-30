"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User,
  Settings,
  LayoutDashboard,
  LogOut,
  Palette
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('autor@gospelreads.com');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedEmail = localStorage.getItem('gospelreads_profile_email_temp');
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `block py-2 px-3 rounded md:p-0 ${
      isActive 
        ? 'text-white bg-brand md:bg-transparent md:text-fg-brand' 
        : 'text-heading hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand'
    }`;
  };

  return (
    <nav className="bg-neutral-primary fixed w-full z-40 top-0 start-0 border-b border-default font-sans">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse select-none">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="GospelReads Logo" />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap tracking-wider font-sans">
            GospelReads<span className="text-brand">.</span>
          </span>
        </Link>
        
        <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
          {/* User Menu Button */}
          <div className="relative">
            <button 
              ref={userButtonRef}
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              type="button" 
              className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary cursor-pointer w-8 h-8 items-center justify-center border border-default-medium overflow-hidden" 
              id="user-menu-button" 
              aria-expanded={isUserDropdownOpen}
            >
              <span className="sr-only">Open user menu</span>
              <div className="w-8 h-8 rounded-full bg-neutral-secondary-soft flex items-center justify-center text-heading">
                <User size={16} />
              </div>
            </button>
            
            {/* User Dropdown Menu */}
            {isUserDropdownOpen && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 mt-2 z-50 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-48 font-sans" 
                id="user-dropdown"
              >
                <div className="px-4 py-3 text-sm border-b border-default">
                  <span className="block text-heading font-medium truncate">Autor GospelReads</span>
                  <span className="block text-body truncate text-xs">{userEmail}</span>
                </div>
                <ul className="p-2 text-sm text-body font-medium space-y-1" aria-labelledby="user-menu-button">
                  <li>
                    <Link 
                      href="/dash" 
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="inline-flex items-center gap-2 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded transition-colors"
                    >
                      <LayoutDashboard size={14} className="text-brand" />
                      Workspace
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/portfolio" 
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="inline-flex items-center gap-2 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded transition-colors"
                    >
                      <User size={14} className="text-brand" />
                      Meu Perfil
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/configuracoes" 
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="inline-flex items-center gap-2 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded transition-colors"
                    >
                      <Settings size={14} className="text-brand" />
                      Configurações
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
                        setIsUserDropdownOpen(false);
                      }}
                      className="inline-flex items-center gap-2 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded transition-colors text-left cursor-pointer bg-transparent border-0 font-medium"
                    >
                      {mounted && resolvedTheme === 'light' ? (
                        <>
                          <Moon size={14} className="text-indigo-400" />
                          <span>Tema Escuro</span>
                        </>
                      ) : (
                        <>
                          <Sun size={14} className="text-amber-400" />
                          <span>Tema Claro</span>
                        </>
                      )}
                    </button>
                  </li>
                  <li className="border-t border-default pt-1 mt-1">
                    <Link 
                      href="/" 
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        localStorage.removeItem('gospelreads_profile_email_temp');
                      }}
                      className="inline-flex items-center gap-2 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded transition-colors text-red-500 hover:text-red-600"
                    >
                      <LogOut size={14} />
                      Sair
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary cursor-pointer" 
            aria-controls="navbar-user" 
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-user">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link href="/" className={getLinkClass('/')} aria-current={pathname === '/' ? 'page' : undefined}>
                Início
              </Link>
            </li>
            <li>
              <Link href="/dash" className={getLinkClass('/dash')} aria-current={pathname === '/dash' ? 'page' : undefined}>
                Editor
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className={getLinkClass('/marketplace')} aria-current={pathname === '/marketplace' ? 'page' : undefined}>
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="/blog" className={getLinkClass('/blog')} aria-current={pathname === '/blog' ? 'page' : undefined}>
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
