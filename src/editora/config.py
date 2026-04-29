"""Configurações da editora usando Pydantic."""

from pathlib import Path
from typing import Literal

from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class BookMetadata(BaseModel):
    """Metadados do livro."""

    title: str = Field(..., description="Título do livro")
    author: str = Field(..., description="Autor(es) do livro")
    language: str = Field(default="pt-BR", description="Idioma do livro")
    isbn: str | None = Field(default=None, description="ISBN do livro")
    description: str | None = Field(default=None, description="Descrição/sinopse")
    categories: list[str] = Field(default_factory=list, description="Categorias/gêneros")
    keywords: list[str] = Field(default_factory=list, description="Palavras-chave")
    copyright_year: str | None = Field(default=None, description="Ano de copyright")
    edition: str = Field(default="1", description="Número da edição")
    publisher: str | None = Field(default=None, description="Editora")


class TypesettingConfig(BaseModel):
    """Configurações de diagramação."""

    format: Literal["pdf", "epub", "both"] = Field(default="both")
    page_size: Literal["A5", "6x9", "5x8", "5.5x8.5"] = Field(default="6x9")
    font_family: str = Field(default="Georgia")
    font_size: int = Field(default=11)
    line_height: float = Field(default=1.4)
    margins: dict[str, str] = Field(
        default_factory=lambda: {
            "top": "2cm",
            "bottom": "2cm",
            "inner": "2.5cm",
            "outer": "2cm",
        }
    )
    header_font_size: int = Field(default=14)
    include_page_numbers: bool = Field(default=True)
    include_toc: bool = Field(default=True)
    template: str | None = Field(default=None, description="Template personalizado")


class LLMConfig(BaseModel):
    """Configurações de LLM."""

    provider: Literal["openai", "anthropic", "google", "ollama", "local"] = Field(
        default="anthropic"
    )
    model: str = Field(default="claude-sonnet-4-20250514")
    temperature: float = Field(default=0.3, ge=0, le=2)
    max_tokens: int = Field(default=4096)
    api_key: str | None = Field(default=None)
    base_url: str | None = Field(default=None)


class EditingConfig(BaseModel):
    """Configurações de edição de texto."""

    mode: Literal["light", "medium", "aggressive"] = Field(default="light")
    preserve_voice: bool = Field(default=True)
    max_changes_percent: float = Field(default=15.0)
    passes: int = Field(default=1, ge=1, le=3)


class ProofreadingConfig(BaseModel):
    """Configurações de proofreading."""

    enabled: bool = Field(default=True)
    language: str = Field(default="pt-BR")
    check_grammar: bool = Field(default=True)
    check_spelling: bool = Field(default=True)
    check_punctuation: bool = Field(default=True)
    use_llm: bool = Field(default=True)  # Usar LLM para contexto


class ConsistencyConfig(BaseModel):
    """Configurações de revisão de consistência."""

    enabled: bool = Field(default=True)
    check_characters: bool = Field(default=True)
    check_timeline: bool = Field(default=True)
    check_facts: bool = Field(default=True)
    check_tone: bool = Field(default=True)


class OutputConfig(BaseModel):
    """Configurações de saída."""

    output_dir: Path = Field(default=Path("output"))
    versions_dir: Path = Field(default=Path("versions"))
    keep_intermediate: bool = Field(default=False)
    kdp_compliant: bool = Field(default=True)


class EditorConfig(BaseSettings):
    """Configuração principal da editora."""

    model_config = SettingsConfigDict(
        env_prefix="EDITORA_",
        env_file=".env",
        extra="ignore",
    )

    # Diretórios
    project_dir: Path = Field(default=Path("."))
    chapters_dir: Path = Field(default=Path("chapters"))
    assets_dir: Path = Field(default=Path("assets"))

    # Sub-configurações
    book: BookMetadata
    typesetting: TypesettingConfig = Field(default_factory=TypesettingConfig)
    llm: LLMConfig = Field(default_factory=LLMConfig)
    editing: EditingConfig = Field(default_factory=EditingConfig)
    proofreading: ProofreadingConfig = Field(default_factory=ProofreadingConfig)
    consistency: ConsistencyConfig = Field(default_factory=ConsistencyConfig)
    output: OutputConfig = Field(default_factory=OutputConfig)

    # Debug
    debug: bool = Field(default=False)
    verbose: bool = Field(default=False)

    @classmethod
    def load(cls, config_path: Path | str | None = None) -> "EditorConfig":
        """Carrega configuração de arquivo YAML ou usa defaults."""
        if config_path is None:
            config_path = Path("editora.yaml")

        config_path = Path(config_path)
        if config_path.exists():
            import yaml

            with open(config_path, "r", encoding="utf-8") as f:
                data = yaml.safe_load(f)
            return cls.model_validate(data)

        return cls.model_validate(
            {
                "book": {
                    "title": "Meu Livro",
                    "author": "Autor Desconhecido",
                }
            }
        )

    def save(self, path: Path | str) -> None:
        """Salva configuração em arquivo YAML."""
        import yaml

        path = Path(path)
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            yaml.dump(
                self.model_dump(mode="json"),
                f,
                default_flow_style=False,
                allow_unicode=True,
                sort_keys=False,
            )