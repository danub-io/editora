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
