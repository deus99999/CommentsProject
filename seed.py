import os
import django
import random
from faker import Faker

# Настройка окружения Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from comments.models import Comment

fake = Faker()


def seed_comments(count=50):
    for i in range(count):

        existing_comments = Comment.objects.all()

        if i > 5 and existing_comments.exists() and random.random() > 0.3:
            parent = random.choice(existing_comments)
            depth = 1

            temp_parent = parent
            while temp_parent.parent:
                temp_parent = temp_parent.parent
                depth += 1

            text = f"Ответ (уровень {depth}) для {parent.user_name}: {fake.sentence()}"
        else:
            parent = None
            text = f"Корневой комментарий. {fake.paragraph(nb_sentences=2)}"

        Comment.objects.create(
            user_name=fake.user_name()[:20],
            email=fake.email(),
            home_page=fake.url() if random.random() > 0.8 else None,
            text=text,
            parent=parent
        )


if __name__ == '__main__':
    seed_comments(50)