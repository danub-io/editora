"use client";

import { useRouter } from "next/navigation";
import { useProjectStore } from "@/stores/projectStore";
import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  BookOpen,
  Plus,
  Sparkles,
  Users,
  Map,
  Clock,
  Bell,
  UserCircle,
} from "lucide-react";
import { Nav } from "@/components/nav/Nav";

export default function DashboardPage() {
  const router = useRouter();
  const { projects, fetchProjects, createProject, isLoading } =
    useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async () => {
    const project = await createProject({
      title: "Meu Novo Livro",
      author: "Autor",
      description: "",
      language: "pt-BR",
      categories: [],
      keywords: [],
      settings: {
        pageFormat: "6x9",
        fontFamily: "Lora",
        fontSize: 11,
        lineHeight: 1.4,
        margins: { top: "2cm", bottom: "2cm", inner: "2.5cm", outer: "2cm" },
        theme: "light",
      },
    });
    router.push(`/projects/${project.id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Nav ── */}
      <Nav
        links={[{ href: "/", label: "Conheça a Editora" }]}
      >
        <button
          onClick={() => toast.info("Notificações em breve!")}
          className="text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          onClick={() => toast.info("Perfil em breve!")}
          className="text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <UserCircle className="h-5 w-5" />
        </button>
        <button
          onClick={handleCreateProject}
          className="hidden md:flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full text-ui-label hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Novo Livro
        </button>
      </Nav>

      {/* ── Main ── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-col gap-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center max-w-3xl mx-auto pt-8">
          <h1 className="text-h1 font-bold text-primary mb-4">
            Sua Editora Pessoal
          </h1>
          <p className="text-editor-text text-on-surface-variant mb-4 max-w-2xl font-serif">
            O ambiente focado e profissional para dar vida às suas histórias.
            Gerencie manuscritos, desenvolva personagens complexos e estruture
            suas timelines em um ecossistema projetado para a escrita profunda.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleCreateProject}
              className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              <BookOpen className="h-4 w-4" />
              Começar Novo Livro
            </button>
          </div>
        </section>

        {/* Projetos Recentes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h2 font-semibold text-on-background">
              Projetos Recentes
            </h2>
            {projects.length > 0 && (
              <span className="text-primary text-sm flex items-center gap-1">
                {projects.length} projetos
              </span>
            )}
          </div>

          {isLoading && projects.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">
              Carregando projetos...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="bg-surface-container-lowest border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col"
                >
                  <div className="h-40 bg-surface-container-high relative overflow-hidden flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-md-outline-variant/40 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-h3 font-semibold text-on-background mb-1">
                      {project.title}
                    </h3>
                    <p className="text-ui-body text-on-surface-variant mb-4 flex-1">
                      {project.description || "Sem descrição"} •{" "}
                      {project.author}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-variant">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <Clock className="h-4 w-4" />
                        <span className="text-ui-label text-xs">
                          {new Date(project.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              <button
                onClick={handleCreateProject}
                className="bg-surface-container-low border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-6 hover:bg-surface-container transition-colors cursor-pointer min-h-[300px]"
              >
                <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8" />
                </div>
                <h3 className="text-h3 font-semibold text-on-background mb-2">
                  Novo Projeto
                </h3>
                <p className="text-ui-body text-on-surface-variant text-center">
                  Comece uma nova história do zero.
                </p>
              </button>
            </div>
          )}
        </section>

        {/* Features */}
        <section className="pb-12">
          <h2 className="text-h2 font-semibold text-on-background mb-6">
            Ferramentas Integradas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-primary-container/20 to-surface-container-lowest border border-primary-container/30 rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-[18px] font-semibold text-on-background mb-2">
                Edição IA
              </h3>
              <p className="text-ui-label text-on-surface-variant leading-relaxed">
                Análise profunda de estilo, sugestões de vocabulário e
                verificação de consistência narrativa.
              </p>
            </div>
            <div className="bg-surface-container-lowest border border-border rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-[18px] font-semibold text-on-background mb-2">
                Personagens
              </h3>
              <p className="text-ui-label text-on-surface-variant leading-relaxed">
                Fichas detalhadas, arcos dramáticos e rastreamento de
                relacionamentos cruzados.
              </p>
            </div>
            <div className="bg-surface-container-lowest border border-border rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center mb-4">
                <Map className="h-5 w-5" />
              </div>
              <h3 className="text-[18px] font-semibold text-on-background mb-2">
                Locais
              </h3>
              <p className="text-ui-label text-on-surface-variant leading-relaxed">
                Worldbuilding com notas de cultura e geografia para cada
                cenário.
              </p>
            </div>
            <div className="bg-surface-container-lowest border border-border rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-[18px] font-semibold text-on-background mb-2">
                Timeline
              </h3>
              <p className="text-ui-label text-on-surface-variant leading-relaxed">
                Visualize eventos cronologicamente e garanta o ritmo perfeito da
                narrativa.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
