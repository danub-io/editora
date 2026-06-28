import os
import pytest
from pathlib import Path
from pydantic import ValidationError
from editora.config import BookMetadata, TypesettingConfig, OutputConfig, EditorConfig

# BookMetadata Tests
def test_book_metadata_valid():
    book = BookMetadata(title="My Book", author="John Doe")
    assert book.title == "My Book"
    assert book.author == "John Doe"
    assert book.language == "pt-BR" # default

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
        TypesettingConfig(margins={"top": "100"}) # missing unit

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
        book=BookMetadata(title="Saved Book", author="Author Name"),
        project_dir=Path("/custom/dir")
    )

    # Save
    config.save(config_file)
    assert config_file.exists()

    # Load
    loaded_config = EditorConfig.load(config_file)
    assert loaded_config.book.title == "Saved Book"
    assert loaded_config.project_dir == Path("/custom/dir")

def test_editor_config_missing_required():
    with pytest.raises(ValidationError):
        EditorConfig()

def test_editor_config_invalid_types():
    with pytest.raises(ValidationError):
        EditorConfig(
            book={"title": "Test Book", "author": "Tester"},
            project_dir=123  # Invalid type, should be Path or string
        )

def test_editor_config_load_no_args(monkeypatch, tmp_path):
    # Change current working directory to a tmp path so we don't accidentally find editora.yaml
    monkeypatch.chdir(tmp_path)
    config = EditorConfig.load()
    assert config.book.title == "Meu Livro"
    assert config.book.author == "Autor Desconhecido"
