/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  User, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Settings, 
  ArrowLeft, 
  FileText, 
  Check, 
  Share2 
} from 'lucide-react';
import { BlogPost } from './types';

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Como Vender Seus Primeiros 1.000 Livros como Autor Independente',
    category: 'Marketing',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Descubra as estratégias essenciais de marketing digital para alcançar seus primeiros mil leitores sem depender de uma grande editora.',
    content: `Vender os primeiros 1.000 exemplares de um livro é o maior marco na carreira de qualquer escritor independente. Não se trata apenas de sorte, mas de aplicar táticas consistentes e focadas no leitor ideal.

Neste guia, separamos as 4 estratégias fundamentais para você impulsionar suas vendas:

### 1. Construa sua Lista de Transmissão (Newsletter)
Antes mesmo de lançar o livro, crie uma página simples (landing page) oferecendo um capítulo gratuito em troca do e-mail do leitor. Essa audiência será seu maior ativo no dia do lançamento.

### 2. O Poder das Resenhas Antecipadas
Recrute leitores voluntários (parceiros literários) e forneça a eles uma cópia digital gratuita em troca de uma crítica honesta na Amazon na semana de estreia. Livros com mais de 20 resenhas convertem muito mais visitas em vendas.

### 3. Otimize seus Metadados na Amazon (KDP)
Use palavras-chave de cauda longa no seu título e subtítulo. Escolha categorias de nicho onde você possa facilmente alcançar o selo de "Mais Vendido" e ganhar visibilidade orgânica.

### 4. Distribuição Multicanal
Além da Amazon, utilize plataformas independentes como a GospelReads para vender diretamente ao seu público com margens de lucro de até 90%. O contato direto com os leitores permite que você faça ações exclusivas de fidelização.`,
    readTime: '6 min',
    authorName: 'Danúbio Coelho',
    date: '2026-06-25'
  },
  {
    id: 'post-2',
    title: 'A Arte da Diagramação Profissional para E-books e Impressos',
    category: 'Escrita',
    coverUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Dicas fundamentais sobre tipografia, margens e formatação que transformam um manuscrito simples em uma obra de arte editorial.',
    content: `Muitos autores acreditam que uma boa história é tudo, mas a verdade é que o design editorial dita o ritmo da leitura. Uma diagramação mal executada pode cansar o leitor e arruinar a experiência literária.

Aqui estão os aspectos cruciais que você precisa observar ao formatar seu manuscrito:

### 1. Escolha da Tipografia Certa
Para livros impressos, prefira fontes serifadas elegantes como Garamond, Sabon ou Georgia. Para e-books, a legibilidade é o fator prioritário; use fontes versáteis como Inter ou a tradicional Bookerly da Amazon.

### 2. Margens e Área de Mancha
A mancha de texto (área ocupada pelas palavras) deve ser equilibrada. Margens muito estreitas comprimem as linhas, enquanto margens excessivamente largas parecem amadoras. Mantenha um respiro adequado para os polegares do leitor no caso de livros físicos.

### 3. Controle de Viúvas e Órfãs
Uma linha órfã é a primeira linha de um parágrafo que fica isolada no final de uma página. Uma viúva é a última linha de um parágrafo que fica sozinha no início da página seguinte. Ajuste o espaçamento ou reescreva pequenos trechos para evitar esses erros visuais que quebram a imersão.`,
    readTime: '5 min',
    authorName: 'Larissa Star',
    date: '2026-06-20'
  },
  {
    id: 'post-3',
    title: 'Como Superar o Bloqueio Criativo e Manter uma Rotina de Escrita',
    category: 'Escrita',
    coverUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Métodos práticos baseados na ciência da produtividade para criar hábitos duradouros e terminar seu manuscrito em tempo recorde.',
    content: `O mito da inspiração divina já arruinou milhares de carreiras literárias. Escritores profissionais não esperam a musa inspiradora chegar; eles se sentam e escrevem com método e dedicação diária.

Se você está travado na metade do seu livro, aplique estas técnicas hoje mesmo:

### 1. Estabeleça Metas de Palavras, Não de Tempo
Defina uma meta realista, por exemplo, 500 palavras por dia. Não se preocupe em deixá-las perfeitas agora. O primeiro manuscrito serve apenas para colocar a matéria-prima no papel. A arte real está na revisão.

### 2. Técnica da Escrita Livre (Freewriting)
Quando o bloqueio bater, abra um arquivo em branco e escreva sem parar por 10 minutos sobre qualquer assunto, sem corrigir pontuação ou ortografia. Isso desbloqueia a mente consciente e deixa o subconsciente fluir.

### 3. Planeje Antes de Escrever (Outlining)
Ter um mapa detalhado dos capítulos (sinopse de cena, conflito, objetivo do personagem) reduz drasticamente a ansiedade da tela em branco. Quando você sabe exatamente para onde a história está indo, as palavras fluem com muito mais naturalidade.`,
    readTime: '4 min',
    authorName: 'Marcos Oliveira',
    date: '2026-06-15'
  },
  {
    id: 'post-4',
    title: 'Revisão Editorial: Os 3 Filtros Essenciais para Refinar seu Texto',
    category: 'Revisão',
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Não publique o seu primeiro rascunho. Entenda a diferença entre copidesque, revisão ortográfica e leitura beta.',
    content: `Escrever é humano; revisar é divino. O primeiro rascunho de qualquer obra consagrada costuma ser bagunçado e cheio de redundâncias. O polimento é o que transforma o carvão em diamante.

Antes de mandar seu livro para a gráfica ou publicar no Kindle, passe seu texto por estes três filtros estruturais:

### 1. Revisão de Desenvolvimento (Macro-revisão)
Analise o ritmo, a coerência da trama e o arco dos personagens. Há furos na história? O clímax é satisfatório? Não tenha medo de cortar capítulos inteiros ou mudar a ordem das cenas neste estágio.

### 2. Copidesque (Preparação de Texto)
Foque na fluidez das frases, elimine repetições exaustivas e clichês batidos. Melhore a escolha de vocabulário e garanta que a voz narrativa seja consistente do início ao fim.

### 3. Revisão Ortográfica (Micro-revisão)
A caça sistemática a erros de digitação, concordância, crases perdidas e problemas de pontuação. Faça essa leitura em voz alta ou utilize ferramentas de conversão de texto em fala para ouvir o ritmo natural do texto e pegar deslizes que os olhos costumam ignorar.`,
    readTime: '7 min',
    authorName: 'Ana Cláudia Mendes',
    date: '2026-06-10'
  }
];

