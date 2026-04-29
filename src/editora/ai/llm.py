"""Camada de abstração para LLMs - Suporte a múltiplos providers."""

import json
import os
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any, Literal

from ...config import LLMConfig


class BaseLLM(ABC):
    """Classe base para clients LLM."""

    @abstractmethod
    def generate(
        self,
        prompt: str,
        system_prompt: str | None = None,
        temperature: float | None = None,
        max_tokens: int | None = None,
        **kwargs,
    ) -> str:
        """Gera uma resposta para o prompt."""
        pass

    @abstractmethod
    def generate_json(
        self,
        prompt: str,
        schema: dict | None = None,
        system_prompt: str | None = None,
        **kwargs,
    ) -> dict[str, Any]:
        """Gera uma resposta estruturada em JSON."""
        pass


class OpenAILLM(BaseLLM):
    """Client para OpenAI."""

    def __init__(self, config: LLMConfig):
        try:
            from langchain_openai import ChatOpenAI
            self.client = ChatOpenAI(
                model=config.model,
                temperature=config.temperature,
                max_tokens=config.max_tokens,
                api_key=config.api_key or os.getenv("OPENAI_API_KEY"),
                base_url=config.base_url,
            )
        except ImportError:
            raise ImportError(
                "Instale langchain-openai: pip install langchain-openai"
            )

    def generate(
        self,
        prompt: str,
        system_prompt: str | None = None,
        temperature: float | None = None,
        max_tokens: int | None = None,
        **kwargs,
    ) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = self.client.invoke(
            messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return response.content

    def generate_json(
        self,
        prompt: str,
        schema: dict | None = None,
        system_prompt: str | None = None,
        **kwargs,
    ) -> dict[str, Any]:
        # Tenta usar structured output se disponível
        try:
            from langchain_core.output_parsers import PydanticOutputParser
            from pydantic import BaseModel, create_model

            if schema:
                # Cria um modelo Pydantic dinâmico
                fields = {}
                for field_name, field_type in schema.items():
                    fields[field_name] = (field_type, ...)
                response_model = create_model("Response", **fields)
                parser = PydanticOutputParser(pydantic_object=response_model)

                prompt_with_format = f"{prompt}\n\n{parser.get_format_instructions()}"
                response = self.client.invoke([
                    {"role": "system", "content": system_prompt or ""},
                    {"role": "user", "content": prompt_with_format},
                ])
                return parser.parse(response.content).model_dump()
        except Exception:
            # Fallback: pede JSON e parseia
            json_prompt = f"{prompt}\n\nResponda APENAS com um JSON válido."
            response = self.generate(json_prompt, system_prompt)
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                # Tenta extrair JSON do texto
                import re
                match = re.search(r"\{.*\}", response, re.DOTALL)
                if match:
                    return json.loads(match.group())
                raise ValueError(f"Não foi possível extrair JSON: {response}")


class AnthropicLLM(BaseLLM):
    """Client para Anthropic Claude."""

    def __init__(self, config: LLMConfig):
        try:
            from langchain_anthropic import ChatAnthropic
            self.client = ChatAnthropic(
                model=config.model,
                temperature=config.temperature,
                max_tokens=config.max_tokens,
                api_key=config.api_key or os.getenv("ANTHROPIC_API_KEY"),
            )
        except ImportError:
            raise ImportError(
                "Instale langchain-anthropic: pip install langchain-anthropic"
            )

    def generate(
        self,
        prompt: str,
        system_prompt: str | None = None,
        temperature: float | None = None,
        max_tokens: int | None = None,
        **kwargs,
    ) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = self.client.invoke(
            messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return response.content

    def generate_json(
        self,
        prompt: str,
        schema: dict | None = None,
        system_prompt: str | None = None,
        **kwargs,
    ) -> dict[str, Any]:
        # Claude suporta tool use para structured output
        json_prompt = f"{prompt}\n\nResponda APENAS com um JSON válido, sem markdown ou explicações."
        response = self.generate(json_prompt, system_prompt)

        # Remove markdown code blocks se presentes
        import re
        response = re.sub(r"```json\s*|\s*```", "", response).strip()

        try:
            return json.loads(response)
        except json.JSONDecodeError:
            match = re.search(r"\{.*\}", response, re.DOTALL)
            if match:
                return json.loads(match.group())
            raise ValueError(f"Não foi possível extrair JSON: {response}")


class GoogleLLM(BaseLLM):
    """Client para Google Gemini."""

    def __init__(self, config: LLMConfig):
        try:
            from langchain_google_genai import ChatGoogleGenerativeAI
            self.client = ChatGoogleGenerativeAI(
                model=config.model,
                temperature=config.temperature,
                max_output_tokens=config.max_tokens,
                google_api_key=config.api_key or os.getenv("GOOGLE_API_KEY"),
            )
        except ImportError:
            raise ImportError(
                "Instale langchain-google-genai: pip install langchain-google-genai"
            )

    def generate(
        self,
        prompt: str,
        system_prompt: str | None = None,
        temperature: float | None = None,
        max_tokens: int | None = None,
        **kwargs,
    ) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = self.client.invoke(
            messages,
            temperature=temperature,
            max_output_tokens=max_tokens,
        )
        return response.content

    def generate_json(
        self,
        prompt: str,
        schema: dict | None = None,
        system_prompt: str | None = None,
        **kwargs,
    ) -> dict[str, Any]:
        json_prompt = f"{prompt}\n\nResponda APENAS com um JSON válido."
        response = self.generate(json_prompt, system_prompt)

        import re
        response = re.sub(r"```json\s*|\s*```", "", response).strip()

        try:
            return json.loads(response)
        except json.JSONDecodeError:
            match = re.search(r"\{.*\}", response, re.DOTALL)
            if match:
                return json.loads(match.group())
            raise ValueError(f"Não foi possível extrair JSON: {response}")


class OllamaLLM(BaseLLM):
    """Client para Ollama (modelos locais)."""

    def __init__(self, config: LLMConfig):
        try:
            from langchain_ollama import ChatOllama
            self.client = ChatOllama(
                model=config.model,
                temperature=config.temperature,
                base_url=config.base_url or "http://localhost:11434",
            )
        except ImportError:
            raise ImportError(
                "Instale langchain-ollama: pip install langchain-ollama"
            )

    def generate(
        self,
        prompt: str,
        system_prompt: str | None = None,
        temperature: float | None = None,
        max_tokens: int | None = None,
        **kwargs,
    ) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = self.client.invoke(messages, temperature=temperature)
        return response.content

    def generate_json(
        self,
        prompt: str,
        schema: dict | None = None,
        system_prompt: str | None = None,
        **kwargs,
    ) -> dict[str, Any]:
        json_prompt = f"{prompt}\n\nResponda APENAS com um JSON válido."
        response = self.generate(json_prompt, system_prompt)

        import re
        response = re.sub(r"```json\s*|\s*```", "", response).strip()

        try:
            return json.loads(response)
        except json.JSONDecodeError:
            match = re.search(r"\{.*\}", response, re.DOTALL)
            if match:
                return json.loads(match.group())
            raise ValueError(f"Não foi possível extrair JSON: {response}")


class LLMClient:
    """Factory e wrapper para clients LLM."""

    _clients: dict[str, BaseLLM] = {}

    def __init__(self, config: LLMConfig | None = None):
        self.config = config or LLMConfig()
        self._client = self._create_client()

    def _create_client(self) -> BaseLLM:
        """Cria o client baseado no provider."""
        provider = self.config.provider

        if provider == "openai":
            return OpenAILLM(self.config)
        elif provider == "anthropic":
            return AnthropicLLM(self.config)
        elif provider == "google":
            return GoogleLLM(self.config)
        elif provider == "ollama":
            return OllamaLLM(self.config)
        else:
            raise ValueError(f"Provider não suportado: {provider}")

    def generate(
        self,
        prompt: str,
        system_prompt: str | None = None,
        temperature: float | None = None,
        max_tokens: int | None = None,
        **kwargs,
    ) -> str:
        """Gera uma resposta para o prompt."""
        return self._client.generate(
            prompt,
            system_prompt,
            temperature or self.config.temperature,
            max_tokens or self.config.max_tokens,
            **kwargs,
        )

    def generate_json(
        self,
        prompt: str,
        schema: dict | None = None,
        system_prompt: str | None = None,
        **kwargs,
    ) -> dict[str, Any]:
        """Gera uma resposta estruturada em JSON."""
        return self._client.generate_json(prompt, schema, system_prompt, **kwargs)

    def generate_with_context(
        self,
        prompt: str,
        context: list[dict[str, str]],
        system_prompt: str | None = None,
        **kwargs,
    ) -> str:
        """Gera resposta com histórico de conversa."""
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.extend(context)
        messages.append({"role": "user", "content": prompt})

        # Usa o client diretamente para suporte a multi-turn
        if hasattr(self._client, "client"):
            response = self._client.client.invoke(messages)
            return response.content
        return self.generate(prompt, system_prompt, **kwargs)


def get_llm_client(config: LLMConfig | None = None) -> LLMClient:
    """Factory function para criar um client LLM."""
    return LLMClient(config)


# Prompts base para edição em português
EDITING_SYSTEM_PROMPTS = {
    "light": """Você é um editor literário cuidadoso que preserva a voz do autor.
Faça apenas edições leves para melhorar clareza e fluidez.
Mantenha o estilo e tom originais.""",

    "medium": """Você é um editor literário experiente.
Melhore clareza, fluidez, elimine repetições e muletas verbais.
Mantenha a voz do autor, mas não hesite em reescrever frases fracas.""",

    "aggressive": """Você é um editor literário rigoroso.
Reescreva para máxima clareza, impacto e elegância.
Elimine tudo que for desnecessário. Seja direto e poderoso.""",
}

PROOFREADING_SYSTEM_PROMPT = """Você é um revisor de textos especializado em português brasileiro.
Corrija gramática, ortografia, pontuação e concordância.
Mantenha a voz do autor e explique brevemente as correções importantes."""

CONSISTENCY_SYSTEM_PROMPT = """Você é um analista literário especializado em consistência narrativa.
Identifique contradições, furos na trama, inconsistências de personagens e timeline.
Forneça um relatório estruturado com as questões encontradas."""