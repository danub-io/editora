"""Módulo de Typesetting - Conversão Markdown → PDF/EPUB."""

import subprocess
from pathlib import Path
from typing import Literal

from ...config import TypesettingConfig

# Page size mappings
PAGE_SIZES = {
    "A5": "a5paper",
    "6x9": "6in x 9in",
    "5x8": "5in x 8in",
    "5.5x8.5": "5.5in x 8.5in",
}

# KDP compliant settings
KDP_SETTINGS = {
    "6x9": {
        "margins": {"top": "2cm", "bottom": "2cm", "inner": "2.5cm", "outer": "2cm"},
        "bleed": False,
    },
    "5x8": {
        "margins": {"top": "2cm", "bottom": "2cm", "inner": "2.3cm", "outer": "1.8cm"},
        "bleed": False,
    },
    "5.5x8.5": {
        "margins": {"top": "2cm", "bottom": "2cm", "inner": "2.4cm", "outer": "1.9cm"},
        "bleed": False,
    },
}


class Typesetter:
    """Responsável pela conversão e diagramação de manuscritos."""

    def __init__(self, config: TypesettingConfig | None = None):
        """Inicializa o typesetter com configurações."""
        self.config = config or TypesettingConfig()
        self._check_pandoc()

    def _check_pandoc(self) -> None:
        """Verifica se o Pandoc está instalado."""
        try:
            subprocess.run(
                ["pandoc", "--version"],
                capture_output=True,
                check=True,
            )
        except (subprocess.CalledProcessError, FileNotFoundError):
            raise RuntimeError(
                "Pandoc não encontrado. Instale com: "
                "sudo apt install pandoc (Linux) ou "
                "brew install pandoc (macOS) ou "
                "baixe de https://pandoc.org/installing.html"
            )

    def _check_latex(self) -> bool:
        """Verifica se o LaTeX está instalado."""
        try:
            subprocess.run(
                ["pdflatex", "--version"],
                capture_output=True,
                check=True,
            )
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            return False

    def _get_latex_engine(self) -> str:
        """Retorna o motor LaTeX disponível."""
        if self._check_latex():
            return "pdflatex"
        # Tenta xelatex
        try:
            subprocess.run(["xelatex", "--version"], capture_output=True, check=True)
            return "xelatex"
        except (subprocess.CalledProcessError, FileNotFoundError):
            pass
        # Tenta lualatex
        try:
            subprocess.run(["lualatex", "--version"], capture_output=True, check=True)
            return "lualatex"
        except (subprocess.CalledProcessError, FileNotFoundError):
            pass

        return "pdflatex"  # Default, pode falhar

    def _build_pandoc_args(
        self,
        input_file: Path,
        output_file: Path,
        to_format: str,
        metadata: dict | None = None,
    ) -> list[str]:
        """Constrói os argumentos para o Pandoc."""
        args = [
            "pandoc",
            str(input_file),
            "-o",
            str(output_file),
            "-f",
            "markdown",
            "-t",
            to_format,
            "--standalone",
            "--toc" if self.config.include_toc else "--no-toc",
            "--toc-depth=2",
            "--number-sections",
            "--metadata",
            f"lang={self.config if hasattr(self.config, 'language') else 'pt-BR'}",
        ]

        # Configurações específicas para PDF
        if to_format == "pdf":
            engine = self._get_latex_engine()
            args.extend([
                "--pdf-engine",
                engine,
            ])

            # Page size
            page_size = PAGE_SIZES.get(self.config.page_size, PAGE_SIZES["6x9"])
            args.extend([
                "--variable",
                f"papersize={page_size}",
            ])

            # Font settings
            args.extend([
                "--variable",
                f"mainfont={self.config.font_family}",
                "--variable",
                f"fontsize={self.config.font_size}pt",
                "--variable",
                f"linestretch={self.config.line_height}",
            ])

            # Margins
            margins = self.config.margins
            args.extend([
                "--variable",
                f"margin-top={margins.get('top', '2cm')}",
                "--variable",
                f"margin-bottom={margins.get('bottom', '2cm')}",
                "--variable",
                f"margin-inner={margins.get('inner', '2.5cm')}",
                "--variable",
                f"margin-outer={margins.get('outer', '2cm')}",
            ])

            # Header font size
            args.extend([
                "--variable",
                "secnumdepth=2",
            ])

        # Configurações específicas para EPUB
        elif to_format == "epub":
            args.extend([
                "--epub-chapter-level=1",
            ])

        # Metadata adicional
        if metadata:
            for key, value in metadata.items():
                if isinstance(value, list):
                    for v in value:
                        args.extend(["--metadata", f"{key}={v}"])
                else:
                    args.extend(["--metadata", f"{key}={value}"])

        # Template customizado
        if self.config.template:
            args.extend(["--template", str(self.config.template)])

        return args

    def convert_to_pdf(
        self,
        markdown_content: str,
        output_path: Path | str,
        metadata: dict | None = None,
    ) -> Path:
        """Converte conteúdo Markdown para PDF."""
        import tempfile

        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Cria arquivo temporário para o Markdown
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".md", delete=False, encoding="utf-8"
        ) as f:
            f.write(markdown_content)
            temp_input = Path(f.name)

        try:
            args = self._build_pandoc_args(
                temp_input, output_path, "pdf", metadata
            )

            result = subprocess.run(
                args,
                capture_output=True,
                text=True,
                check=False,
            )

            if result.returncode != 0:
                raise RuntimeError(f"Erro ao converter para PDF: {result.stderr}")

            return output_path

        finally:
            temp_input.unlink(missing_ok=True)

    def convert_to_epub(
        self,
        markdown_content: str,
        output_path: Path | str,
        metadata: dict | None = None,
    ) -> Path:
        """Converte conteúdo Markdown para EPUB."""
        import tempfile

        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Cria arquivo temporário para o Markdown
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".md", delete=False, encoding="utf-8"
        ) as f:
            f.write(markdown_content)
            temp_input = Path(f.name)

        try:
            args = self._build_pandoc_args(
                temp_input, output_path, "epub", metadata
            )

            result = subprocess.run(
                args,
                capture_output=True,
                text=True,
                check=False,
            )

            if result.returncode != 0:
                raise RuntimeError(f"Erro ao converter para EPUB: {result.stderr}")

            return output_path

        finally:
            temp_input.unlink(missing_ok=True)

    def convert(
        self,
        markdown_content: str,
        output_dir: Path | str,
        filename_base: str = "livro",
        formats: list[Literal["pdf", "epub"]] | Literal["pdf", "epub", "both"] = "both",
        metadata: dict | None = None,
    ) -> dict[str, Path]:
        """Converte para os formatos especificados.

        Returns:
            Dicionário com os paths dos arquivos gerados.
        """
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

        if formats == "both":
            formats = ["pdf", "epub"]
        elif isinstance(formats, str):
            formats = [formats]

        results = {}

        if "pdf" in formats:
            pdf_path = output_dir / f"{filename_base}.pdf"
            results["pdf"] = self.convert_to_pdf(markdown_content, pdf_path, metadata)

        if "epub" in formats:
            epub_path = output_dir / f"{filename_base}.epub"
            results["epub"] = self.convert_to_epub(markdown_content, epub_path, metadata)

        return results

    def validate_kdp_compliance(self, pdf_path: Path | str) -> dict[str, any]:
        """Valida se o PDF está compatível com KDP."""
        pdf_path = Path(pdf_path)

        if not pdf_path.exists():
            return {"valid": False, "errors": ["PDF não encontrado"]}

        # Verificações básicas
        errors = []
        warnings = []

        # Tamanho do arquivo (KDP aceita até 650MB, mas na prática é menos)
        file_size_mb = pdf_path.stat().st_size / (1024 * 1024)
        if file_size_mb > 650:
            errors.append(f"Arquivo muito grande: {file_size_mb:.1f}MB (máx: 650MB)")

        # Tenta extrair informações do PDF com pdfinfo (se disponível)
        try:
            result = subprocess.run(
                ["pdfinfo", str(pdf_path)],
                capture_output=True,
                text=True,
                check=False,
            )
            if result.returncode == 0:
                info = result.stdout

                # Verifica página única (não é requisito, mas é bom saber)
                if "Pages:" in info:
                    pages = int(info.split("Pages:")[1].strip().split()[0])
                    if pages < 24:
                        warnings.append(
                            f"Livro com {pages} páginas. KDP requer mínimo de 24 páginas."
                        )

                # Verifica tamanho da página
                if "Page size:" in info:
                    size_line = info.split("Page size:")[1].strip().split("\n")[0]
                    # Extrai dimensões
                    size_parts = size_line.split("x")
                    if len(size_parts) == 2:
                        width = float(size_parts[0].strip().split()[0])
                        height = float(size_parts[1].strip().split()[0])

                        # Verifica se está nos tamanhos aceitos pelo KDP
                        valid_sizes = [
                            (5 * 72, 8 * 72),
                            (5.5 * 72, 8.5 * 72),
                            (6 * 72, 9 * 72),
                        ]
                        is_valid = any(
                            abs(width - w) < 5 and abs(height - h) < 5
                            for w, h in valid_sizes
                        )
                        if not is_valid:
                            warnings.append(
                                f"Tamanho da página ({width:.0f}x{height:.0f}pt) "
                                "pode não ser padrão KDP."
                            )
        except FileNotFoundError:
            warnings.append("pdfinfo não disponível - validação limitada")

        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "warnings": warnings,
            "file_size_mb": round(file_size_mb, 2),
        }

    def create_sample_template(self, output_path: Path | str, template_type: str = "latex") -> Path:
        """Cria um template de exemplo."""
        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        if template_type == "latex":
            template_content = self._latex_template()
            output_path = output_path.with_suffix(".latex")
        elif template_type == "typst":
            template_content = self._typst_template()
            output_path = output_path.with_suffix(".typ")
        else:
            raise ValueError(f"Tipo de template não suportado: {template_type}")

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(template_content)

        return output_path

    def _latex_template(self) -> str:
        """Template LaTeX para livros."""
        return r"""% Template LaTeX para Editora
% Use com: pandoc input.md -o output.pdf --template=template.latex

\documentclass[$if(papersize)$$papersize$,$endif$$if(fontsize)$$fontsize$pt,$endif$twoside,openany]{book}

% Pacotes essenciais
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[brazil]{babel}
\usepackage{hyperref}
\usepackage{graphicx}
\usepackage{fancyhdr}
\usepackage{titlesec}
\usepackage{geometry}

% Configurações de página
\geometry{
  $if(margin-top)$top=$margin-top$,$endif$
  $if(margin-bottom)$bottom=$margin-bottom$,$endif$
  $if(margin-inner)$inner=$margin-inner$,$endif$
  $if(margin-outer)$outer=$margin-outer$,$endif$
}

% Configurações de fonte
$if(mainfont)$\usepackage{$mainfont$}$endif$

% Configurações de cabeçalho/rodapé
\pagestyle{fancy}
\fancyhf{}
\fancyhead[LE,RO]{\thepage}
\fancyhead[LO]{\rightmark}
\fancyhead[RE]{\leftmark}
\renewcommand{\headrulewidth}{0.4pt}

% Formatação de títulos
\titleformat{\chapter}[display]
  {\normalfont\huge\bfseries}{\chaptertitlename\ \thechapter}{20pt}{\Huge}
\titlespacing*{\chapter}{0pt}{40pt}{40pt}

% Hyperref
\hypersetup{
  colorlinks=true,
  linkcolor=black,
  filecolor=magenta,
  urlcolor=cyan,
  pdfauthor={$if(author)$$author$$endif$},
  pdftitle={$if(title)$$title$$endif$},
}

% Início do documento
\begin{document}

$if(title)$
\begin{titlepage}
  \centering
  {\Huge\bfseries $title$\par}
  \vspace{2cm}
  {\Large $author$\par}
  \vfill
  {\small $if(copyright)$\copyright\ $copyright$\par$endif$}
\end{titlepage}
$endif$

$if(toc)$
\tableofcontents
\newpage
$endif$

$body$

\end{document}
"""

    def _typst_template(self) -> str:
        """Template Typst para livros."""
        return """// Template Typst para Editora
// Use com: pandoc input.md -o output.pdf --template=template.typ

#set document(
  title: $if(title)$$title$$endif$,
  author: $if(author)$$author$$endif$,
  lang: $if(lang)$$lang$$endif$,
)

#set page(
$if(papersize)$  paper: "$papersize$",
$endif$$if(margin-top)$  margin: (
    top: "$margin-top$",
    bottom: "$margin-bottom$",
    left: "$margin-inner$",
    right: "$margin-outer$",
  ),
$endif$$if(fontsize)$  font-size: $fontsize$pt,
$endif$)

#set text(
$if(mainfont)$  font: "$mainfont$",
$endif$)

#set heading(numbering: "1.")

// Cabeçalho e rodapé
#show: columns.with(columns: 1)
#show: outline

// Conteúdo
$body$
"""
