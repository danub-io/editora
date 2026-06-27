from editora.core.manuscript import Chapter, Manuscript


def test_manuscript_generate_toc_full():
    """Test generating TOC with front matter, chapters, and back matter."""
    ms = Manuscript(
        title="Livro Teste",
        author="Autor Teste",
        front_matter=[
            Chapter(number=0, title="Prefácio", content="Texto do prefácio"),
            Chapter(number=0, title="Introdução", content="Texto da introdução"),
        ],
        chapters=[
            Chapter(number=1, title="O Início", content="Texto cap 1"),
            Chapter(number=2, title="O Meio", content="Texto cap 2"),
        ],
        back_matter=[
            Chapter(number=-1, title="Posfácio", content="Texto do posfácio"),
        ],
    )

    expected = "\n".join(
        [
            "## Sumário\n",
            "- Prefácio",
            "- Introdução",
            "- [ ] 1. O Início",
            "- [ ] 2. O Meio",
            "- Posfácio",
        ]
    )

    assert ms.generate_toc() == expected


def test_manuscript_generate_toc_only_chapters():
    """Test generating TOC when only chapters are present."""
    ms = Manuscript(
        title="Livro Teste",
        author="Autor Teste",
        chapters=[
            Chapter(number=1, title="Primeiro Capítulo", content="Texto"),
        ],
    )

    expected = "\n".join(["## Sumário\n", "- [ ] 1. Primeiro Capítulo"])

    assert ms.generate_toc() == expected


def test_manuscript_generate_toc_empty():
    """Test generating TOC for an empty manuscript."""
    ms = Manuscript(
        title="Livro Teste",
        author="Autor Teste",
    )

    expected = "## Sumário\n"

    assert ms.generate_toc() == expected
