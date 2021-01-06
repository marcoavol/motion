from django.contrib import admin
from .models import RegistrationProfile


@admin.register(RegistrationProfile)
class RegistrationProfileAdmin(admin.ModelAdmin):
    # fields shown when creating a new instance
    add_fieldsets = [
        (None, {
            'classes': ['wide'],
            'fields': ['user', 'code'],
        })
    ]

    # fields shown when looking at a list of instances
    list_display = ['user', 'code']
    list_filter = ['user']

    ordering = ['user']
