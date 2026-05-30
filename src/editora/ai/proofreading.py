"""Módulo de Proofreading - Revisão final e correção gramatical."""

import json
import re
from typing import Any

from ...config import LLMConfig, ProofreadingConfig
from .llm import PROOFREADING_SYSTEM_PROMPT, LLMClient


class Proofreader:
    """Responsável pelo proofreading (revisão final) usando IA + regras."""

    def __init__(
        self,
        llm_config: LLMConfig | None = None,
        proofreading_config: ProofreadingConfig | None = None,
    ):
        self.proofreading_config = proofreading_config or ProofreadingConfig()
        self.llm = LLMClient(llm_config or LLMConfig())
        self._languagetool = None
        # Pre-compiled regex patterns for quick_check
        self._common_errors_patterns = [
            # Concordância verbal
            (
                re.compile(r"\b(houve|havia)\s+(muitos|vários|diversos)\b", re.IGNORECASE),
                "Houve/Havia + plural",
            ),
            # Crase
            (re.compile(r"\b(a\s+a)\b", re.IGNORECASE), "Possível crase: à"),
            # Porquê
            (re.compile(r"\b(por que)\b(?!\?)", re.IGNORECASE), "Verificar: por que/porquê"),
            # Mau/mal
            (re.compile(r"\b(mau\s+\w+)\b", re.IGNORECASE), "Verificar: mau (oposto de bom) vs mal"),
            # Onde/aonde
            (re.compile(r"\b(aonde\s+\w+)\b", re.IGNORECASE), "Verificar: onde vs aonde"),
            # Este/esse
            (
                re.compile(r"\b(este|essa|isso|aquilo)\b", re.IGNORECASE),
                "Verificar pronome demonstrativo",
            ),
        ]

    def _get_languagetool(self):
        """Inicializa o LanguageTool se necessário."""
        if self._languagetool is None:
            try:
                import language_tool_python
                self._languagetool = language_tool_python.Tool(
                    self.proofreading_config.language.replace("-", "_")
                )
            except ImportError:
                raise ImportError(
                    "Instale language-tool-python: pip install language-tool-python"
                )
        return self._languagetool

    def proofread(
        self,
        text: str,
        use_llm: bool | None = None,
    ) -> dict[str, Any]:
        """Revisa um texto em busca de erros gramaticais, ortográficos e de pontuação.

        Returns:
            Dicionário com:
            - corrected_text: texto corrigido
            - errors: lista de erros encontrados
            - error_count: número total de erros
        """
        use_llm = use_llm if use_llm is not None else self.proofreading_config.use_llm

        if use_llm:
            return self._proofread_with_llm(text)
        else:
            return self._proofread_with_languagetool(text)

    def _proofread_with_llm(self, text: str) -> dict[str, Any]:
        """Usa LLM para proofreading com contexto."""
        prompt = f"""Revise o seguinte texto em português brasileiro, corrigindo:
- Erros de gramática
- Erros de ortografia
- Erros de pontuação
- Problemas de concordância
- Erros de digitação

Texto:
---
{text}
---

Forneça sua resposta como JSON com:
1. "corrected_text": o texto completo corrigido
2. "errors": lista de objetos com {{ "original": "texto original", "correction": "correção", "type": "gramática|ortografia|pontuação|concordância|digitação", "explanation": "explicação breve" }}
3. "error_count": número total de erros encontrados

Importante: Retorne APENAS o JSON, sem markdown ou explicações adicionais."""

        try:
            response = self.llm.generate_json(
                prompt,
                system_prompt=PROOFREADING_SYSTEM_PROMPT,
            )

            corrected_text = response.get("corrected_text", text)
            errors = response.get("errors", [])

            return {
                "corrected_text": corrected_text,
                "errors": errors,
                "error_count": len(errors),
                "method": "llm",
            }

        except (json.JSONDecodeError, ValueError):
            # Fallback para LanguageTool
            return self._proofread_with_languagetool(text)

    def _proofread_with_languagetool(self, text: str) -> dict[str, Any]:
        """Usa LanguageTool para proofreading baseado em regras."""
        try:
            lt = self._get_languagetool()
            matches = lt.check(text)

            errors = []
            corrected_text = text

            # Aplica correções (do final para o início para preservar índices)
            matches_sorted = sorted(matches, key=lambda m: m.offset, reverse=True)

            for match in matches_sorted:
                error_type = self._classify_error(match.ruleId)
                error = {
                    "original": match.message,
                    "correction": match.replacements[0] if match.replacements else "",
                    "type": error_type,
                    "explanation": match.message,
                    "offset": match.offset,
                    "length": match.errorlength,
                }
                errors.append(error)

                # Aplica correção se houver sugestão
                if match.replacements:
                    corrected_text = (
                        corrected_text[: match.offset]
                        + match.replacements[0]
                        + corrected_text[match.offset + match.errorlength :]
                    )

            # Ordena erros por posição
            errors.sort(key=lambda e: e.get("offset", 0))

            # Remove campos internos
            for error in errors:
                error.pop("offset", None)
                error.pop("length", None)

            return {
                "corrected_text": corrected_text,
                "errors": errors,
                "error_count": len(errors),
                "method": "languagetool",
            }

        except Exception:
            # Fallback final: usa LLM
            return self._proofread_with_llm(text)

    def _classify_error(self, rule_id: str) -> str:
        """Classifica o tipo de erro baseado no rule_id do LanguageTool."""
        rule_id_lower = rule_id.lower()

        if any(
            keyword in rule_id_lower
            for keyword in ["orthograph", "spelling", "ortograf", "spelling"]
        ):
            return "ortografia"
        elif any(
            keyword in rule_id_lower
            for keyword in ["grammar", "grammatical", "gramática"]
        ):
            return "gramática"
        elif any(
            keyword in rule_id_lower
            for keyword in ["punctuation", "pontuação", "comma", "vírgula"]
        ):
            return "pontuação"
        elif any(
            keyword in rule_id_lower
            for keyword in ["agreement", "concordance", "concordância"]
        ):
            return "concordância"
        else:
            return "outro"

    def proofread_chapter(
        self,
        chapter_content: str,
        chapter_title: str = "",
        **kwargs,
    ) -> dict[str, Any]:
        """Revisa o conteúdo de um capítulo."""
        result = self.proofread(chapter_content, **kwargs)
        result["chapter_title"] = chapter_title
        return result

    def batch_proofread(
        self,
        texts: list[str],
        **kwargs,
    ) -> list[dict[str, Any]]:
        """Revisa múltiplos textos."""
        results = []
        for text in texts:
            result = self.proofread(text, **kwargs)
            results.append(result)
        return results

    def quick_check(self, text: str) -> dict[str, Any]:
        """Verificação rápida apenas de erros críticos."""
        errors = []
        for pattern, description in self._common_errors_patterns:
            matches = pattern.finditer(text)
            for match in matches:
                errors.append({
                    "original": match.group(),
                    "type": "atenção",
                    "explanation": f"Atenção: {description}",
                    "offset": match.start(),
                })

        return {
            "text": text,
            "errors": errors,
            "error_count": len(errors),
            "method": "regex_quick_check",
        }

    def compare_versions(
        self,
        original: str,
        corrected: str,
    ) -> dict[str, Any]:
        """Compara duas versões e destaca as diferenças."""
        from difflib import SequenceMatcher

        matcher = SequenceMatcher(None, original, corrected)
        changes = []

        for tag, i1, i2, j1, j2 in matcher.get_opcodes():
            if tag == "replace":
                changes.append({
                    "type": "substituição",
                    "original": original[i1:i2],
                    "corrected": corrected[j1:j2],
                })
            elif tag == "delete":
                changes.append({
                    "type": "remoção",
                    "original": original[i1:i2],
                    "corrected": "",
                })
            elif tag == "insert":
                changes.append({
                    "type": "adição",
                    "original": "",
                    "corrected": corrected[j1:j2],
                })

        return {
            "original": original,
            "corrected": corrected,
            "changes": changes,
            "total_changes": len(changes),
        }

    def generate_proofreading_report(
        self,
        text: str,
        title: str = "",
    ) -> str:
        """Gera um relatório de proofreading em formato legível."""
        result = self.proofread(text)

        report_lines = [
            f"{'='*60}",
            "RELATÓRIO DE PROOFREADING",
            f"{'='*60}",
        ]

        if title:
            report_lines.append(f"Título: {title}")

        report_lines.append(f"Total de erros encontrados: {result['error_count']}")
        report_lines.append(f"Método: {result.get('method', 'desconhecido')}")
        report_lines.append("")

        if result["errors"]:
            report_lines.append("ERROS ENCONTRADOS:")
            report_lines.append("-" * 40)
            for i, error in enumerate(result["errors"][:20], 1):  # Limita a 20 erros
                report_lines.append(
                    f"{i}. [{error.get('type', 'outro')}] "
                    f"'{error.get('original', '')}' → "
                    f"'{error.get('correction', '')}'"
                )
                if error.get("explanation"):
                    report_lines.append(f"   → {error['explanation']}")
            if len(result["errors"]) > 20:
                report_lines.append(f"... e mais {len(result['errors']) - 20} erros")

        report_lines.append("")
        report_lines.append("=" * 60)

        return "\n".join(report_lines)

    def __del__(self):
        """Limpa o LanguageTool quando destruído."""
        if self._languagetool is not None:
            try:
                self._languagetool.close()
            except:
                pass
