import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contato — GospelReads.",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />
      <main id="main-content" className="flex-1 max-w-container-max mx-auto px-edge-margin-mobile md:px-edge-margin-desktop py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-outline-variant pb-8">
          <h1 className="font-display-lg text-display-lg text-primary">Contato</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
            Tem alguma dúvida sobre publicação, parcerias ou suporte? Entre em contato conosco. Nossa equipe responderá em até 24 horas úteis.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-headline-md text-headline-md text-primary">Informações de Contato</h2>
            <p className="font-body-md text-on-surface-variant">
              Fique à vontade para nos enviar um e-mail direto ou visitar nosso escritório. Estamos sempre de portas abertas para conversar sobre literatura.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-wider">E-mail</h4>
                  <p className="font-body-md text-on-surface-variant mt-1">suporte@gospelreads.com</p>
                  <p className="font-body-md text-on-surface-variant">parcerias@gospelreads.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-wider">Telefone</h4>
                  <p className="font-body-md text-on-surface-variant mt-1">+55 (11) 4002-8922</p>
                  <p className="font-body-md text-on-surface-variant">Segunda a Sexta, das 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-wider">Escritório</h4>
                  <p className="font-body-md text-on-surface-variant mt-1">Av. Paulista, 1000 — Bela Vista</p>
                  <p className="font-body-md text-on-surface-variant">São Paulo - SP, CEP 01310-100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 border border-outline-variant p-8 bg-surface-container-lowest">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Envie uma mensagem</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nome" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                    Nome Completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="João Silva"
                    className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:border-b-primary focus:ring-0 focus:outline-none transition-colors font-body-md text-on-background w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                    Endereço de E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="joao@exemplo.com"
                    className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:border-b-primary focus:ring-0 focus:outline-none transition-colors font-body-md text-on-background w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="assunto" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  Assunto
                </label>
                <input
                  id="assunto"
                  type="text"
                  placeholder="Dúvida sobre publicação de manuscrito"
                  className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:border-b-primary focus:ring-0 focus:outline-none transition-colors font-body-md text-on-background w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensagem" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={5}
                  placeholder="Escreva sua dúvida ou mensagem detalhada aqui..."
                  className="border border-outline-variant bg-transparent p-3 focus:border-primary focus:ring-0 focus:outline-none transition-colors font-body-md text-on-background w-full"
                />
              </div>

              <button
                type="button"
                className="w-full sm:w-auto bg-primary text-primary-foreground font-label-md text-label-md uppercase tracking-widest px-8 py-3.5 hover:bg-surface-tint transition-colors flex items-center justify-center gap-2"
              >
                Enviar Mensagem <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
