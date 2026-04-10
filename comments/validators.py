from django.core.exceptions import ValidationError


def validate_file(file):
    if file.size > 100 * 1024:
        raise ValidationError("Файл больше 100KB")