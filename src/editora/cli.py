"""CLI principal da Editora - Interface de linha de comando."""

from datetime import datetime
from pathlib import Path
from typing import Optional

import typer
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table

from . import __version__
from .config import EditorConfig
from .core.manuscript import Manuscript
from .typesetting.converter import Typesetter

app = typer.Typer(
    name="editora",
    help="Editora pessoal automatizada para produção de livros profissionais.",
    add_completion=False,
)
console = Console()


def version_callback(value: bool):
    if value:
        console.print(f"[bold blue]Editora[/bold blue] v{__version__}")
        raise typer.Exit()


@app.callback()
def main(
    version: Optional[bool] = typer.Option(
        None,
        "--version",
        "-v",
        callback=version_callback,
        is_eager=True,
        help="Mostra a versão e sai.",
    ),
):
    pass


@app.command("init")
def init_project(
    title: str = typer.Option(..., "--title", "-t", help="Título do livro."),
    author: str = typer.Option(..., "--author", "-a", help="Autor do livro."),
    output_dir: Path = typer.Option(Path("."), "--output", "-o", help="Diretório de saída."),
    language: str = typer.Option("pt-BR", "--language", "-l", help="Idioma do livro."),
):
    """Inicializa um novo projeto de livro."""
    output_dir.mkdir(parents=True, exist_ok=True)

    # Cria estrutura de diretórios
    chapters_dir = output_dir / "chapters"
    assets_dir = output_dir / "assets"
    output_path = output_dir / "output"
    config_path = output_dir / "editora.yaml"

    chapters_dir.mkdir(exist_ok=True)
    assets_dir.mkdir(exist_ok=True)
    output_path.mkdir(exist_ok=True)

    # Cria arquivo de configuração
    config = EditorConfig(
        project_dir=output_dir,
        chapters_dir=chapters_dir,
        assets_dir=assets_dir,
        book={
            "title": title,
            "author": author,
            "language": language,
        },
    )
    config.save(config_path)

    # Cria capítulo de exemplo
    sample_chapter = chapters_dir / "01-primeiro-capitulo.md"
    sample_chapter.write_text(
        """---
title: Primeiro Capítulo
number: 1
tags:
  - introdução
---

# Primeiro Capítulo

Este é o início da sua história. Comece a escrever aqui...

## Cena 1

Desenvolva sua narrativa...
""",
        encoding="utf-8",
    )

    # Cria README do projeto
    readme = output_dir / "README.md"
    readme.write_text(
        f"""# {title}

**Autor:** {author}
**Idioma:** {language}

## Estrutura do Projeto

- `chapters/` - Capítulos do livro (Markdown)
- `assets/` - Imagens e outros recursos
- `output/` - Arquivos gerados (PDF, EPUB)
- `editora.yaml` - Configuração do projeto

## Comandos Úteis

```bash
# Ver informações do projeto
editora info

# Compilar livro
editora build

```

## Estrutura dos Capítulos

Cada capítulo é um arquivo Markdown com frontmatter YAML:

```yaml
---
title: Título do Capítulo
number: 1
tags:
  - tag1
  - tag2
---

# Conteúdo do capítulo
```

---
*Gerado por Editora v{__version__}*
""",
        encoding="utf-8",
    )

    console.print(
        Panel.fit(
            f"[bold green]✅ Projeto '{title}' inicializado com sucesso![/bold green]\n\n"
            f"📁 Diretório: {output_dir.absolute()}\n"
            f"📝 Capítulos em: {chapters_dir}\n"
            f"⚙️  Config em: {config_path}\n\n"
            f"[dim]Use 'cd {output_dir} && editora build' para compilar.[/dim]"
        )
    )


