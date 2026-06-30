# Diretrizes de Design & Identidade Visual

Este documento formaliza as decisões de design, padrões de cores e tipografia adotados em toda a plataforma GospelReads., com base nas referências visuais do Flowrift e Flowbite.

---

## 1. Paleta de Cores (Tailwind CSS Puro)

Todas as cores no projeto utilizam classes utilitárias nativas do Tailwind para suportar modo claro e escuro de forma limpa e performática.

### Cores de Fundo (Backgrounds)
*   **Fundo Principal da Página:** `bg-white` (Light) e `bg-zinc-950` (Dark).
*   **Fundo de Destaques/Cards/Rodapé:** `bg-gray-100` (Light, mapeando para o tom cinza clássico `#f3f4f6`) e `bg-zinc-900` (Dark).
*   **Contêineres de Alerta/Acessórios:** `bg-gray-50` (Light) e `bg-zinc-900/50` (Dark).

### Cores de Texto (Typography Colors)
*   **Títulos e Destaques Principais:** `text-gray-900` ou `text-black` (Light) e `text-zinc-100` ou `text-white` (Dark).
*   **Corpo de Texto:** `text-gray-500` ou `text-gray-600` (Light) e `text-zinc-400` (Dark).
*   **Texto de Apoio/Legendas:** `text-gray-400` (Light) e `text-zinc-550` (Dark).
*   **Destaque da Marca (Brand Highlights):** `text-indigo-500` (Light) e `text-indigo-400` (Dark).

### Botões (Buttons)
*   **Botão Primário (Brand):** `bg-indigo-500 text-white` (hover: `hover:bg-indigo-600`, active: `active:bg-indigo-700`).
*   **Botão Secundário:** `bg-gray-200 text-gray-500` (hover: `hover:bg-gray-300`, active: `active:text-gray-700`, ou equivalentes em Dark Mode `bg-zinc-800 text-zinc-300`).

---

## 2. Tipografia & Fontes

*   **Padrão do Projeto:** Tipografia sem serifa padrão do Tailwind (`font-sans`), baseada em fontes do sistema ou carregada externamente, aplicada de forma consistente em todas as páginas públicas (Home, Sobre, Configurações, Termos, Privacidade).
*   **Exceção do Editor:** A única exceção de tipografia é a área interna de edição do manuscrito (Editor do Autor), que utiliza fontes serifadas (`font-serif`) para melhorar a experiência e o conforto na leitura de textos longos.

---

## 3. Código de Referência Flowrift

O layout base do Hero e das seções utiliza a seguinte estrutura original como modelo:

```html
<!-- hero - start -->
<div class="bg-white pb-6 sm:pb-8 lg:pb-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <header class="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
      <!-- logo -->
      <a href="/" class="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl">
        <svg width="95" height="94" viewBox="0 0 95 94" class="h-auto w-6 text-indigo-500" fill="currentColor">
          <path d="M96 0V47L48 94H0V47L48 0H96Z" />
        </svg>
        Flowrift
      </a>

      <!-- nav -->
      <nav class="hidden gap-12 lg:flex">
        <a href="#" class="text-lg font-semibold text-indigo-500">Home</a>
        <a href="#" class="text-lg font-semibold text-gray-600 hover:text-indigo-500">Features</a>
      </nav>

      <!-- buttons -->
      <a href="#" class="rounded-lg bg-gray-200 px-8 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-300">Contact Sales</a>
    </header>
  </div>
</div>
```
