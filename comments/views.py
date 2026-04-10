from rest_framework import viewsets
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.filters import OrderingFilter


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(parent=None)
    serializer_class = CommentSerializer

    filter_backends = [OrderingFilter]
    ordering_fields = ['user_name', 'email', 'created_at']
    ordering = ['-created_at']