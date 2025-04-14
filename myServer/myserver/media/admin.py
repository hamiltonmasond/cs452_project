from django.contrib import admin
from .models import Media
# Register your models here.
class MediaAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['personId']}),
        (None, {'fields': ['title']}),
        (None, {'fields': ['lastPlayed']}),
        (None, {'fields': ['rating']}),
        (None, {'fields': ['description']})
    ]
    list_display = ('personId', 'title', 'lastPlayed', 'rating', 'description')

admin.site.register(Media, MediaAdmin)