"""CLI principal da Editora - Interface de linha de comando."""

import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

import typer
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table

from . import __version__
from .config import EditorConfig, LLMConfig, TypesettingConfig
from .core.manuscript import Chapter, Manuscript
from .typesetting.converter import Typesetter

# Importações condicionais dos módulos de IA
try:
    from .ai.editing import TextEditor
    AI_AVAILABLE = True
except ImportError:
    AI_AVAILABLE = False

try:
    from .ai.proofreading import Proofreader
    PROOFREADER_AVAILABLE = True
except ImportError:
    PROOFREADER_AVAILABLE = False

try:
    from .ai.consistency import ConsistencyChecker
    CONSISTENCY_AVAILABLE = True
except ImportError:
    CONSISTENCY_AVAILABLE = False

app = typer.Typer(
    name="editora",
    help="Editora pessoal automatizada com IA para produção de livros profissionais.",
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
    output_dir: Path = typer.Option(
        Path("."), "--output", "-o", help="Diretório de saída."
    ),
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

# Revisar consistência
editora consistency

# Editar capítulos
editora edit --all
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

    console.print(Panel.fit(
        f"[bold green]✅ Projeto '{title}' inicializado com sucesso![/bold green]\n\n"
        f"📁 Diretório: {output_dir.absolute()}\n"
        f"📝 Capítulos em: {chapters_dir}\n"
        f"⚙️  Config em: {config_path}\n\n"
        f"[dim]Use 'cd {output_dir} && editora build' para compilar.[/dim]"
    ))


@app.command("build")
def build_book(
    input_dir: Path = typer.Option(
        Path("."), "--input", "-i", help="Diretório do projeto."
    ),
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
        console.print("[red]❌ Nenhum capítulo Markdown encontrado em {}.[/red]".format(chapters_dir))
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
    input_dir: Path = typer.Option(
        Path("."), "--input", "-i", help="Diretório do projeto."
    ),
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


@app.command("edit")
def edit_chapters(
    input_dir: Path = typer.Option(
        Path("."), "--input", "-i", help="Diretório do projeto."
    ),
    chapter: Optional[int] = typer.Option(
        None, "--chapter", "-c", help="Número do capítulo (padrão: todos)."
    ),
    mode: str = typer.Option(
        "light", "--mode", "-m",
        help="Modo de edição: light, medium, aggressive."
    ),
    preview: bool = typer.Option(
        False, "--preview", "-p", help="Apenas mostra preview das mudanças."
    ),
):
    """Edita capítulos usando IA."""
    if not AI_AVAILABLE:
        console.print("[red]❌ Módulos de IA não disponíveis. Instale as dependências.[/red]")
        raise typer.Exit(1)

    config = EditorConfig.load(input_dir / "editora.yaml")
    chapters_dir = input_dir / config.chapters_dir

    # Carrega capítulos
    if chapter is not None:
        chapter_file = chapters_dir / f"{chapter:02d}-*.md"
        files = sorted(chapters_dir.glob(f"{chapter:02d}-*.md"))
        if not files:
            console.print(f"[red]❌ Capítulo {chapter} não encontrado.[/red]")
            raise typer.Exit(1)
    else:
        files = sorted(chapters_dir.glob("*.md"))

    editor = TextEditor(
        llm_config=config.llm,
        editing_config=config.editing,
    )

    for filepath in files:
        console.print(f"\n[blue]📝 Editando: {filepath.name}[/blue]")

        chapter = Chapter.from_file(filepath)
        result = editor.edit_chapter(
            chapter.content,
            chapter.title,
            mode=mode,  # type: ignore
        )

        change_pct = result.get("change_percent", 0)
        console.print(f"   Mudanças: {change_pct:.1f}%")

        if result.get("summary"):
            console.print(f"   Resumo: {result['summary'][:100]}...")

        if preview:
            # Mostra diff
            if result.get("changes"):
                console.print("\n   [yellow]Mudanças sugeridas:[/yellow]")
                for change in result["changes"][:5]:
                    console.print(
                        f"   • {change.get('original', '')} → {change.get('edited', '')}"
                    )
                    if change.get("reason"):
                        console.print(f"     ({change['reason']})")
        else:
            # Aplica mudanças
            if change_pct > 0:
                chapter.content = result["edited_text"]
                chapter.save(filepath)
                console.print("   [green]✅ Capítulo atualizado.[/green]")


@app.command("proofread")
def proofread_chapters(
    input_dir: Path = typer.Option(
        Path("."), "--input", "-i", help="Diretório do projeto."
    ),
    chapter: Optional[int] = typer.Option(
        None, "--chapter", "-c", help="Número do capítulo (padrão: todos)."
    ),
    output_report: bool = typer.Option(
        False, "--report", "-r", help="Gera relatório em arquivo."
    ),
):
    """Revisa gramática e ortografia."""
    if not PROOFREADER_AVAILABLE:
        console.print("[red]❌ Módulo de proofreading não disponível.[/red]")
        raise typer.Exit(1)

    config = EditorConfig.load(input_dir / "editora.yaml")
    chapters_dir = input_dir / config.chapters_dir

    proofreader = Proofreader(llm_config=config.llm)

    if chapter is not None:
        files = sorted(chapters_dir.glob(f"{chapter:02d}-*.md"))
    else:
        files = sorted(chapters_dir.glob("*.md"))

    total_errors = 0

    for filepath in files:
        chapter = Chapter.from_file(filepath)
        result = proofreader.proofread_chapter(chapter.content, chapter.title)

        errors = result.get("error_count", 0)
        total_errors += errors

        if errors > 0:
            console.print(f"[yellow]⚠️  {filepath.name}: {errors} erros[/yellow]")
        else:
            console.print(f"[green]✅ {filepath.name}: sem erros[/green]")

    console.print(f"\n[bold]Total de erros: {total_errors}[/bold]")

    if output_report:
        report_path = input_dir / "output" / "proofreading_report.txt"
        report_path.parent.mkdir(exist_ok=True)
        with open(report_path, "w", encoding="utf-8") as f:
            for filepath in files:
                chapter = Chapter.from_file(filepath)
                result = proofreader.proofread_chapter(chapter.content, chapter.title)
                f.write(proofreader.generate_proofreading_report(
                    chapter.content, chapter.title
                ))
                f.write("\n\n")
        console.print(f"[green]📄 Relatório salvo em: {report_path}[/green]")


@app.command("consistency")
def check_consistency(
    input_dir: Path = typer.Option(
        Path("."), "--input", "-i", help="Diretório do projeto."
    ),
    output_report: bool = typer.Option(
        True, "--report", "-r", help="Gera relatório em arquivo."
    ),
    format: str = typer.Option(
        "markdown", "--format", "-f", help="Formato do relatório: markdown, json."
    ),
):
    """Verifica consistência global do manuscrito."""
    if not CONSISTENCY_AVAILABLE:
        console.print("[red]❌ Módulo de consistência não disponível.[/red]")
        raise typer.Exit(1)

    config = EditorConfig.load(input_dir / "editora.yaml")
    chapters_dir = input_dir / config.chapters_dir

    manuscript = Manuscript.from_directory(
        chapters_dir,
        title=config.book.title,
        author=config.book.author,
    )

    console.print(f"[blue]🔍 Analisando consistência de '{manuscript.title}'...[/blue]")

    checker = ConsistencyChecker(
        llm_config=config.llm,
        consistency_config=config.consistency,
    )

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        task = progress.add_task("Analisando...", total=None)

        report = checker.generate_report(manuscript, format)
        progress.update(task, completed=True)

    console.print(report)

    if output_report:
        report_path = input_dir / "output" / f"consistency_report.{format}"
        report_path.parent.mkdir(exist_ok=True)
        with open(report_path, "w", encoding="utf-8") as f:
            f.write(report)
        console.print(f"\n[green]📄 Relatório salvo em: {report_path}[/green]")


@app.command("template")
def create_template(
    output_path: Path = typer.Option(
        Path("template.latex"), "--output", "-o", help="Arquivo de saída."
    ),
    template_type: str = typer.Option(
        "latex", "--type", "-t", help="Tipo: latex, typst."
    ),
):
    """Cria um template de diagramação."""
    typesetter = Typesetter()
    result = typesetter.create_sample_template(output_path, template_type)
    console.print(f"[green]✅ Template criado: {result}[/green]")


if __name__ == "__main__":
    app()