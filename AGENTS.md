# Editora — Convenções para Agentes de IA

## Stack
- **Linguagem:** Python 3.12+
- **CLI:** Typer (Click)
- **Validação:** Pydantic v2
- **IA:** LangChain + LangGraph (OpenAI, Anthropic, Ollama)
- **Documentos:** Pandoc (MD → PDF/EPUB)
- **Testes:** Pytest + pytest-cov
- **Lint/Format:** Ruff, Black
- **Type Check:** Pyright
- **Gerenciador:** pip (venv em `.venv/`)

## Comandos

| Comando                      | Descrição                     |
| ---------------------------- | ----------------------------- |
| `uv run editora`             | Executar CLI                  |
| `uv run pytest`              | Testes                        |
| `uv run pytest --cov`        | Testes com cobertura          |
| `uv run ruff check .`        | Lint                          |
| `uv run black .`             | Formatação                    |
| `uv run pyright`             | Type check                    |

## Aliases
- `editora` no PATH via `pip install -e .`

## Estrutura
```
src/editora/
├── cli/           # Comandos Typer
├── core/          # Lógica de negócio
├── models/        # Pydantic schemas
├── services/      # Integrações (IA, Pandoc)
└── utils/         # Helpers
tests/
docs/
examples/
```

## Convenções
- **Idioma:** Português brasileiro (nomes, docs, mensagens)
- **Type hints:** Sempre usar hinting moderno (`list[str]`, `|` unions)
- **Logging:** via Rich ou structlog
- **Commits:** Conventional Commits
