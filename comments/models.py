from django.db import models
from comments.validators import username_validator


class Comment(models.Model):
    user_name = models.CharField(max_length=50, validators=[username_validator], db_index=True)
    email = models.EmailField(db_index=True)
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

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.user_name