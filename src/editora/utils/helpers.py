"""Funções utilitárias para a editora."""

import re
import unicodedata
from pathlib import Path
from typing import Any


def word_count(text: str) -> int:
    """Conta palavras em um texto em português.

    Considera palavras como sequências de caracteres alfanuméricos
    separados por espaços ou pontuação.
    """
    if not text or not text.strip():
        return 0

    # Remove marcações Markdown
    text = re.sub(r"#{1,6}\s+", "", text)  # Headers
    text = re.sub(r"\*{1,2}|_{1,2}", "", text)  # Bold/italic
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)  # Links
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)  # Images
    text = re.sub(r"`{1,3}[^`]*`{1,3}", "", text)  # Code
    text = re.sub(r"^>\s+", "", text, flags=re.MULTILINE)  # Blockquotes
    text = re.sub(r"^-+\s*", "", text, flags=re.MULTILINE)  # List items

    # Conta palavras
    words = text.split()
    return len([w for w in words if w.strip()])


def format_word_count(count: int, locale: str = "pt-BR") -> str:
    """Formata contagem de palavras de forma legível.

    Exemplos:
        1 -> "1 palavra"
        1000 -> "1.000 palavras"
        1500 -> "1.500 palavras"
    """
    if count == 1:
        return "1 palavra"

    if locale.startswith("pt"):
        # Português: usa ponto como separador de milhar
        formatted = f"{count:,}".replace(",", ".")
        return f"{formatted} palavras"
    else:
        # Inglês: usa vírgula como separador de milhar
        formatted = f"{count:,}"
        return f"{formatted} words"


def sanitize_filename(filename: str, replacement: str = "_") -> str:
    """Sanitiza um nome de arquivo para ser seguro em todos os sistemas.

    Remove ou substitui caracteres especiais, acentos e caracteres
    não permitidos em nomes de arquivo.
    """
    # Normaliza unicode (remove acentos)
    filename = unicodedata.normalize("NFKD", filename)
    filename = filename.encode("ascii", "ignore").decode("ascii")

    # Substitui espaços e caracteres problemáticos
    filename = re.sub(r'[ <>:"/\\|?*\x00-\x1F]', replacement, filename)

    # Remove múltiplos caracteres de substituição consecutivos
    filename = re.sub(rf"{re.escape(replacement)}+", replacement, filename)

    # Remove do início e fim
    filename = filename.strip(replacement).strip()

    # Limita tamanho (deixando espaço para extensão)
    max_length = 200
    if len(filename) > max_length:
        # Tenta preservar a extensão
        parts = filename.rsplit(".", 1)
        if len(parts) == 2:
            name, ext = parts
            max_name = max_length - len(ext) - 1
            filename = name[:max_name] + "." + ext
        else:
            filename = filename[:max_length]

    return filename or "arquivo"


def truncate_text(text: str, max_length: int = 100, suffix: str = "...") -> str:
    """Trunca texto mantendo palavras completas."""
    if len(text) <= max_length:
        return text

    # Encontra o último espaço antes do limite
    truncated = text[: max_length - len(suffix)]
    last_space = truncated.rfind(" ")

    if last_space > 0:
        truncated = truncated[:last_space]

    return truncated + suffix


def extract_first_heading(markdown: str) -> str | None:
    """Extrai o primeiro heading (# Título) do Markdown."""
    match = re.search(r"^#+\s+(.+)$", markdown, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return None


def estimate_reading_time(word_count: int, wpm: int = 250) -> str:
    """Estima tempo de leitura baseado em palavras por minuto.

    Args:
        word_count: Número de palavras
        wpm: Palavras por minuto (média: 200-300 para leitura silenciosa)

    Returns:
        String formatada como "X min" ou "Xh Y min"
    """
    if word_count <= 0:
        return "0 min"

    minutes = word_count / wpm

    if minutes < 1:
        return "< 1 min"
    elif minutes < 60:
        return f"{int(minutes)} min"
    else:
        hours = int(minutes // 60)
        remaining_minutes = int(minutes % 60)
        if remaining_minutes == 0:
            return f"{hours}h"
        return f"{hours}h {remaining_minutes} min"


def split_into_paragraphs(text: str) -> list[str]:
    """Divide texto em parágrafos.

    Considera parágrafos como blocos de texto separados por
    uma ou mais linhas em branco.
    """
    paragraphs = re.split(r"\n\s*\n", text.strip())
    return [p.strip() for p in paragraphs if p.strip()]


def create_version_backup(
    filepath: Path,
    version_dir: Path,
    version_name: str | None = None,
) -> Path:
    """Cria backup versionado de um arquivo.

    Returns:
        Path do arquivo de backup criado.
    """
    if not version_name:
        from datetime import datetime

        version_name = datetime.now().strftime("%Y%m%d_%H%M%S")

    version_dir.mkdir(parents=True, exist_ok=True)

    backup_name = f"{filepath.stem}_{version_name}{filepath.suffix}"
    backup_path = version_dir / backup_name

    # Copia o arquivo
    import shutil

    shutil.copy2(filepath, backup_path)

    return backup_path


def get_markdown_sections(markdown: str) -> list[dict[str, Any]]:
    """Extrai seções do Markdown baseado nos headings.

    Returns:
        Lista de dicionários com:
        - level: nível do heading (1-6)
        - title: texto do heading
        - content: conteúdo até o próximo heading do mesmo nível ou superior
    """
    lines = markdown.split("\n")
    sections = []
    current_section = None
    current_content = []

    for line in lines:
        heading_match = re.match(r"^(#{1,6})\s+(.+)$", line)

        if heading_match:
            # Salva seção anterior
            if current_section:
                current_section["content"] = "\n".join(current_content).strip()
                sections.append(current_section)

            level = len(heading_match.group(1))
            title = heading_match.group(2).strip()
            current_section = {"level": level, "title": title, "content": ""}
            current_content = []
        else:
            current_content.append(line)

    # Salva última seção
    if current_section:
        current_section["content"] = "\n".join(current_content).strip()
        sections.append(current_section)

    return sections


def count_pages(word_count: int, words_per_page: int = 300) -> int:
    """Estima número de páginas baseado na contagem de palavras.

    Args:
        word_count: Total de palavras
        words_per_page: Palavras por página (varia com formatação)

    Returns:
        Número estimado de páginas
    """
    if word_count <= 0:
        return 0

    import math

    return math.ceil(word_count / words_per_page)
