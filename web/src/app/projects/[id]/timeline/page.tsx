"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { useParams } from "next/navigation";
import { Plus, Clock, Users, Calendar, Trash2, Edit2 } from "lucide-react";
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

export default function TimelinePage() {
  const params = useParams();
  const projectId = params.id as string;
  const {
    getTimelineByProject,
    createTimelineEvent,
    deleteTimelineEvent,
    updateTimelineEvent,
    fetchTimeline,
  } = useProjectStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    fetchTimeline(projectId);
  }, [projectId, fetchTimeline]);

  const events = getTimelineByProject(projectId);

  const handleAdd = async () => {
    if (!newEvent.title) return;
    await createTimelineEvent({
      projectId,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      characterIds: [],
      order: events.length,
    });
    setNewEvent({ title: "", description: "", date: "" });
    setIsAddOpen(false);
  };

  const handleEdit = async () => {
    if (!editEventId || !newEvent.title) return;
    await updateTimelineEvent(editEventId, {
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
    });
    setNewEvent({ title: "", description: "", date: "" });
    setEditEventId(null);
    setIsEditOpen(false);
  };

  const openEditDialog = (event: {
    id: string;
    title: string;
    description?: string;
    date?: string;
  }) => {
    setEditEventId(event.id);
    setNewEvent({
      title: event.title,
      description: event.description || "",
      date: event.date || "",
    });
    setIsEditOpen(true);
  };

  return (
    <div className="p-4 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Timeline</h2>
          <p className="text-sm text-muted-foreground mt-0">
            Visualize e gerencie a cronologia da sua narrativa.
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs hover:bg-primary/90 transition-colors shadow-sm cursor-pointer">
          <Plus className="h-4 w-4" />
          Novo Evento
        </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Novo Evento</DialogTitle>
              <DialogDescription>Adicione um evento à linha do tempo.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Data / Período</Label>
                <Input id="date" placeholder="Ex: Ano 1042, Primavera" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
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
              <DialogTitle>Editar Evento</DialogTitle>
              <DialogDescription>Atualize o evento da timeline.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input id="edit-title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Data / Período</Label>
                <Input id="edit-date" placeholder="Ex: Ano 1042, Primavera" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea id="edit-description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
              <Button onClick={handleEdit}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {events.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-xl p-20 text-center">
          <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-medium mb-2 text-foreground">Nenhum evento na timeline</h3>
          <p className="text-muted-foreground mb-4">Comece a mapear a cronologia da sua história.</p>
          <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs mx-auto">
            <Plus className="h-4 w-4" />
            Adicionar Evento
          </button>
        </div>
      ) : (
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-border to-transparent" />
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event.id} className={`flex items-start gap-4 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <div className="flex-1">
                  <div className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
                    <button
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground"
                      onClick={() => openEditDialog(event)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      className="absolute top-3 right-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-destructive/10 hover:bg-destructive/20 text-destructive"
                      onClick={() => deleteTimelineEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {event.date && (
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-3 w-3 text-primary" />
                        <span className="text-xs text-primary font-medium">{event.date}</span>
                      </div>
                    )}
                    <h3 className="text-[18px] font-semibold text-foreground mb-4">{event.title}</h3>
                    {event.description && (
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    )}
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-4 h-4 mt-6 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-primary border-2 border-surface-container-lowest shadow-sm" />
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
