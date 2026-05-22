"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { useParams } from "next/navigation";
import {
  Plus,
  Search,
  User,
  Trash2,
  Edit2,
  UserPlus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CharactersPage() {
  const params = useParams();
  const projectId = params.id as string;
  const {
    getCharactersByProject,
    createCharacter,
    deleteCharacter,
    updateCharacter,
    fetchCharacters,
  } = useProjectStore();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCharacterId, setEditCharacterId] = useState<string | null>(null);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
    physicalTraits: "",
    personality: "",
  });

  useEffect(() => {
    fetchCharacters(projectId);
  }, [projectId, fetchCharacters]);

  const characters = getCharactersByProject(projectId).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    if (!newCharacter.name) return;
    await createCharacter({
      projectId,
      ...newCharacter,
      relationships: [],
    });
    setNewCharacter({ name: "", description: "", physicalTraits: "", personality: "" });
    setIsAddOpen(false);
  };

  const handleEdit = async () => {
    if (!editCharacterId || !newCharacter.name) return;
    await updateCharacter(editCharacterId, {
      name: newCharacter.name,
      description: newCharacter.description,
      personality: newCharacter.personality,
      physicalTraits: newCharacter.physicalTraits,
    });
    setNewCharacter({ name: "", description: "", physicalTraits: "", personality: "" });
    setEditCharacterId(null);
    setIsEditOpen(false);
  };

  const openEditDialog = (character: {
    id: string;
    name: string;
    description?: string;
    physicalTraits?: string;
    personality?: string;
  }) => {
    setEditCharacterId(character.id);
    setNewCharacter({
      name: character.name,
      description: character.description || "",
      physicalTraits: character.physicalTraits || "",
      personality: character.personality || "",
    });
    setIsEditOpen(true);
  };

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Personagens</h2>
          <p className="text-sm text-muted-foreground mt-0">Gerencie o elenco da sua história.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar personagem..."
              className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm hover:shadow cursor-pointer">
              <UserPlus className="h-4 w-4" />
              Novo Personagem
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Novo Personagem</DialogTitle>
                <DialogDescription>Adicione um novo integrante ao seu universo.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" value={newCharacter.name} onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição/Papel</Label>
                  <Textarea id="description" placeholder="Protagonista, vilão, mentor..." value={newCharacter.description} onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="personality">Personalidade</Label>
                  <Textarea id="personality" value={newCharacter.personality} onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
                <Button onClick={handleAdd}>Criar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Personagem</DialogTitle>
              <DialogDescription>Atualize as informações do personagem.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome</Label>
                <Input id="edit-name" value={newCharacter.name} onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descrição/Papel</Label>
                <Textarea id="edit-description" placeholder="Protagonista, vilão, mentor..." value={newCharacter.description} onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-personality">Personalidade</Label>
                <Textarea id="edit-personality" value={newCharacter.personality} onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
              <Button onClick={handleEdit}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {characters.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-xl p-20 text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-medium mb-2 text-foreground">Nenhum personagem encontrado</h3>
          <p className="text-muted-foreground mb-6">Crie seu primeiro personagem para começar a organizar sua história.</p>
          <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs hover:bg-primary/90 transition-colors mx-auto">
            <Plus className="h-4 w-4" />
            Adicionar Personagem
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {characters.map((character) => (
            <div key={character.id} className="group relative flex flex-col items-center bg-card border border-border rounded-xl p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                <button className="p-1.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground transition-colors" onClick={() => openEditDialog(character)}>
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-md bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors" onClick={() => deleteCharacter(character.id)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="w-20 h-20 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mb-4 text-2xl font-semibold shrink-0 border border-border/30">
                {character.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
              </div>
              <h3 className="text-[18px] font-semibold text-foreground mb-4 text-center line-clamp-1">{character.name}</h3>
              {character.description && (
                <div className="px-2 py-0.5 bg-muted rounded-full mb-4">
                  <span className="text-xs text-muted-foreground text-[10px] uppercase tracking-wider">{character.description}</span>
                </div>
              )}
              {character.personality && (
                <p className="text-sm text-muted-foreground text-center line-clamp-2">{character.personality}</p>
              )}
            </div>
          ))}
          <button onClick={() => setIsAddOpen(true)} className="group flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-border rounded-xl p-6 h-full min-h-[240px] hover:border-primary hover:bg-muted transition-colors duration-200">
            <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Criar Novo</h3>
          </button>
        </div>
      )}
    </div>
  );
}
