from editora.utils.helpers import (
    count_pages,
    estimate_reading_time,
    extract_first_heading,
    format_word_count,
    get_markdown_sections,
    sanitize_filename,
    split_into_paragraphs,
    truncate_text,
    word_count,
)


# get_markdown_sections tests
def test_get_markdown_sections_empty():
    assert get_markdown_sections("") == []

def test_get_markdown_sections_no_headings():
    assert get_markdown_sections("Just some text\nNo headings here.") == []

def test_get_markdown_sections_simple():
    md = "# Title\nContent"
    expected = [
        {"level": 1, "title": "Title", "content": "Content"}
    ]
    assert get_markdown_sections(md) == expected

def test_get_markdown_sections_multiple_same_level():
    md = "# Section 1\nContent 1\n# Section 2\nContent 2"
    expected = [
        {"level": 1, "title": "Section 1", "content": "Content 1"},
        {"level": 1, "title": "Section 2", "content": "Content 2"}
    ]
    assert get_markdown_sections(md) == expected

def test_get_markdown_sections_nested():
    md = "# Section 1\nContent 1\n## Sub 1.1\nContent 1.1\n# Section 2\nContent 2"
    expected = [
        {"level": 1, "title": "Section 1", "content": "Content 1"},
        {"level": 2, "title": "Sub 1.1", "content": "Content 1.1"},
        {"level": 1, "title": "Section 2", "content": "Content 2"}
    ]
    assert get_markdown_sections(md) == expected

def test_get_markdown_sections_all_levels():
    md = """
# H1
## H2
### H3
#### H4
##### H5
###### H6
"""
    sections = get_markdown_sections(md)
    assert len(sections) == 6
    for i, s in enumerate(sections):
        assert s["level"] == i + 1
        assert s["title"] == f"H{i+1}"

def test_get_markdown_sections_text_before_heading():
    md = "Introduction text\n# Title\nContent"
    expected = [
        {"level": 1, "title": "Title", "content": "Content"}
    ]
    assert get_markdown_sections(md) == expected

# word_count tests
def test_word_count_empty():
    assert word_count("") == 0
    assert word_count("   ") == 0

def test_word_count_basic():
    assert word_count("Olá mundo") == 2
    assert word_count("Este é um teste.") == 4

def test_word_count_markdown_removal():
    md = "# Título\n**Negrito** e *itálico*. [Link](http://example.com)"
    # "# Título" -> "Título" (1 word)
    # "**Negrito**" -> "Negrito" (1 word)
    # "e" -> (1 word)
    # "*itálico*." -> "itálico." (1 word)
    # "[Link](...)" -> "Link" (1 word)
    # Total: 5 words
    assert word_count(md) == 5

# format_word_count tests
def test_format_word_count_pt():
    assert format_word_count(1) == "1 palavra"
    assert format_word_count(1000) == "1.000 palavras"
    assert format_word_count(1500, locale="pt-BR") == "1.500 palavras"

def test_format_word_count_en():
    assert format_word_count(1000, locale="en-US") == "1,000 words"

# sanitize_filename tests
def test_sanitize_filename_basic():
    assert sanitize_filename("Arquivo Teste.txt") == "Arquivo_Teste.txt"
    assert sanitize_filename("Título com acentuação.md") == "Titulo_com_acentuacao.md"

def test_sanitize_filename_special_chars():
    assert sanitize_filename("test/file:name*.txt") == "test_file_name_.txt"

def test_sanitize_filename_empty():
    assert sanitize_filename("") == "arquivo"

# truncate_text tests
def test_truncate_text_no_truncation():
    text = "Short text"
    assert truncate_text(text, 20) == text

def test_truncate_text_with_truncation():
    text = "This is a long text that needs truncation"
    # "This is a long..." (15 chars)
    truncated = truncate_text(text, 15)
    assert truncated == "This is a..."
    assert len(truncated) <= 15

# extract_first_heading tests
def test_extract_first_heading():
    assert extract_first_heading("# My Title\nSome content") == "My Title"
    assert extract_first_heading("Text before\n# My Title") == "My Title"
    assert extract_first_heading("No heading here") is None

# estimate_reading_time tests
def test_estimate_reading_time():
    assert estimate_reading_time(0) == "0 min"
    assert estimate_reading_time(100) == "< 1 min"
    assert estimate_reading_time(500, wpm=250) == "2 min"
    assert estimate_reading_time(15000, wpm=250) == "1h"
    assert estimate_reading_time(16000, wpm=250) == "1h 4 min"

# split_into_paragraphs tests
def test_split_into_paragraphs():
    text = "Para 1\n\nPara 2\n\n\nPara 3"
    assert split_into_paragraphs(text) == ["Para 1", "Para 2", "Para 3"]

# count_pages tests
def test_count_pages():
    assert count_pages(0) == 0
    assert count_pages(300) == 1
    assert count_pages(301) == 2
    assert count_pages(600) == 2

# create_version_backup tests
import pytest
from editora.utils.helpers import create_version_backup

def test_create_version_backup_with_version_name(tmp_path):
    # Setup
    source_file = tmp_path / "test_file.txt"
    source_file.write_text("content")
    version_dir = tmp_path / "backups"

    # Execute
    backup_path = create_version_backup(
        filepath=source_file,
        version_dir=version_dir,
        version_name="v1"
    )

    # Assert
    assert backup_path.exists()
    assert backup_path.parent == version_dir
    assert backup_path.name == "test_file_v1.txt"
    assert backup_path.read_text() == "content"

def test_create_version_backup_without_version_name(tmp_path):
    # Setup
    source_file = tmp_path / "doc.md"
    source_file.write_text("markdown content")
    version_dir = tmp_path / "versions"

    # Execute
    backup_path = create_version_backup(
        filepath=source_file,
        version_dir=version_dir
    )

    # Assert
    assert backup_path.exists()
    assert backup_path.parent == version_dir
    # Check that the file was copied correctly
    assert backup_path.read_text() == "markdown content"

    # Check filename format: doc_YYYYMMDD_HHMMSS.md
    import re
    assert re.match(r"^doc_\d{8}_\d{6}\.md$", backup_path.name)

def test_create_version_backup_no_extension(tmp_path):
    # Setup
    source_file = tmp_path / "README"
    source_file.write_text("readme content")
    version_dir = tmp_path / "backups"

    # Execute
    backup_path = create_version_backup(
        filepath=source_file,
        version_dir=version_dir,
        version_name="final"
    )

    # Assert
    assert backup_path.exists()
    assert backup_path.name == "README_final"
    assert backup_path.read_text() == "readme content"
