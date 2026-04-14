from django.views import View
from rest_framework import viewsets
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.filters import OrderingFilter
from captcha.models import CaptchaStore
from captcha.helpers import captcha_image_url
from django.http import JsonResponse


class CommentViewSet(viewsets.ModelViewSet):
    """Only main comments list """
    queryset = Comment.objects.filter(parent=None)
    serializer_class = CommentSerializer

    filter_backends = [OrderingFilter]
    ordering_fields = ['user_name', 'email', 'created_at']
    ordering = ['-created_at']


class CaptchaView(View):
    def get(self, request, *args, **kwargs):
        hashkey = CaptchaStore.generate_key()
        image_url = captcha_image_url(hashkey)

        data = {
            'hashkey': hashkey,
            'image_url': request.build_absolute_uri(image_url)
        }

        return JsonResponse(data)