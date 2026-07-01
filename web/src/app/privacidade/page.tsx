import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacidade — GospelReads.",
};

import Navbar from "@/components/gospelreads/Navbar";
import Footer from "@/components/gospelreads/Footer";
import { Shield } from "lucide-react";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col pt-16">
      <Navbar />
      <main id="main-content" className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-gray-200 dark:border-zinc-800 pb-8">
          <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block mb-3">
            SEGURANÇA & DADOS
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-500 dark:text-indigo-400" /> Política de Privacidade
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-4 text-sm font-sans">
            Última atualização: 26 de Junho de 2026. A sua privacidade é de extrema importância para nós no GospelReads.
          </p>
        </header>

        {/* Content Document */}
        <div className="max-w-3xl font-sans text-sm leading-relaxed text-gray-700 dark:text-zinc-300 space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 font-sans">1. Coleta de Informações</h2>
            <p>
              Coletamos informações pessoais que você nos fornece voluntariamente ao se registrar no site, criar manuscritos, enviar mensagens de contato ou assinar nossa newsletter. Essas informações incluem seu nome, endereço de e-mail, foto de perfil e dados de faturamento (quando aplicável).
            </p>
            <p>
              Também coletamos automaticamente certas informações técnicas quando você navega em nossa plataforma, incluindo seu endereço IP, tipo de navegador, sistema operacional e dados sobre a sua interação com a plataforma.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 font-sans">2. Como Usamos Seus Dados</h2>
            <p>
              Utilizamos as informações coletadas para operar, manter e melhorar as funcionalidades do GospelReads., incluindo a personalização de sua biblioteca e o processamento de suas exportações em PDF ou EPUB.
            </p>
            <p>
              Seus dados de contato também podem ser utilizados para enviar e-mails informativos sobre novos recursos, atualizações importantes ou campanhas promocionais (as quais você pode cancelar a qualquer momento).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 font-sans">3. Direitos do Usuário</h2>
            <p>
              Você detém todos os direitos autorais e de propriedade intelectual sobre qualquer manuscrito que escrever ou carregar na nossa plataforma. Nós nunca venderemos, compartilharemos ou reivindicaremos a autoria de seus textos.
            </p>
            <p>
              Você pode, a qualquer momento, solicitar o acesso, retificação ou exclusão permanente de sua conta e de todos os dados a ela associados através do nosso canal de suporte ao cliente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 font-sans">4. Cookies e Tecnologias de Rastreamento</h2>
            <p>
              Utilizamos cookies estritamente necessários para manter a sua sessão ativa, além de cookies analíticos discretos para monitorar o tráfego do site e corrigir bugs de performance de forma anônima.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
