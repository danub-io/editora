"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { useParams } from "next/navigation";
import {
  Plus,
  Map,
  MapPin,
  Search,
  Trash2,
  Edit2,
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

const LOCATION_TYPES = [
  { value: "indoor", label: "Interior" },
  { value: "outdoor", label: "Exterior" },
  { value: "city", label: "Cidade" },
  { value: "fantasy", label: "Fantasia" },
  { value: "other", label: "Outro" },
];

export default function LocationsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const {
    getLocationsByProject,
    createLocation,
    deleteLocation,
    fetchLocations,
  } = useProjectStore();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: "",
    description: "",
    type: "other" as string,
  });

  useEffect(() => {
    fetchLocations(projectId);
  }, [projectId, fetchLocations]);

  const locations = getLocationsByProject(projectId).filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    if (!newLocation.name) return;
    await createLocation({
      projectId,
      name: newLocation.name,
      description: newLocation.description,
      type: newLocation.type as any,
    });
    setNewLocation({ name: "", description: "", type: "other" });
    setIsAddOpen(false);
  };

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-h2 font-semibold text-on-background">Locais</h2>
          <p className="text-ui-body text-on-surface-variant mt-1">
            Construa o mundo da sua história.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar local..."
              className="pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-ui-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-ui-label hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm">
                <MapPin className="h-4 w-4" />
                Novo Local
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Novo Local</DialogTitle>
                <DialogDescription>
                  Adicione um cenário ao seu mundo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newLocation.name}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={newLocation.type}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, type: e.target.value })
                    }
                  >
                    {LOCATION_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newLocation.description}
                    onChange={(e) =>
                      setNewLocation({
                        ...newLocation,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAdd}>Criar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Grid */}
      {locations.length === 0 ? (
        <div className="border-2 border-dashed border-outline-variant rounded-xl p-20 text-center">
          <Map className="h-16 w-16 text-on-surface-variant mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-medium mb-2 text-on-background">
            Nenhum local encontrado
          </h3>
          <p className="text-on-surface-variant mb-6">
            Adicione os cenários onde sua história acontece.
          </p>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-ui-label mx-auto"
          >
            <Plus className="h-4 w-4" />
            Adicionar Local
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                <button
                  className="p-1.5 rounded-md bg-error-container/50 hover:bg-error-container text-error transition-colors"
                  onClick={() => deleteLocation(location.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="w-12 h-12 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6" />
              </div>

              <h3 className="text-[18px] font-semibold text-on-surface mb-1">
                {location.name}
              </h3>

              <div className="px-2 py-0.5 bg-surface-container rounded-full mb-3 self-start">
                <span className="text-ui-label text-on-surface-variant text-[10px] uppercase tracking-wider">
                  {LOCATION_TYPES.find((t) => t.value === location.type)
                    ?.label || "Outro"}
                </span>
              </div>

              {location.description && (
                <p className="text-ui-body text-on-surface-variant line-clamp-3">
                  {location.description}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={() => setIsAddOpen(true)}
            className="group flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-outline-variant rounded-xl p-6 min-h-[200px] hover:border-primary hover:bg-surface-container-low transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-4 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <h3 className="text-ui-body font-medium text-on-surface-variant group-hover:text-primary transition-colors">
              Criar Novo
            </h3>
          </button>
        </div>
      )}
    </div>
  );
}
