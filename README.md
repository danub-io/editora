# Editora — Editora Pessoal Automatizada com IA

**Editora** é uma ferramenta pessoal automatizada para produção de livros profissionais. Possui duas interfaces: **CLI** (linha de comando) para automação de fluxos de edição, revisão e diagramação, e **Web** (Next.js) para gerenciamento visual de projetos.

> ⚠️ **Aviso:** Projeto em estágio Alpha. Funcionalidades de IA exigem chaves de API configuradas.

## Interfaces

| Interface | Descrição | Localização |
|-----------|-----------|-------------|
| **CLI** | Linha de comando com comandos `editora` | `src/editora/cli.py` |
| **Web** | Interface web moderna (Next.js, Tailwind, shadcn/ui) | `web/README.md` |

## Funcionalidades

### CLI — Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `editora init` | Inicializa um novo projeto de livro |
| `editora build` | Compila o livro para PDF e/ou EPUB via Pandoc + LaTeX |
| `editora edit` | Edita capítulos usando IA (modos: light, medium, aggressive) |
| `editora proofread` | Revisa gramática e ortografia (LanguageTool + IA) |
| `editora consistency` | Verifica consistência narrativa (personagens, timeline, tom) |
| `editora info` | Exibe estatísticas do projeto |
| `editora template` | Gera templates LaTeX personalizados |

### Web

Interface web construída com Next.js + Tailwind CSS + shadcn/ui. Consulte [`web/README.md`](./web/README.md) para detalhes.

## Requisitos

| Ferramenta | Versão | Instalação |
|------------|--------|------------|
| Python | >= 3.12 | `uv python install 3.12` / `pyenv install 3.12` |
| Pandoc | >= 3.x | `sudo apt install pandoc` |
| LaTeX | TeX Live 2024+ | `sudo apt install texlive-xetex texlive-latex-extra texlive-lang-portuguese` |

## Instalação

```bash
# Clonar o repositório
git clone <url> editora
cd editora

# Instalar dependências base
pip install -e .

# (Opcional) Dependências para IA local (Ollama)
pip install -e ".[local-ai]"

# (Opcional) Dependências para interface web
pip install -e ".[ui]"

# (Opcional) Dependências de desenvolvimento
pip install -e ".[dev]"
```

## Configuração de IA — Chaves de API

As funcionalidades de IA (`edit`, `proofread`, `consistency`) dependem de um provedor LLM configurado. Você precisa de **pelo menos uma** chave de API configurada.

### Variáveis de Ambiente

| Variável            | Provedor           | Obrigatória?              |
| ------------------- | ------------------ | ------------------------- |
| `ANTHROPIC_API_KEY` | Anthropic (Claude) | Se provider = `anthropic` |
| `OPENAI_API_KEY`    | OpenAI (GPT)       | Se provider = `openai`    |
| `GOOGLE_API_KEY`    | Google (Gemini)    | Se provider = `google`    |
| _(nenhuma)_         | Ollama (local)     | Não precisa de chave      |

Configure no terminal ou no arquivo `.env`:

```bash
# Linux/macOS
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
export GOOGLE_API_KEY="..."

# Ou crie um arquivo .env na raiz do projeto
echo 'ANTHROPIC_API_KEY="sk-ant-..."' >> .env
```

### Configuração via `editora.yaml`

A chave de API também pode ser definida no arquivo de configuração do projeto:

```yaml
llm:
  provider: anthropic # openai, anthropic, google, ollama
  model: claude-sonnet-4-20250514
  api_key: "sk-ant-..." # Opcional — pode usar variável de ambiente
```

Veja [`editora.example.yaml`](./editora.example.yaml) para um exemplo completo com todas as opções.

> ⚠️ **Provider = Ollama** não requer chave de API, mas necessita do grupo de dependências opcionais `local-ai` e do servidor Ollama rodando localmente.

## Dependências Opcionais

O projeto usa **feature flags** no CLI para ativar/desativar módulos de IA conforme as dependências disponíveis:

```python
try:
    from .ai.editing import TextEditor
    AI_AVAILABLE = True
except ImportError:
    AI_AVAILABLE = False
```

| Grupo        | Instalação                     | O que habilita                               |
| ------------ | ------------------------------ | -------------------------------------------- |
| (base)       | `pip install -e .`             | Comandos `init`, `build`, `info`, `template` |
| `[dev]`      | `pip install -e ".[dev]"`      | Testes, lint, type checking                  |
| `[local-ai]` | `pip install -e ".[local-ai]"` | Suporte a Ollama (modelos locais)            |
| `[ui]`       | `pip install -e ".[ui]"`       | Interface web (Streamlit)                    |

Dependências Python necessárias para IA (instaladas por padrão):
- `langchain>=0.1.0` — Orquestração de LLMs
- `langchain-openai>=0.0.5` — Provider OpenAI
- `langchain-anthropic>=0.1.0` — Provider Anthropic
- `langchain-google-genai` — Provider Google (Gemini) _(não listado no pyproject.toml, instalar manualmente se necessário)_
- `langgraph>=0.0.20` — Graphos de conversação

## Uso Básico

```bash
# Iniciar um novo projeto
editora init --title "Meu Livro" --author "Seu Nome"

# Ver informações do projeto
editora info

# Editar capítulos com IA (preview)
editora edit --preview --mode light

# Revisar gramática
editora proofread --report

# Verificar consistência narrativa
editora consistency

# Compilar para PDF/EPUB
editora build
```

## Estrutura do Projeto

```
editora/
├── README.md              ← Este arquivo
├── CHANGELOG.md           ← Histórico de versões
├── editora.example.yaml   ← Exemplo de configuração completa
├── pyproject.toml          ← Metadados e dependências do pacote
│
├── src/editora/            ← Pacote Python (CLI)
│   ├── cli.py              ← Comandos da CLI (Typer)
│   ├── config.py           ← Configuração via Pydantic
│   │
│   ├── ai/                 ← Módulos de IA (requer chave de API)
│   │   ├── llm.py          ← Abstração de LLMs (Anthropic, OpenAI, Google, Ollama)
│   │   ├── editing.py      ← Copyediting com IA
│   │   ├── proofreading.py ← Revisão gramatical com IA + LanguageTool
│   │   └── consistency.py  ← Verificação de consistência narrativa
│   │
│   ├── core/               ← Núcleo do manuscrito
│   │   └── manuscript.py   ← Modelos de capítulo e manuscrito
│   │
│   ├── typesetting/        ← Diagramação (Pandoc + LaTeX)
│   │   └── converter.py    ← Conversão para PDF/EPUB
│   │
│   └── utils/              ← Utilitários
│
├── web/                    ← Interface web (Next.js)
│   └── README.md           ← Documentação da interface web
│
└── tests/                  ← Testes automatizados
```

## Documentação Adicional
- [`CHANGELOG.md`](./CHANGELOG.md) — Histórico completo de versões e mudanças
- [`editora.example.yaml`](./editora.example.yaml) — Configuração exemplo com todas as opções documentadas
- [`web/README.md`](./web/README.md) — Documentação específica da interface web

## Licença

MIT
