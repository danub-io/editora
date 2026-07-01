import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contato — GospelReads.",
};

import Navbar from "@/components/gospelreads/Navbar";
import Footer from "@/components/gospelreads/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col pt-16">
      <Navbar />
      <main id="main-content" className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-12 w-full">
        {/* Header */}
        <header className="mb-12 border-b border-gray-200 dark:border-zinc-800 pb-8">
          <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block mb-3">
            FALE CONOSCO
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-tight">
            Contato
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-4 max-w-2xl text-sm">
            Tem alguma dúvida sobre publicação, parcerias ou suporte? Entre em contato conosco. Nossa equipe responderá em até 24 horas úteis.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-tight">
              Informações de Contato
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
              Fique à vontade para nos enviar um e-mail direto ou visitar nosso escritório. Estamos sempre de portas abertas para conversar sobre literatura.
            </p>

            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/50 shrink-0">
                  <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wider mb-1">E-mail</h4>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">suporte@gospelreads.com</p>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">parcerias@gospelreads.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/50 shrink-0">
                  <Phone className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wider mb-1">Telefone</h4>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">+55 (11) 4002-8922</p>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">Segunda a Sexta, das 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/50 shrink-0">
                  <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wider mb-1">Escritório</h4>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">Av. Paulista, 1000 — Bela Vista</p>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">São Paulo - SP, CEP 01310-100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-tight mb-6">
              Envie uma Mensagem
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="nome" className="text-sm font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider block">
                    Nome Completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="João Silva"
                    className="w-full text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider block">
                    Endereço de E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="joao@exemplo.com"
                    className="w-full text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="assunto" className="text-sm font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Assunto
                </label>
                <input
                  id="assunto"
                  type="text"
                  placeholder="Dúvida sobre publicação de manuscrito"
                  className="w-full text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="mensagem" className="text-sm font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={5}
                  placeholder="Escreva sua dúvida ou mensagem detalhada aqui..."
                  className="w-full text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 placeholder:text-gray-400 dark:placeholder:text-zinc-500 font-sans"
                />
              </div>

              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-bold uppercase tracking-widest px-8 py-3.5 transition-colors flex items-center gap-2 rounded-lg cursor-pointer"
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