export default function BlogView() {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('gospelreads_blog_posts');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  useEffect(() => {
    const savedAdminMode = localStorage.getItem('gospelreads_blog_admin_mode') === 'true';
    setIsAdminMode(savedAdminMode);
  }, []);
  
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Escrita');
  const [formCoverUrl, setFormCoverUrl] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formReadTime, setFormReadTime] = useState('5 min');
  const [formAuthorName, setFormAuthorName] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('gospelreads_blog_posts', JSON.stringify(posts));
  }, [posts]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => { setToastMessage(null); }, 3000);
  };

  const categories = ['Todos', 'Escrita', 'Marketing', 'Revisão', 'Histórias de Sucesso'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim() || !formAuthorName.trim()) {
      showToast('Por favor, preencha o Título, Conteúdo e Autor.');
      return;
    }

    const defaultCover = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600';

    if (editingPost) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? {
        ...p,
        title: formTitle,
        category: formCategory,
        coverUrl: formCoverUrl.trim() || defaultCover,
        excerpt: formExcerpt || formContent.slice(0, 150) + '...',
        content: formContent,
        readTime: formReadTime,
        authorName: formAuthorName,
        date: new Date().toISOString().split('T')[0]
      } : p));
      showToast('Artigo atualizado com sucesso!');
    } else {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        coverUrl: formCoverUrl.trim() || defaultCover,
        excerpt: formExcerpt || formContent.slice(0, 150) + '...',
        content: formContent,
        readTime: formReadTime,
        authorName: formAuthorName,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts(prev => [newPost, ...prev]);
      showToast('Novo artigo publicado com sucesso!');
    }

    handleCancelEdit();
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormCoverUrl(post.coverUrl);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormReadTime(post.readTime);
    setFormAuthorName(post.authorName);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este artigo do blog?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
      showToast('Artigo excluído do blog.');
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setFormTitle('');
    setFormCategory('Escrita');
    setFormCoverUrl('');
    setFormExcerpt('');
    setFormContent('');
    setFormReadTime('5 min');
    setFormAuthorName('');
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 min-h-[calc(100vh-4rem)] border-t border-gray-200 dark:border-zinc-800 font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-500 border border-indigo-400 text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-2xl flex items-center gap-2">
          <Check size={14} /> {toastMessage}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-10">
        
        {/* Blog Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-zinc-800 pb-6">
          <div>
            <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block mb-3">ARTIGOS & INSPIRAÇÕES</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-tight mt-1 lg:text-4xl">O Blog GospelReads</h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-sans mt-2 max-w-xl">
              Inspiração, guias estruturais e estratégias valiosas de diagramação e marketing para autores autônomos.
            </p>
          </div>
        </div>

        {/* ADMIN/BACKEND CONTROL PANEL VIEW */}
        {isAdminMode ? (
          <div className="space-y-8">
            
            {/* Header control */}
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-lg text-sm text-gray-600 dark:text-zinc-300 flex items-center gap-3">
              <Settings size={16} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span>
                Você está no <strong>Painel de Controle do Administrador</strong>. Aqui você pode gerenciar, criar, editar e excluir postagens do blog que serão persistidas no navegador.
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form to Write/Edit */}
              <div className="lg:col-span-5 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                  <FileText size={18} className="text-indigo-500 dark:text-indigo-400" />
                  {editingPost ? 'Editar Artigo' : 'Publicar Novo Artigo'}
                </h3>

                <form onSubmit={handleSavePost} className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 block">Título do Artigo *</label>
                    <input 
                      type="text"
                      placeholder="Ex: Como diagramar o sumário perfeito"
                      value={formTitle}
                      onChange={e => setFormTitle(e.target.value)}
                      className="w-full text-sm p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 block">Categoria</label>
                      <select 
                        value={formCategory}
                        onChange={e => setFormCategory(e.target.value)}
                        className="w-full text-sm p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                      >
                        <option value="Escrita">Escrita</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Revisão">Revisão</option>
                        <option value="Histórias de Sucesso">Histórias de Sucesso</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 block">Tempo de Leitura</label>
                      <input 
                        type="text"
                        placeholder="Ex: 5 min"
                        value={formReadTime}
                        onChange={e => setFormReadTime(e.target.value)}
                        className="w-full text-sm p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 block">URL da Imagem de Capa</label>
                    <input 
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={formCoverUrl}
                      onChange={e => setFormCoverUrl(e.target.value)}
                      className="w-full text-sm p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 block">Nome do Autor *</label>
                    <input 
                      type="text"
                      placeholder="Nome do escritor do artigo"
                      value={formAuthorName}
                      onChange={e => setFormAuthorName(e.target.value)}
                      className="w-full text-sm p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 block">Resumo/Introdução Curta</label>
                    <textarea 
                      placeholder="Breve descrição que aparece no card do post..."
                      value={formExcerpt}
                      onChange={e => setFormExcerpt(e.target.value)}
                      rows={2}
                      className="w-full text-sm p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 font-sans"
                    />
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 block">Conteúdo Completo (Markdown amigável) *</label>
                    <textarea 
                      placeholder="Escreva seu artigo completo aqui. Use títulos de seção com ### para formatar."
                      value={formContent}
                      onChange={e => setFormContent(e.target.value)}
                      rows={8}
                      className="w-full text-sm p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 font-mono"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold tracking-wider uppercase rounded-lg cursor-pointer text-center transition-colors"
                    >
                      {editingPost ? 'Salvar Edições' : 'Publicar Artigo'}
                    </button>
                    {editingPost && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="p-3 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 rounded-lg cursor-pointer transition-colors"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: List of existing posts with actions */}
              <div className="lg:col-span-7 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 border-b border-gray-200 dark:border-zinc-800 pb-3">
                  Artigos Ativos no Blog ({posts.length})
                </h3>

                <div className="space-y-3 overflow-y-auto max-h-[580px] pr-2">
                  {posts.map(post => (
                    <div 
                      key={post.id}
                      className="p-4 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-lg flex gap-4 items-center justify-between hover:border-gray-300 dark:hover:border-zinc-600 transition-colors"
                    >
                      <div className="flex gap-3 items-center min-w-0">
                        <img 
                          src={post.coverUrl} 
                          alt={post.title} 
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-200 dark:border-zinc-700" 
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate leading-tight">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-400 dark:text-zinc-500 mt-0.5">
                            Por <strong className="text-gray-600 dark:text-zinc-300">{post.authorName}</strong> em <span className="font-mono bg-gray-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{post.category}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleEditClick(post)}
                          className="p-2 border border-gray-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg text-gray-400 dark:text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all cursor-pointer"
                          title="Editar"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 border border-gray-200 dark:border-zinc-700 hover:border-red-300 dark:hover:border-red-700 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg text-gray-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-all cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {posts.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-gray-200 dark:border-zinc-700 rounded-lg text-gray-400 dark:text-zinc-500 text-sm">
                      Não há artigos publicados no blog. Crie um no formulário ao lado!
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* PUBLIC USER BLOG VIEW */
          <div className="space-y-12">
            
            {/* Filters and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Category chips list */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3.5 py-1.5 text-sm tracking-wider font-sans border rounded-full transition-all cursor-pointer ${
                      activeCategory === category
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-gray-400 dark:hover:border-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-sm border border-gray-300 dark:border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 font-sans"
                />
                <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400 dark:text-zinc-500" />
              </div>
            </div>

            {/* Featured Post */}
            {filteredPosts.length > 0 && searchTerm === '' && activeCategory === 'Todos' && (
              <div 
                onClick={() => setSelectedPost(filteredPosts[0])}
                className="group bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-lg p-6 md:p-8 grid md:grid-cols-12 gap-8 items-center cursor-pointer transition-all duration-300 hover:shadow-lg"
              >
                <div className="md:col-span-6 aspect-[16/10] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
                  <img 
                    src={filteredPosts[0].coverUrl} 
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100" 
                  />
                </div>
                <div className="md:col-span-6 space-y-4">
                  <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded border border-indigo-100 dark:border-indigo-900/50 w-fit">
                    DESTAQUE • {filteredPosts[0].category.toUpperCase()}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 leading-snug group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {filteredPosts[0].title}
                  </h3>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between text-gray-400 dark:text-zinc-500 text-sm border-t border-gray-200 dark:border-zinc-700 pt-4 font-sans">
                    <span className="flex items-center gap-1.5 font-bold text-gray-600 dark:text-zinc-300">
                      <User size={13} className="text-indigo-500 dark:text-indigo-400" /> {filteredPosts[0].authorName}
                    </span>
                    <span className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1"><Clock size={11} /> {filteredPosts[0].readTime}</span>
                      <span>{filteredPosts[0].date}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* List of general posts */}
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {filteredPosts.map((post, idx) => {
                  if (activeCategory === 'Todos' && searchTerm === '' && idx === 0) return null;

                  return (
                    <div 
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="group bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-lg p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="space-y-4">
                        <div className="aspect-[16/10] bg-gray-200 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden relative">
                          <img 
                            src={post.coverUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-90 group-hover:opacity-100" 
                          />
                          <span className="absolute top-3 right-3 text-sm font-bold text-gray-600 dark:text-zinc-300 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-gray-200 dark:border-zinc-700 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest">
                            {post.category}
                          </span>
                        </div>

                        <div className="space-y-2 px-1">
                          <h4 className="text-base font-bold text-gray-900 dark:text-zinc-100 leading-snug group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-gray-500 dark:text-zinc-400 text-sm line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-gray-400 dark:text-zinc-500 text-sm border-t border-gray-200 dark:border-zinc-700 pt-3 mt-4 px-1 font-sans">
                        <span className="flex items-center gap-1 font-bold text-gray-600 dark:text-zinc-300">
                          <User size={12} className="text-indigo-500 dark:text-indigo-400" /> {post.authorName}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock size={11} /> {post.readTime}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-gray-200 dark:border-zinc-700 rounded-lg text-gray-400 dark:text-zinc-500 text-sm">
                Nenhum artigo encontrado com esses critérios. Experimente alterar sua busca.
              </div>
            )}

          </div>
        )}

      </div>

      {/* FULL POST READER DIALOG MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 dark:bg-zinc-950/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
            
            {/* Modal Header Controls */}
            <div className="p-4 md:p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-950/40">
              <span className="text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded border border-indigo-100 dark:border-indigo-900/50">
                {selectedPost.category}
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Link do artigo copiado!');
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                  title="Compartilhar"
                >
                  <Share2 size={15} />
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Reader Core */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 bg-gray-50 dark:bg-zinc-950">
              
              <div className="space-y-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-zinc-100 leading-tight max-w-2xl mx-auto">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center justify-center gap-4 text-gray-400 dark:text-zinc-500 text-sm font-sans pb-4 border-b border-gray-200 dark:border-zinc-700 max-w-sm mx-auto">
                  <span className="flex items-center gap-1 font-bold text-gray-600 dark:text-zinc-300">
                    <User size={13} className="text-indigo-500 dark:text-indigo-400" /> {selectedPost.authorName}
                  </span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono"><Clock size={11} /> {selectedPost.readTime} de leitura</span>
                </div>
              </div>

              {/* Cover Banner inside */}
              <div className="aspect-[21/9] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-md">
                <img src={selectedPost.coverUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              {/* Formatted body text */}
              <div className="font-serif text-sm md:text-base leading-relaxed text-justify text-gray-700 dark:text-zinc-200 space-y-6 max-w-2xl mx-auto pt-4 pb-8 whitespace-pre-wrap">
                {selectedPost.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={idx} className="font-sans text-lg font-bold text-gray-900 dark:text-zinc-100 pt-4 pb-1">
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h3 key={idx} className="font-sans text-xl font-bold text-gray-900 dark:text-zinc-100 pt-6 pb-2">
                        {paragraph.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={idx} className="list-disc pl-6 space-y-2 font-serif">
                        {items.map((item, itemIdx) => (
                          <li key={itemIdx}>{item.replace(/^[-*]\s+/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="text-gray-600 dark:text-zinc-300">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 dark:border-zinc-700 pt-6 text-center max-w-lg mx-auto">
                <p className="text-sm text-gray-400 dark:text-zinc-500 font-sans italic">Copyright © GospelReads. Todos os direitos reservados para o autor do artigo.</p>
              </div>

            </div>

            {/* Reader Footer Control */}
            <div className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center flex justify-center">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-bold uppercase tracking-widest py-3 px-8 rounded-lg transition-all cursor-pointer"
              >
                Concluir Leitura
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
