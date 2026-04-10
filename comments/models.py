# comments/models.py
from django.db import models
from django.core.validators import RegexValidator

username_validator = RegexValidator(
    regex=r'^[a-zA-Z0-9]+$',
    message="Только латиница и цифры"
)


class Comment(models.Model):
    user_name = models.CharField(max_length=50, validators=[username_validator])
    email = models.EmailField()
    home_page = models.URLField(blank=True, null=True)

    text = models.TextField()

    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies'
    )

    file = models.FileField(upload_to='files/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_name