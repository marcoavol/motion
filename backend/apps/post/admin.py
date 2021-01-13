from django.contrib import admin
from apps.post.models import Post, PostImage


class PostImageAdmin(admin.TabularInline):
    model = PostImage
    extra = 0


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageAdmin]
    readonly_fields = ['created']

    # fields shown when creating a new instance
    add_fieldsets = [
        (None, {
            'classes': ['wide'],
            'fields': ['user', 'content'],
        })
    ]

    # fields shown when reading / updating an instance
    fieldsets = [
        (None, {
            'fields': ['user', 'content', 'created']
        })
    ]

    # fields shown when looking at a list of instances
    list_display = ['user', 'content']
    list_filter = ['user', 'created']

    ordering = ['user']
