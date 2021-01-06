from django.contrib import admin
from .models import Post, Post_Pic

# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display = ['user', 'content','created']
    search_fields = ['user', 'content']
    list_filter = ['user']


admin.site.register(Post, PostAdmin)
admin.site.register(Post_Pic)