import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:px-8">
        {/* Brand Column */}
        <div className="col-span-2 flex flex-col items-start gap-3 md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary opacity-80" />
            <span className="text-headline-md font-headline-md tracking-tight text-on-background">
              Editora
            </span>
          </Link>
          <p className="max-w-xs text-ui-body text-on-surface-variant">
            Construindo o futuro da publicação, conectando autores com os
            melhores profissionais do mercado editorial.
          </p>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <h4 className="mb-1 font-bold text-on-background">Empresa</h4>
          <Link
            href="/"
            className="text-ui-label text-on-surface-variant transition-colors hover:text-primary"
          >
            Sobre
          </Link>
          <Link
            href="/"
            className="text-ui-label text-on-surface-variant transition-colors hover:text-primary"
          >
            Blog
          </Link>
          <Link
            href="/"
            className="text-ui-label text-on-surface-variant transition-colors hover:text-primary"
          >
            Carreiras
          </Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="mb-1 font-bold text-on-background">Legal</h4>
          <Link
            href="/"
            className="text-ui-label text-on-surface-variant transition-colors hover:text-primary"
          >
            Privacidade
          </Link>
          <Link
            href="/"
            className="text-ui-label text-on-surface-variant transition-colors hover:text-primary"
          >
            Termos
          </Link>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-3">
          <h4 className="mb-1 font-bold text-on-background">Suporte</h4>
          <Link
            href="/"
            className="text-ui-label text-on-surface-variant transition-colors hover:text-primary"
          >
            Contato
          </Link>
          <Link
            href="/"
            className="text-ui-label text-on-surface-variant transition-colors hover:text-primary"
          >
            Central de Ajuda
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="col-span-2 mt-8 pt-6 text-center text-ui-label text-on-surface-variant md:col-span-4">
          © {new Date().getFullYear()} Editora. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
