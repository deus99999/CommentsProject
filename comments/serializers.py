from rest_framework import serializers
from .models import Comment
from .utils import sanitize_html


class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_replies(self, obj):
        return CommentSerializer(obj.replies.all(), many=True).data

    def validate_text(self, value):
        return sanitize_html(value)
