# Diretrizes de Design — Editora (GospelReads)

Este documento define os padrões visuais, tipográficos e de estilo para manter a consistência estética do frontend em toda a aplicação.

---

## 1. Tipografia

Usamos uma combinação de fontes clássicas e modernas para criar uma estética literária premium.

- **Títulos & Literatura (`font-serif`)**: `EB Garamond`, Georgia, serif.
  - Usado para cabeçalhos principais, títulos de livros, seções poéticas e o corpo do editor de manuscrito.
- **Interface & Controles (`font-sans`)**: `Inter`, system-ui, sans-serif.
  - Usado para menus de navegação, botões, campos de entrada, cards, painéis laterais e informações de metadados.
- **Estatísticas & Códigos (`font-mono`)**: `JetBrains Mono`, monospace.
  - Usado para contagem de palavras, data/hora, versões de snapshots e marcadores numéricos.

---

## 2. Paleta de Cores e Variáveis CSS

### Tema Escuro (Padrão)
- **Fundo Principal (Body)**: `#09090b` (Preto puro)
- **Fundo de Cartões & Painéis**: `#0c0c0e` ou `#0f0f12` (Tons de carvão escuro)
- **Texto Principal**: `#f5f5f5` ou `#ffffff` (Branco/Cinza ultra claro)
- **Texto Secundário**: `#a3a3a3` (Cinza neutro médio)
- **Bordas**: `#171717` ou `#262626` (Preto/Carvão sutil)

### Tema Claro
- **Fundo Principal (Body)**: `#fbf9f5` (Creme literário quente e confortável para leitura)
- **Fundo de Cartões & Painéis**: `#ffffff` (Branco puro para alto contraste)
- **Texto Principal**: `#1a1512` (Cinza carvão quase preto)
- **Texto Secundário**: `#4a453f` (Marrom/Cinza neutro quente)
- **Bordas**: `#e6e3da` ou `#d7d4ca` (Creme/Cinza suave)

### Cores de Destaque (Universal)
- **Acento Primário (Indigo)**: `#6366f1` (Dark) / `#4f46e5` (Light)
- **Sucesso (Emerald)**: `#10b981` (Dark) / `#059669` (Light)
- **Aviso/Evento (Amber)**: `#f59e0b` (Dark) / `#d97706` (Light)
- **Erro (Rose)**: `#f43f5e` (Dark) / `#e11d48` (Light)

---

## 3. Espaçamentos e Bordas

- **Arredondamento de Bordas**:
  - `rounded-2xl` (16px) ou `rounded-3xl` (24px) para contêineres grandes (bento grids, modais, painéis principais).
  - `rounded-lg` (8px) para elements interativos menores (botões, campos de entrada, cards de blocos).
- **Margens & Paddings**:
  - `p-6` ou `p-8` em modais e seções amplas.
  - `p-3` ou `p-4` em cartões de fichas/blocos e elementos densos.

---

## 4. Estilos de Botão Padronizados

- **Botão Primário (`.emerald-btn`)**:
  - Fundo `#10b981` com hover suave.
  - Usado para ações de sucesso ou criação principal (ex: "Publicar", "Criar Ficha").
- **Botão de Destaque (`.indigo-btn` / Tailwind standard)**:
  - Fundo `#6366f1` com hover. Usado para CTAs primários de navegação ou checkout.
- **Botão de Contorno (`.outline-btn`)**:
  - Transparente com borda cinza, mudando para cor de acento e fundo sutil ao passar o mouse.
  - Usado para ações secundárias ou de cancelamento.