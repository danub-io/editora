import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Termos de Uso — GospelReads.",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { Scale } from "lucide-react";

export default function TermosdeUsoPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 max-w-container-max mx-auto px-edge-margin-mobile md:px-edge-margin-desktop py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-outline-variant pb-8">
          <h1 className="font-display-lg text-display-lg text-primary flex items-center gap-3">
            <Scale className="w-8 h-8 text-primary" /> Termos de Uso
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">
            Última atualização: 26 de Junho de 2026. Por favor, leia atentamente estes termos antes de utilizar o GospelReads.
          </p>
        </header>

        {/* Content Document */}
        <div className="max-w-3xl font-sans text-lg leading-relaxed text-primary space-y-8">
          <section className="space-y-4">
            <h2 className="font-display-lg text-2xl font-bold text-primary">1. Aceitação dos Termos</h2>
            <p>
              Ao criar uma conta ou utilizar os serviços do GospelReads., você concorda em cumprir e estar legalmente vinculado a estes Termos de Uso e à nossa Política de Privacidade. Caso discorde de qualquer cláusula, solicitamos que não utilize a plataforma.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display-lg text-2xl font-bold text-primary">2. Propriedade dos Manuscritos</h2>
            <p>
              Todo o conteúdo textual, manuscritos, esboços, capítulos e notas criados por você na plataforma permanecem sob sua exclusiva propriedade intelectual. O GospelReads. não adquire qualquer direito de publicação, distribuição ou edição de suas obras, servindo exclusivamente como uma ferramenta facilitadora para a sua escrita e editoração.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display-lg text-2xl font-bold text-primary">3. Diretrizes de Publicação no Acervo</h2>
            <p>
              Caso decida publicar sua obra no Acervo Público da plataforma, você declara ter plenos direitos autorais sobre o texto enviado. Fica expressamente proibido enviar conteúdos que violem direitos de terceiros, plágios, materiais difamatórios ou que infrinjam as leis vigentes de direitos autorais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display-lg text-2xl font-bold text-primary">4. Limitação de Responsabilidade</h2>
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
