# Diretrizes de Design & Design System — GospelReads

Este documento define os padrões visuais, tipográficos e de estilo para manter a consistência estética do frontend em toda a aplicação GospelReads.

---

## 1. Tipografia

Usamos uma combinação de fontes clássicas e modernas para criar uma estética literária premium.

*   **Títulos & Literatura (`font-serif`)**: `EB Garamond`, Georgia, serif (ou `Playfair Display`).
    *   Usado para cabeçalhos principais, títulos de livros, seções poéticas e o corpo do editor de manuscrito.
*   **Interface & Controles (`font-sans`)**: `Inter`, system-ui, sans-serif.
    *   Usado para menus de navegação, botões, campos de entrada, cards, painéis laterais e informações de metadados.
*   **Estatísticas & Códigos (`font-mono`)**: `JetBrains Mono`, monospace (ou similar).
    *   Usado para contagem de palavras, data/hora, versões de snapshots e marcadores numéricos.

---

## 2. Paleta de Cores e Temas

### Tema Escuro (Padrão)
*   **Fundo Principal (Body)**: `#09090b` (Preto puro / `bg-[#09090b]`)
*   **Fundo de Cartões & Painéis**: `#0c0c0e` ou `#0f0f12` (Tons de carvão escuro)
*   **Texto Principal**: `#f5f5f5` ou `#ffffff` (Branco/Cinza ultra claro)
*   **Texto Secundário**: `#a3a3a3` (Cinza neutro médio)
*   **Bordas**: `#171717` ou `#262626` (Preto/Carvão sutil)

### Tema Claro
*   **Fundo Principal (Body)**: `#fbf9f5` (Creme literário quente e confortável para leitura)
*   **Fundo de Cartões & Painéis**: `#ffffff` (Branco puro para alto contraste)
*   **Texto Principal**: `#1a1512` (Cinza carvão quase preto)
*   **Texto Secundário**: `#4a453f` (Marrom/Cinza neutro quente)
*   **Bordas**: `#e6e3da` ou `#d7d4ca` (Creme/Cinza suave)

### Cores de Destaque (Universal)
*   **Acento Primário (Indigo)**: `#6366f1` (Dark) / `#4f46e5` (Light)
*   **Sucesso (Emerald)**: `#10b981` (Dark) / `#059669` (Light)
*   **Aviso/Evento (Amber)**: `#f59e0b` (Dark) / `#d97706` (Light)
*   **Erro (Rose)**: `#f43f5e` (Dark) / `#e11d48` (Light)

---

## 3. Espaçamentos e Formas

*   **Arredondamento de Bordas**:
    *   `rounded-2xl` (16px) ou `rounded-3xl` (24px) para contêineres grandes (bento grids, modais, painéis principais).
    *   `rounded-lg` (8px / `0.5rem`) é o padrão padrão para elementos interativos menores (botões, campos de entrada, cards de blocos).
*   **Margens & Paddings**:
    *   `p-6` ou `p-8` em modais e seções amplas.
    *   `p-3` ou `p-4` em cartões de fichas/blocos e elementos densos.

---

## 4. Componentes e Classes Utilitárias (Tailwind)

### 4.1 Botões
*   **Botão Primário (Destaque/Indigo)**:
    `bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 rounded-lg text-sm font-semibold transition`
*   **Botão Secundário**:
    `bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-lg text-sm font-semibold transition` (Dark: `bg-zinc-800 text-zinc-300 hover:bg-zinc-700`)
*   **Botão de Sucesso (`.emerald-btn`)**:
    Fundo `#10b981` com hover suave. Usado para "Publicar" ou "Criar Ficha".

### 4.2 Inputs e Formulários
*   **Campos de Entrada**: Fundo branco (`bg-white`), `border-gray-300`, `rounded-lg` (8px). Usa `focus:ring-2 focus:ring-indigo-300`.

### 4.3 Elementos Hero
*   **Hero Title**: `mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl`
*   **Hero Subtitle**: `mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8`

### 4.4 Seções e Cabeçalhos
*   **Título de Seção**: `mb-4 text-2xl font-bold text-gray-900 dark:text-zinc-100 md:mb-6 lg:text-3xl uppercase tracking-tight`
*   **Crachás (Badges)**: `text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block`

### 4.5 Restrições de Legibilidade
*   **Tamanho Mínimo de Fonte**: Nenhuma fonte de texto no projeto deve ser menor que `text-sm` (14px) para garantir a legibilidade. Evite o uso de `text-xs` ou menores em elementos de leitura direta.