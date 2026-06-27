from pathlib import Path

import pytest
from pydantic import ValidationError

from editora.config import BookMetadata, EditorConfig, OutputConfig, TypesettingConfig


# BookMetadata Tests
def test_book_metadata_valid():
    book = BookMetadata(title="My Book", author="John Doe")
    assert book.title == "My Book"
    assert book.author == "John Doe"
    assert book.language == "pt-BR"  # default


def test_book_metadata_missing_required():
    with pytest.raises(ValidationError):
        BookMetadata(title="My Book")


# TypesettingConfig Tests
def test_typesetting_config_defaults():
    config = TypesettingConfig()
    assert config.font_family == "Georgia"
    assert config.margins["top"] == "2cm"


def test_typesetting_config_font_family_validation():
    # Valid
    TypesettingConfig(font_family="Times New Roman")
    TypesettingConfig(font_family="Arial-Bold")

    # Invalid
    with pytest.raises(ValidationError):
        TypesettingConfig(font_family="-Invalid")


def test_typesetting_config_margins_validation():
    # Valid
    TypesettingConfig(margins={"top": "1in", "bottom": "1.5cm"})

    # Invalid
    with pytest.raises(ValidationError):
        TypesettingConfig(margins={"top": "100"})  # missing unit


def test_typesetting_config_valid_margins():
    """Testa que margens válidas são aceitas pela configuração."""
    valid_margins = {
        "top": "2cm",
        "bottom": "0.5in",
        "inner": ".75in",
        "outer": "12pt",
        "custom1": "1em",
        "custom2": "2ex",
        "custom3": "1pc",
        "custom4": "10mm",
    }

    config = TypesettingConfig(margins=valid_margins)
    assert config.margins == valid_margins


def test_typesetting_config_invalid_margins():
    """Testa que margens inválidas lançam erro de validação."""
    invalid_cases = [
        {"top": "2"},  # Missing unit
        {"top": "2px"},  # Invalid unit
        {"top": "twocm"},  # Non-numeric value
        {"top": "2 cm"},  # Space between number and unit
        {"top": "cm"},  # Missing number
    ]

    for invalid_margin in invalid_cases:
        with pytest.raises(ValidationError) as exc_info:
            TypesettingConfig(margins=invalid_margin)

        # Verify it's a value_error and mentions the invalid margin
        error_msg = str(exc_info.value)
        assert "Margem inválida para 'top'" in error_msg


def test_typesetting_config_template_validation():
    # Valid
    TypesettingConfig(template="my_template.tex")
    TypesettingConfig(template="./templates/custom.html")

    # Invalid (starts with hyphen)
    with pytest.raises(ValidationError):
        TypesettingConfig(template="-malicious_flag")


# OutputConfig Tests
def test_output_config_defaults():
    config = OutputConfig()
    assert config.output_dir == Path("output")
    assert config.kdp_compliant is True


# EditorConfig Tests
def test_editor_config_valid():
    config = EditorConfig(book={"title": "Test Book", "author": "Tester"})
    assert config.book.title == "Test Book"
    assert config.project_dir == Path(".")


def test_editor_config_env_vars(monkeypatch):
    monkeypatch.setenv("EDITORA_PROJECT_DIR", "/tmp/project")
    monkeypatch.setenv("EDITORA_CHAPTERS_DIR", "/tmp/chapters")
    monkeypatch.setenv("EDITORA_ASSETS_DIR", "/tmp/assets")

    config = EditorConfig(book={"title": "Test", "author": "Test"})
    assert config.project_dir == Path("/tmp/project")
    assert config.chapters_dir == Path("/tmp/chapters")
    assert config.assets_dir == Path("/tmp/assets")


def test_editor_config_load_defaults():
    config = EditorConfig.load(config_path="nonexistent.yaml")
    assert config.book.title == "Meu Livro"
    assert config.book.author == "Autor Desconhecido"


def test_editor_config_save_and_load(tmp_path):
    config_file = tmp_path / "test_editora.yaml"
    config = EditorConfig(
        book=BookMetadata(title="Saved Book", author="Author Name"), project_dir=Path("/custom/dir")
    )

    # Save
    config.save(config_file)
    assert config_file.exists()

    # Load
    loaded_config = EditorConfig.load(config_file)
    assert loaded_config.book.title == "Saved Book"
    assert loaded_config.project_dir == Path("/custom/dir")
