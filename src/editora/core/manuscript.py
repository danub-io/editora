"""Módulo de Ingestion e Organização de Capítulos."""

import re
from datetime import datetime
from pathlib import Path
from typing import Any

from pydantic import BaseModel, Field


class Chapter(BaseModel):
    """Representa um capítulo do livro."""

    number: int = Field(..., description="Número do capítulo")
    title: str = Field(..., description="Título do capítulo")
    content: str = Field(..., description="Conteúdo do capítulo em Markdown")
    source_file: Path | None = Field(default=None, description="Arquivo de origem")
    tags: list[str] = Field(default_factory=list, description="Tags do capítulo")
    word_count: int = Field(default=0, description="Contagem de palavras")
    metadata: dict[str, Any] = Field(default_factory=dict)

    model_config = {"extra": "allow"}

    @classmethod
    def from_markdown(cls, content: str, source_file: Path | None = None) -> "Chapter":
        """Cria um capítulo a partir de conteúdo Markdown com frontmatter YAML."""
        import yaml

        title = None
        number = None
        tags = []
        body = content
        metadata = {}

        # Tenta extrair frontmatter YAML
        if content.startswith("---"):
            match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
            if match:
                frontmatter = yaml.safe_load(match.group(1))
                body = match.group(2)
                if frontmatter:
                    title = frontmatter.get("title")
                    number = frontmatter.get("number")
                    tags = frontmatter.get("tags", [])
                    metadata = frontmatter

        # Se não tem título no frontmatter, tenta extrair do primeiro heading
        if not title:
            heading_match = re.match(r"^#+\s+(.+)$", body.strip(), re.MULTILINE)
            if heading_match:
                title = heading_match.group(1).strip()
                # Remove o heading do corpo se foi usado como título
                body = body[heading_match.end():].strip()

        if not title:
            title = "Capítulo sem título"

        if number is None:
            # Tenta extrair número do título
            num_match = re.match(r"^(\d+)\.?\s+-?\s*(.+)$", title)
            if num_match:
                number = int(num_match.group(1))
                title = num_match.group(2).strip()
            else:
                number = 0

        # Conta palavras (aproximada para português)
        word_count = len(body.split())

        return cls(
            number=number,
            title=title,
            content=body,
            source_file=source_file,
            tags=tags,
            word_count=word_count,
            metadata=metadata,
        )

    @classmethod
    def from_file(cls, filepath: Path | str) -> "Chapter":
        """Carrega um capítulo de um arquivo Markdown."""
        filepath = Path(filepath)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        return cls.from_markdown(content, source_file=filepath)

    def to_markdown(self, include_frontmatter: bool = True) -> str:
        """Converte o capítulo de volta para Markdown."""
        if include_frontmatter:
            frontmatter = {
                "title": self.title,
                "number": self.number,
            }
            if self.tags:
                frontmatter["tags"] = self.tags
            frontmatter.update(self.metadata)

            import yaml

            yaml_str = yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True)
            return f"---\n{yaml_str}---\n\n{self.content}"
        return self.content

    def save(self, filepath: Path | str) -> None:
        """Salva o capítulo em um arquivo."""
        filepath = Path(filepath)
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(self.to_markdown())


