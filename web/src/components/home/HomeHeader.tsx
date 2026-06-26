"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Menu, X } from "lucide-react";

export function HomeHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `font-label-lg text-label-md uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "text-primary border-b border-primary pb-0.5"
        : "text-on-surface-variant hover:text-primary"
    }`;

  return (
    <header>
      {/* Desktop */}
      <div className="hidden md:block border-b-4 border-double border-outline-variant">
        <div className="max-w-container-max mx-auto flex items-center justify-between px-edge-margin-desktop py-4">
          {/* Left nav */}
          <nav className="flex items-center gap-6 flex-1">
            <Link
              href="/manuscritos"
              className={linkClass("/manuscritos")}
            >
              Manuscritos
            </Link>
            <Link
              href="/biblioteca"
              className={linkClass("/biblioteca")}
            >
              Biblioteca
            </Link>
            <Link
              href="/acervo"
              className={linkClass("/acervo")}
            >
              Acervo Público
            </Link>
            <Link
              href="/portfolio"
              className={linkClass("/portfolio")}
            >
              Portfólio
            </Link>
          </nav>

          {/* Center logo */}
          <Link
            href="/"
            className="font-display-lg text-display-lg font-bold tracking-tighter text-primary flex-shrink-0 px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            AURA
          </Link>

          {/* Right nav */}
          <div className="flex items-center gap-6 flex-1 justify-end">
            <Link
              href="/templates"
              className={linkClass("/templates")}
            >
              Templates
            </Link>
            <Link
              href="/dash"
              className={`font-label-lg text-label-md uppercase tracking-widest px-8 py-3 rounded-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                pathname === "/dash"
                  ? "bg-surface-tint text-primary-foreground"
                  : "bg-primary text-primary-foreground hover:bg-surface-tint"
              }`}
            >
              Escrever Agora
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden border-b border-outline-variant">
        <div className="flex items-center justify-between px-edge-margin-mobile py-3">
          <Link
            href="/"
            className="font-headline-md text-headline-md font-bold tracking-tighter text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            AURA
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-surface flex flex-col md:hidden">
          <div className="flex items-center justify-between px-edge-margin-mobile py-3 border-b border-outline-variant">
            <Link
              href="/"
              className="font-headline-md text-headline-md font-bold tracking-tighter text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setMobileOpen(false)}
            >
              AURA
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-start gap-0 flex-1 overflow-y-auto pt-8 px-edge-margin-mobile">
            <Link
              href="/manuscritos"
              onClick={() => setMobileOpen(false)}
              className={`font-headline-md text-headline-md uppercase tracking-widest transition-colors py-4 border-b border-outline-variant w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${pathname === "/manuscritos" || pathname.startsWith("/manuscritos") ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              Manuscritos
            </Link>
            <Link
              href="/biblioteca"
              onClick={() => setMobileOpen(false)}
              className={`font-headline-md text-headline-md uppercase tracking-widest transition-colors py-4 border-b border-outline-variant w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${pathname === "/biblioteca" || pathname.startsWith("/biblioteca") ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              Biblioteca
            </Link>
            <Link
              href="/acervo"
              onClick={() => setMobileOpen(false)}
              className={`font-headline-md text-headline-md uppercase tracking-widest transition-colors py-4 border-b border-outline-variant w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${pathname === "/acervo" || pathname.startsWith("/acervo") ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              Acervo Público
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setMobileOpen(false)}
              className={`font-headline-md text-headline-md uppercase tracking-widest transition-colors py-4 border-b border-outline-variant w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${pathname === "/portfolio" || pathname.startsWith("/portfolio") ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              Portfólio
            </Link>
            <Link
              href="/templates"
              onClick={() => setMobileOpen(false)}
              className={`font-headline-md text-headline-md uppercase tracking-widest transition-colors py-4 border-b border-outline-variant w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${pathname === "/templates" || pathname.startsWith("/templates") ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              Templates
            </Link>
            <Link
              href="/dash"
              onClick={() => setMobileOpen(false)}
              className={`font-headline-md text-headline-md uppercase tracking-widest py-4 px-6 mt-8 w-full text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${pathname === "/dash" ? "bg-surface-tint text-primary-foreground" : "bg-primary text-primary-foreground"}`}
            >
              Escrever Agora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
