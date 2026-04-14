from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator

username_validator = RegexValidator(
    regex=r'^[a-zA-Z0-9]+$',
    message="Только латиница и цифры"
)


def validate_file(file):
    if file.size > 100 * 1024:
        raise ValidationError("Файл больше 100KB")