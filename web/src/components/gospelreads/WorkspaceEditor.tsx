/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Maximize2, 
  Minimize2, 
  Check, 
  RotateCcw, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Heading1, 
  FileText,
  AlignLeft,
  Trophy,
  Pin,
  MessageSquare,
  History,
  Search,
  Type,
  Download,
  User,
  Layout,
  BookMarked,
  HelpCircle,
  FolderOpen,
  X,
  PlusCircle,
  Eye,
  Smile,
  Meh,
  Frown,
  CheckCircle,
  Info
} from 'lucide-react';
import { Chapter, WritingSettings, AuthorProfile, Book } from './types';
import Exporter from './Exporter';
import AuthorProfileBuilder from './AuthorProfileBuilder';

interface WorkspaceEditorProps {
  chapters: Chapter[];
  setChapters: React.Dispatch<React.SetStateAction<Chapter[]>>;
  activeChapterId: string;
  setActiveChapterId: (id: string) => void;
  settings: WritingSettings;
  setSettings: React.Dispatch<React.SetStateAction<WritingSettings>>;
  profile: AuthorProfile;
  setProfile: React.Dispatch<React.SetStateAction<AuthorProfile>>;
  books: Book[];
  rightTab: string | null;
  setRightTab: (tab: string | null) => void;
}

interface PlanningCard {
  id: string;
  column: 'ato1' | 'ato2' | 'ato3';
  title: string;
  content: string;
  tag?: 'Estrutura' | 'Personagem' | 'Trama' | 'Cenário';
}

interface PlanningBoard {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

interface PlanningBlock {
  id: string;
  boardId: string;
  title: string;
  type: 'character' | 'location' | 'event' | 'note';
  content: string;
  emoji?: string;
}

interface VersionSnapshot {
  id: string;
  timestamp: string;
  title: string;
  charCount: number;
}

export default function WorkspaceEditor({
  chapters,
  setChapters,
  activeChapterId,
  setActiveChapterId,
  settings,
  setSettings,
  profile,
  setProfile,
  books,
  rightTab,
  setRightTab
}: WorkspaceEditorProps) {
  // Navigation & UI layouts
  const [leftTab, setLeftTab] = useState<'manuscript' | 'planning' | 'boards'>('manuscript');
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');
  const [dailyProgress, setDailyProgress] = useState(0);
  const [sessionMood, setSessionMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  
  // Search state
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [searchOnlyThisChapter, setSearchOnlyThisChapter] = useState(true);
  const [matchCase, setMatchCase] = useState(false);

  // Modals
  const [showExporterModal, setShowExporterModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // World Building / Boards custom states
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardEmoji, setNewBoardEmoji] = useState('📂');
  const [newBoardDesc, setNewBoardDesc] = useState('');

  const [editingCard, setEditingCard] = useState<PlanningBlock | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardFormTitle, setCardFormTitle] = useState('');
  const [cardFormType, setCardFormType] = useState<'character' | 'location' | 'event' | 'note'>('note');
  const [cardFormContent, setCardFormContent] = useState('');
  const [cardFormEmoji, setCardFormEmoji] = useState('📝');
  const [isNewCard, setIsNewCard] = useState(false);

  // Refs
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Active Chapter
  const activeChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];

  // Load and persist planning cards
  const [planningCards, setPlanningCards] = useState<PlanningCard[]>(() => {
    const saved = localStorage.getItem('gospelreads_planning_cards');
    return saved ? JSON.parse(saved) : [
      { id: 'pc-1', column: 'ato1', title: 'Mundo Comum', content: 'Apresentar a vida corriqueira do protagonista e seus conflitos internos.', tag: 'Estrutura' },
      { id: 'pc-2', column: 'ato1', title: 'O Chamado para Escrita', content: 'Incentivo externo que desencadeia a necessidade de mudança.', tag: 'Trama' },
      { id: 'pc-3', column: 'ato2', title: 'Travessia do Limiar', content: 'O herói assume o compromisso e adentra o mundo especial do editor.', tag: 'Estrutura' },
      { id: 'pc-4', column: 'ato2', title: 'Novos Aliados', content: 'Aparecimento de personagens que ajudam na estruturação e estilo do texto.', tag: 'Personagem' },
      { id: 'pc-5', column: 'ato3', title: 'A Provação Suprema', content: 'Resolução das tensões acumuladas em um clímax emocionante.', tag: 'Trama' },
      { id: 'pc-6', column: 'ato3', title: 'Retorno com o Elixir', content: 'O livro é exportado e distribuído no marketplace com glória.', tag: 'Cenário' }
    ];
  });

  // Load and persist planning boards and blocks
  const [planningBoards, setPlanningBoards] = useState<PlanningBoard[]>(() => {
    const saved = localStorage.getItem('gospelreads_planning_boards');
    return saved ? JSON.parse(saved) : [
      { id: 'pb-1', name: 'Personagens', emoji: '🎭', description: 'Fichas detalhadas dos protagonistas, antagonistas e secundários.' },
      { id: 'pb-2', name: 'Locais', emoji: '🗺️', description: 'Pontos importantes do mundo, reinos, cidades e salas.' },
      { id: 'pb-3', name: 'Eventos da Trama', emoji: '⏳', description: 'Acontecimentos marcantes da narrativa e marcos cronológicos.' }
    ];
  });

  const [planningBlocks, setPlanningBlocks] = useState<PlanningBlock[]>(() => {
    const saved = localStorage.getItem('gospelreads_planning_blocks');
    return saved ? JSON.parse(saved) : [
      { id: 'pbl-1', boardId: 'pb-1', title: 'Luana Costa', type: 'character', content: 'Protagonista. Escritora que descobre que suas palavras moldam o espaço sideral.', emoji: '✍️' },
      { id: 'pbl-2', boardId: 'pb-2', title: 'Biblioteca de Alexandria II', type: 'location', content: 'Grande acervo localizado na órbita de Netuno.', emoji: '🚀' },
      { id: 'pbl-3', boardId: 'pb-3', title: 'O Grande Alinhamento', type: 'event', content: 'Evento astronômico que conecta todas as dimensões literárias.', emoji: '🪐' }
    ];
  });


  // Load and persist pinned notes
  const [pinnedNotes, setPinnedNotes] = useState(() => {
    return localStorage.getItem('gospelreads_pinned_notes') || 'Use este bloco de notas fixado para rascunhar ideias rápidas, nomes de personagens importantes, datas marcantes ou lembretes literários que precisam ficar à vista.';
  });

  // Load and persist version snapshots
  const [snapshots, setSnapshots] = useState<VersionSnapshot[]>(() => {
    const saved = localStorage.getItem('gospelreads_version_snapshots');
    return saved ? JSON.parse(saved) : [
      { id: 'snap-1', timestamp: '29/06/2026, 14:32', title: 'Rascunho Inicial do Cap 1', charCount: 820 },
      { id: 'snap-2', timestamp: '29/06/2026, 18:15', title: 'Revisão Ortográfica Geral', charCount: 1150 }
    ];
  });

