from datetime import timedelta

from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from .models import Comment


class CommentSortTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        now = timezone.now()

        self.old_comment = Comment.objects.create(
            user_name="OldUser",
            email="old@test.com",
            text="Старый пост"
        )
        Comment.objects.filter(id=self.old_comment.id).update(created_at=now - timedelta(hours=1))

        self.new_comment = Comment.objects.create(
            user_name="NewUser",
            email="new@test.com",
            text="Новый пост"
        )

        self.reply = Comment.objects.create(
            user_name="ReplyUser",
            email="reply@test.com",
            text="Это ответ",
            parent=self.old_comment
        )

    def test_lifo_sorting_and_main_only(self):
        """ test only new posts first"""
        url = reverse('comment-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.data['results']

        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['user_name'], "NewUser")
        self.assertEqual(data[1]['user_name'], "OldUser")