class Manuscript(BaseModel):
    """Representa o manuscrito completo do livro."""

    title: str = Field(..., description="Título do livro")
    author: str = Field(..., description="Autor(es)")
    chapters: list[Chapter] = Field(
        default_factory=list, description="Lista de capítulos ordenados"
    )
    front_matter: list[Chapter] = Field(
        default_factory=list, description="Páginas iniciais (dedicatória, prefácio, etc.)"
    )
    back_matter: list[Chapter] = Field(
        default_factory=list, description="Páginas finais (índice, agradecimentos, etc.)"
    )
    metadata: dict[str, Any] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    @property
    def all_sections(self) -> list[Chapter]:
        """Retorna todas as seções na ordem correta."""
        return self.front_matter + self.chapters + self.back_matter

    @property
    def total_word_count(self) -> int:
        """Retorna a contagem total de palavras."""
        return sum(c.word_count for c in self.all_sections)

    @classmethod
    def from_directory(
        cls,
        directory: Path | str,
        title: str = "Livro sem título",
        author: str = "Autor desconhecido",
        pattern: str = "*.md",
    ) -> "Manuscript":
        """Cria um manuscrito a partir de um diretório de capítulos."""
        directory = Path(directory)
        chapters = []
        front_matter = []
        back_matter = []

        # Coleta todos os arquivos Markdown
        md_files = sorted(directory.glob(pattern))

        for filepath in md_files:
            try:
                chapter = Chapter.from_file(filepath)

                # Classifica baseado no número do capítulo
                if chapter.number == 0:
                    # Verifica se é front matter ou back matter
                    if "front" in filepath.name.lower() or "intro" in filepath.name.lower():
                        front_matter.append(chapter)
                    elif "back" in filepath.name.lower() or "index" in filepath.name.lower():
                        back_matter.append(chapter)
                    else:
                        front_matter.append(chapter)  # Default para front matter
                elif chapter.number < 0:
                    back_matter.append(chapter)
                else:
                    chapters.append(chapter)
            except Exception as e:
                print(f"Aviso: Não foi possível carregar {filepath}: {e}")

        # Ordena capítulos por número
        chapters.sort(key=lambda c: c.number)
        front_matter.sort(key=lambda c: c.number if c.number > 0 else 0)
        back_matter.sort(key=lambda c: abs(c.number) if c.number < 0 else 0)

        return cls(
            title=title,
            author=author,
            chapters=chapters,
            front_matter=front_matter,
            back_matter=back_matter,
        )

    def add_chapter(self, chapter: Chapter, position: int | None = None) -> None:
        """Adiciona um capítulo ao manuscrito."""
        if position is not None:
            self.chapters.insert(position, chapter)
        else:
            self.chapters.append(chapter)
        self.updated_at = datetime.now()

    def remove_chapter(self, chapter_number: int) -> Chapter | None:
        """Remove um capítulo do manuscrito."""
        for i, chapter in enumerate(self.chapters):
            if chapter.number == chapter_number:
                self.updated_at = datetime.now()
                return self.chapters.pop(i)
        return None

    def to_markdown(self, include_frontmatter: bool = True) -> str:
        """Converte todo o manuscrito para um único documento Markdown."""
        parts = []

        # Título e autor
        parts.append(f"# {self.title}")
        parts.append(f"\n## {self.author}\n")

        # Front matter
        for section in self.front_matter:
            parts.append(section.to_markdown(include_frontmatter))

        # Capítulos
        for chapter in self.chapters:
            parts.append(chapter.to_markdown(include_frontmatter))

        # Back matter
        for section in self.back_matter:
            parts.append(section.to_markdown(include_frontmatter))

        return "\n\n---\n\n".join(parts)

    def save(self, filepath: Path | str) -> None:
        """Salva o manuscrito completo em um arquivo."""
        filepath = Path(filepath)
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(self.to_markdown())

    def generate_toc(self) -> str:
        """Gera um sumário (Table of Contents) em Markdown."""
        lines = ["## Sumário\n"]

        # Front matter
        for i, section in enumerate(self.front_matter, 1):
            lines.append(f"- {section.title}")

        # Capítulos
        for chapter in self.chapters:
            lines.append(f"- [ ] {chapter.number}. {chapter.title}")

        # Back matter
        for section in self.back_matter:
            lines.append(f"- {section.title}")

        return "\n".join(lines)

    def get_stats(self) -> dict[str, Any]:
        """Retorna estatísticas do manuscrito."""
        return {
            "title": self.title,
            "author": self.author,
            "total_chapters": len(self.chapters),
            "total_sections": len(self.all_sections),
            "total_words": self.total_word_count,
            "front_matter_count": len(self.front_matter),
            "back_matter_count": len(self.back_matter),
            "chapters": [
                {
                    "number": c.number,
                    "title": c.title,
                    "words": c.word_count,
                    "tags": c.tags,
                }
                for c in self.chapters
            ],
        }