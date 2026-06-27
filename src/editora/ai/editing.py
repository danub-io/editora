"""Módulo de Copyediting - Edição de texto com IA."""

import json
import re
from difflib import SequenceMatcher
from typing import Any, Literal

from ...config import EditingConfig, LLMConfig
from .llm import EDITING_SYSTEM_PROMPTS, LLMClient


class TextEditor:
    """Responsável pela edição de texto (copyediting) usando IA."""

    def __init__(
        self,
        llm_config: LLMConfig | None = None,
        editing_config: EditingConfig | None = None,
    ):
        self.editing_config = editing_config or EditingConfig()
        self.llm = LLMClient(llm_config or LLMConfig())

    def edit_text(
        self,
        text: str,
        mode: Literal["light", "medium", "aggressive"] | None = None,
        voice_samples: list[str] | None = None,
        context: str | None = None,
    ) -> dict[str, Any]:
        """Edita um texto preservando a voz do autor.

        Returns:
            Dicionário com:
            - edited_text: texto editado
            - changes: lista de mudanças
            - change_percent: porcentagem de mudanças
        """
        mode = mode or self.editing_config.mode
        system_prompt = EDITING_SYSTEM_PROMPTS[mode]

        # Adiciona instruções sobre voice samples
        if voice_samples:
            samples_text = "\n\nAMOSTRAS DA VOZ DO AUTOR (para referência de estilo):\n"
            for i, sample in enumerate(voice_samples[:3], 1):
                samples_text += f"\nAmostra {i}:\n{sample[:500]}...\n"
            system_prompt += samples_text
            system_prompt += "\n\nMantenha consistência com este estilo."

        # Adiciona contexto
        if context:
            system_prompt += f"\n\nCONTEXTO DO LIVRO:\n{context[:1000]}"

        # Prompt específico para retornar edições em formato estruturado
        prompt = f"""Edite o seguinte texto em português brasileiro:

---
{text}
---

Forneça sua resposta como JSON com:
1. "edited_text": o texto completo editado
2. "changes": lista de objetos com {{ "original": "...", "edited": "...", "reason": "..." }}
3. "summary": breve resumo das principais mudanças

Importante: Retorne APENAS o JSON, sem markdown ou explicações adicionais."""

        try:
            response = self.llm.generate_json(
                prompt,
                system_prompt=system_prompt,
            )

            edited_text = response.get("edited_text", text)
            changes = response.get("changes", [])

            # Calcula porcentagem de mudança
            change_percent = self._calculate_change_percent(text, edited_text)

            return {
                "edited_text": edited_text,
                "changes": changes,
                "change_percent": round(change_percent, 2),
                "summary": response.get("summary", ""),
            }

        except (json.JSONDecodeError, ValueError) as e:
            # Fallback: tenta extrair o texto editado da resposta
            response_text = self.llm.generate(prompt, system_prompt)
            # Tenta extrair o texto entre marcações
            edited_text = self._extract_text_from_response(response_text)
            change_percent = self._calculate_change_percent(text, edited_text)

            return {
                "edited_text": edited_text,
                "changes": [],
                "change_percent": round(change_percent, 2),
                "summary": "Edição realizada (formato estruturado não disponível)",
                "error": str(e),
            }

    def edit_chapter(
        self,
        chapter_content: str,
        chapter_title: str = "",
        **kwargs,
    ) -> dict[str, Any]:
        """Edita o conteúdo de um capítulo."""
        context = f"Capítulo: {chapter_title}\n" if chapter_title else ""
        return self.edit_text(chapter_content, context=context, **kwargs)

    def edit_with_diff(
        self,
        text: str,
        **kwargs,
    ) -> dict[str, Any]:
        """Edita texto e retorna diff detalhado."""
        result = self.edit_text(text, **kwargs)

        # Gera diff usando SequenceMatcher
        diff = list(
            SequenceMatcher(None, text, result["edited_text"]).get_opcodes()
        )

        result["diff"] = [
            {
                "tag": tag,
                "start_original": i1,
                "end_original": i2,
                "start_edited": j1,
                "end_edited": j2,
                "original_text": text[i1:i2],
                "edited_text": result["edited_text"][j1:j2],
            }
            for tag, i1, i2, j1, j2 in diff
            if tag != "equal"
        ]

        return result

    def batch_edit(
        self,
        texts: list[str],
        **kwargs,
    ) -> list[dict[str, Any]]:
        """Edita múltiplos textos."""
        results = []
        for text in texts:
            result = self.edit_text(text, **kwargs)
            results.append(result)
        return results

    def _calculate_change_percent(self, original: str, edited: str) -> float:
        """Calcula a porcentagem de mudança entre textos."""
        if not original:
            return 0.0
        similarity = SequenceMatcher(None, original, edited).ratio()
        return (1 - similarity) * 100

    def _extract_text_from_response(self, response: str) -> str:
        """Extrai o texto editado de uma resposta não estruturada."""
        # Remove markdown code blocks
        response = re.sub(r"```(?:json)?\s*|\s*```", "", response)

        # Tenta encontrar o texto entre aspas após "edited_text"
        match = re.search(r'"edited_text"\s*:\s*"([^"]+)"', response)
        if match:
            return match.group(1)

        # Se não encontrar, retorna a resposta limpa
        return response.strip()

    def suggest_improvements(
        self,
        text: str,
        focus: Literal["clarity", "flow", "style", "concision"] = "clarity",
    ) -> dict[str, Any]:
        """Sugere melhorias específicas sem reescrever."""
        focus_prompts = {
            "clarity": "foco em clareza e compreensão",
            "flow": "foco em fluidez e ritmo",
            "style": "foco em estilo e elegância",
            "concision": "foco em concisão e eliminação de redundâncias",
        }

        system_prompt = f"""Você é um editor literário. Analise o texto e sugira melhorias com {focus_prompts[focus]}.
Não reescreva o texto, apenas liste sugestões específicas."""

        prompt = f"""Analise o seguinte texto e sugira melhorias específicas:

---
{text}
---

Forneça sua resposta como JSON com:
1. "suggestions": lista de objetos com {{ "location": "trecho ou parágrafo X", "issue": "problema", "suggestion": "sugestão de melhoria" }}
2. "strengths": lista de pontos fortes do texto

Retorne APENAS o JSON."""

        try:
            return self.llm.generate_json(prompt, system_prompt=system_prompt)
        except (json.JSONDecodeError, ValueError):
            response = self.llm.generate(prompt, system_prompt)
            return {
                "suggestions": [{"issue": "Análise realizada", "suggestion": response}],
                "strengths": [],
            }

    def check_voice_consistency(
        self,
        text: str,
        voice_samples: list[str],
    ) -> dict[str, Any]:
        """Verifica se o texto mantém consistência com a voz do autor."""
        samples_context = "\n\n".join(f"Amostra:\n{s[:500]}" for s in voice_samples[:5])

        system_prompt = """Você é um especialista em análise de voz e estilo literário.
Compare o texto fornecido com as amostras de voz do autor e identifique desvios."""

        prompt = f"""AMOSTRAS DA VOZ DO AUTOR:
{samples_context}

---

TEXTO PARA ANÁLISE:
{text}

---

Forneça sua resposta como JSON com:
1. "consistent": boolean indicando se o texto é consistente com a voz do autor
2. "score": nota de 0-100 para consistência
3. "deviations": lista de trechos ou aspectos que divergem da voz do autor
4. "recommendations": sugestões para melhorar a consistência

Retorne APENAS o JSON."""

        try:
            return self.llm.generate_json(prompt, system_prompt=system_prompt)
        except (json.JSONDecodeError, ValueError):
            response = self.llm.generate(prompt, system_prompt)
            return {
                "consistent": True,
                "score": 70,
                "deviations": [],
                "recommendations": response,
            }
