import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-12 md:grid-cols-4 md:px-8">
        {/* Brand Column */}
        <div className="col-span-2 flex flex-col items-start gap-3 md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary opacity-80" />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Editora
            </span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            O ambiente mais focado para escrever, organizar e compilar seu manuscrito —
            do primeiro rascunho ao EPUB.
          </p>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-foreground mb-3">Empresa</h4>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Carreiras
          </Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacidade
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Termos
          </Link>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-foreground mb-3">Suporte</h4>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contato
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Central de Ajuda
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="col-span-2 mt-0 pt-6 text-center text-xs text-muted-foreground md:col-span-4">
          © {new Date().getFullYear()} Editora. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
