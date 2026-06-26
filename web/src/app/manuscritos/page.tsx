import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Manuscritos — Aura Editorial",
};

import Link from "next/link";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { FileText } from "lucide-react";

export default function ManuscritosPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 flex items-center justify-center px-edge-margin-mobile md:px-edge-margin-desktop">
        <div className="text-center max-w-md">
          <FileText className="w-12 h-12 mx-auto mb-6 text-on-surface-variant" />
          <h1 className="font-display-lg text-primary mb-4">Manuscritos</h1>
          <p className="font-label-lg uppercase tracking-widest text-on-surface-variant mb-4">
            Em breve
          </p>
          <p className="font-body-md text-on-surface-variant">
            Esta página está em construção.
          </p>
          <Link href="/" className="mt-6 font-label-md text-label-md uppercase tracking-widest text-primary hover:text-surface-tint transition-colors border-b border-primary pb-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary inline-block">
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