@app.command("build")
def build_book(
    input_dir: Path = typer.Option(Path("."), "--input", "-i", help="Diretório do projeto."),
    output_dir: Optional[Path] = typer.Option(
        None, "--output", "-o", help="Diretório de saída (padrão: input/output)."
    ),
    format: str = typer.Option("both", "--format", "-f", help="Formato: pdf, epub, both."),
    config_file: Optional[Path] = typer.Option(
        None, "--config", "-c", help="Arquivo de configuração."
    ),
):
    """Compila o livro para PDF e/ou EPUB."""
    # Carrega configuração
    if config_file is None:
        config_file = input_dir / "editora.yaml"

    if config_file.exists():
        config = EditorConfig.load(config_file)
    else:
        config = EditorConfig.load()

    chapters_dir = input_dir / config.chapters_dir
    if output_dir is None:
        output_dir = input_dir / config.output.output_dir

    # Verifica se há capítulos
    if not chapters_dir.exists():
        console.print("[red]❌ Diretório de capítulos não encontrado.[/red]")
        raise typer.Exit(1)

    md_files = list(chapters_dir.glob("*.md"))
    if not md_files:
        console.print(
            "[red]❌ Nenhum capítulo Markdown encontrado em {}.[/red]".format(chapters_dir)
        )
        raise typer.Exit(1)

    console.print(f"[blue]📖 Carregando {len(md_files)} capítulos...[/blue]")

    # Carrega manuscrito
    manuscript = Manuscript.from_directory(
        chapters_dir,
        title=config.book.title,
        author=config.book.author,
    )

    console.print(f"   Título: {manuscript.title}")
    console.print(f"   Autor: {manuscript.author}")
    console.print(f"   Capítulos: {len(manuscript.chapters)}")
    console.print(f"   Total de palavras: {manuscript.total_word_count:,}")

    # Converte
    console.print(f"\n[blue]🔧 Convertendo para {format}...[/blue]")

    typesetter = Typesetter(config.typesetting)
    markdown_content = manuscript.to_markdown()

    # Adiciona metadados
    metadata = {
        "title": manuscript.title,
        "author": manuscript.author,
        "language": config.book.language,
        "date": datetime.now().strftime("%Y-%m-%d"),
    }
    if config.book.isbn:
        metadata["isbn"] = config.book.isbn

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        task = progress.add_task("Convertendo...", total=None)

        try:
            results = typesetter.convert(
                markdown_content,
                output_dir,
                filename_base=manuscript.title.replace(" ", "_").lower(),
                formats=format,  # type: ignore
                metadata=metadata,
            )

            progress.update(task, completed=True)

            # Mostra resultados
            console.print("\n[bold green]✅ Conversão concluída![/bold green]\n")

            table = Table(title="Arquivos Gerados")
            table.add_column("Formato", style="cyan")
            table.add_column("Arquivo", style="green")
            table.add_column("Tamanho", style="yellow")

            for fmt, path in results.items():
                size = path.stat().st_size / (1024 * 1024)
                table.add_row(fmt.upper(), str(path.name), f"{size:.2f} MB")

            console.print(table)

            # Validação KDP
            if "pdf" in results and config.output.kdp_compliant:
                console.print("\n[blue]📋 Validando compatibilidade KDP...[/blue]")
                kdp_result = typesetter.validate_kdp_compliance(results["pdf"])

                if kdp_result["valid"]:
                    console.print("[green]✅ PDF compatível com KDP[/green]")
                else:
                    console.print("[yellow]⚠️  Avisos KDP:[/yellow]")
                    for warning in kdp_result.get("warnings", []):
                        console.print(f"   • {warning}")

        except RuntimeError as e:
            console.print(f"[red]❌ Erro na conversão: {e}[/red]")
            raise typer.Exit(1)


@app.command("info")
def show_info(
    input_dir: Path = typer.Option(Path("."), "--input", "-i", help="Diretório do projeto."),
):
    """Mostra informações sobre o projeto."""
    config_file = input_dir / "editora.yaml"

    if config_file.exists():
        config = EditorConfig.load(config_file)
    else:
        config = EditorConfig.load()

    chapters_dir = input_dir / config.chapters_dir

    if chapters_dir.exists():
        manuscript = Manuscript.from_directory(
            chapters_dir,
            title=config.book.title,
            author=config.book.author,
        )

        stats = manuscript.get_stats()

        table = Table(title=f"📖 {config.book.title}")
        table.add_column("Informação", style="cyan")
        table.add_column("Valor", style="green")

        table.add_row("Autor", config.book.author)
        table.add_row("Idioma", config.book.language)
        table.add_row("Capítulos", str(stats["total_chapters"]))
        table.add_row("Seções totais", str(stats["total_sections"]))
        table.add_row("Palavras totais", f"{stats['total_words']:,}")
        table.add_row("Front matter", str(stats["front_matter_count"]))
        table.add_row("Back matter", str(stats["back_matter_count"]))

        console.print(table)

        # Lista de capítulos
        if stats["chapters"]:
            chapters_table = Table(title="Capítulos")
            chapters_table.add_column("#", style="yellow")
            chapters_table.add_column("Título", style="cyan")
            chapters_table.add_column("Palavras", style="green")

            for ch in stats["chapters"]:
                chapters_table.add_row(
                    str(ch["number"]),
                    ch["title"],
                    f"{ch['words']:,}",
                )

            console.print(chapters_table)
    else:
        console.print("[yellow]⚠️  Diretório de capítulos não encontrado.[/yellow]")
        console.print(f"   Esperado em: {chapters_dir}")


@app.command("template")
def create_template(
    output_path: Path = typer.Option(
        Path("template.latex"), "--output", "-o", help="Arquivo de saída."
    ),
    template_type: str = typer.Option("latex", "--type", "-t", help="Tipo: latex, typst."),
):
    """Cria um template de diagramação."""
    typesetter = Typesetter()
    result = typesetter.create_sample_template(output_path, template_type)
    console.print(f"[green]✅ Template criado: {result}[/green]")


if __name__ == "__main__":
    app()
