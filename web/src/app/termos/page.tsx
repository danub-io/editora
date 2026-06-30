import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Termos de Uso — GospelReads.",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { Scale } from "lucide-react";

export default function TermosdeUsoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col pt-16">
      <HomeHeader />
      <main id="main-content" className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-gray-200 dark:border-zinc-800 pb-8">
          <h1 className="text-display-lg text-gray-900 dark:text-zinc-100 flex items-center gap-3 font-bold font-sans">
            <Scale className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /> Termos de Uso
          </h1>
          <p className="text-gray-600 dark:text-zinc-400 mt-4 text-base font-sans">
            Última atualização: 26 de Junho de 2026. Por favor, leia atentamente estes termos antes de utilizar o GospelReads.
          </p>
        </header>

        {/* Content Document */}
        <div className="max-w-3xl font-sans text-base leading-relaxed text-gray-700 dark:text-zinc-350 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 font-sans">1. Aceitação dos Termos</h2>
            <p>
              Ao criar uma conta ou utilizar os serviços do GospelReads., você concorda em cumprir e estar legalmente vinculado a estes Termos de Uso e à nossa Política de Privacidade. Caso discorde de qualquer cláusula, solicitamos que não utilize a plataforma.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 font-sans">2. Propriedade dos Manuscritos</h2>
            <p>
              Todo o conteúdo textual, manuscritos, esboços, capítulos e notas criados por você na plataforma permanecem sob sua exclusiva propriedade intelectual. O GospelReads. não adquire qualquer direito de publicação, distribuição ou edição de suas obras, servindo exclusivamente como uma ferramenta facilitadora para a sua escrita e editoração.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 font-sans">3. Diretrizes de Publicação no Acervo</h2>
            <p>
              Caso decida publicar sua obra no Acervo Público da plataforma, você declara ter plenos direitos autorais sobre o texto enviado. Fica expressamente proibido enviar conteúdos que violem direitos de terceiros, plágios, materiais difamatórios ou que infrinjam as leis vigentes de direitos autorais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 font-sans">4. Limitação de Responsabilidade</h2>
            <p>
              O GospelReads. busca manter a plataforma estável e segura, mas não garante que as funções de exportação ou edição estarão livres de erros ocasionais. Recomendamos manter backups periódicos dos seus textos. Não seremos responsáveis por perdas decorrentes do uso indevido do sistema ou falhas de conectividade de terceiros.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