  // Track changes & spelling recommendations
  const [trackChanges, setTrackChanges] = useState(false);
  const [spellingActive, setSpellingActive] = useState(true);
  const [suggestions, setSuggestions] = useState([
    { id: 's-1', type: 'cliche', original: 'beijar o horizonte', replacement: 'tocar a linha do horizonte', comment: 'Considere evitar o clichê "beijar o horizonte".' },
    { id: 's-2', type: 'repetition', original: 'folha', replacement: 'página', comment: 'Repetição da palavra "folha" em parágrafos adjacentes.' }
  ]);
  const [deletedChapters, setDeletedChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    localStorage.setItem('gospelreads_planning_cards', JSON.stringify(planningCards));
  }, [planningCards]);

  useEffect(() => {
    localStorage.setItem('gospelreads_planning_boards', JSON.stringify(planningBoards));
  }, [planningBoards]);

  useEffect(() => {
    localStorage.setItem('gospelreads_planning_blocks', JSON.stringify(planningBlocks));
  }, [planningBlocks]);

  useEffect(() => {
    localStorage.setItem('gospelreads_pinned_notes', pinnedNotes);
  }, [pinnedNotes]);

  useEffect(() => {
    localStorage.setItem('gospelreads_version_snapshots', JSON.stringify(snapshots));
  }, [snapshots]);

  // Route routing checks for active exporter/profile tab
  useEffect(() => {
    if (rightTab === 'exporter') {
      setShowExporterModal(true);
      setRightTab(null);
    } else if (rightTab === 'profile') {
      setShowProfileModal(true);
      setRightTab(null);
    }
  }, [rightTab, setRightTab]);

  // Word & statistics math
  const countWords = (text: string) => {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  const activeWords = activeChapter ? countWords(activeChapter.content) : 0;
  const totalWords = chapters.reduce((sum, ch) => sum + countWords(ch.content), 0);
  const totalChars = chapters.reduce((sum, ch) => sum + ch.content.length, 0);

  // Daily target updater
  useEffect(() => {
    const percentage = Math.min(Math.round((activeWords / settings.dailyGoal) * 100), 100);
    setDailyProgress(percentage);
  }, [activeWords, settings.dailyGoal]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setSaveStatus('dirty');
    
    // Update chapter state
    setChapters(prev => prev.map(ch => {
      if (ch.id === activeChapterId) {
        return { ...ch, content: newContent };
      }
      return ch;
    }));

    // Debounce saves
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    setSaveStatus('saving');
    saveTimeoutRef.current = setTimeout(() => {
      setSaveStatus('saved');
    }, 1200);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setChapters(prev => prev.map(ch => {
      if (ch.id === activeChapterId) {
        return { ...ch, title: newTitle };
      }
      return ch;
    }));
  };

  const addNewChapter = () => {
    const nextOrder = chapters.length > 0 ? Math.max(...chapters.map(c => c.order)) + 1 : 1;
    const newCh: Chapter = {
      id: `ch-${Date.now()}`,
      title: `Capítulo ${nextOrder}: Novo Manuscrito`,
      content: '',
      order: nextOrder
    };
    setChapters([...chapters, newCh]);
    setActiveChapterId(newCh.id);
  };

  const deleteChapter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (chapters.length <= 1) {
      alert('Você precisa ter pelo menos um capítulo em seu manuscrito.');
      return;
    }
    const chapterToDelete = chapters.find(c => c.id === id);
    if (!chapterToDelete) return;

    const confirmDelete = window.confirm(`Deseja realmente excluir o "${chapterToDelete.title}"? O capítulo será enviado para a lixeira temporária do editor.`);
    if (!confirmDelete) return;

    // Save to deleted list for possible recovery
    setDeletedChapters(prev => [...prev, chapterToDelete]);

    const filtered = chapters.filter(c => c.id !== id);
    setChapters(filtered);
    if (activeChapterId === id) {
      setActiveChapterId(filtered[0].id);
    }
  };

  const restoreChapter = (ch: Chapter) => {
    setChapters(prev => [...prev, ch]);
    setDeletedChapters(prev => prev.filter(c => c.id !== ch.id));
    setActiveChapterId(ch.id);
  };

  const moveChapter = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === chapters.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...chapters];
    
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    const final = reordered.map((ch, idx) => ({ ...ch, order: idx + 1 }));
    setChapters(final);
  };

  // Typography styling lookups
  const getFontClass = () => {
    switch (settings.preferredFont) {
      case 'serif': return 'font-serif tracking-normal leading-relaxed';
      case 'mono': return 'font-mono text-sm leading-6 tracking-tight';
      case 'sans': default: return 'font-sans tracking-tight leading-relaxed';
    }
  };

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'sm': return 'text-sm md:text-base';
      case 'lg': return 'text-lg md:text-xl';
      case 'xl': return 'text-xl md:text-2xl';
      case 'md': default: return 'text-base md:text-lg';
    }
  };

  // Metas math helpers
  const wordFrequency = () => {
    if (!activeChapter || !activeChapter.content) return [];
    const cleanText = activeChapter.content.toLowerCase()
      .replace(/[^\w\sÀ-ÿ]/g, '')
      .replace(/[0-9]/g, '');
    const words = cleanText.split(/\s+/).filter(w => w.length > 3);
    const counts: { [key: string]: number } = {};
    words.forEach(w => {
      counts[w] = (counts[w] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const readingTime = () => {
    const totalW = activeChapter ? countWords(activeChapter.content) : 0;
    // Average reading speed: 200 words per minute
    return Math.max(1, Math.round(totalW / 200));
  };

  // Snapshots
  const createSnapshot = () => {
    if (!activeChapter) return;
    const title = window.prompt('Dê um título para esta versão do capítulo:', `Snapshot do ${activeChapter.title}`);
    if (!title) return;
    const newSnap: VersionSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleString('pt-BR'),
      title,
      charCount: activeChapter.content.length
    };
    setSnapshots([newSnap, ...snapshots]);
  };

  // Find and replace execution
  const executeFindAndReplace = () => {
    if (!findText) return;
    const regexFlags = matchCase ? 'g' : 'gi';
    const regex = new RegExp(findText, regexFlags);
    
    if (searchOnlyThisChapter) {
      const newContent = activeChapter.content.replace(regex, replaceText);
      setChapters(prev => prev.map(ch => ch.id === activeChapterId ? { ...ch, content: newContent } : ch));
      alert('Substituição realizada com sucesso no capítulo atual.');
    } else {
      setChapters(prev => prev.map(ch => {
        const updatedContent = ch.content.replace(regex, replaceText);
        return { ...ch, content: updatedContent };
      }));
      alert('Substituição realizada em todos os capítulos do manuscrito.');
    }
  };

  // Planning board helpers
  const addPlanningCard = (column: 'ato1' | 'ato2' | 'ato3') => {
    const title = window.prompt('Digite o título para o seu card de planejamento:');
    if (!title) return;
    const content = window.prompt('Digite uma breve descrição para o card:') || '';
    const newCard: PlanningCard = {
      id: `pc-${Date.now()}`,
      column,
      title,
      content,
      tag: 'Estrutura'
    };
    setPlanningCards([...planningCards, newCard]);
  };

  const deletePlanningCard = (id: string) => {
    if (window.confirm('Excluir este card de planejamento permanentemente?')) {
      setPlanningCards(planningCards.filter(c => c.id !== id));
    }
  };

  // World Building / Boards helper functions
  const handleAddBoard = () => {
    if (!newBoardName.trim()) {
      alert('Por favor, informe o nome da ficha.');
      return;
    }
    const newBoard: PlanningBoard = {
      id: `pb-${Date.now()}`,
      name: newBoardName,
      emoji: newBoardEmoji || '📂',
      description: newBoardDesc
    };
    setPlanningBoards([...planningBoards, newBoard]);
    setNewBoardName('');
    setNewBoardDesc('');
    setNewBoardEmoji('📂');
    setShowNewBoardModal(false);
  };

  const handleDeleteBoard = (boardId: string) => {
    if (window.confirm('Excluir esta pasta de fichas e todas as suas sub-fichas permanentemente?')) {
      setPlanningBoards(planningBoards.filter(b => b.id !== boardId));
      setPlanningBlocks(planningBlocks.filter(c => c.boardId !== boardId));
      if (activeBoardId === boardId) {
        setActiveBoardId(null);
      }
    }
  };

  const handleOpenNewCard = () => {
    if (!activeBoardId) return;
    setIsNewCard(true);
    setCardFormTitle('');
    setCardFormType('note');
    setCardFormContent('');
    setCardFormEmoji('📝');
    setShowCardModal(true);
  };

  const handleOpenEditCard = (card: PlanningBlock) => {
    setIsNewCard(false);
    setEditingCard(card);
    setCardFormTitle(card.title);
    setCardFormType(card.type);
    setCardFormContent(card.content);
    setCardFormEmoji(card.emoji || '📝');
    setShowCardModal(true);
  };

  const handleSaveCard = () => {
    if (!cardFormTitle.trim()) {
      alert('Por favor, insira o título do bloco.');
      return;
    }

    if (isNewCard) {
      if (!activeBoardId) return;
      const newCard: PlanningBlock = {
        id: `pbl-${Date.now()}`,
        boardId: activeBoardId,
        title: cardFormTitle,
        type: cardFormType,
        content: cardFormContent,
        emoji: cardFormEmoji
      };
      setPlanningBlocks([...planningBlocks, newCard]);
    } else {
      if (!editingCard) return;
      setPlanningBlocks(prev => prev.map(c => c.id === editingCard.id ? {
        ...c,
        title: cardFormTitle,
        type: cardFormType,
        content: cardFormContent,
        emoji: cardFormEmoji
      } : c));
    }
    setShowCardModal(false);
    setEditingCard(null);
  };

  const handleDeleteCard = (cardId: string) => {
    if (window.confirm('Excluir este bloco permanentemente?')) {
      setPlanningBlocks(planningBlocks.filter(c => c.id !== cardId));
    }
  };

  // Local state for right active sidebar tool
  const [activeRightTool, setActiveRightTool] = useState<string | null>(null);

  return (
    <div className="w-full flex bg-[#09090b] min-h-[calc(100vh-4rem)] border-t border-neutral-900 overflow-x-hidden relative">
      
      {/* COLLAPSIBLE LEFT SIDEBAR ICON STRIP */}
      {!isDistractionFree && (
        <aside className="w-16 border-r border-neutral-900 bg-[#09090b] flex flex-col justify-between items-center py-4 shrink-0 select-none hidden lg:flex">
          {/* Top stack icons */}
          <div className="space-y-3.5 flex flex-col items-center">
            <button
              onClick={() => {
                if (leftTab === 'manuscript' && isLeftPanelOpen) {
                  setIsLeftPanelOpen(false);
                } else {
                  setLeftTab('manuscript');
                  setIsLeftPanelOpen(true);
                }
              }}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                leftTab === 'manuscript' && isLeftPanelOpen
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
              }`}
              title="Manuscrito"
            >
              <BookOpen size={18} />
            </button>

            <button
              onClick={() => {
                if (leftTab === 'planning' && isLeftPanelOpen) {
                  setIsLeftPanelOpen(false);
                } else {
                  setLeftTab('planning');
                  setIsLeftPanelOpen(true);
                }
              }}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                leftTab === 'planning' && isLeftPanelOpen
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
              }`}
              title="Planejamento"
            >
              <Layout size={18} />
            </button>

            <button
              onClick={() => {
                if (leftTab === 'boards' && isLeftPanelOpen) {
                  setIsLeftPanelOpen(false);
                } else {
                  setLeftTab('boards');
                  setIsLeftPanelOpen(true);
                }
              }}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                leftTab === 'boards' && isLeftPanelOpen
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
              }`}
              title="Fichas & Notas"
            >
              <BookMarked size={18} />
            </button>
          </div>

          {/* Bottom brand indicator */}
          <div className="text-[10px] text-neutral-600 font-mono tracking-widest uppercase rotate-270 py-2 select-none">
            GOSPEL
          </div>
        </aside>
      )}

      {/* LEFT SIDEBAR: MANUSCRITO OR PLANEJAMENTO */}
      {!isDistractionFree && isLeftPanelOpen && (
        <aside className="w-80 border-r border-neutral-900 bg-[#0c0c0e] flex flex-col justify-between shrink-0 hidden lg:flex select-none">
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Sidebar Tab Selector Header with Close Button */}
            <div className="p-4 border-b border-neutral-900 flex items-center justify-between gap-3 bg-[#09090b]">
              <div className="flex bg-neutral-950 p-1 border border-neutral-850 rounded-2xl flex-1">
                <button
                  onClick={() => {
                    setLeftTab('manuscript');
                    setIsLeftPanelOpen(true);
                  }}
                  className={`flex-1 py-1.5 px-2 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    leftTab === 'manuscript'
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <BookOpen size={11} /> Manuscrito
                </button>
                <button
                  onClick={() => {
                    setLeftTab('planning');
                    setIsLeftPanelOpen(true);
                  }}
                  className={`flex-1 py-1.5 px-2 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    leftTab === 'planning'
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Layout size={11} /> Plan.
                </button>
                <button
                  onClick={() => {
                    setLeftTab('boards');
                    setIsLeftPanelOpen(true);
                  }}
                  className={`flex-1 py-1.5 px-2 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    leftTab === 'boards'
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <BookMarked size={11} /> Fichas
                </button>
              </div>
              <button 
                onClick={() => setIsLeftPanelOpen(false)} 
                className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                title="Recolher Painel"
              >
                <X size={14} />
              </button>
            </div>

            {/* Render left Tab: Manuscript Chapters manager */}
            {leftTab === 'manuscript' && (
              <div className="p-5 flex-1 flex flex-col overflow-y-auto justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-2">
                      <FolderOpen size={12} /> Capítulos do Livro
                    </span>
                    <button 
                      id="btn-add-chapter"
                      onClick={addNewChapter}
                      className="p-1 hover:bg-neutral-800 text-indigo-400 hover:text-white rounded-lg transition-colors border border-neutral-800 bg-neutral-900"
                      title="Adicionar Capítulo"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-[48vh] overflow-y-auto pr-1">
                    {chapters
                      .sort((a, b) => a.order - b.order)
                      .map((ch, idx) => (
                        <div
                          key={ch.id}
                          onClick={() => setActiveChapterId(ch.id)}
                          className={`group flex items-center justify-between p-3 cursor-pointer border rounded-xl ${
                            ch.id === activeChapterId 
                              ? 'border-indigo-500 bg-indigo-500/10 font-medium text-indigo-300' 
                              : 'border-transparent text-neutral-400 hover:border-neutral-850 hover:bg-neutral-900/40 hover:text-neutral-200'
                          } transition-all duration-150`}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <span className="text-[10px] font-mono text-neutral-600 shrink-0">#{idx + 1}</span>
                            <span className="text-xs truncate font-serif">{ch.title || 'Sem título'}</span>
                          </div>
                          
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button 
                              onClick={(e) => { e.stopPropagation(); moveChapter(idx, 'up'); }}
                              disabled={idx === 0}
                              className="p-0.5 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded disabled:opacity-30"
                              title="Subir"
                            >
                              <ChevronUp size={12} />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); moveChapter(idx, 'down'); }}
                              disabled={idx === chapters.length - 1}
                              className="p-0.5 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded disabled:opacity-30"
                              title="Descer"
                            >
                              <ChevronDown size={12} />
                            </button>
                            <button 
                              onClick={(e) => deleteChapter(ch.id, e)}
                              className="p-0.5 hover:bg-red-950/40 text-red-400 rounded"
                              title="Excluir"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Left Bottom totals statistics */}
                <div className="border-t border-neutral-900 pt-5 mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-900/60 border border-neutral-850 p-2.5 rounded-xl">
                      <div className="text-[9px] text-neutral-500 uppercase tracking-wider font-mono">Total Palavras</div>
                      <div className="text-base font-bold font-serif text-white">{totalWords}</div>
                    </div>
                    <div className="bg-neutral-900/60 border border-neutral-850 p-2.5 rounded-xl">
                      <div className="text-[9px] text-neutral-500 uppercase tracking-wider font-mono">Caracteres</div>
                      <div className="text-base font-bold font-serif text-white">{totalChars}</div>
                    </div>
                  </div>

                  {/* Daily Target Widget */}
                  <div className="bg-[#0f0f12] border border-neutral-850 p-3.5 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-medium text-neutral-400 flex items-center gap-1">
                        <Clock size={11} className="text-indigo-400" /> Meta do Capítulo ({settings.dailyGoal} pal.)
                      </span>
                      <span className="font-mono text-indigo-400 font-bold">{dailyProgress}%</span>
                    </div>
                    
                    <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden border border-neutral-900">
                      <div 
                        className="bg-indigo-500 h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                        style={{ width: `${dailyProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-neutral-500">{activeWords} escritas</span>
                      <button
                        onClick={() => {
                          const goal = window.prompt('Ajustar meta diária de palavras do capítulo:', settings.dailyGoal.toString());
                          if (goal) {
                            const num = parseInt(goal, 10);
                            if (!isNaN(num) && num > 0) {
                              setSettings(prev => ({ ...prev, dailyGoal: num }));
                            }
                          }
                        }}
                        className="text-indigo-400 hover:text-indigo-300 font-bold"
                      >
                        Ajustar Meta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Render left Tab: Interactive Kanban Planning Board */}
            {leftTab === 'planning' && (
              <div className="p-4 flex-1 flex flex-col overflow-y-auto space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-1.5">
                    <Layout size={12} /> Quadro de Plotagem
                  </span>
                  <p className="text-[9px] text-neutral-500 font-mono">Três Atos</p>
                </div>

                {/* Column lists (vertical mini bento stacks) */}
                <div className="space-y-4">
                  {/* Ato 1 */}
                  <div className="bg-neutral-900/40 p-3 border border-neutral-850 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center border-b border-neutral-800 pb-1">
                      <span className="text-xs font-bold text-white uppercase font-serif">Ato I: Partida</span>
                      <button onClick={() => addPlanningCard('ato1')} className="text-indigo-400 hover:text-white">
                        <PlusCircle size={14} />
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-[16vh] overflow-y-auto pr-1">
                      {planningCards.filter(c => c.column === 'ato1').map(card => (
                        <div key={card.id} className="bg-neutral-950 border border-neutral-800 p-2 rounded-lg text-[11px] relative group space-y-1">
                          <div className="font-serif font-semibold text-white pr-4">{card.title}</div>
                          <p className="text-neutral-400 line-clamp-2 leading-tight font-sans">{card.content}</p>
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[8px] bg-indigo-500/15 text-indigo-400 px-1.5 py-0.5 rounded font-mono uppercase">{card.tag || 'Estrutura'}</span>
                            <button onClick={() => deletePlanningCard(card.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 ml-auto transition-opacity">
                              <Trash2 size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ato 2 */}
                  <div className="bg-neutral-900/40 p-3 border border-neutral-850 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center border-b border-neutral-800 pb-1">
                      <span className="text-xs font-bold text-white uppercase font-serif">Ato II: Confronto</span>
                      <button onClick={() => addPlanningCard('ato2')} className="text-indigo-400 hover:text-white">
                        <PlusCircle size={14} />
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-[16vh] overflow-y-auto pr-1">
                      {planningCards.filter(c => c.column === 'ato2').map(card => (
                        <div key={card.id} className="bg-neutral-950 border border-neutral-800 p-2 rounded-lg text-[11px] relative group space-y-1">
                          <div className="font-serif font-semibold text-white pr-4">{card.title}</div>
                          <p className="text-neutral-400 line-clamp-2 leading-tight font-sans">{card.content}</p>
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[8px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded font-mono uppercase">{card.tag || 'Trama'}</span>
                            <button onClick={() => deletePlanningCard(card.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 ml-auto transition-opacity">
                              <Trash2 size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ato 3 */}
                  <div className="bg-neutral-900/40 p-3 border border-neutral-850 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center border-b border-neutral-800 pb-1">
                      <span className="text-xs font-bold text-white uppercase font-serif">Ato III: Resolução</span>
                      <button onClick={() => addPlanningCard('ato3')} className="text-indigo-400 hover:text-white">
                        <PlusCircle size={14} />
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-[16vh] overflow-y-auto pr-1">
                      {planningCards.filter(c => c.column === 'ato3').map(card => (
                        <div key={card.id} className="bg-neutral-950 border border-neutral-800 p-2 rounded-lg text-[11px] relative group space-y-1">
                          <div className="font-serif font-semibold text-white pr-4">{card.title}</div>
                          <p className="text-neutral-400 line-clamp-2 leading-tight font-sans">{card.content}</p>
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[8px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded font-mono uppercase">{card.tag || 'Clímax'}</span>
                            <button onClick={() => deletePlanningCard(card.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 ml-auto transition-opacity">
                              <Trash2 size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Render left Tab: Custom Boards & Blocks (World Building) */}
            {leftTab === 'boards' && (
              <div className="p-4 flex-1 flex flex-col overflow-y-auto space-y-4">
                {activeBoardId === null ? (
                  // BOARDS LIST VIEW
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-1.5 font-sans">
                        <BookMarked size={12} /> Fichas de Criação
                      </span>
                      <button 
                        onClick={() => setShowNewBoardModal(true)} 
                        className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
                      >
                        <Plus size={12} /> Pasta
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {planningBoards.map(board => {
                        const count = planningBlocks.filter(b => b.boardId === board.id).length;
                        return (
                          <div 
                            key={board.id}
                            className="bg-neutral-900/40 border border-neutral-850 p-4 rounded-2xl hover:border-indigo-500/50 transition-all cursor-pointer group relative flex flex-col justify-between space-y-2"
                            onClick={() => setActiveBoardId(board.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{board.emoji}</span>
                                <div className="text-left">
                                  <h4 className="font-serif font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">{board.name}</h4>
                                  <p className="text-[10px] text-neutral-400 line-clamp-1 font-sans">{board.description || 'Sem descrição'}</p>
                                </div>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBoard(board.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-400 transition-all p-1"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-neutral-850/50">
                              <span className="text-[9px] text-neutral-500 font-mono uppercase">Sub-fichas</span>
                              <span className="text-[10px] font-mono font-bold bg-neutral-950 text-indigo-400 border border-neutral-800 px-2 py-0.5 rounded-full">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {planningBoards.length === 0 && (
                      <div className="text-center py-8 text-neutral-500 font-sans text-xs">
                        Nenhuma pasta de fichas criada. Clique em "+ Pasta" para começar.
                      </div>
                    )}
                  </div>
                ) : (
                  // BOARD DETAILS VIEW (GRID OF BLOCKS)
                  <div className="space-y-4">
                    {/* Header with back button */}
                    {(() => {
                      const board = planningBoards.find(b => b.id === activeBoardId);
                      if (!board) return null;
                      const boardBlocks = planningBlocks.filter(b => b.boardId === activeBoardId);
                      return (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <button 
                              onClick={() => setActiveBoardId(null)}
                              className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 uppercase tracking-wider font-bold transition-all"
                            >
                              ← Voltar
                            </button>
                            <button 
                              onClick={handleOpenNewCard}
                              className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
                            >
                              <Plus size={12} /> Bloco
                            </button>
                          </div>

                          <div className="bg-neutral-900/60 p-3.5 border border-neutral-800 rounded-2xl space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{board.emoji}</span>
                              <h3 className="font-serif font-bold text-white text-base leading-tight">{board.name}</h3>
                            </div>
                            <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">{board.description || 'Organize as fichas deste tópico.'}</p>
                          </div>

                          <div className="grid grid-cols-1 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                            {boardBlocks.map(block => {
                              const typeLabels = {
                                character: { text: 'Personagem', color: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20' },
                                location: { text: 'Local', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
                                event: { text: 'Evento', color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
                                note: { text: 'Nota', color: 'bg-purple-500/15 text-purple-400 border-purple-500/20' }
                              };
                              const badge = typeLabels[block.type] || typeLabels.note;
                              return (
                                <div 
                                  key={block.id}
                                  className="bg-neutral-950 border border-neutral-850 p-3 rounded-2xl hover:border-neutral-700 transition-all group relative space-y-2 cursor-pointer"
                                  onClick={() => handleOpenEditCard(block)}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="text-sm shrink-0">{block.emoji || '📝'}</span>
                                      <h5 className="font-serif font-bold text-white text-xs truncate">{block.title}</h5>
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteCard(block.id);
                                        }}
                                        className="text-neutral-500 hover:text-red-400 p-0.5"
                                      >
                                        <Trash2 size={11} />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed font-sans">{block.content || 'Sem conteúdo.'}</p>
                                  <div className="flex justify-between items-center pt-1">
                                    <span className={`text-[8px] border px-2 py-0.5 rounded-full font-mono uppercase ${badge.color}`}>{badge.text}</span>
                                  </div>
                                </div>
                              );
                            })}

                            {boardBlocks.length === 0 && (
                              <div className="text-center py-8 text-neutral-500 font-sans text-xs">
                                Nenhum bloco nesta pasta. Clique em "+ Bloco" para adicionar.
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      )}

      {/* CENTER WRITING AREA & CANVAS */}
      <section className="flex-1 flex flex-col bg-[#09090b] relative">
        
        {/* Editor Controls Bar */}
        <div className="px-6 py-4 border-b border-neutral-900 flex items-center justify-between bg-[#0c0c0e] shrink-0">
          <div className="flex items-center gap-3">
            <button 
              id="btn-distraction-free"
              onClick={() => setIsDistractionFree(!isDistractionFree)}
              className="p-1.5 border border-neutral-800 hover:bg-neutral-900 text-neutral-300 rounded-lg transition-colors cursor-pointer"
              title={isDistractionFree ? "Sair do modo sem distrações" : "Modo sem distrações"}
            >
              {isDistractionFree ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            {!isDistractionFree && (
              <button 
                id="btn-toggle-left-panel"
                onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                className={`p-1.5 border hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer hidden lg:inline-flex items-center justify-center ${
                  isLeftPanelOpen 
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' 
                    : 'border-neutral-800 text-neutral-300'
                }`}
                title={isLeftPanelOpen ? "Ocultar painel esquerdo" : "Mostrar painel esquerdo"}
              >
                <FolderOpen size={15} />
              </button>
            )}

            {/* Mobile chapters list */}
            <div className="lg:hidden">
              <select 
                value={activeChapterId}
                onChange={(e) => setActiveChapterId(e.target.value)}
                className="text-xs font-serif border border-neutral-800 bg-neutral-900 text-white p-1.5 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              >
                {chapters.map((ch, idx) => (
                  <option key={ch.id} value={ch.id}>
                    Cap. {idx + 1}: {ch.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Typography fast adjusters */}
            {!isDistractionFree && (
              <div className="hidden sm:flex items-center gap-1.5 border-l border-neutral-850 pl-3">
                <select
                  value={settings.preferredFont}
                  onChange={(e) => setSettings(prev => ({ ...prev, preferredFont: e.target.value as WritingSettings['preferredFont'] }))}
                  className="text-xs border border-neutral-850 bg-neutral-900 text-neutral-300 px-2 py-1 rounded-lg focus:outline-none"
                >
                  <option value="serif">EB Garamond (Serif)</option>
                  <option value="sans">Inter (Sans)</option>
                  <option value="mono">JetBrains Mono (Mono)</option>
                </select>

                <select
                  value={settings.fontSize}
                  onChange={(e) => setSettings(prev => ({ ...prev, fontSize: e.target.value as WritingSettings['fontSize'] }))}
                  className="text-xs border border-neutral-850 bg-neutral-900 text-neutral-300 px-2 py-1 rounded-lg focus:outline-none"
                >
                  <option value="sm">Pequeno</option>
                  <option value="md">Médio</option>
                  <option value="lg">Grande</option>
                  <option value="xl">Extra Grande</option>
                </select>
              </div>
            )}
          </div>

          {/* Sync & word counts indicators */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-400 font-mono hidden md:inline">
              Palavras no Capítulo: <strong className="text-white">{activeWords}</strong>
            </span>
            
            <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
              <span className={`w-1.5 h-1.5 rounded-full ${
                saveStatus === 'saved' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                saveStatus === 'saving' ? 'bg-amber-500 animate-pulse' : 'bg-gray-500'
              }`} />
              {saveStatus === 'saved' ? 'Sincronizado' :
               saveStatus === 'saving' ? 'Salvando...' : 'Não salvo'}
            </span>
          </div>
        </div>

        {/* The Text Editor Canvas Sheet */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-20 flex justify-center bg-[#09090b]">
          <div className="w-full max-w-3xl flex flex-col bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-8 md:p-14 relative min-h-[70vh]">
            
            {/* Chapter Header */}
            <div className="mb-6 border-b border-neutral-800/80 pb-4">
              <input
                type="text"
                value={activeChapter ? activeChapter.title : ''}
                onChange={handleTitleChange}
                placeholder="Título do Capítulo..."
                className="w-full font-serif text-2xl md:text-3xl text-white border-none bg-transparent focus:outline-none placeholder:text-neutral-700 font-medium"
              />
              <span className="text-[9px] font-mono text-neutral-500 mt-1 block uppercase tracking-wider">
                Última edição realizada hoje, às {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Writing Area */}
            <textarea
              ref={textareaRef}
              value={activeChapter ? activeChapter.content : ''}
              onChange={handleContentChange}
              placeholder="Sua inspiração começa a fluir... Escreva, edite e acompanhe os seus insights nas barras laterais."
              className={`flex-1 w-full border-none resize-none bg-transparent focus:outline-none focus:ring-0 placeholder:text-neutral-700 ${getFontClass()} ${getFontSizeClass()} text-neutral-200`}
              style={{ minHeight: '380px' }}
            />

            {/* Distraction free overlay indicators */}
            {isDistractionFree && (
              <div className="absolute bottom-6 left-12 right-12 flex justify-between items-center border-t border-neutral-850/50 pt-4 text-[10px] font-mono text-neutral-500 select-none">
                <span>{activeChapter ? activeChapter.title : ''}</span>
                <span>{activeWords} palavras</span>
                <button 
                  onClick={() => setIsDistractionFree(false)}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Sair do Modo Foco
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom editor bar */}
        {!isDistractionFree && (
          <div className="bg-[#0c0c0e] border-t border-neutral-900 py-3 px-6 text-xs text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono select-none">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <Sparkles size={11} className="text-indigo-400" /> GospelReads. Editor v2.1
            </span>
            <div className="flex items-center gap-4 text-neutral-500">
              <span>Palavras Totais: <strong className="text-neutral-300">{totalWords}</strong></span>
              <span>Estrutura: <strong className="text-neutral-300">{chapters.length} Capítulos</strong></span>
            </div>
          </div>
        )}
      </section>

      {/* RIGHT SLIDE-OUT INTERACTIVE TOOLS SIDEBAR */}
      {!isDistractionFree && (
        <div className="flex shrink-0 select-none">
          {/* Collapse drawer content panel */}
          {activeRightTool && (
            <aside className="w-80 border-l border-neutral-900 bg-[#0c0c0e] flex flex-col justify-between overflow-y-auto animate-fade-in">
              <div className="p-5 space-y-6 h-full flex flex-col justify-start">
                
                {/* Tool title header */}
                <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono flex items-center gap-2">
                    {activeRightTool === 'stats' && <><AlignLeft size={13} /> Metas & Insights</>}
                    {activeRightTool === 'challenges' && <><Trophy size={13} /> Desafios Literários</>}
                    {activeRightTool === 'notes' && <><Pin size={13} /> Notas Fixadas</>}
                    {activeRightTool === 'track' && <><MessageSquare size={13} /> Sugestões & Revisões</>}
                    {activeRightTool === 'history' && <><History size={13} /> Snapshots de Versão</>}
                    {activeRightTool === 'search' && <><Search size={13} /> Buscar & Substituir</>}
                    {activeRightTool === 'spell' && <><Type size={13} /> Corretor Ortográfico</>}
                    {activeRightTool === 'trash' && <><Trash2 size={13} /> Lixeira do Livro</>}
                  </h3>
                  <button 
                    onClick={() => setActiveRightTool(null)} 
                    className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* TAB CONTENT: Stats & Insights */}
                {activeRightTool === 'stats' && (
                  <div className="space-y-6 flex-1 overflow-y-auto text-neutral-300">
                    {/* Smiley mood check-in */}
                    <div className="space-y-2 bg-neutral-900/60 p-3.5 border border-neutral-850 rounded-2xl text-center">
                      <div className="text-[10px] font-bold text-neutral-400 uppercase">Como foi o trabalho hoje?</div>
                      <div className="flex justify-center gap-4 py-1.5">
                        <button 
                          onClick={() => setSessionMood('happy')}
                          className={`p-1.5 rounded-full transition-colors ${sessionMood === 'happy' ? 'bg-indigo-600 text-white' : 'hover:bg-neutral-800 text-neutral-400'}`}
                          title="Excelente ritmo!"
                        >
                          <Smile size={18} />
                        </button>
                        <button 
                          onClick={() => setSessionMood('neutral')}
                          className={`p-1.5 rounded-full transition-colors ${sessionMood === 'neutral' ? 'bg-indigo-600 text-white' : 'hover:bg-neutral-800 text-neutral-400'}`}
                          title="Foco mediano"
                        >
                          <Meh size={18} />
                        </button>
                        <button 
                          onClick={() => setSessionMood('sad')}
                          className={`p-1.5 rounded-full transition-colors ${sessionMood === 'sad' ? 'bg-indigo-600 text-white' : 'hover:bg-neutral-800 text-neutral-400'}`}
                          title="Bloqueio criativo"
                        >
                          <Frown size={18} />
                        </button>
                      </div>
                      <span className="text-[9px] text-neutral-500 block">Identificar seu ânimo melhora as estatísticas de escrita a longo prazo.</span>
                    </div>

                    {/* Stats table */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-neutral-400 uppercase">Dados do Capítulo</div>
                      <div className="space-y-1.5 text-xs font-sans">
                        <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                          <span>Tempo de Leitura</span>
                          <span className="font-mono text-white font-medium">{readingTime()} min</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                          <span>Contagem de Palavras</span>
                          <span className="font-mono text-white font-medium">{activeWords}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                          <span>Caracteres Totais</span>
                          <span className="font-mono text-white font-medium">{activeChapter?.content.length || 0}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                          <span>Parágrafos</span>
                          <span className="font-mono text-white font-medium">
                            {activeChapter?.content.split('\n\n').filter(p => p.trim()).length || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Word frequency analysis */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-neutral-400 uppercase">Palavras Mais Frequentes</div>
                      {wordFrequency().length > 0 ? (
                        <div className="space-y-2">
                          {wordFrequency().map(([word, freq]) => (
                            <div key={word} className="flex justify-between items-center bg-neutral-950 p-2 border border-neutral-850 rounded-xl text-xs">
                              <span className="font-serif text-white italic">"{word}"</span>
                              <span className="font-mono text-indigo-400 text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded-full font-bold">{freq} ocorrências</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-neutral-500 italic">Escreva mais texto para visualizar as repetições de palavras.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Challenges */}
                {activeRightTool === 'challenges' && (
                  <div className="space-y-4 flex-1 overflow-y-auto text-neutral-300">
                    <p className="text-xs text-neutral-400 leading-relaxed">Participe de desafios literários para turbinar a sua produtividade.</p>
                    
                    <div className="bg-neutral-900/60 p-4 border border-neutral-850 rounded-2xl space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-white font-serif">Meia Maratona de Escrita</h4>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Sua meta mensal de 10k palavras.</p>
                        </div>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">Ativo</span>
                      </div>
                      <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden border border-neutral-900">
                        <div className="bg-indigo-500 h-full w-[45%]" />
                      </div>
                      <div className="flex justify-between text-[9px] text-neutral-500 font-mono">
                        <span>4.500 palavras</span>
                        <span>10.000 alvo</span>
                      </div>
                    </div>

                    <div className="bg-neutral-900/60 p-4 border border-emerald-500/10 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-neutral-300 font-serif">Arrancada de Fim de Semana</h4>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">Concluído</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-tight">Escreva 2.000 palavras entre sábado e domingo para liberar medalhas estelares.</p>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Pinned Notes */}
                {activeRightTool === 'notes' && (
                  <div className="space-y-4 flex-1 overflow-y-auto text-neutral-300 flex flex-col justify-start h-full">
                    <p className="text-xs text-neutral-400 leading-relaxed">Use este rascunho de anotações rápidas sobre personagens ou enredo.</p>
                    <textarea
                      value={pinnedNotes}
                      onChange={(e) => setPinnedNotes(e.target.value)}
                      rows={14}
                      className="w-full border border-neutral-850 bg-neutral-950 text-white p-3.5 text-xs rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed"
                    />
                    <div className="text-[10px] text-neutral-500 italic flex items-center gap-1">
                      <Info size={11} className="text-indigo-400 shrink-0" /> Salvo localmente em tempo real.
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Track changes & revisions suggestions */}
                {activeRightTool === 'track' && (
                  <div className="space-y-4 flex-1 overflow-y-auto text-neutral-300">
                    {/* Toggle */}
                    <div className="flex items-center justify-between bg-neutral-900/60 p-3.5 border border-neutral-850 rounded-2xl text-xs">
                      <div>
                        <span className="font-bold text-white block">Rastrear Alterações</span>
                        <span className="text-[9px] text-neutral-500">Registrar histórico de modificações</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={trackChanges}
                        onChange={(e) => setTrackChanges(e.target.checked)}
                        className="rounded border-neutral-800 text-indigo-500 bg-neutral-950 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-neutral-400 uppercase">Sugestões de Estilo</div>
                      {suggestions.map(s => (
                        <div key={s.id} className="bg-neutral-950 border border-neutral-850 p-4 rounded-xl space-y-2.5">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-amber-400 uppercase font-mono font-bold">{s.type === 'cliche' ? 'Clichê Detectado' : 'Repetição'}</span>
                            <button 
                              onClick={() => setSuggestions(suggestions.filter(x => x.id !== s.id))}
                              className="text-neutral-500 hover:text-white"
                            >
                              Dispensar
                            </button>
                          </div>
                          <p className="text-xs font-serif leading-relaxed text-neutral-300">
                            {s.comment}
                          </p>
                          <div className="flex justify-between items-center text-[10px] bg-neutral-900 p-2 rounded-lg border border-neutral-850">
                            <span className="text-red-400 line-through">"{s.original}"</span>
                            <span className="text-emerald-400">"{s.replacement}"</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Version history Snapshots */}
                {activeRightTool === 'history' && (
                  <div className="space-y-4 flex-1 overflow-y-auto text-neutral-300">
                    <button
                      onClick={createSnapshot}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={13} /> Criar Novo Snapshot
                    </button>

                    <div className="space-y-2.5">
                      {snapshots.map(snap => (
                        <div key={snap.id} className="bg-neutral-950 border border-neutral-850 p-3 rounded-xl flex justify-between items-center">
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-serif font-semibold text-white">{snap.title}</h4>
                            <p className="text-[9px] text-neutral-500 font-mono">{snap.timestamp}</p>
                          </div>
                          <span className="text-[9px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">{snap.charCount} caracteres</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Find & Replace */}
                {activeRightTool === 'search' && (
                  <div className="space-y-4 flex-1 overflow-y-auto text-neutral-300">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-400 block">Localizar</label>
                      <input
                        type="text"
                        value={findText}
                        onChange={(e) => setFindText(e.target.value)}
                        placeholder="Palavra ou termo..."
                        className="w-full text-xs border border-neutral-850 bg-neutral-950 text-white p-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-400 block">Substituir por</label>
                      <input
                        type="text"
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                        placeholder="Nova palavra ou frase..."
                        className="w-full text-xs border border-neutral-850 bg-neutral-950 text-white p-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-2 pt-2 text-[11px] font-sans">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Diferenciar maiúsculas/minúsculas</span>
                        <input
                          type="checkbox"
                          checked={matchCase}
                          onChange={(e) => setMatchCase(e.target.checked)}
                          className="rounded border-neutral-800 text-indigo-500 bg-neutral-950 w-3.5 h-3.5"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Apenas neste capítulo</span>
                        <input
                          type="checkbox"
                          checked={searchOnlyThisChapter}
                          onChange={(e) => setSearchOnlyThisChapter(e.target.checked)}
                          className="rounded border-neutral-800 text-indigo-500 bg-neutral-950 w-3.5 h-3.5"
                        />
                      </div>
                    </div>

                    <button
                      onClick={executeFindAndReplace}
                      disabled={!findText}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl transition-all mt-4 cursor-pointer"
                    >
                      Substituir Ocorrências
                    </button>
                  </div>
                )}

                {/* TAB CONTENT: Spellcheck */}
                {activeRightTool === 'spell' && (
                  <div className="space-y-4 flex-1 overflow-y-auto text-neutral-300">
                    <div className="flex items-center justify-between bg-neutral-900/60 p-3.5 border border-neutral-850 rounded-2xl text-xs">
                      <div>
                        <span className="font-bold text-white block">Ativar Corretor</span>
                        <span className="text-[9px] text-neutral-500">Exibir sublinhados ortográficos</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={spellingActive}
                        onChange={(e) => setSpellingActive(e.target.checked)}
                        className="rounded border-neutral-800 text-indigo-500 bg-neutral-950 w-4 h-4"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-neutral-400 uppercase">Inconsistências Encontradas</div>
                      {spellingActive ? (
                        <div className="space-y-2.5">
                          <div className="bg-neutral-950 border border-neutral-850 p-3 rounded-xl text-xs space-y-1.5">
                            <div className="text-[9px] text-red-400 font-mono uppercase font-bold">Erro de Concordância</div>
                            <p className="font-serif italic">"...setecentas palavras haviam sido confiadas..."</p>
                            <span className="text-[10px] text-neutral-400 block mt-1">Concordância passiva correta. Nenhuma alteração solicitada.</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 text-center py-4">Tudo limpo por aqui! Seu manuscrito não possui falhas crassas.</p>
                        </div>
                      ) : (
                        <p className="text-[11px] text-neutral-500 italic text-center">Ative o corretor ortográfico para realizar a varredura do texto.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Chapter Wastebin / Trash */}
                {activeRightTool === 'trash' && (
                  <div className="space-y-4 flex-1 overflow-y-auto text-neutral-300">
                    <p className="text-xs text-neutral-400 leading-relaxed">Recupere capítulos excluídos acidentalmente neste manuscrito.</p>
                    
                    {deletedChapters.length > 0 ? (
                      <div className="space-y-2">
                        {deletedChapters.map(ch => (
                          <div key={ch.id} className="bg-neutral-950 border border-neutral-850 p-3 rounded-xl flex justify-between items-center text-xs">
                            <div className="overflow-hidden mr-2">
                              <h4 className="font-serif font-bold text-white truncate">{ch.title}</h4>
                              <p className="text-[9px] text-neutral-500 font-mono">Ordem: {ch.order}</p>
                            </div>
                            <button
                              onClick={() => restoreChapter(ch)}
                              className="text-indigo-400 hover:text-white shrink-0 font-bold font-sans text-[10px] uppercase bg-indigo-500/10 px-2 py-1 rounded"
                            >
                              Restaurar
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 border border-dashed border-neutral-800 text-neutral-500 text-xs rounded-xl">
                        Nenhum capítulo na lixeira.
                      </div>
                    )}
                  </div>
                )}

              </div>
            </aside>
          )}

          {/* Collapsible right sidebar icon strip */}
          <aside className="w-16 border-l border-neutral-900 bg-[#09090b] flex flex-col justify-between items-center py-4 shrink-0 select-none">
            {/* Top stack icons */}
            <div className="space-y-3.5 flex flex-col items-center">
              <button
                onClick={() => setActiveRightTool(activeRightTool === 'stats' ? null : 'stats')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeRightTool === 'stats'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
                title="Metas & Insights"
              >
                <AlignLeft size={18} />
              </button>

              <button
                onClick={() => setActiveRightTool(activeRightTool === 'challenges' ? null : 'challenges')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeRightTool === 'challenges'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
                title="Desafios Literários"
              >
                <Trophy size={18} />
              </button>

              <button
                onClick={() => setActiveRightTool(activeRightTool === 'notes' ? null : 'notes')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeRightTool === 'notes'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
                title="Notas Fixadas"
              >
                <Pin size={18} />
              </button>

              <button
                onClick={() => setActiveRightTool(activeRightTool === 'track' ? null : 'track')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeRightTool === 'track'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
                title="Controle de Alterações & Sugestões"
              >
                <MessageSquare size={18} />
              </button>

              <button
                onClick={() => setActiveRightTool(activeRightTool === 'history' ? null : 'history')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeRightTool === 'history'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
                title="Snapshots de Versão"
              >
                <History size={18} />
              </button>

              <button
                onClick={() => setActiveRightTool(activeRightTool === 'search' ? null : 'search')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeRightTool === 'search'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
                title="Buscar & Substituir"
              >
                <Search size={18} />
              </button>

              <button
                onClick={() => setActiveRightTool(activeRightTool === 'spell' ? null : 'spell')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeRightTool === 'spell'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
                title="Corretor Ortográfico"
              >
                <Type size={18} />
              </button>

              <button
                onClick={() => setActiveRightTool(activeRightTool === 'trash' ? null : 'trash')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeRightTool === 'trash'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
                title="Lixeira de Capítulos"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Bottom stack settings icons (Export/Download, Perfil/User) */}
            <div className="space-y-3.5 flex flex-col items-center">
              {/* Diagramador e exportador */}
              <button
                onClick={() => setShowExporterModal(true)}
                className="p-2 rounded-xl text-indigo-400 hover:text-white hover:bg-neutral-900 border border-transparent transition-all cursor-pointer"
                title="Diagramação & Exportação (Configurações do Editor)"
              >
                <Download size={18} />
              </button>

              {/* Perfil */}
              <button
                onClick={() => setShowProfileModal(true)}
                className="p-2 rounded-xl text-indigo-400 hover:text-white hover:bg-neutral-900 border border-transparent transition-all cursor-pointer"
                title="Configurações de Perfil de Autor"
              >
                <User size={18} />
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* MODAL 1: EXPORTER / DIAGRAMADOR MODAL */}
      {showExporterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm px-4 select-none">
          <div className="bg-[#09090b] border border-neutral-850 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center bg-[#0c0c0e]">
              <div className="flex items-center gap-2">
                <BookMarked size={18} className="text-indigo-400" />
                <span className="font-serif font-bold text-lg text-white">Configurações do Editor: Diagramador & Exportador</span>
              </div>
              <button 
                onClick={() => setShowExporterModal(false)}
                className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <Exporter 
                chapters={chapters}
                settings={settings}
                setSettings={setSettings}
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AUTHOR PROFILE BUILDER MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm px-4 select-none">
          <div className="bg-[#09090b] border border-neutral-850 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center bg-[#0c0c0e]">
              <div className="flex items-center gap-2">
                <User size={18} className="text-indigo-400" />
                <span className="font-serif font-bold text-lg text-white">Configurações do Perfil de Autor</span>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AuthorProfileBuilder 
                profile={profile}
                setProfile={setProfile}
                books={books}
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE NEW BOARD MODAL */}
      {showNewBoardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm px-4 select-none">
          <div className="bg-[#09090b] border border-neutral-850 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 relative">
            <button 
              onClick={() => setShowNewBoardModal(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <h3 className="font-serif font-bold text-lg text-white">Criar Nova Pasta de Fichas</h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="w-16 space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase">Ícone</label>
                  <input 
                    type="text" 
                    value={newBoardEmoji} 
                    onChange={(e) => setNewBoardEmoji(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-center text-lg"
                    placeholder="📂"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase font-sans">Nome da Pasta</label>
                  <input 
                    type="text" 
                    value={newBoardName} 
                    onChange={(e) => setNewBoardName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                    placeholder="Ex: Personagens Principais"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-neutral-400 font-bold uppercase font-sans">Descrição</label>
                <textarea 
                  value={newBoardDesc} 
                  onChange={(e) => setNewBoardDesc(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-white h-20 resize-none font-sans"
                  placeholder="Descreva brevemente o propósito desta pasta..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowNewBoardModal(false)}
                className="outline-btn text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAddBoard}
                className="emerald-btn text-xs font-bold px-4 py-2 rounded-lg text-white cursor-pointer"
              >
                Criar Pasta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CREATE / EDIT PLANNING BLOCK MODAL */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm px-4 select-none">
          <div className="bg-[#09090b] border border-neutral-850 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 relative">
            <button 
              onClick={() => {
                setShowCardModal(false);
                setEditingCard(null);
              }}
              className="absolute top-4 right-4 p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <h3 className="font-serif font-bold text-lg text-white font-serif">
              {isNewCard ? 'Criar Ficha/Bloco' : 'Editar Ficha/Bloco'}
            </h3>

            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="w-16 space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase">Ícone</label>
                  <input 
                    type="text" 
                    value={cardFormEmoji} 
                    onChange={(e) => setCardFormEmoji(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-center text-lg"
                    placeholder="📝"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase font-sans">Título do Bloco</label>
                  <input 
                    type="text" 
                    value={cardFormTitle} 
                    onChange={(e) => setCardFormTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                    placeholder="Ex: Protagonista - Ficha"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-neutral-400 font-bold uppercase font-sans">Tipo de Elemento</label>
                <select 
                  value={cardFormType} 
                  onChange={(e) => setCardFormType(e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                >
                  <option value="character">Personagem</option>
                  <option value="location">Local</option>
                  <option value="event">Evento</option>
                  <option value="note">Nota</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-neutral-400 font-bold uppercase font-sans">Conteúdo da Ficha</label>
                <textarea 
                  value={cardFormContent} 
                  onChange={(e) => setCardFormContent(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-white h-40 resize-none font-sans"
                  placeholder="Escreva livremente sobre este personagem, local, cronologia ou observação geral..."
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              {!isNewCard && (
                <button 
                  onClick={() => {
                    if (editingCard) {
                      handleDeleteCard(editingCard.id);
                      setShowCardModal(false);
                      setEditingCard(null);
                    }
                  }}
                  className="text-xs text-red-450 hover:text-red-400 font-bold transition-colors cursor-pointer"
                >
                  Excluir Bloco
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button 
                  onClick={() => {
                    setShowCardModal(false);
                    setEditingCard(null);
                  }}
                  className="outline-btn text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveCard}
                  className="emerald-btn text-xs font-bold px-4 py-2 rounded-lg text-white cursor-pointer"
                >
                  {isNewCard ? 'Criar Bloco' : 'Salvar Bloco'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
