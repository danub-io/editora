"""Módulo de Revisão de Consistência Global - IA para análise de consistência narrativa."""

import json
from pathlib import Path
from typing import Any

from ...config import ConsistencyConfig, LLMConfig
from ..core.manuscript import Chapter, Manuscript
from .llm import CONSISTENCY_SYSTEM_PROMPT, LLMClient


class ConsistencyChecker:
    """Responsável pela revisão de consistência global do manuscrito."""

    def __init__(
        self,
        llm_config: LLMConfig | None = None,
        consistency_config: ConsistencyConfig | None = None,
    ):
        self.consistency_config = consistency_config or ConsistencyConfig()
        self.llm = LLMClient(llm_config or LLMConfig())

    def check_manuscript(
        self,
        manuscript: Manuscript,
    ) -> dict[str, Any]:
        """Analisa a consistência de todo o manuscrito.

        Returns:
            Dicionário com relatório completo de consistência.
        """
        results = {}

        if self.consistency_config.check_characters:
            results["characters"] = self.check_character_consistency(manuscript)

        if self.consistency_config.check_timeline:
            results["timeline"] = self.check_timeline_consistency(manuscript)

        if self.consistency_config.check_facts:
            results["facts"] = self.check_fact_consistency(manuscript)

        if self.consistency_config.check_tone:
            results["tone"] = self.check_tone_consistency(manuscript)

        # Resumo geral
        results["summary"] = self._generate_summary(results)

        return results

    def check_character_consistency(
        self,
        manuscript: Manuscript,
    ) -> dict[str, Any]:
        """Verifica consistência de personagens."""
        # Extrai informações sobre personagens de cada capítulo
        character_data = []
        for chapter in manuscript.all_sections:
            prompt = f"""Analise o seguinte texto e identifique:
1. Personagens mencionados (nome e descrição breve)
2. Características físicas descritas (cabelo, olhos, altura, etc.)
3. Características de personalidade
4. Relacionamentos com outros personagens
5. Ações importantes realizadas

Texto (capítulo {chapter.number}: {chapter.title}):
---
{chapter.content[:3000]}
---

Retorne JSON com:
- "characters": lista de {{ "name": "...", "description": "...", "physical_traits": [], "personality": [], "relationships": [], "actions": [] }}

Apenas JSON."""

            try:
                response = self.llm.generate_json(
                    prompt,
                    system_prompt="Você é um analista literário especializado em personagens.",
                )
                character_data.append({
                    "chapter": chapter.number,
                    "title": chapter.title,
                    "data": response,
                })
            except Exception as e:
                character_data.append({
                    "chapter": chapter.number,
                    "title": chapter.title,
                    "error": str(e),
                })

        # Analisa inconsistências
        analysis_prompt = f"""Analise os seguintes dados de personagens extraídos de cada capítulo e identifique INCONSISTÊNCIAS:

{json.dumps(character_data, ensure_ascii=False, indent=2)}

Procure por:
1. Descrições físicas contraditórias (ex: olhos azuis em um capítulo, castanhos em outro)
2. Personalidade inconsistente
3. Relacionamentos que mudam sem explicação
4. Personagens que aparecem/desaparecem sem motivo
5. Nomes escritos de forma diferente

Retorne JSON com:
- "inconsistencies": lista de {{ "character": "...", "type": "...", "description": "...", "chapters": [] }}
- "character_list": lista de nomes de personagens únicos
- "summary": resumo geral

Apenas JSON."""

        try:
            return self.llm.generate_json(
                analysis_prompt,
                system_prompt=CONSISTENCY_SYSTEM_PROMPT,
            )
        except Exception as e:
            return {
                "inconsistencies": [],
                "character_list": [],
                "summary": f"Erro na análise: {e}",
            }

    def check_timeline_consistency(
        self,
        manuscript: Manuscript,
    ) -> dict[str, Any]:
        """Verifica consistência de timeline/linha do tempo."""
        # Extrai eventos e referências temporais
        timeline_data = []
        for chapter in manuscript.chapters:
            prompt = f"""Analise o texto e extraia TODAS as referências temporais e eventos:
- Datas específicas
- Horas
- Dias da semana
- Estações do ano
- Referências como "no dia seguinte", "duas semanas depois", etc.
- Eventos importantes na ordem em que ocorrem

Texto (capítulo {chapter.number}: {chapter.title}):
---
{chapter.content[:3000]}
---

Retorne JSON com:
- "events": lista de {{ "description": "...", "time_reference": "...", "order": número }}
- "time_markers": lista de referências temporais explícitas

Apenas JSON."""

            try:
                response = self.llm.generate_json(
                    prompt,
                    system_prompt="Você é um analista de continuidade temporal.",
                )
                timeline_data.append({
                    "chapter": chapter.number,
                    "title": chapter.title,
                    "data": response,
                })
            except Exception as e:
                timeline_data.append({
                    "chapter": chapter.number,
                    "title": chapter.title,
                    "error": str(e),
                })

        # Analisa inconsistências
        analysis_prompt = f"""Analise a seguinte linha do tempo extraída e identifique INCONSISTÊNCIAS TEMPORAIS:

{json.dumps(timeline_data, ensure_ascii=False, indent=2)}

Procure por:
1. Eventos que ocorrem em ordem impossível
2. Referências temporais contraditórias
3. "Saltos" temporais não explicados
4. Dias/horas que não batem
5. Duração de eventos incompatível

Retorne JSON com:
- "inconsistencies": lista de {{ "type": "...", "description": "...", "affected_chapters": [] }}
- "timeline_summary": resumo da linha do tempo
- "warnings": lista de alertas

Apenas JSON."""

        try:
            return self.llm.generate_json(
                analysis_prompt,
                system_prompt=CONSISTENCY_SYSTEM_PROMPT,
            )
        except Exception as e:
            return {
                "inconsistencies": [],
                "timeline_summary": "",
                "warnings": [f"Erro na análise: {e}"],
            }

    def check_fact_consistency(
        self,
        manuscript: Manuscript,
    ) -> dict[str, Any]:
        """Verifica consistência de fatos (mundo, regras, informações)."""
        # Extrai fatos e informações de cada capítulo
        fact_data = []
        for chapter in manuscript.all_sections:
            prompt = f"""Analise o texto e extraia FATOS IMPORTANTES mencionados:
- Informações sobre o mundo/ambiente
- Regras (de magia, sociedade, física, etc.)
- Informações históricas
- Dados sobre organizações, lugares, objetos
- Qualquer informação apresentada como fato

Texto (capítulo {chapter.number}: {chapter.title}):
---
{chapter.content[:3000]}
---

Retorne JSON com:
- "facts": lista de {{ "fact": "...", "category": "mundo|regra|história|organização|lugar|objeto|outro", "confidence": "alta|média|baixa" }}

Apenas JSON."""

            try:
                response = self.llm.generate_json(
                    prompt,
                    system_prompt="Você é um analista de consistência factual.",
                )
                fact_data.append({
                    "chapter": chapter.number,
                    "title": chapter.title,
                    "data": response,
                })
            except Exception as e:
                fact_data.append({
                    "chapter": chapter.number,
                    "title": chapter.title,
                    "error": str(e),
                })

        # Analisa inconsistências
        analysis_prompt = f"""Analise os seguintes fatos extraídos e identifique CONTRADIÇÕES:

{json.dumps(fact_data, ensure_ascii=False, indent=2)}

Procure por:
1. Fatos que se contradizem entre capítulos
2. Regras que são violadas sem explicação
3. Informações históricas inconsistentes
4. Descrições de lugares que mudam
5. "Furos" na lógica interna do mundo

Retorne JSON com:
- "contradictions": lista de {{ "fact_a": "...", "fact_b": "...", "chapters": [], "explanation": "..." }}
- "world_building_issues": lista de problemas de construção de mundo
- "summary": resumo

Apenas JSON."""

        try:
            return self.llm.generate_json(
                analysis_prompt,
                system_prompt=CONSISTENCY_SYSTEM_PROMPT,
            )
        except Exception as e:
            return {
                "contradictions": [],
                "world_building_issues": [],
                "summary": f"Erro na análise: {e}",
            }

    def check_tone_consistency(
        self,
        manuscript: Manuscript,
    ) -> dict[str, Any]:
        """Verifica consistência de tom e voz narrativa."""
        tone_data = []
        for chapter in manuscript.chapters:
            prompt = f"""Analise o texto e descreva o TOM e ESTILO:
- Tom geral (sério, humorístico, sombrio, leve, etc.)
- Estilo narrativo (formal, informal, poético, direto, etc.)
- Vocabulário predominante
- Ritmo das frases

Texto (capítulo {chapter.number}: {chapter.title}):
---
{chapter.content[:3000]}
---

Retorne JSON com:
- "tone": descrição do tom
- "style": descrição do estilo
- "tone_score": número de 1 (muito leve) a 10 (muito sério)
- "formality_score": número de 1 (informal) a 10 (formal)
- "keywords": lista de palavras-chave que caracterizam o estilo

Apenas JSON."""

            try:
                response = self.llm.generate_json(
                    prompt,
                    system_prompt="Você é um analista de estilo literário.",
                )
                tone_data.append({
                    "chapter": chapter.number,
                    "title": chapter.title,
                    "data": response,
                })
            except Exception as e:
                tone_data.append({
                    "chapter": chapter.number,
                    "title": chapter.title,
                    "error": str(e),
                })

        # Analisa variações
        analysis_prompt = f"""Analise as seguintes análises de tom por capítulo e identifique VARIAÇÕES SIGNIFICATIVAS:

{json.dumps(tone_data, ensure_ascii=False, indent=2)}

Procure por:
1. Capítulos com tom muito diferente dos demais
2. Mudanças bruscas de estilo
3. Variações inexplicáveis de formalidade
4. Capítulos que "destoam" do restante

Retorne JSON com:
- "overall_tone": descrição do tom predominante
- "variations": lista de {{ "chapter": número, "issue": "...", "description": "..." }}
- "consistency_score": número de 0-100
- "recommendations": lista de recomendações

Apenas JSON."""

        try:
            return self.llm.generate_json(
                analysis_prompt,
                system_prompt=CONSISTENCY_SYSTEM_PROMPT,
            )
        except Exception as e:
            return {
                "overall_tone": "Não foi possível determinar",
                "variations": [],
                "consistency_score": 50,
                "recommendations": [f"Erro na análise: {e}"],
            }

    def _generate_summary(self, results: dict[str, Any]) -> dict[str, Any]:
        """Gera resumo geral das análises de consistência."""
        total_issues = 0
        critical_issues = 0

        for category in ["characters", "timeline", "facts", "tone"]:
            if category in results:
                result = results[category]
                if "inconsistencies" in result:
                    total_issues += len(result["inconsistencies"])
                elif "contradictions" in result:
                    total_issues += len(result["contradictions"])
                elif "variations" in result:
                    total_issues += len(result["variations"])

        return {
            "total_issues": total_issues,
            "critical_issues": critical_issues,  # Poderia ser refinado
            "categories_analyzed": list(results.keys()),
            "overall_health": "bom" if total_issues < 5 else "atenção" if total_issues < 15 else "crítico",
        }

    def generate_report(
        self,
        manuscript: Manuscript,
        format: str = "markdown",
    ) -> str:
        """Gera relatório de consistência em formato legível."""
        results = self.check_manuscript(manuscript)

        if format == "markdown":
            return self._format_markdown_report(results, manuscript)
        elif format == "json":
            return json.dumps(results, indent=2, ensure_ascii=False)
        else:
            return str(results)

    def _format_markdown_report(
        self,
        results: dict[str, Any],
        manuscript: Manuscript,
    ) -> str:
        """Formata relatório em Markdown."""
        lines = [
            f"# Relatório de Consistência",
            f"\n**Livro:** {manuscript.title}",
            f"**Autor:** {manuscript.author}",
            f"**Capítulos:** {len(manuscript.chapters)}",
            f"",
        ]

        # Resumo
        summary = results.get("summary", {})
        lines.append("## Resumo Geral")
        lines.append(f"- **Total de questões encontradas:** {summary.get('total_issues', 0)}")
        lines.append(f"- **Categorias analisadas:** {', '.join(summary.get('categories_analyzed', []))}")
        lines.append(f"- **Saúde geral:** {summary.get('overall_health', 'desconhecido')}")
        lines.append("")

        # Personagens
        if "characters" in results:
            chars = results["characters"]
            lines.append("## Consistência de Personagens")
            lines.append(f"**Personagens identificados:** {len(chars.get('character_list', []))}")

            if chars.get("inconsistencies"):
                lines.append("\n**Inconsistências encontradas:**")
                for i, inc in enumerate(chars["inconsistencies"], 1):
                    lines.append(
                        f"{i}. **{inc.get('character', 'Desconhecido')}** [{inc.get('type', '')}]: "
                        f"{inc.get('description', '')}"
                    )
            else:
                lines.append("\n✅ Nenhuma inconsistência encontrada.")
            lines.append("")

        # Timeline
        if "timeline" in results:
            timeline = results["timeline"]
            lines.append("## Consistência de Timeline")

            if timeline.get("inconsistencies"):
                lines.append("\n**Questões de timeline:**")
                for i, issue in enumerate(timeline["inconsistencies"], 1):
                    lines.append(
                        f"{i}. [{issue.get('type', '')}] {issue.get('description', '')}"
                    )
            else:
                lines.append("\n✅ Nenhuma questão encontrada.")
            lines.append("")

        # Fatos
        if "facts" in results:
            facts = results["facts"]
            lines.append("## Consistência Factual")

            if facts.get("contradictions"):
                lines.append("\n**Contradições encontradas:**")
                for i, cont in enumerate(facts["contradictions"], 1):
                    lines.append(
                        f"{i}. {cont.get('fact_a', '')} × {cont.get('fact_b', '')}"
                    )
                    if cont.get("explanation"):
                        lines.append(f"   → {cont['explanation']}")
            else:
                lines.append("\n✅ Nenhuma contradição encontrada.")
            lines.append("")

        # Tom
        if "tone" in results:
            tone = results["tone"]
            lines.append("## Consistência de Tom")
            lines.append(f"**Tom predominante:** {tone.get('overall_tone', 'não determinado')}")
            lines.append(f"**Score de consistência:** {tone.get('consistency_score', 0)}/100")

            if tone.get("variations"):
                lines.append("\n**Variações encontradas:**")
                for i, var in enumerate(tone["variations"], 1):
                    lines.append(
                        f"{i}. Capítulo {var.get('chapter', '?')}: {var.get('issue', '')}"
                    )
            else:
                lines.append("\n✅ Tom consistente em todos os capítulos.")
            lines.append("")

        return "\n".join(lines)