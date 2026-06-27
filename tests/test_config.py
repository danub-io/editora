import pytest
from pydantic import ValidationError

from editora.config import TypesettingConfig


def test_typesetting_config_valid_margins():
    """Testa que margens válidas são aceitas pela configuração."""
    valid_margins = {
        "top": "2cm",
        "bottom": "0.5in",
        "inner": ".75in",
        "outer": "12pt",
        "custom1": "1em",
        "custom2": "2ex",
        "custom3": "1pc",
        "custom4": "10mm",
    }

    config = TypesettingConfig(margins=valid_margins)
    assert config.margins == valid_margins


def test_typesetting_config_invalid_margins():
    """Testa que margens inválidas lançam erro de validação."""
    invalid_cases = [
        {"top": "2"},  # Missing unit
        {"top": "2px"},  # Invalid unit
        {"top": "twocm"},  # Non-numeric value
        {"top": "2 cm"},  # Space between number and unit
        {"top": "cm"},  # Missing number
    ]

    for invalid_margin in invalid_cases:
        with pytest.raises(ValidationError) as exc_info:
            TypesettingConfig(margins=invalid_margin)

        # Verify it's a value_error and mentions the invalid margin
        error_msg = str(exc_info.value)
        assert "Margem inválida para 'top'" in error_msg
