from editora.core.manuscript import Chapter

def test_chapter_from_markdown_no_frontmatter_with_number_heading():
    content = "# 12 - O Retorno\n\nEste é o conteúdo."
    chapter = Chapter.from_markdown(content)

    assert chapter.number == 12
    assert chapter.title == "O Retorno"
    assert chapter.content == "Este é o conteúdo."
    assert chapter.word_count == 4

def test_chapter_from_markdown_no_frontmatter_without_number_heading():
    content = "## Apenas um Título\n\nConteúdo aqui."
    chapter = Chapter.from_markdown(content)

    assert chapter.number == 0
    assert chapter.title == "Apenas um Título"
    assert chapter.content == "Conteúdo aqui."
    assert chapter.word_count == 2

def test_chapter_from_markdown_no_frontmatter_no_heading():
    content = "Apenas texto solto sem título."
    chapter = Chapter.from_markdown(content)

    assert chapter.number == 0
    assert chapter.title == "Capítulo sem título"
    assert chapter.content == "Apenas texto solto sem título."
    assert chapter.word_count == 5

def test_chapter_from_markdown_no_frontmatter_different_number_format():
    content = "# 5. Uma Nova Esperança\n\nMais texto."
    chapter = Chapter.from_markdown(content)

    assert chapter.number == 5
    assert chapter.title == "Uma Nova Esperança"
    assert chapter.content == "Mais texto."
    assert chapter.word_count == 2

def test_chapter_from_markdown_with_frontmatter():
    content = "---\ntitle: O Início\nnumber: 1\n---\nConteúdo aqui."
    chapter = Chapter.from_markdown(content)

    assert chapter.number == 1
    assert chapter.title == "O Início"
    assert chapter.content == "Conteúdo aqui."

def test_chapter_from_markdown_with_incomplete_frontmatter_number_fallback():
    content = "---\ntitle: 10 - O Fim\n---\nConteúdo aqui."
    chapter = Chapter.from_markdown(content)

    assert chapter.number == 10
    assert chapter.title == "O Fim"
    assert chapter.content == "Conteúdo aqui."

from editora.core.manuscript import Manuscript

def test_manuscript_to_markdown_empty():
    m = Manuscript(title="My Book", author="John Doe")
    md = m.to_markdown()

    # Check that it creates a string with title and author separated by the divider
    assert md == "# My Book\n\n---\n\n\n## John Doe\n"

def test_manuscript_to_markdown_with_chapters():
    m = Manuscript(title="My Book", author="John Doe")
    c1 = Chapter(number=1, title="Chapter 1", content="Content of Chapter 1")
    c2 = Chapter(number=2, title="Chapter 2", content="Content of Chapter 2")
    m.add_chapter(c1)
    m.add_chapter(c2)

    md = m.to_markdown(include_frontmatter=False)

    expected_parts = [
        "# My Book",
        "\n## John Doe\n",
        "Content of Chapter 1",
        "Content of Chapter 2"
    ]
    expected_md = "\n\n---\n\n".join(expected_parts)
    assert md == expected_md

def test_manuscript_to_markdown_with_frontmatter_and_backmatter():
    m = Manuscript(title="My Book", author="John Doe")

    front = Chapter(number=0, title="Intro", content="Intro content")
    ch = Chapter(number=1, title="Chapter 1", content="Chapter content")
    back = Chapter(number=-1, title="Outro", content="Outro content")

    m.front_matter.append(front)
    m.add_chapter(ch)
    m.back_matter.append(back)

    md = m.to_markdown(include_frontmatter=False)

    expected_parts = [
        "# My Book",
        "\n## John Doe\n",
        "Intro content",
        "Chapter content",
        "Outro content"
    ]
    expected_md = "\n\n---\n\n".join(expected_parts)
    assert md == expected_md

def test_manuscript_to_markdown_include_frontmatter():
    m = Manuscript(title="My Book", author="John Doe")
    ch = Chapter(number=1, title="Chapter 1", content="Chapter content")
    m.add_chapter(ch)

    md = m.to_markdown(include_frontmatter=True)

    # We expect YAML frontmatter for the chapter
    assert "title: Chapter 1" in md
    assert "number: 1" in md
    assert "Chapter content" in md
    assert md.startswith("# My Book")
