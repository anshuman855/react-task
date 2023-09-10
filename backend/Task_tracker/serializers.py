from rest_framework import serializers
from .models import Task_tracker

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_tracker
        fields = ('id', 'title', 'description', 'completed')