import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "404 — Aura Editorial",
};

import Link from "next/link";
import { BookOpen } from "lucide-react";

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 flex items-center justify-center px-edge-margin-mobile md:px-edge-margin-desktop py-section-gap">
        <div className="text-center max-w-md">
          <BookOpen className="mx-auto mb-8 text-on-surface-variant" size={64} />
          <h1 className="font-display-lg text-display-lg text-primary mb-4">
            404
          </h1>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Página não encontrada
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            A página que você procura não existe ou foi movida.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-surface font-label-md px-6 py-3 hover:bg-primary-dark transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
