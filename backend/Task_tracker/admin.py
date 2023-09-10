from django.contrib import admin
from .models import Task_tracker

class TodoAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed")

admin.site.register(Task_tracker, TodoAdmin)  